import { useEffect } from "react";
import TodoItem from "./TodoItem";
import { useSelector, useDispatch } from 'react-redux'
import { loadTodo } from "../actions/todos";

export default function TodoList() {

    const todos = useSelector(state => state.todos)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadTodo())
    }, [dispatch])

    const todosNode = todos.map(item => (<TodoItem todo={item} key={item.id} />))

    return (
        <ul>
            {todosNode}
        </ul>
    )
}