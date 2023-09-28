import { useEffect, useState } from 'react';

import TodoForm from "./TodoForm"
import TodoList from "./TodoList"
import { useNavigate } from 'react-router-dom';
import { haveToken } from '../util';
import Logout from './Logout';

export default function TodoBox() {
    let navigate = useNavigate()
    const [user, setUser] = useState({})

    useEffect(() => {
        haveToken(navigate, async function (response) {
            setUser(response)
        })
    }, [navigate])

    return (
        <>
            <Logout user={user} />
            <TodoForm />
            <TodoList />
        </>
    )
}