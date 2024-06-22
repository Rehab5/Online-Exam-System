import { useParams, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Student() {
  const { id } = useParams();
  const [email, setEmail] = useState();
  const [result, setResult] = useState([]);

  useEffect(() => {
    async function getStudentEmail() {
      let value = await axios.get(`http://localhost:3333/user/${id}`);
      setEmail(value.data.user_email);
    }
    getStudentEmail();
  }, [id]);

  useEffect(() => {
    async function getAllResult() {
      let value = await axios.get("http://localhost:3333/Result");
      setResult(value.data);
    }
    getAllResult();
  }, []);

  const history = useHistory();

  function handleGoBack() {
    history.push("/AdminDashboard/StudentList");
  }

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h1>Student Exam List</h1>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th className="text-center">User Email</th>
              <th className="text-center">Exam Name</th>
              <th className="text-center">Exam Date</th>
              <th className="text-center">Result Status</th>
              <th className="text-center">Total Marks</th>
              <th className="text-center">Result Score</th>
            </tr>
          </thead>
          <tbody>
            {result.map((data, i) => {
              if (data.user_email === email)
                return (
                  <tr key={i}>
                    <td className="text-center">{data.user_email}</td>
                    <td className="text-center">{data.exam_name}</td>
                    <td className="text-center">{data.exam_date}</td>
                    <td className="text-center">{data.result_status}</td>
                    <td className="text-center">{data.total_marks}</td>
                    <td className="text-center">{data.result_score}</td>
                  </tr>
                );

              return <React.Fragment key={i}></React.Fragment>;
            })}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={handleGoBack}>Go Back</button>
      </div>
    </div>
  );
}

export default Student;
