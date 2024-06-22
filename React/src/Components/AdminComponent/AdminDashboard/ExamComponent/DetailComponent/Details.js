import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Details() {
  const { id } = useParams();

  const [exam, setExam] = useState({
    exam_name: "",
    exam_desc: "",
    exam_level: "",
    exam_passMarks: "",
    exam_totalQuestion: "",
    exam_marks: "",
    exam_date: ""
  });

  useEffect(() => {
    async function getExamDetails() {
      try {
        const value = await axios.get(`http://localhost:3333/Exam/${id}`);
        setExam(value.data);
      } catch (error) {
        console.error("Error fetching exam details:", error);
      }
    }
    getExamDetails();
  }, [id]);

  let history = useHistory();

  function handleGoBack() {
    history.push("/AdminDashboard/Exam");
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="text-center mb-4">
            <h2>Exam Details</h2>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 offset-md-3">
          <table className="table table-striped">
            <tbody>
              <tr>
                <th scope="row">Exam Name</th>
                <td>{exam.exam_name}</td>
              </tr>
              <tr>
                <th scope="row">Exam Description</th>
                <td>{exam.exam_desc}</td>
              </tr>
              <tr>
                <th scope="row">Exam Creation Date</th>
                <td>{exam.exam_date}</td>
              </tr>
              <tr>
                <th scope="row">Exam Total Marks</th>
                <td>{exam.exam_marks}</td>
              </tr>
              <tr>
                <th scope="row">Exam Total Questions</th>
                <td>{exam.exam_totalQuestion}</td>
              </tr>
              <tr>
                <th scope="row">Exam Pass Marks</th>
                <td>{exam.exam_passMarks}</td>
              </tr>
              <tr>
                <th scope="row">Exam Level</th>
                <td>{exam.exam_level}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-12 text-center">
          <button onClick={handleGoBack} className="btn btn-primary">Go Back</button>
        </div>
      </div>
    </div>
  );
}

export default Details;
