// app.js
// include packages and define server related variables
const express = require('express')
const app = express()
const port = 3000

// 載入 shortURL model
const ShortURL = require('./models/shortURL')

// 載入express-handlebars
const exphbs = require('express-handlebars')

// 載入 method-override
const methodOverride = require('method-override') 

//載入 generateShortURL
const generateShortURL = require('./generateShortURL')


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

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// setting body-parser
//不管從哪個路由發送過來的請求，都先經過 bodyParser 進行前置處理
//由於 body-parser 已經是 Express 內建的一部分了，因此我們其實可以直接呼叫 express，就能取得 body-parser 提供的方法
//app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))

// 用 app.use 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))


// setting routes
app.get('/', (req, res) => {
  res.render('index')
})


app.post('/', (req, res) => {
  console.log(req.body)
  //取得表單的url
  const originalURL = req.body.url
  const originalURL_c = originalURL.trim().toLowerCase()

  const URL_list = [
    { originalURL: "https:www.google.com", shortURL: '23hrd' },
    { originalURL: "https:www.google2.com", shortURL: 'H4JES' },
    { originalURL: "https:www.google3.com", shortURL: '3Ydd9' }]

  console.log('short url: ', generateShortURL(5, URL_list))

  // //取得資料庫的資料
  // let url_list = ShortURL.find()
  //                         .lean() 
  //                         .catch(error => console.error(error)) // 錯誤處理




  /*

  //取得資料庫的資料
  ShortURL.find() 
    .lean() 
    .then(shortURLs => {
      //將符合originalURL的資料撈出
      const filteredShortURL = shortURLs.find(
        data => data.originalURL.toLowerCase().trim().includes(originalURL_c)
      )

      //如果originalURL不存在DB, 則產生一個新shortURL資料, 存入DB並顯示在UI
      if (!filteredShortURL){
        const newURL = generateShortenURL()
        return ShortURL.create(newURL)
        res.render('result',{shortenURL: newURL.shortenURL} )
      }

      //如果originalURL存在DB, 直接顯示在UI
      res.render('result', { shortenURL: filteredShortURL.shortenURL })

      
      }) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
*/
})



// starts the express server and listening for connections.
app.listen(port, () => {
  console.log(`Express app listening on port ${port}.`)
})