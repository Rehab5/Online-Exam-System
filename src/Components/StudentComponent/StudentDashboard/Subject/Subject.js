import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
function Subject() {
    const [allSubject, setAllSubject] = useState([]);

    useEffect(() => {
        async function getAllSubject() {
            let value = await axios.get("http://localhost:3333/subject");
            setAllSubject(value.data);
        }
        getAllSubject();
    }, []);

    return (
        <Container className="mt-4">
            <Box mb={3} textAlign="center">
                <Typography variant="h4">Choose Subjects</Typography>
            </Box>
            <Grid container spacing={3}>
                {
                    allSubject.map((data, i) => (
                        <Grid item xs={12} md={4} key={i}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="div" align="center">
                                        {data.subject_name}
                                    </Typography>
                                    <Box mt={2} display="flex" justifyContent="center">
                                        <NavLink exact to={`/StudentDashboard/Exam/${data.subject_name}`}>
                                            <Button variant="contained" color="primary">
                                                Go to Exam
                                            </Button>
                                        </NavLink>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
        </Container>
    );
}

export default Subject;
