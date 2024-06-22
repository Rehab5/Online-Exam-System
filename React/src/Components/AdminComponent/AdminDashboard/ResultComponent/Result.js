import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Result() {
  const [results, setResults] = useState([]);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    async function getAllResults() {
      let resultsResponse = await axios.get("http://localhost:3333/Result");
      setResults(resultsResponse.data);
    }

    async function getAllExams() {
      let examsResponse = await axios.get("http://localhost:3333/Exam");
      setExams(examsResponse.data);
    }

    getAllResults();
    getAllExams();
  }, []);

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h1>Exam List</h1>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
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
            {results.map((result, i) => {
              const exam = exams.find(exam => exam.exam_name === result.exam_name);

              return (
                <tr key={i}>
                  <td className="text-center">{result.user_email}</td>
                  <td className="text-center">{result.exam_name}</td>
                  <td className="text-center">{result.exam_date}</td>
                  <td className="text-center">{result.result_status}</td>
                  <td className="text-center">{result.result_score}</td>
                  <td className="text-center">{exam ? exam.exam_marks : 'N/A'}</td>
                  <td className="text-center">{exam ? exam.exam_totalQuestion : 'N/A'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Result;
