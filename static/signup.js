
    const form = document.getElementById('reg-form')
    form.addEventListener('submit',registerUser)

    async function registerUser(event){
      event.preventDefault()
      const username= document.getElementById('username').value
      const phoneNumber = document.getElementById('phoneNumber').value
      const password = document.getElementById('password').value

      const result = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          phoneNumber,
          password
        })
      }).then((res)=> res.json())

    
    if (result.status === 'ok'){
        location.href="welcome.html"
        alert('Hey, Congrats! , You have Successfully SignUp!')
    }
    else{
        alert(result.error)
    }
}
