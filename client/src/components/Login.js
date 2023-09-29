import { useState } from "react"
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";

export default function Login() {

    let navigate = useNavigate();

    const [user, setUser] = useState({ email: '', password: '' })
    const [error, setError] = useState('')

    const signIn = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/login', {
            ...user
        }).then((data) => {
            localStorage.setItem("user", JSON.stringify(data.data.data))
            navigate("/");
        }).catch(e => {
            setError(e.response.data.data.message)
        })
    }

    return (
        <div className="card">
            <div className="card-header text-center">
                <h2>Sign In</h2>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
            </div>
            <div className="card-body">
                <form onSubmit={signIn}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input id="email" className="form-control" type="email" placeholder="masukkan email" onChange={(e) => setUser({ ...user, email: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input id="password" className="form-control" type="password" placeholder="masukkan password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
                    </div>
                    <button type="submit" className="btn btn-primary">Sign In</button>
                </form>
            </div>
            <div className="card-footer text-center">
                <p>doesn't have a account, please <Link to="/register">Sign Up</Link>!</p>
            </div>
        </div>

    )
}