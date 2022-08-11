const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./model/user.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = "ckhsdbcbhsdcgshddgsudahjdhahoisnwjhyq36e53269323"

mongoose.connect('mongodb://localhost/njack-signin-signup-app-db',{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const app = express()

app.use('/', express.static(path.join(__dirname,'static')))
app.get('/', (req, res) => {
  })
app.use(bodyParser.json())

app.post('/api/signin', async (req,res) => {
  const {username, password }=req.body 
  const user = await User.findOne({username}).lean()
  if(!user){
    return res.json({status:'error', error: 'Oh! You have entered either incorrect username or password'})
  }

  if(await bcrypt.compare(password, user.password)){
    const token = jwt.sign({
      id: user._id,
      username: user.username 
    },
    JWT_SECRET
    )
    return res.json({status: 'ok', data: token})
  }

  res.json({status: 'error', error: 'Oh! You have entered either incorrect username or password'})
  // return res.redirect('login.html')
})

app.post('/api/register',async (req,res)=>{
  const { username, phoneNumber, password: plainTextPassword }= req.body

  if(!username || typeof username !== 'string'){
    return res.json({status: 'error', error: 'Invalid username'})
  }
  if(plainTextPassword.length<8){
    return res.json({
      status: 'error',
      error: 'Password must be atleast 8 characters'
    })
  }
  if(phoneNumber.length !== 10){
    return res.json({
      status: 'error',
      error: 'Phone Number must have 10 digits'
    })
  }

  const password = await bcrypt.hash(plainTextPassword, 10)

  try{
    const response = await User.create({
      username,
      phoneNumber,
      password
    })
    console.log('user created sucessfully: ', response)
  } catch (error) {
    if (error.code === 11000){
      return res.json({ status: 'error', error: 'username is already in use'})
    }
    throw error
  }
  res.json({status: 'ok'})
})
app.listen(80,()=>{
    console.log('Server is running at port 80 successfully')
})