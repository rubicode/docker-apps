import { useEffect } from "react";
import TodoItem from "./TodoItem";
import { useSelector, useDispatch } from 'react-redux'
import { loadTodo } from "../actions/todos";

export default function TodoList() {

    const todos = useSelector(state => state.todos)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadTodo())
        return () => {
            dispatch(loadTodo())
        }
    }, [dispatch])

    const todosNode = todos.map(todo => (<TodoItem key={todo._id} todo={todo} />))

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Title</th>
                    <th>Complete</th>
                </tr>
            </thead>
            <tbody>
                {todosNode}
            </tbody>
        </table>
    )
}