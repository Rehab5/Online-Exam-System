import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function getAllStudent() {
      let value = await axios.get("http://localhost:3333/user");
      setStudents(value.data);
    }
    getAllStudent();
  }, []);

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h1>Student List</h1>
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="thead-light">
            <tr>
              <th className="text-center">User Name</th>
              <th className="text-center">User Email</th>
              <th className="text-center">Options</th>
            </tr>
          </thead>
          <tbody>
            {students.map((data, i) => (
              <tr key={i}>
                <td className="text-center">{data.user_name}</td>
                <td className="text-center">{data.user_email}</td>
                <td className="text-center">
                  <NavLink exact to={`/AdminDashboard/StudentList/Details/${data.id}`}>
                    <button className="btn btn-primary">View Result</button>
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentList;
