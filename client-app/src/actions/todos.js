import request from "../request";

export const loadTodo = () => dispatch => request.get('todos').then(({ data }) => {
    dispatch({
        type: 'LOAD_TODO_SUCCESS',
        todos: data.data.todos
    })
}).catch((err) => {
    dispatch({
        type: 'LOAD_TODO_FAILED'
    })
})

const addTodoFailed = (_id) => ({
    type: 'ADD_TODO_FAILED',
    _id
})

const addTodoSuccess = (_id, todo) => ({
    type: 'ADD_TODO_SUCCESS',
    _id,
    todo
})

export const addTodoDraw = (_id, title) => ({
    type: 'ADD_TODO',
    _id,
    title
})

export const addTodo = (title) => dispatch => {
    const _id = Date.now()
    dispatch(addTodoDraw(_id, title))
    return request.post('todos', { title }).then(({ data }) => {
        dispatch(addTodoSuccess(_id, data))
    }).catch((err) => {
        dispatch(addTodoFailed(_id))
    })
}

export const removeTodo = (_id) => dispatch => request.delete(`todos/${_id}`).then(({ data }) => {
    dispatch({ type: 'REMOVE_TODO_SUCCESS', _id })
}).catch((err) => {
    dispatch({ type: 'REMOVE_TODO_FAILED' })
})

export const resendTodo = (_id, title) => dispatch => request.post('todos', { title }).then(({ data }) => {
    dispatch({ type: 'RESEND_TODO_SUCCESS', _id, todo: data })
}).catch((err) => {
    dispatch({ type: 'RESEND_TODO_FAILED' })
})

