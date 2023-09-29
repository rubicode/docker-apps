import TodoForm from "./TodoForm"
import TodoList from "./TodoList"

export default function TodoBox() {

    return (
        <div className="card">
            <div className="card-header text-center">
                <h2>Todos</h2>
            </div>
            <div className="card-body">
                <TodoForm />
            </div>
            <TodoList />
        </div>
    )
}