import http from 'node:http';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const environmentFile = path.join(root, '.env');
if (fs.existsSync(environmentFile)) {
  for (const line of fs.readFileSync(environmentFile, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^([A-Z_]+)=(.*)$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2];
  }
}
const dataDirectory = path.join(root, 'data');
const dataFile = path.join(dataDirectory, 'auth-data.json');
const contactDataFile = path.join(dataDirectory, 'contact-messages.json');
const port = Number(process.env.AUTH_PORT || 4000);
const sessionSecret = process.env.AUTH_SESSION_SECRET;
const adminEmail = process.env.ADMIN_EMAIL;
const adminInitialPassword = process.env.ADMIN_INITIAL_PASSWORD;
const contactReceiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'riamaster17@gmail.com';
const emailApiKey = process.env.EMAIL_API_KEY;
const emailFrom = process.env.EMAIL_FROM;
const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:3000';
const contactRateLimit = new Map();

if (!sessionSecret || !adminEmail || !adminInitialPassword) {
  console.error('Missing AUTH_SESSION_SECRET, ADMIN_EMAIL, or ADMIN_INITIAL_PASSWORD. Copy .env.example to .env and configure it.');
  process.exit(1);
}

const readData = () => {
  if (!fs.existsSync(dataFile)) return { users: [], sessions: {} };
  return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
};

const writeData = data => {
  fs.mkdirSync(dataDirectory, { recursive: true });
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), { mode: 0o600 });
};

const readContactMessages = () => {
  if (!fs.existsSync(contactDataFile)) return [];
  return JSON.parse(fs.readFileSync(contactDataFile, 'utf8'));
};

const writeContactMessages = messages => {
  fs.mkdirSync(dataDirectory, { recursive: true });
  fs.writeFileSync(contactDataFile, JSON.stringify(messages, null, 2), { mode: 0o600 });
};

const hashPassword = (password, salt = crypto.randomBytes(16).toString('hex')) => {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
};

const verifyPassword = (password, storedHash) => {
  const [salt, expected] = storedHash.split(':');
  const actual = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(actual, 'hex'), Buffer.from(expected, 'hex'));
};

const signSession = value => crypto.createHmac('sha256', sessionSecret).update(value).digest('hex');
const createSession = (userId, role) => {
  const value = `${userId}.${role}.${Date.now()}.${crypto.randomBytes(16).toString('hex')}`;
  return `${value}.${signSession(value)}`;
};
const getCookie = (request, name) => (request.headers.cookie || '').split(';').map(item => item.trim()).find(item => item.startsWith(`${name}=`))?.slice(name.length + 1);
const getUser = request => {
  const token = getCookie(request, 'mp_session');
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 5 || !crypto.timingSafeEqual(Buffer.from(parts[4]), Buffer.from(signSession(parts.slice(0, 4).join('.'))))) return null;
  const data = readData();
  const session = data.sessions[token];
  if (!session || session.expiresAt < Date.now()) return null;
  return data.users.find(user => user.id === session.userId) || null;
};

const send = (response, status, body, headers = {}) => {
  response.writeHead(status, {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Credentials': 'true',
    'Vary': 'Origin',
    ...headers,
  });
  response.end(status === 204 ? undefined : JSON.stringify(body));
};
const parseBody = request => new Promise((resolve, reject) => {
  let body = '';
  let rejected = false;
  request.on('data', chunk => {
    body += chunk;
    if (body.length > 10000 && !rejected) {
      rejected = true;
      reject(Object.assign(new Error('Payload too large'), { status: 413 }));
      request.destroy();
    }
  });
  request.on('end', () => {
    if (rejected) return;
    try { resolve(body ? JSON.parse(body) : {}); } catch { reject(Object.assign(new Error('Invalid JSON'), { status: 400 })); }
  });
  request.on('error', reject);
});
const publicUser = user => ({ id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role });
const getClientAddress = request => request.headers['x-forwarded-for']?.split(',')[0].trim() || request.socket.remoteAddress || 'unknown';
const isRateLimited = request => {
  const now = Date.now();
  const key = getClientAddress(request);
  const recent = (contactRateLimit.get(key) || []).filter(time => now - time < 15 * 60 * 1000);
  recent.push(now);
  contactRateLimit.set(key, recent);
  return recent.length > 5;
};
const validateContact = body => {
  const fullName = String(body.fullName || body.name || '').trim();
  const email = String(body.email || '').trim().toLowerCase();
  const phone = String(body.phone || '').trim();
  const message = String(body.message || '').trim();
  if (fullName.length < 2 || fullName.length > 100) return null;
  if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 254) return null;
  if (!/^\+?[0-9\s().-]{8,20}$/.test(phone) || phone.replace(/\D/g, '').length < 8) return null;
  if (message.length < 10 || message.length > 4000) return null;
  return { fullName, email, phone, message };
};
const toClientMessage = message => ({ ...message, name: message.fullName, timestamp: message.createdAt, read: message.status !== 'NEW' });
const requireAdmin = request => {
  const user = getUser(request);
  return user?.role === 'ADMIN' ? user : null;
};
const sendContactNotification = async message => {
  if (!emailApiKey || !emailFrom) {
    console.error('Contact email delivery is not configured; enquiry remains stored.');
    return false;
  }
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${emailApiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: emailFrom,
      to: [contactReceiverEmail],
      reply_to: message.email,
      subject: "New Patient Enquiry — Master's Physiotherapy",
      text: `New enquiry received through the Master's Physiotherapy website.\n\nPatient Details:\n\nName: ${message.fullName}\nEmail: ${message.email}\nPhone: ${message.phone}\n\nMessage:\n\n${message.message}\n\nSubmitted:\n${message.createdAt}`,
    }),
  });
  if (!response.ok) {
    console.error(`Contact email delivery failed with status ${response.status}.`);
    return false;
  }
  return true;
};

const server = http.createServer(async (request, response) => {
  try {
    if (!request.url?.startsWith('/api/')) return send(response, 404, { message: 'Not found' });
    if (request.method === 'OPTIONS') return send(response, 204, {}, { 'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' });
    const data = readData();
    const requestUrl = new URL(request.url, 'http://localhost');
    if (request.method === 'POST' && requestUrl.pathname === '/api/contact') {
      if (isRateLimited(request)) return send(response, 429, { message: 'Too many messages. Please try again later.' });
      if (request.headers['content-type'] !== 'application/json') return send(response, 415, { message: 'JSON is required.' });
      const body = await parseBody(request);
      if (body.website) return send(response, 400, { message: 'The request could not be processed.' });
      const contact = validateContact(body);
      if (!contact) return send(response, 400, { message: 'Please provide a valid name, email, phone number, and message.' });
      const now = new Date().toISOString();
      const enquiry = { id: `enquiry-${crypto.randomUUID()}`, ...contact, status: 'NEW', createdAt: now, updatedAt: now };
      const messages = readContactMessages();
      messages.unshift(enquiry);
      writeContactMessages(messages);
      if (!await sendContactNotification(enquiry)) return send(response, 503, { message: 'Your enquiry was saved, but notification delivery is temporarily unavailable.' });
      return send(response, 201, { message: 'Your message has been sent successfully. Riya will get back to you shortly!', id: enquiry.id });
    }
    if (request.method === 'GET' && request.url === '/api/auth/session') {
      const user = getUser(request);
      return send(response, 200, { user: user ? publicUser(user) : null });
    }
    if (request.method === 'POST' && request.url === '/api/auth/signup') {
      const body = await parseBody(request);
      const email = String(body.email || '').trim().toLowerCase();
      if (!body.name || !/^\S+@\S+\.\S+$/.test(email) || !/^\+?[0-9\s()-]{8,}$/.test(String(body.phone || '')) || !body.password) return send(response, 400, { message: 'Valid name, email, phone, and password are required.' });
      if (data.users.some(user => user.email === email)) return send(response, 409, { message: 'An account with this email already exists.' });
      const user = { id: `patient-${crypto.randomUUID()}`, name: String(body.name).trim(), email, phone: String(body.phone).trim(), role: 'PATIENT', passwordHash: hashPassword(String(body.password)) };
      data.users.push(user);
      writeData(data);
      return send(response, 201, { message: 'Your patient account has been created successfully. You can now sign in.' });
    }
    if (request.method === 'POST' && request.url === '/api/auth/login') {
      const body = await parseBody(request);
      const email = String(body.email || '').trim().toLowerCase();
      const user = data.users.find(candidate => candidate.email === email && candidate.role === body.role);
      if (!user || !verifyPassword(String(body.password || ''), user.passwordHash)) return send(response, 401, { message: 'Invalid email or password.' });
      const token = createSession(user.id, user.role);
      data.sessions[token] = { userId: user.id, expiresAt: Date.now() + 8 * 60 * 60 * 1000 };
      writeData(data);
      return send(response, 200, { user: publicUser(user) }, { 'Set-Cookie': `mp_session=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=28800` });
    }
    if (request.method === 'POST' && request.url === '/api/auth/logout') {
      const token = getCookie(request, 'mp_session');
      if (token) { delete data.sessions[token]; writeData(data); }
      return send(response, 200, { success: true }, { 'Set-Cookie': 'mp_session=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0' });
    }
    if (request.method === 'GET' && requestUrl.pathname === '/api/admin/health') {
      if (!requireAdmin(request)) return send(response, 403, { message: "You don't have permission to access this area." });
      return send(response, 200, { ok: true });
    }
    if (requestUrl.pathname === '/api/admin/messages' || requestUrl.pathname.startsWith('/api/admin/messages/')) {
      if (!requireAdmin(request)) return send(response, 403, { message: "You don't have permission to access this area." });
      const isCollection = requestUrl.pathname === '/api/admin/messages';
      const id = isCollection ? null : requestUrl.pathname.split('/').pop();
      const messages = readContactMessages();
      if (request.method === 'GET' && !id) return send(response, 200, { messages: messages.map(toClientMessage) });
      const index = messages.findIndex(message => message.id === id);
      if (index < 0) return send(response, 404, { message: 'Message not found.' });
      if (request.method === 'GET') return send(response, 200, { message: toClientMessage(messages[index]) });
      if (request.method === 'DELETE') {
        messages.splice(index, 1);
        writeContactMessages(messages);
        return send(response, 200, { success: true });
      }
      if (request.method === 'PATCH') {
        const body = await parseBody(request);
        if (!['NEW', 'READ', 'REPLIED', 'ARCHIVED'].includes(body.status)) return send(response, 400, { message: 'Invalid message status.' });
        messages[index] = { ...messages[index], status: body.status, updatedAt: new Date().toISOString() };
        writeContactMessages(messages);
        return send(response, 200, { message: toClientMessage(messages[index]) });
      }
    }
    return send(response, 404, { message: 'Not found' });
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    return send(response, error.status || 400, { message: error.status === 413 ? 'Request payload is too large.' : 'The request could not be processed.' });
  }
});

const data = readData();
if (!data.users.some(user => user.email === adminEmail.toLowerCase() && user.role === 'ADMIN')) {
  data.users.push({ id: 'admin-initial', name: 'Master\'s Physiotherapy Staff', email: adminEmail.toLowerCase(), phone: '', role: 'ADMIN', passwordHash: hashPassword(adminInitialPassword), mustChangePassword: true });
  writeData(data);
}

server.listen(port, () => console.log(`Auth server listening on http://localhost:${port}`));