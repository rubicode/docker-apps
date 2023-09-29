export function haveToken(navigate, next) {
    if (!localStorage.getItem('user')) {
        navigate('/login')
    } else {
        next(JSON.parse(localStorage.getItem('user')))
    }
}