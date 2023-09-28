import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { addTodo } from '../actions/todos';

export default function TodoForm({ add }) {

    const dispatch = useDispatch()

    const [title, setTitle] = useState('')

    const submit = (e) => {
        e.preventDefault()
        dispatch(addTodo(title))
        setTitle('')
    }

    return (
        <form onSubmit={submit}>
            <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <button type="submit">add</button>
        </form>
    )
}