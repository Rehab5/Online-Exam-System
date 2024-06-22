import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

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

export default function AdminLogin() {
    const [admin, setAdmin] = useState({
        admin_name: "",
        admin_password: ""
    });

    const history = useHistory();

    const handleInput = (e) => {
        setAdmin({
            ...admin,
            [e.target.name]: e.target.value
        });
    };

    const login = async (e) => {
        e.preventDefault();
        try {
            const value = await axios.get("http://localhost:3333/admin");
            let check = false;
            for (let i = 0; i < value.data.length; i++) {
                if (value.data[i].admin_name === admin.admin_name &&
                    value.data[i].admin_password === admin.admin_password) {
                    check = true;
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Login successful!'
                    });
                    sessionStorage.setItem("admin", admin.admin_name);
                    history.push("/AdminDashboard");
                    return; 
                }
            }
            if (!check) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Wrong Admin Email or Password'
                });
            }
        } catch (error) {
            console.error('Error logging in:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'There was an issue with the login process.'
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
                        border: '1px solid #ccc', 
                        borderRadius: '8px', 
                        padding: 3 
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Admin Login
                    </Typography>
                    <Box component="form" onSubmit={login} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="admin_name"
                            label="Admin Name"
                            name="admin_name"
                            autoComplete="admin_name"
                            autoFocus
                            onChange={handleInput}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="admin_password"
                            label="Password"
                            type="password"
                            id="admin_password"
                            autoComplete="current-password"
                            onChange={handleInput}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Login
                        </Button>
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
            </Container>
        </ThemeProvider>
    );
}
