const {User} = require('../models/User');


let auth = (req, res, next) => {
    //인증처리를 하는 곳

    //클라이언트 쿠키에서 토큰을 가져온다.
    //why? parse cookie header and populate req.cookies with object keyed by cookie names
    //쿠키 헤더를 분석하고 쿠키이름으로 키가 지정된 개체로 req.cookie를 채운다
    let token = req.cookies.x_auth;



    //토큰을 복호화 한후 유저를 찾는다
    User.findByToken(token, (err,user)=> {
        if(err)
            throw err;
        if(!user)
            return res.json({isAuth:false , error: true });
        //그리고 유저가 있다면
        req.token = token;
        req.user = user;
        next();
    })



    //유저가 있으면 인증 Okay

    //유저가 없으면 인증  No!
}

module.exports = { auth }; //밖에 쓸수 있게 내보내기 위함
/*
쓰는 .js 에서는 
const {auth} = require('./middleware/auth');
를 통해 model을 불러온다.
*/