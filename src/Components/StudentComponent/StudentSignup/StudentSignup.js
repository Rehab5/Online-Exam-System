import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function StudentSignup() {
  const [userData, setUserData] = useState({
    user_name: '',
    user_email: '',
    user_password: ''
  });

  const [password, setPassword] = useState('');
  const history = useHistory();

  const onTextFieldChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!userData.user_name || !userData.user_email || !userData.user_password) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill out all required fields.'
      });
      return; // Exit function if fields are missing
    }

    if (userData.user_password !== password) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Passwords do not match.'
      });
      return; // Exit function if passwords don't match
    }

    try {
      await axios.post('http://localhost:3333/user', userData);
      Swal.fire({
        icon: 'success',
        title: 'Account Created',
        text: 'Your account has been created. Please login.'
      });
      history.push('/StudentLogin');
    } catch (error) {
      console.error('Error creating account:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an issue creating your account.'
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px solid #ccc', // Add border
            borderRadius: '8px', // Optional: Add rounded corners
            padding: 3 // Add padding
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Student Signup
          </Typography>
          <Box component="form" noValidate onSubmit={handleSignup} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="user_name"
                  required
                  fullWidth
                  id="user_name"
                  label="Name"
                  autoFocus
                  onChange={onTextFieldChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="user_email"
                  label="Email Address"
                  name="user_email"
                  autoComplete="email"
                  onChange={onTextFieldChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="user_password"
                  label="Password"
                  type="password"
                  id="user_password"
                  autoComplete="new-password"
                  onChange={onTextFieldChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  onChange={handlePassword}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/StudentLogin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
