import { useDispatch } from 'react-redux'
import { removeTodo, resendTodo } from '../actions/todos'

export default function TodoItem({ todo }) {

    const dispatch = useDispatch()

    return (
        <tr>
            <td>{todo.title}</td>
            <td>{todo.complete ? 'Done' : 'Not Yet'}</td>
            <td>
                <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => todo.sent ? dispatch(removeTodo(todo._id)) : dispatch(resendTodo(todo._id, todo.title))}
                >
                    {todo.sent ? 'delete' : 'resend'}
                </button>
            </td>
        </tr>
    )
}