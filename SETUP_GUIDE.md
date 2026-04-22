# QUICK START GUIDE - Contact Form with Google Sheets

## What's Included

Your React project is ready with all components configured. Here's what you have:

### Project Files:
- package.json - Dependencies (React, MUI, etc.)
- src/App.jsx - Main application wrapper with theme
- src/components/ContactForm.jsx - Complete contact form component
- public/index.html - HTML entry point
- src/index.js - React root render
- GOOGLE_APPS_SCRIPT.js - Backend script template
- README.md - Full documentation

## Step 1: Install Dependencies

Open terminal in the excelform folder and run:

\\\ash
npm install
\\\

This installs:
- react & react-dom
- react-scripts (build tools)
- @mui/material (UI components)
- @emotion/react & @emotion/styled (styling engine)

## Step 2: Set Up Google Apps Script

1. Go to https://script.google.com
2. Create a new project
3. Copy the code from GOOGLE_APPS_SCRIPT.js
4. Paste it into your Apps Script project
5. Deploy as Web App:
   - Click Deploy → New Deployment
   - Type: Web app
   - Execute as: Your account
   - Who has access: Anyone
   - Copy the deployment URL (looks like: https://script.google.com/macros/s/ABC123.../usercod)

## Step 3: Connect the API URL

Open src/components/ContactForm.jsx and find this line (around line 12):

\\\javascript
const API_URL = 'https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercod';
\\\

Replace YOUR_SCRIPT_ID with the ID from your deployment URL.

## Step 4: Create Google Sheet

1. Create a new Google Sheet
2. Add these headers in the first row:
   - A1: Timestamp
   - B1: Name
   - C1: Email
   - D1: Phone
   - E1: Message
3. Keep the sheet open or give the Apps Script access to it

## Step 5: Run The App

In terminal, run:

\\\ash
npm start
\\\

The app will open at http://localhost:3000

## Form Features

✅ Real-time validation
✅ Email format validation
✅ Phone number validation (min 10 digits)
✅ Loading state on submit
✅ Success/error notifications
✅ Form auto-reset after submission
✅ Responsive design
✅ Smooth animations
✅ Professional styling

## Testing

To test the form:
1. Fill in all required fields
2. Click "Send Message"
3. You should see a success message
4. Check your Google Sheet - new data should appear

## Troubleshooting

### Form won't submit?
- Check the API_URL is correct in ContactForm.jsx
- Make sure the Google Apps Script is deployed properly
- Check browser console for error messages (F12)

### Data not appearing in sheet?
- Ensure the Google Sheet is accessible to the Apps Script
- Check the sheet headers match the script column order
- Try the testPost() function in Apps Script to debug

### CORS errors?
- Google Apps Script handles CORS automatically when deployed as web app
- Make sure "Anyone" has access to the deployment

## Production Build

To build for production:

\\\ash
npm run build
\\\

This creates an optimized build in the build/ folder ready for deployment.

## Next Steps

1. Customize colors by editing the theme in src/App.jsx
2. Add more fields by editing src/components/ContactForm.jsx
3. Modify validation rules in the ContactForm component
4. Deploy to Netlify, Vercel, or your preferred host

## Support

Refer to:
- README.md for full documentation
- ContactForm.jsx for component code
- GOOGLE_APPS_SCRIPT.js for backend code
