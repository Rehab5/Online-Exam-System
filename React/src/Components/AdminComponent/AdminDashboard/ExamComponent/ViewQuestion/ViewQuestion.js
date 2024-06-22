import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function ViewQuestion() {
  const [display, setDisplay] = useState("none");
  const [questions, setQuestions] = useState([]);
  const [updatedQ, setUpdatedQ] = useState({
    question_name: "",
    option_one: "",
    option_two: "",
    option_three: "",
    option_four: "",
    question_answer: "",
    exam_id: "",
    subject_name: ""
  });
  const [qId, setQId] = useState(null);
  const [check, setCheck] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function getAllQuestions() {
      try {
        const response = await axios.get("http://localhost:3333/Question");
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }
    getAllQuestions();
  }, []);

  const handleEditQuestion = (questionId) => {
    setDisplay("block");
    setDataInInputField(questionId);
  };

  const handleClose = () => {
    setDisplay("none");
    clearUpdatedQuestion();
  };

  const onTextFieldChange = (e) => {
    setUpdatedQ({
      ...updatedQ,
      [e.target.name]: e.target.value
    });
  };

  const setDataInInputField = (questionId) => {
    setQId(questionId);
    const question = questions.find(q => q.id === questionId);
    if (question) {
      setUpdatedQ({
        question_name: question.question_name,
        option_one: question.option_one,
        option_two: question.option_two,
        option_three: question.option_three,
        option_four: question.option_four,
        question_answer: question.question_answer,
        exam_id: question.exam_id,
        subject_name: question.subject_name
      });
    }
  };

  const clearUpdatedQuestion = () => {
    setUpdatedQ({
      question_name: "",
      option_one: "",
      option_two: "",
      option_three: "",
      option_four: "",
      question_answer: "",
      exam_id: "",
      subject_name: ""
    });
    setQId(null);
  };

  const updateQuestion = async () => {
    try {
      await axios.put(`http://localhost:3333/Question/${qId}`, updatedQ);
      setCheck(true);
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  const deleteQuestion = async (questionId) => {
    try {
      await axios.delete(`http://localhost:3333/Question/${questionId}`);
      setDeleteSuccess(true);
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleGoBack = () => {
    history.push("/AdminDashboard/Exam");
  };

  useEffect(() => {
    if (check || deleteSuccess) {
      async function reloadQuestions() {
        try {
          const response = await axios.get("http://localhost:3333/Question");
          setQuestions(response.data);
          setCheck(false);
          setDeleteSuccess(false);
        } catch (error) {
          console.error("Error reloading questions:", error);
        }
      }
      reloadQuestions();
    }
  }, [check, deleteSuccess]);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Question List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Question Name</th>
            <th>Option One</th>
            <th>Option Two</th>
            <th>Option Three</th>
            <th>Option Four</th>
            <th>Question Answer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((data, i) => {
            if (parseInt(data.exam_id) === parseInt(id)) {
              return (
                <tr key={i}>
                  <td>{data.question_name}</td>
                  <td>{data.option_one}</td>
                  <td>{data.option_two}</td>
                  <td>{data.option_three}</td>
                  <td>{data.option_four}</td>
                  <td>{data.question_answer}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => handleEditQuestion(data.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteQuestion(data.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>

      <div className="row">
        <div className="col text-center">
          <button className="btn btn-secondary" onClick={handleGoBack}>
            Go Back
          </button>
        </div>
      </div>

      <div className="row w-50 my-3 mx-auto ">
        <div className="col">
          <div className="p-4 border bg-light" style={{ display: display }}>
            <label>Enter Question</label>
            <input
              className="form-control mb-3"
              value={updatedQ.question_name}
              onChange={onTextFieldChange}
              name="question_name"
              type="text"
              placeholder="Enter Question"
            />

            <label>Enter Option A</label>
            <input
              className="form-control mb-3"
              value={updatedQ.option_one}
              onChange={onTextFieldChange}
              name="option_one"
              type="text"
              placeholder="Enter Option A"
            />

            <label>Enter Option B</label>
            <input
              className="form-control mb-3"
              value={updatedQ.option_two}
              onChange={onTextFieldChange}
              name="option_two"
              type="text"
              placeholder="Enter Option B"
            />

            <label>Enter Option C</label>
            <input
              className="form-control mb-3"
              value={updatedQ.option_three}
              onChange={onTextFieldChange}
              name="option_three"
              type="text"
              placeholder="Enter Option C"
            />

            <label>Enter Option D</label>
            <input
              className="form-control mb-3"
              value={updatedQ.option_four}
              onChange={onTextFieldChange}
              name="option_four"
              type="text"
              placeholder="Enter Option D"
            />

            <label>Enter Question Answer</label>
            <input
              className="form-control mb-3"
              value={updatedQ.question_answer}
              onChange={onTextFieldChange}
              name="question_answer"
              type="text"
              placeholder="Enter Answer"
            />

            <label>Enter Subject</label>
            <input
              className="form-control mb-3"
              value={updatedQ.subject_name}
              onChange={onTextFieldChange}
              name="subject_name"
              type="text"
              placeholder="Enter Subject"
            />

            <div className="d-grid gap-2">
              <button className="btn btn-primary me-2" onClick={updateQuestion}>
                Update Question
              </button>
              <button className="btn btn-secondary" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewQuestion;
