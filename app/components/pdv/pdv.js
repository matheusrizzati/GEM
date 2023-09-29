const apiUrl = 'https://gem-api.vercel.app'

const token = localStorage.getItem('token')
if(!token){
    window.location.href = 'http://localhost:5500/login'
}