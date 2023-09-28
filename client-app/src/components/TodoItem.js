import { useDispatch } from 'react-redux'
import { removeTodo, resendTodo } from '../actions/todos'

export default function TodoItem({ todo }) {

    const dispatch = useDispatch()

    return <li>{todo.title}<button type="button" onClick={() => todo.sent ? dispatch(removeTodo(todo.id)) : dispatch(resendTodo(todo.id, todo.title))}>{todo.sent ? 'delete' : 'resend'}</button></li>
}