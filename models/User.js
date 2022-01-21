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

const User = mongoose.model('User', userSchema)
module.exports = { User }