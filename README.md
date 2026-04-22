# Contact Form with Google Sheets Integration

A modern, responsive React contact form with Material UI styling that integrates with Google Sheets via Google Apps Script.

## Features

✅ Responsive Design - Mobile and desktop friendly
✅ Form Validation - Real-time error messages
✅ Email Validation - Built-in email format validation
✅ Phone Validation - Validates phone numbers
✅ Loading States - Shows loading indicator while submitting
✅ Success/Error Messages - Snackbar notifications
✅ Animations - Fade-in and hover effects
✅ Accessible - Proper form semantics and ARIA labels
✅ Clean Code - Reusable components and utilities

## Form Fields

- Name (required)
- Email (required, valid format required)
- Phone (required, minimum 10 digits)
- Message (optional)

## Installation

1. Navigate to the project directory:
\\\ash
cd excelform
\\\

2. Install dependencies:
\\\ash
npm install
\\\

3. Start the development server:
\\\ash
npm start
\\\

The app will open at \http://localhost:3000\

## Configuration

### Step 1: Create Google Apps Script

1. Go to Google Apps Script (https://script.google.com)
2. Create a new project
3. Replace the code with the Google Apps Script provided below
4. Deploy as a web app and copy the deployment URL

### Step 2: Update API_URL

In \src/components/ContactForm.jsx\, update:

\\\javascript
const API_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/usercod';
\\\

Replace YOUR_SCRIPT_ID with your actual script ID.

### Step 3: Set Up Google Sheet

1. Create a new Google Sheet
2. Add headers: Timestamp, Name, Email, Phone, Message
3. Ensure the Apps Script has access to it

## Project Structure

\\\
excelform/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── ContactForm.jsx
│   ├── App.jsx
│   └── index.js
├── package.json
├── .gitignore
└── README.md
\\\

## Build for Production

\\\ash
npm run build
\\\

## Technologies

- React 18
- Material UI (MUI)
- Fetch API
- CSS-in-JS (Styled Components)
- React Hooks

## Validation

- Name: Required, non-empty
- Email: Required, valid email format
- Phone: Required, minimum 10 digits
- Message: Optional
