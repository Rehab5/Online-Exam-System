import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Exam() {
  const [display, setDisplay] = useState(false);
  const [exams, setExams] = useState([]);
  const [exam, setExam] = useState({
    exam_name: "",
    exam_desc: "",
    exam_level: "",
    exam_passMarks: "",
    exam_totalQuestion: "",
    exam_marks: "",
    exam_date: getCurrentDateTime(),
  });

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const examResponse = await axios.get("http://localhost:3333/Exam");
        setExams(examResponse.data);

        const questionResponse = await axios.get("http://localhost:3333/Question");
        setQuestions(questionResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  function getCurrentDateTime() {
    const date = new Date();
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

  function handleInput(e) {
    setExam({
      ...exam,
      [e.target.name]: e.target.value,
    });
  }

  async function handleAddNewExam() {
    try {
      await axios.post("http://localhost:3333/Exam", exam);
      setStatus(true);
    } catch (error) {
      console.error("Error adding new exam:", error);
    }
  }

  async function deleteExam(id) {
    try {
      for (let i = 0; i < questions.length; i++) {
        if (parseInt(questions[i].exam_id) === parseInt(id)) {
          await axios.delete(`http://localhost:3333/Question/${questions[i].id}`);
        }
      }
      await axios.delete(`http://localhost:3333/Exam/${id}`);
      setStatusDeleteExam(true);
    } catch (error) {
      console.error("Error deleting exam:", error);
    }
  }

  const handleAddExam = () => {
    setDisplay(true);
  };

  const handleCloseExam = () => {
    setDisplay(false);
    clearExamInputs();
  };

  const clearExamInputs = () => {
    setExam({
      exam_name: "",
      exam_desc: "",
      exam_level: "",
      exam_passMarks: "",
      exam_totalQuestion: "",
      exam_marks: "",
      exam_date: getCurrentDateTime(),
    });
  };

  const [status, setStatus] = useState(false);
  const [statusDeleteExam, setStatusDeleteExam] = useState(false);

  if (status || statusDeleteExam) {
    return <Exam />;
  }

  return (
    <div class="container mt-4">
      <h1 class="text-center mb-4">Exam List</h1>

      <div class="table-responsive">
        <table class="table table-striped text-center">
          <thead>
            <tr>
              <th>Exam Name</th>
              <th>Exam Desc.</th>
              <th>Exam Creation Date</th>
              <th>Exam Level</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>

            {exams.map((data, i) => (
              <tr key={i}>
                <td>{data.exam_name}</td>
                <td>{data.exam_desc}</td>
                <td>{data.exam_date}</td>
                <td>{data.exam_level}</td>
                <td>
                  <NavLink exact to={`/AdminDashboard/Exam/Details/${data.id}`} class="btn btn-primary mx-2">
                    Details
                  </NavLink>

                  <NavLink exact to={`/AdminDashboard/Exam/ViewQuestion/${data.id}`} class="btn btn-info mx-2">
                    View Question
                  </NavLink>

                  <NavLink exact to={`/AdminDashboard/Exam/AddQuestion/${data.id}`} class="btn btn-success mx-2">
                    Add Question
                  </NavLink>

                  <button onClick={() => deleteExam(data.id)} class="btn btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div class="text-center my-4">
        <button onClick={handleAddExam} class="btn btn-primary">
          Add Exam
        </button>
      </div>

      <div class="w-50 m-auto my-4 bg-light p-4" style={{ display: display ? "block" : "none" }}>
        <label for="exam_name">Enter Exam Name</label>
        <input
          onChange={handleInput}
          name="exam_name"
          type="text"
          class="form-control my-2"
          placeholder="Enter Exam Name"
        />

        <label for="exam_desc">Enter Exam Description</label>
        <input
          onChange={handleInput}
          name="exam_desc"
          type="text"
          class="form-control my-2"
          placeholder="Enter Exam Description"
        />

        <label for="exam_level">Enter Exam Level</label>
        <input
          onChange={handleInput}
          name="exam_level"
          type="text"
          class="form-control my-2"
          placeholder="Enter Exam Level"
        />

        <label for="exam_totalQuestion">Enter Total Questions</label>
        <input
          onChange={handleInput}
          name="exam_totalQuestion"
          type="text"
          class="form-control my-2"
          placeholder="Enter Total Questions"
        />

        <label for="exam_marks">Enter Total Marks</label>
        <input
          onChange={handleInput}
          name="exam_marks"
          type="text"
          class="form-control my-2"
          placeholder="Enter Total Marks"
        />

        <label for="exam_passMarks">Enter Pass Marks</label>
        <input
          onChange={handleInput}
          name="exam_passMarks"
          type="text"
          class="form-control my-2"
          placeholder="Enter Pass Marks"
        />
        <div class="buttonBox">
          <button onClick={handleAddNewExam} class="btn btn-primary mx-2">
            Add
          </button>
          <button onClick={handleCloseExam} class="btn btn-danger">
            Close
          </button>
        </div>
      </div>
    </div>

  );
}

export default Exam;
