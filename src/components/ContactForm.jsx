import React, { useState } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Snackbar,
  Fade,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// 🔗 ضع رابط Google Apps Script هنا
const API_URL = 'https://script.google.com/macros/s/AKfycbzn113Ai_-N08-E7z8dZkXwor5IDlHzypeBckMj5KKrjCVc_1nfA8SC7jxi2WHcz4C-/exec';

// 🎨 Styled Components
const StyledCard = styled(Card)(() => ({
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
  borderRadius: '16px',
  animation: 'fadeInScale 0.6s ease-in-out',
  '@keyframes fadeInScale': {
    from: { opacity: 0, transform: 'scale(0.95)' },
    to: { opacity: 1, transform: 'scale(1)' },
  },
}));

const StyledTextField = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
    '&.Mui-focused': {
      boxShadow: '0 4px 20px rgba(25,118,210,0.3)',
    },
  },
}));

const StyledButton = styled(Button)(() => ({
  padding: '12px',
  fontWeight: 600,
  borderRadius: '8px',
  textTransform: 'none',
}));

// ✅ Validation
const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePhone = (phone) =>
  /^[\d\s\-+()]+$/.test(phone) && phone.replace(/\D/g, '').length >= 8;

// 🚀 Component
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);

  // 🔄 Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // ✅ Validate
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Invalid phone';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 📤 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setSnackbarMessage('Please fix the errors');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);

    try {
      await fetch(API_URL, {
        method: 'POST',
        mode: 'no-cors', // مهم مع Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          message: formData.message.trim(),
        }),
      });

      // ✅ Success
      setSubmittedSuccessfully(true);
      setSnackbarMessage('Message sent successfully ✅');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);

      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });

      setErrors({});

      setTimeout(() => {
        setSubmittedSuccessfully(false);
      }, 4000);

    } catch (error) {
      console.error(error);
      setSnackbarMessage('Error sending message ❌');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }

    setLoading(false);
  };

  // 🔔 Snackbar Close
  const handleCloseSnackbar = (_, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  return (
    <Fade in timeout={800}>
      <StyledCard>
        <CardContent sx={{ p: 4 }}>

          <Typography variant="h4" textAlign="center" mb={1}>
            Contact Us
          </Typography>

          <Typography textAlign="center" mb={3} color="text.secondary">
            Send us a message
          </Typography>

          {submittedSuccessfully && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Message received successfully!
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>

            <StyledTextField
              fullWidth label="Name" name="name"
              value={formData.name} onChange={handleChange}
              error={!!errors.name} helperText={errors.name}
              margin="normal"
            />

            <StyledTextField
              fullWidth label="Email" name="email"
              value={formData.email} onChange={handleChange}
              error={!!errors.email} helperText={errors.email}
              margin="normal"
            />

            <StyledTextField
              fullWidth label="Phone" name="phone"
              value={formData.phone} onChange={handleChange}
              error={!!errors.phone} helperText={errors.phone}
              margin="normal"
            />

            <StyledTextField
              fullWidth multiline rows={4}
              label="Message" name="message"
              value={formData.message} onChange={handleChange}
              margin="normal"
            />

            <StyledButton
              fullWidth type="submit" variant="contained"
              disabled={loading} sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={20} /> : 'Send'}
            </StyledButton>

          </Box>

          <Typography textAlign="center" mt={2} fontSize={12}>
            Your data is محفوظ وآمن 👍
          </Typography>

        </CardContent>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
        >
          <Alert severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>

      </StyledCard>
    </Fade>
  );
}

export default ContactForm;