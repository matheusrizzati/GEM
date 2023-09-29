const baseUrl = 'https://gem-api.vercel.app'

async function login(){
    let email = document.getElementById('inputEmail').value
    let senha = document.getElementById('inputPassword').value
    const res = await fetch(`${baseUrl}/usuario/login`, {
        method: 'POST',
        body: JSON.stringify({email, senha}),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    const data = await res.json()
    if (data.msg !== "Login bem sucedido!"){
        return alert(data.msg)
    } else{
        alert(data.msg);
        localStorage.setItem("token", data.token)
        setTimeout(() => {
            window.location.href = 'http://localhost:5500/app'
        }, 1500)
    }
}

document.querySelector('#submitBtn').addEventListener('click', () => {
    login()
})