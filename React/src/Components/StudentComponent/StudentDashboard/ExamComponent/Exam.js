import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { Container, Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
function Exam() {
    let { category } = useParams();
    const [allExam, setAllExam] = useState([]);

    useEffect(() => {
        async function getAllExams() {
            let value = await axios.get("http://localhost:3333/Exam");
            setAllExam(value.data);
        }
        getAllExams();
    }, []);

    return (
        <Container className="mt-4">
            <Box mb={3} textAlign="center">
                <Typography variant="h4">All {category} Exam</Typography>
            </Box>
            <Grid container spacing={3}>
                {allExam.map((data, i) => {
                    if (data.exam_name === category)
                        return (
                            <Grid item xs={12} md={6} key={i}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {data.exam_name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            <strong>Exam ID:</strong> {data.id}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            <strong>Description:</strong> {data.exam_desc}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            <strong>Pass Marks:</strong> {data.exam_passMarks}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            <strong>Total Marks:</strong> {data.exam_marks}
                                        </Typography>
                                        <Box mt={2} display="flex" justifyContent="center">
                                            <NavLink exact to={`/StudentDashboard/Exam/${category}/${data.id}`}>
                                                <Button variant="contained" color="primary">
                                                    Go to Exam
                                                </Button>
                                            </NavLink>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    return null;
                })}
            </Grid>
        </Container>
    );
}

export default Exam;
