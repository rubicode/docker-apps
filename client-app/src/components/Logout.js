import { useNavigate } from "react-router-dom"

export default function Logout() {
    let navigate = useNavigate()

    const logout = () => {
        console.log('keluar')
        localStorage.clear()
        navigate('/login')
    }

    return (
        <button type="button" onClick={logout}>logout</button>
    )
}