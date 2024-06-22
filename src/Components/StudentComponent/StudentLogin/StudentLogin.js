import React, { useState } from 'react';
import {NavLink, useHistory } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
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

export default function StudentLogin() {
  const [user, setUser] = useState({
    user_email: '',
    user_password: ''
  });

  const history = useHistory();

  const onTextFieldChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Validate if email and password are not empty
    if (!user.user_email || !user.user_password) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please enter both email and password'
      });
      return;
    }

    try {
      const response = await axios.get('http://localhost:3333/user');
      const users = response.data;

      const userExists = users.some(
        (u) => u.user_email === user.user_email && u.user_password === user.user_password
      );

      if (userExists) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Login successful!'
        });
        sessionStorage.setItem('user', user.user_email);
        history.push('/StudentDashboard');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Wrong User Email or password'
        });
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Grid
            item
            xs={12}
            sm={8}
            md={6}
            component={Paper}
            elevation={6}
            square
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 2,
              height: '80vh', // Reduced height to make it more compact
            }}
          >
            <Grid
              item
              xs={false}
              sm={4}
              md={5}
              sx={{
                backgroundImage: 'url(https://www.pngall.com/wp-content/uploads/8/Child-Student-PNG-Free-Image.png)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                  t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100%', // Ensure the image occupies the full height
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={7}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  my: 2,
                  mx: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Student Login
                </Typography>
                <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1,ml:2, width: '100%' }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="user_email"
                    autoComplete="email"
                    autoFocus
                    onChange={onTextFieldChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="user_password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={onTextFieldChange}
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Login
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="/StudentSignup" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>

                    </Grid>
                  </Grid>
                  <Grid container justifyContent="center">
                            <Grid item>
                                <Link component={NavLink} to="/" variant="body2">
                                    Go Back
                                </Link>
                            </Grid>
                        </Grid>
                  <Copyright sx={{ mt: 5 }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
