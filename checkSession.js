const baseUrl = 'https://gem-api.vercel.app'

const token = localStorage.getItem('token')
if(!token){
    return window.location.href = 'http://localhost:5500/login'
}

// const userID = await fetch(`${baseUrl}/session`, {
//     method: 'GET',
//     headers: {
//         'authorization': token,
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     },
// })