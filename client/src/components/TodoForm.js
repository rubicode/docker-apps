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
            <div className="row mb-3">
                <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                <div className="col-sm-10">
                    <input id="title" type="text" className="form-control" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
            </div>
            <button className="btn btn-primary" type="submit">add</button>
        </form>
    )
}