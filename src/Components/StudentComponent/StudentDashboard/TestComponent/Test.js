import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

function Test() {
    const { id, category } = useParams();
    const [allQuestions, setAllQuestions] = useState([]);
    const [answer, setAnswer] = useState({});
    const history = useHistory();

    useEffect(() => {
        async function getAllQuestions() {
            let value = await axios.get("http://localhost:3333/Question");
            setAllQuestions(value.data);
        }
        getAllQuestions();
    }, []);

    const onRadioButtonChange = (e) => {
        setAnswer({
            ...answer,
            [e.target.name]: e.target.value
        });
    };

    const submitTest = async () => {
        const correctAnswer = allQuestions.filter(q => parseInt(q.exam_id) === parseInt(id)).map(q => q.question_answer);
        const score = correctAnswer.reduce((acc, ans, index) => acc + (ans === answer[`answer${index + 1}`] ? 1 : 0), 0);
        const status = score >= 3 ? "Pass" : "Fail";

        const date = new Date();
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

        const data = {
            result_status: status,
            result_score: score,
            user_email: sessionStorage.getItem("user"),
            exam_date: formattedDate,
            exam_name: category,
            total_marks: "5",
            exam_id: id,
            total_Question: "5"
        };

        await axios.post("http://localhost:3333/Result", data);
        Swal.fire({
            title: 'Test Submitted!',
            text: `You have ${status}ed the exam with a score of ${score}.`,
            icon: status === "Pass" ? 'success' : 'error',
            confirmButtonText: 'OK'
        }).then(() => {
            history.push("/StudentDashboard/Result");
        });
    };

    return (
        <div className="container mt-4">
            <div className="row mb-3">
                <div className="col text-center">
                    <h1>Answer all the questions</h1>
                </div>
            </div>
            {allQuestions.filter(q => parseInt(q.exam_id) === parseInt(id)).map((data, i) => (
                <div className="card mb-3" key={i}>
                    <div className="card-body">
                        <h5 className="card-title">{data.question_name}</h5>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name={`answer${i + 1}`} id={`option1-${i}`} value={data.option_one} onChange={onRadioButtonChange} />
                            <label className="form-check-label" htmlFor={`option1-${i}`}>{data.option_one}</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name={`answer${i + 1}`} id={`option2-${i}`} value={data.option_two} onChange={onRadioButtonChange} />
                            <label className="form-check-label" htmlFor={`option2-${i}`}>{data.option_two}</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name={`answer${i + 1}`} id={`option3-${i}`} value={data.option_three} onChange={onRadioButtonChange} />
                            <label className="form-check-label" htmlFor={`option3-${i}`}>{data.option_three}</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name={`answer${i + 1}`} id={`option4-${i}`} value={data.option_four} onChange={onRadioButtonChange} />
                            <label className="form-check-label" htmlFor={`option4-${i}`}>{data.option_four}</label>
                        </div>
                    </div>
                </div>
            ))}
            <div className="text-center">
                <button className="btn btn-primary" onClick={submitTest}>Submit Exam</button>
            </div>
        </div>
    );
}

export default Test;
