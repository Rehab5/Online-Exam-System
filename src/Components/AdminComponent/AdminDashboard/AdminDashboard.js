import { useHistory, NavLink, BrowserRouter, Switch, Route } from "react-router-dom";
import pic4 from "../../../images/adm.jpg";
import Dashboard from "./Dashboard/Dashboard";
import Subject from "./SubjectComponent/Subject";
import Exam from "./ExamComponent/Exam";
import Question from "./QuestionComponent/Question";
import Result from "./ResultComponent/Result";
import StudentList from "./StudentList/StudentList";
import Student from "./StudentList/Student/Student";
import Details from "./ExamComponent/DetailComponent/Details";
import ViewQuestion from "./ExamComponent/ViewQuestion/ViewQuestion";
import AddQuestion from "./ExamComponent/AddQuestion/AddQuestion";
import './AdminDashboard.css';

function AdminDashboard() {
  let history = useHistory();

  function goToAdminLogin() {
    history.push("/AdminLogin");
  }

  return (
    <BrowserRouter>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-12  text-white py-3 head">
            <div className="d-flex justify-content-between align-items-center">
              <h3>Exam System</h3>
              <div>
                <NavLink exact to="/AdminDashboard" className="text-white mr-3 btn">
                  Dashboard
                </NavLink>
                <button className="btn text-white" onClick={goToAdminLogin}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-2  border-right side">
            <div className="text-center my-3">
              <img src={pic4} alt="Logo" className="img-fluid rounded-circle" width="100" height="100"/>
            </div>
            <nav className="nav flex-column  text-white mx-5 ">
              <NavLink exact to="/AdminDashboard/Subject" className="nav-link text-white menu">
                Subject
              </NavLink>
              <NavLink exact to="/AdminDashboard/Exam" className="nav-link text-white menu my-2">
                Exam
              </NavLink>
              <NavLink exact to="/AdminDashboard/Question" className="nav-link text-white menu my-2">
                Question
              </NavLink>
              <NavLink exact to="/AdminDashboard/Result" className="nav-link text-white menu my-2">
                Result
              </NavLink>
              <NavLink exact to="/AdminDashboard/StudentList" className="nav-link text-white menu">
                Student List
              </NavLink>
            </nav>
          </div>

          <div className="col-10">
            <Switch>
              <Route exact path="/AdminDashboard" component={Dashboard} />
              <Route exact path="/AdminDashboard/Subject" component={Subject} />
              <Route exact path="/AdminDashboard/Exam" component={Exam} />
              <Route exact path="/AdminDashboard/Question" component={Question} />
              <Route exact path="/AdminDashboard/Result" component={Result} />
              <Route exact path="/AdminDashboard/StudentList" component={StudentList} />

              <Route exact path="/AdminDashboard/Exam/Details/:id" component={Details} />
              <Route exact path="/AdminDashboard/Exam/ViewQuestion/:id" component={ViewQuestion} />
              <Route exact path="/AdminDashboard/Exam/AddQuestion/:id" component={AddQuestion} />
              <Route exact path="/AdminDashboard/StudentList/Details/:id" component={Student} />
            </Switch>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default AdminDashboard;
