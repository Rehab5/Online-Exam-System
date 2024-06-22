import { NavLink, Switch, Route, BrowserRouter, useHistory } from "react-router-dom";
import { useEffect } from "react";
import Subject from "./Subject/Subject";
import Result from "./ResultComponent/Result";
import Exam from "./ExamComponent/Exam";
import Test from "./TestComponent/Test";

function StudentDashboard() {


    useEffect(() => {
        if (sessionStorage.getItem("user") == null) {
            alert("Detect Illegal Way of Entering");
            history.push("/StudentLogin");
        }
    })


    let history = useHistory();

    function logout() {
        sessionStorage.clear();
        history.push("/StudentLogin");
    }

    return (
        <>
            <BrowserRouter>
            <div className="container-fluid p-0">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <div className="navbar-header">
                            <h3 className="navbar-brand">Online Exam System</h3>
                        </div>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <NavLink exact to="/StudentDashboard" className="nav-link">
                                        Subject
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink exact to="/StudentDashboard/Result" className="nav-link">
                                        My Result
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink onClick={logout} exact to="/StudentLogin" className="nav-link">
                                        Logout
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path="/StudentDashboard" component={Subject}></Route>
                        <Route exact path="/StudentDashboard/Result" component={Result}></Route>
                        <Route exact path="/StudentDashboard/Exam/:category" component={Exam}></Route>
                        <Route exact path="/StudentDashboard/Exam/:category/:id" component={Test}></Route>
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
        </>
    );
}

export default StudentDashboard;