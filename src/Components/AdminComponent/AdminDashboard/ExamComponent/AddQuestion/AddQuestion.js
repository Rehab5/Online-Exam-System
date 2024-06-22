import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function AddQuestion() {
  const { id } = useParams();

  const [question, setQuestion] = useState({
    question_name: "",
    option_one: "",
    option_two: "",
    option_three: "",
    option_four: "",
    question_answer: "",
    exam_id: id,
    subject_name: ""
  });

  const onInputChange = (e) => {
    setQuestion({
      ...question,
      [e.target.name]: e.target.value
    });
  };

  let history = useHistory();

  const handleGoBack = () => {
    history.push(`/AdminDashboard/Exam`);
  };

  const addNewQuestion = async () => {
    await axios.post("http://localhost:3333/Question", question);
    history.push(`/AdminDashboard/Exam/ViewQuestion/${id}`);
  };

  return (
    <div className="container">
      <div className="row justify-content-center my-4">
        <div className="col-md-6">
          <div className="p-4 border bg-light">
            <h2 className="mb-4 text-center">Adding Question</h2>
            <div className="mb-3">
              <label className="form-label">Question Name</label>
              <input
                className="form-control"
                onChange={onInputChange}
                name="question_name"
                type="text"
                placeholder="Enter Question"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Enter Option A</label>
              <input
                className="form-control"
                onChange={onInputChange}
                name="option_one"
                type="text"
                placeholder="Enter Option A"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Enter Option B</label>
              <input
                className="form-control"
                onChange={onInputChange}
                name="option_two"
                type="text"
                placeholder="Enter Option B"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Enter Option C</label>
              <input
                className="form-control"
                onChange={onInputChange}
                name="option_three"
                type="text"
                placeholder="Enter Option C"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Enter Option D</label>
              <input
                className="form-control"
                onChange={onInputChange}
                name="option_four"
                type="text"
                placeholder="Enter Option D"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Enter Question Answer</label>
              <input
                className="form-control"
                onChange={onInputChange}
                name="question_answer"
                type="text"
                placeholder="Enter Question answer (don't write option A,B,C,D)"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Enter Subject</label>
              <input
                className="form-control"
                onChange={onInputChange}
                name="subject_name"
                type="text"
                placeholder="Enter Subject"
              />
            </div>

            <div className="d-grid gap-2">
              <button className="btn btn-primary" onClick={addNewQuestion}>
                Add
              </button>
              <button className="btn btn-secondary" onClick={handleGoBack}>
                Go back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddQuestion;
