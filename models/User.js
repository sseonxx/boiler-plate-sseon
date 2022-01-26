const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


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
        type: String
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }

})



//저장하기 전에 fn을 한다.
userSchema.pre('save', function (next) {
    var user = this;
    //패스워드가 변환될 때만
    if (user.isModified("password")) {
        //비밀번호를 암호화한다.
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);

            //hash: 암호화된 비밀번호
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                console.log("input Password: ",user.password);
                user.password = hash;
                console.log("output Password: ",user.password);
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function(plainPassword , cb){
    //plainPassword : 1234  hashedPassword: $334n353j53jk32b.
    bcrypt.compare(plainPassword ,this.password , function(err,isMatch){
        if(err) 
            return cb(err);
        cb(null,isMatch);

    })
}

userSchema.methods.generateToken = function(cb){

    var user = this;
    //jsonwentoken을 이용해서 토큰 생성
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    //console.log(user._id + 'secretToken');

    user.token = token;
    user.save(function(err,user){
        if(err)
            return cb(err)
        cb(null, user)
    })

}

const User = mongoose.model('User', userSchema)
module.exports = { User } 