import { useNavigate } from "react-router-dom"

export default function Logout() {
    let navigate = useNavigate()

    const logout = () => {
        localStorage.clear()
        navigate('/login')
    }

    return (
        <button className="btn btn-outline-danger" type="button" onClick={logout}>logout</button>
    )
}