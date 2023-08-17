// app.js
// include packages and define server related variables
const express = require('express')
const app = express()
const port = 3000

// 載入 shortURL model
const ShortURL = require('./models/shortURL')

// 載入 mongoose
const mongoose = require('mongoose') 

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 設定連線到 mongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) 

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// setting body-parser
//不管從哪個路由發送過來的請求，都先經過 bodyParser 進行前置處理
//由於 body-parser 已經是 Express 內建的一部分了，因此我們其實可以直接呼叫 express，就能取得 body-parser 提供的方法
//app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))


// setting routes
app.get('/', (req, res) => {
  res.send('hello world')
})


// starts the express server and listening for connections.
app.listen(port, () => {
  console.log(`Express app listening on port ${port}.`)
})