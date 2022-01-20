const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');

const config = require('./config/key');

const {User} = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))
//application/json 
app.use(bodyParser.json());


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI).then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
app.get('/',(req,res) => res.send('Hello~ 2022'))

app.post('/register',(req,res) => {
  //회원가입 할때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터베이스에 넣어준다.

  
    const user = new User(req.body)
    user.save((err,doc) => {
      if(err) return res.json({success: false, err})
      return res.status(200).json({ //status(200) :  성공
        success: true
      })//callback function 저장에 문제가 있으면 에러메세지 출력
      //
    }) // 몽고DB에 유저 정보가 저장







})
/*
mongodb+srv://hr:<password>@seoeunplate.wxv5k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

*/