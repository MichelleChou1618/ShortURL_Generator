// app.js
// include packages and define server related variables
const express = require('express')
const app = express()
const port = 3000


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