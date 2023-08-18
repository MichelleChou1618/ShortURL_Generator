// app.js
// include packages and define server related variables
const express = require('express')
const app = express()
const port = 3000

// 載入 shortURL model
//const ShortURL = require('./models/shortURL')

// 載入express-handlebars
const exphbs = require('express-handlebars')

// 載入 method-override
const methodOverride = require('method-override') 

//載入 generateShortURL
//const generateShortURL = require('./generateShortURL')

// refactor: 引用路由器: 引入路由器時，路徑設定為 /routes 就會自動去尋找目錄下叫做 index 的檔案
const routes = require('./routes')

//refactor: 將mongoose連線設定抽離app.js,再從app.js引用設定檔:對 app.js 而言，Mongoose 連線設定只需要「被執行」，不需要接到任何回傳參數繼續利用，所以這裡不需要再設定變數
require('./config/mongoose')

/*
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
*/


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

// refactor: 將 request 導入路由器
app.use(routes)

/*
// setting routes
//首頁路由
app.get('/', (req, res) => {
  res.render('index')
})

//提送originalURL form 路由
app.post('/', (req, res) => {

  //取得表單的url
  const originalURL = req.body.url
  console.log('original URL: ', originalURL)
  //const originalURL_c = originalURL.trim().toLowerCase()
  const host = req.headers.origin
  //console.log('host: ', host)

  //取得資料庫的資料: 將符合originalURL的資料撈出
  ShortURL.findOne({ originalURL: originalURL }) 
    .lean() 
    .then(data => {
  
      //如果originalURL不存在DB, 則產生一個新shortURL資料, 存入DB
      if (!data){
        data = { originalURL: originalURL ,shortURL:generateShortURL(5)}
        console.log('Create new short URL: ',data.shortURL)
        ShortURL.create(data)
        
      } 

      console.log('ShortURL already existed:', data.shortURL)
      // 將資料傳給 index 樣板
      res.render('result', { host: req.headers.origin, shortURL: data.shortURL })
      console.log('Rendered successfully.')
     
      }) 
    .catch(error => console.error(error)) // 錯誤處理
})

//連結至短網址所指的實際網址路由
app.get('/:shortURL', (req, res) => {
  console.log(req.params)
  //取得shortURL
  const shortURL = req.params.shortURL
  

  //至資料庫找尋相關的data
  ShortURL.findOne({shortURL:shortURL})
    .lean()
    .then(data => {
      //如果data不存在, 則印出error message
      if (!data) {
         res.render("error", {
          errorMsg: "Can't found the URL",
          errorURL: req.headers.host + "/" + shortURL,
        })
      } else {
        //如果data存在, 導至data所屬的原url
        res.redirect(data.originalURL)
      }
      
    })
    .catch(error => console.error(error))

})
*/

// starts the express server and listening for connections.
app.listen(port, () => {
  console.log(`Express app listening on port ${port}.`)
})


