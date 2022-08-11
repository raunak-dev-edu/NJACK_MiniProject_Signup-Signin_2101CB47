
    const form2 = document.getElementById('signin-form')
    form2.addEventListener('submit', login)

    async function login(event){
      event.preventDefault()
      const username= document.getElementById('Username').value
      const password = document.getElementById('Password').value

      const result2 = await fetch('/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      }).then((res)=> res.json())

    if (result2.status === 'ok'){
        console.log('got the token: ', result2.data)
        localStorage.setItem('token',  result2.data)
        location.href="login.html"
    }
    else{
        alert(result2.error)
    }
}
