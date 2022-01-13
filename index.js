const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://hr:hr@seoeunplate.wxv5k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
).then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

/*
mongodb+srv://hr:<password>@seoeunplate.wxv5k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
ddd
*/