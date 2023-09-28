import axios from "axios"

const user = JSON.parse(localStorage.getItem('user'))

const request = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 1000,
    headers: { 'Authorization': `Bearer ${user.token}` }
})

export const loadTodo = () => dispatch => request.get('todos').then(({ data }) => {
    dispatch({
        type: 'LOAD_TODO_SUCCESS',
        todos: data
    })
}).catch((err) => {
    dispatch({
        type: 'LOAD_TODO_FAILED'
    })
})

const addTodoFailed = (id) => ({
    type: 'ADD_TODO_FAILED',
    id
})

const addTodoSuccess = (id, todo) => ({
    type: 'ADD_TODO_SUCCESS',
    id,
    todo
})

export const addTodoDraw = (id, title) => ({
    type: 'ADD_TODO',
    id,
    title
})

export const addTodo = (title) => dispatch => {
    const id = Date.now()
    dispatch(addTodoDraw(id, title))
    return request.post('todos', { title }).then(({ data }) => {
        dispatch(addTodoSuccess(id, data))
    }).catch((err) => {
        dispatch(addTodoFailed(id))
    })
}

export const removeTodo = (id) => dispatch => request.delete(`todos/${id}`).then(({ data }) => {
    dispatch({ type: 'REMOVE_TODO_SUCCESS', id })
}).catch((err) => {
    dispatch({ type: 'REMOVE_TODO_FAILED' })
})

export const resendTodo = (id, title) => dispatch => request.post('todos', { title }).then(({ data }) => {
    dispatch({ type: 'RESEND_TODO_SUCCESS', id, todo: data })
}).catch((err) => {
    dispatch({ type: 'RESEND_TODO_FAILED' })
})

