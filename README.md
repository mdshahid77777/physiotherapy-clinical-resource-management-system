# Physiotherapy Clinical Resource Management System

A modern web-based physiotherapy platform designed to provide patients with access to physiotherapy services, appointment booking, clinical information, online consultations, patient resources, and a patient portal.

## Overview

**Physiotherapy Clinical Resource Management System** is a React + TypeScript web application for a physiotherapy clinic. It provides a structured digital experience for both patients and clinic staff.

The platform includes:

* Physiotherapy service information
* Condition and treatment information
* Online appointment booking
* Patient intake
* Patient authentication and portal
* Online/video consultation interface
* Exercise resources
* FAQs
* Testimonials
* Contact and clinic information
* Administrative dashboard
* Emergency information
* WhatsApp contact integration
* Responsive mobile and desktop interface

## Main Features

### 🏥 Physiotherapy Services

The website provides information about the physiotherapy services offered by the clinic, helping patients understand available treatment options.

### 📅 Appointment Booking

Patients can navigate through the appointment-booking workflow and provide the information required for their consultation.

### 📝 Patient Intake

The application includes a patient intake workflow for collecting relevant information before treatment or consultation.

### 👤 Patient Portal

Authenticated patients can access their patient-facing portal and relevant clinical resources.

### 🔐 Authentication

The application includes role-based authentication concepts for:

* **ADMIN**
* **PATIENT**

Authentication-related local data is intentionally excluded from the Git repository for security.

### 💻 Online Consultation

The website contains an online consultation interface designed to support remote physiotherapy consultations.

### 🦵 Conditions & Exercises

The platform contains structured information relating to:

* Physiotherapy conditions
* Exercises
* Services
* Frequently asked questions

### 📞 Contact & Communication

The application provides contact functionality and a floating WhatsApp communication option for convenient patient interaction.

### 📱 Responsive Design

The interface is designed for:

* Desktop
* Laptop
* Tablet
* Mobile devices

## Technology Stack

| Technology   | Purpose                                     |
| ------------ | ------------------------------------------- |
| React        | Frontend UI                                 |
| TypeScript   | Type-safe development                       |
| Vite         | Development and build tooling               |
| Tailwind CSS | Styling                                     |
| PostCSS      | CSS processing                              |
| Node.js      | Supporting application/server functionality |
| npm          | Package management                          |

## Project Structure

```text
Physiotherapy Clinical Resource Management System/
│
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── server.mjs
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
│
└── src/
    ├── App.tsx
    ├── index.css
    ├── main.tsx
    │
    ├── components/
    │   ├── admin/
    │   ├── booking/
    │   ├── common/
    │   ├── consultation/
    │   ├── intake/
    │   └── portal/
    │
    ├── context/
    │   └── AppContext.tsx
    │
    ├── data/
    │   ├── conditions.ts
    │   ├── config.ts
    │   ├── exercises.ts
    │   ├── faqs.ts
    │   ├── services.ts
    │   └── testimonials.ts
    │
    ├── pages/
    │   ├── AboutPage.tsx
    │   ├── AuthPage.tsx
    │   ├── BookAppointmentPage.tsx
    │   ├── ConditionsPage.tsx
    │   ├── ContactPage.tsx
    │   ├── FAQPage.tsx
    │   ├── HomePage.tsx
    │   ├── LegalPages.tsx
    │   ├── OnlineConsultationPage.tsx
    │   ├── ServicesPage.tsx
    │   └── TestimonialsPage.tsx
    │
    └── types/
        └── index.ts
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/mdshahid77777/physiotherapy-clinical-resource-management-system.git
```

### 2. Enter the project directory

```bash
cd physiotherapy-clinical-resource-management-system
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Then open the local URL provided by Vite in your browser.

## Production Build

To create a production build:

```bash
npm run build
```

The generated build output is placed in the `dist/` directory.

## Environment Configuration

Use `.env.example` as the reference for environment configuration.

Create a local `.env` file when environment variables are required:

```text
.env
```

Environment files containing secrets should **not** be committed to Git.

## Security

Authentication data is deliberately excluded from version control.

The following local file is ignored:

```text
data/auth-data.json
```

This prevents stored password hashes and session information from being published to the Git repository.

Generated files such as the following are also excluded:

```text
dist/
desktop.ini
tsconfig.tsbuildinfo
```

## Git Workflow

After making changes:

```bash
git add .
git commit -m "Update physiotherapy clinical resource management system"
git push
```

The repository's main branch is:

```text
main
```

## Repository

[GitHub Repository](https://github.com/mdshahid77777/physiotherapy-clinical-resource-management-system?utm_source=chatgpt.com)

## Project Title

**Physiotherapy Clinical Resource Management System**

---

> A digital physiotherapy platform connecting patients with clinical services, appointment workflows, educational resources, and online consultation capabilities.
