const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key'); 

const {User} = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))    
//application/json 
app.use(bodyParser.json());
app.use(cookieParser());



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
  
    }) // 몽고DB에 유저 정보가 저장
    app.post('/login',(req,res) => {
      //요청된 이메일을 데이터베이스에서 있는지 찾는다
      User.findOne( {email : req.body.email},(err,user)=>{
        if(!user){
          return res.json({
            loginSuccess : false,
            message : "제공된 이메일에 해당하는 유저가 없습니다."
          })
        }
        //요청된 이메일이 데이터베이스에 있다면 요청한 비밀번호가 맞는 비밀번호인지 확인
        user.comparePassword(req.body.password, (err, isMatch)=>{
          if(!isMatch)
            return res.json({loginSuccess : false , message: "비밀번호가 틀렸습니다!"})
          
          //비밀번호가 맞다면 토큰을 생성
          user.generateToken((err,user) => {
            if(err) 
              return res.status(400).send(err);
            //토큰을 저장한다. 어디에? 쿠키 , 로컬스토리지 , session ? 
            res.cookie("x_auth",user.token)
               .status(200)
               .json({loginSuccess: true , userId: user._id})


            
          })

        
        })


      })
      //비밀번호까지 같다면 유저를 위한 토큰(Token)을 생성
    })






})
/*
mongodb+srv://hr:<password>@seoeunplate.wxv5k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

*/