const todos = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_TODO_SUCCESS':
            return action.todos.map(item => {
                item.sent = true
                return item
            })

        case 'ADD_TODO':
            return [...state, { id: action.id, title: action.title, sent: true }]

        case 'ADD_TODO_SUCCESS':
            return state.map(item => {
                if (item.id === action.id) {
                    item.id = action.todo.id
                }
                return item
            })

        case 'ADD_TODO_FAILED':
            return state.map(item => {
                if (item.id === action.id) {
                    item.sent = false
                }
                return item
            })

        case 'REMOVE_TODO_SUCCESS':
            return state.filter(item => item.id !== action.id)

        case 'RESEND_TODO_SUCCESS':
            return state.map(item => {
                if (item.id === action.id) {
                    item.id = action.todo.id
                    item.sent = true
                }
                return item
            })

        case 'RESEND_TODO_FAILED':
        case 'REMOVE_TODO_FAILED':
        case 'LOAD_TODO_FAILED':
        default:
            return state
    }
}

export default todos