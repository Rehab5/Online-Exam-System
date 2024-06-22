import axios from "axios";
import React, { useState, useEffect } from "react";

function Result() {
    const [results, setResults] = useState([]);
    const [exams, setExams] = useState([]);

    useEffect(() => {
        async function getAllResults() {
            let value = await axios.get("http://localhost:3333/Result");
            setResults(value.data);
        }

        async function getAllExams() {
            let value = await axios.get("http://localhost:3333/Exam");
            setExams(value.data);
        }

        getAllResults();
        getAllExams();
    }, []);

    return (
        <div className="container mt-4">
            <div className="row">
                <h2 className="text-center">Student Exam List</h2>
            </div>

            <table className="table table-striped table-hover mt-3">
                <thead>
                    <tr>
                        <th className="text-center">User Email</th>
                        <th className="text-center">Exam Name</th>
                        <th className="text-center">Exam Date</th>
                        <th className="text-center">Result Status</th>
                        <th className="text-center">Your Score</th>
                        <th className="text-center">Total Marks</th>
                        <th className="text-center">Total Questions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        results.map((data, i) => {
                            const examData = exams.find(exam => exam.exam_name === data.exam_name);

                            if (data.user_email === sessionStorage.getItem("user") && examData) {
                                return (
                                    <tr key={i}>
                                        <td className="text-center">{data.user_email}</td>
                                        <td className="text-center">{data.exam_name}</td>
                                        <td className="text-center">{data.exam_date}</td>
                                        <td className="text-center">{data.result_status}</td>
                                        <td className="text-center">{data.result_score}</td>
                                        <td className="text-center">{examData.exam_marks}</td>
                                        <td className="text-center">{examData.exam_totalQuestion}</td>
                                    </tr>
                                );
                            }

                            return <React.Fragment key={i}></React.Fragment>
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Result;
