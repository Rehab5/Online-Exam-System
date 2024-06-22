import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Question() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function getAllQuestions() {
      try {
        const response = await axios.get('http://localhost:3333/Question');
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    }
    getAllQuestions();
  }, []);

  return (
    <div className="container my-5 text-center">
      <div className="row">
        <div className="col-12 text-center">
          <h1 className="mb-4">Question List</h1>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <table className="table table-striped table-bordered text-center table-hover">
            <thead>
              <tr>
                <th>Option one</th>
                <th>Question Name</th>
                <th>Option two</th>
                <th>Option three</th>
                <th>Option Four</th>
                <th>Question Answer</th>
                <th>Subject Name</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((data, i) => (
                <tr key={i}>
                  <td>{data.question_name}</td>
                  <td>{data.option_one}</td>
                  <td>{data.option_two}</td>
                  <td>{data.option_three}</td>
                  <td>{data.option_four}</td>
                  <td>{data.question_answer}</td>
                  <td>{data.subject_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Question;