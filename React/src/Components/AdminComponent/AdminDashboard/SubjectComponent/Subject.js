import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../SubjectComponent/Subject.module.css";

function Subject() {
    const [display, setDisplay] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [subject, setSubject] = useState({ subject_name: "" });
    const [status, setStatus] = useState(false);
    const [statusDelete, setStatusDelete] = useState(false);

    useEffect(() => {
        async function getAllSubject() {
            try {
                const response = await axios.get("http://localhost:3333/subject");
                setSubjects(response.data);
            } catch (error) {
                console.error("There was an error fetching the subjects!", error);
            }
        }
        getAllSubject();
    }, [status, statusDelete]);

    const handleAddSubject = () => setDisplay(true);
    const handleCloseAdd = () => setDisplay(false);

    const handleInput = (e) => {
        setSubject({ subject_name: e.target.value });
    };

    const handleAddNewSubject = async () => {
        try {
            await axios.post("http://localhost:3333/subject", subject);
            setStatus(true);
            setDisplay(false);
            setSubject({ subject_name: "" });
        } catch (error) {
            console.error("There was an error adding the subject!", error);
        }
    };

    const deleteSubject = async (id) => {
        try {
            await axios.delete(`http://localhost:3333/subject/${id}`);
            setStatusDelete(true);
        } catch (error) {
            console.error("There was an error deleting the subject!", error);
        }
    };

    return (
        <div className="container mt-5">
            {subjects.length === 0 ? (
                <div className="text-center">
                    <h1>No Subject Available</h1>
                </div>
            ) : (
                <div>
                    <div className="text-center mb-4">
                        <h1>Subject List</h1>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-striped text-center">
                            <thead className="thead-light">
                                <tr>
                                    <th>Subject Name</th>
                                    <th>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subjects.map((data, i) => (
                                    <tr key={i}>
                                        <td>{data.subject_name}</td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => deleteSubject(data.id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            <div className="text-center mt-3">
                <button className="btn btn-primary" onClick={handleAddSubject}>Add Subject</button>
            </div>
            {display && (
                <div className="my-4">
                    <div className="card w-50 m-auto">
                        <div className="card-body">
                            <h5 className="card-title text-success">Add New Subject</h5>
                            <div className="form-group ">
                                <label>Enter Subject</label>
                                <input
                                    className="form-control my-1"
                                    onChange={handleInput}
                                    type="text"
                                    placeholder="Enter Subject name"
                                    value={subject.subject_name}
                                />
                            </div>
                            <div className="mt-2">
                                <button className="btn btn-success" onClick={handleAddNewSubject}>Add</button>
                                <button className="btn btn-danger mx-2" onClick={handleCloseAdd}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Subject;
