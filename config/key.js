if(process.env.NODE_ENV === 'production'){ //npm install dotenv 해야 env파일 접근가능
    module.exports = require('./prod');
}else{
    module.exports = require('./dev');
}