import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [exam, setExam] = useState("Updating...");
  const [question, setQuestion] = useState("Updating...");
  const [user, setUser] = useState("Updating...");

  useEffect(() => {
    async function getAllExam() {
      try {
        let value = await axios.get("http://localhost:3333/Exam");
        setExam("We have total " + value.data.length + " exam");
      } catch (error) {
        console.error("Error fetching exams:", error);
        setExam("Failed to fetch exam data");
      }
    }

    async function getAllQuestions() {
      try {
        let value = await axios.get("http://localhost:3333/Question");
        setQuestion("We have total " + value.data.length + " question");
      } catch (error) {
        console.error("Error fetching questions:", error);
        setQuestion("Failed to fetch question data");
      }
    }

    async function getAllUsers() {
      try {
        let value = await axios.get("http://localhost:3333/user");
        setUser("We have total " + value.data.length + " user");
      } catch (error) {
        console.error("Error fetching users:", error);
        setUser("Failed to fetch user data");
      }
    }

    getAllExam();
    getAllQuestions();
    getAllUsers();
  }, []);

  let history = useHistory();

  function showExam() {
    history.push("/AdminDashboard/Exam");
  }

  function showQuestions() {
    history.push("/AdminDashboard/Question");
  }

  function showUsers() {
    history.push("/AdminDashboard/StudentList");
  }

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col text-center">
          <h1>Dashboard</h1>
        </div>
      </div>

      <div className="row mx-5">
        <div className="col-md-10 mb-3">
          <div className="card text-center" style={{ backgroundColor: "#e6e6ff", color: "black" }}>
            <div className="card-body d-flex justify-content-between align-items-center">
              <p className="card-text">{exam}</p>
              <button className="btn btn-primary" onClick={showExam}>View Details</button>
            </div>
          </div>
        </div>

        <div className="col-md-10 mb-3">
          <div className="card text-center" style={{ backgroundColor: "#cceeff", color: "black" }}>
            <div className="card-body d-flex justify-content-between align-items-center">
              <p className="card-text">{question}</p>
              <button className="btn btn-primary" onClick={showQuestions}>View Details</button>
            </div>
          </div>
        </div>

        <div className="col-md-10 mb-3">
          <div className="card text-center" style={{ backgroundColor: " #99d6ff", color: "black" }}>
            <div className="card-body d-flex justify-content-between align-items-center">
              <p className="card-text">{user}</p>
              <button className="btn btn-primary" onClick={showUsers}>View Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
