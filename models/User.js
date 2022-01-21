const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = mongoose.Schema({
name: {
    type: String,
    maxlength: 50
},
email: {
    type: String,
    trim: true,
    unique: 1
},
password: {
    type: String,
    maxlength: 50
},
role: {
    type: Number,
    default: 0
},
image:String,
token: {
    type: String
},
tokenExp: {
    type: Number
}

})

const User = mongoose.model('User',userSchema)

userSchema.pre('save',function( next ){ // 유저 정보를 register하기 전에 function()수행
    var user = this;
    //비밀번호를 암호화 시킨다.
    if(user.isModified('password')){
        
        bcrypt.genSalt(saltRounds,function(err,salt){
            if (err) return next(err)
            
            bcrypt.hash(user.password, salt, function(err,hash){
                if (err) return next(err);
                user.password = hash
                next()
            })
        })
    }


})

module.exports = { User   }