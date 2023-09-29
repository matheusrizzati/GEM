const baseUrl = 'https://gem-api.vercel.app'

async function cadastro(){
    let email = document.getElementById('inputEmail').value
    let senha = document.getElementById('inputPassword').value
    let confirmarSenha = document.getElementById('inputConfirmPassword').value
    const res = await fetch(`${baseUrl}/usuario/registro`, {
        method: 'POST',
        body: JSON.stringify({email, senha, confirmarSenha}),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    const data = await res.json()
    if (data.msg !== "Usuário cadastrado com sucesso!"){
        return alert(data.msg)
    } else{
        alert(data.msg);
        setTimeout(() => {
            window.location.href = 'http://localhost:5500/login'
        }, 1500)
    }
}

document.querySelector('#submitBtn').addEventListener('click', () => {
    cadastro()
})