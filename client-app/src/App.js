import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Register from './components/Register';
import TodoBox from './components/TodoBox';
import { BrowserRouter as Router, Routes, Route, Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import Logout from './components/Logout';
import { haveToken } from './util';

export default function App() {

  return (
    <div className='container'>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="todos" element={<TodoBox />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

function Layout() {
  const [user, setUser] = useState({})
  let navigate = useNavigate();

  useEffect(() => {
    haveToken(navigate, async function (response) {
      setUser(response)
    })
  }, [navigate])

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">TodoApp</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/todos">Todos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true" href='/disabled'>{user.email}</a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <Logout user={user} />
            </form>
          </div>
        </div>
      </nav>

      <Outlet />
    </div >
  );
}

function Home() {
  return (
    <div>
      <h2>Welcome to the Todo App</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}