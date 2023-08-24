// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 ShortURL model
const ShortURL = require('../../models/shortURL')
//載入 generateShortURL
const generateShortURL = require('../../generateShortURL')


//首頁路由
router.get('/', (req, res) => {
  res.render('index')
})

//提送originalURL form 路由
router.post('/', async(req, res) => {

  //取得表單的url
  const originalURL = req.body.url
  console.log('original URL: ', originalURL)
  //const originalURL_c = originalURL.trim().toLowerCase()
  const host = req.headers.origin
  //console.log('host: ', host)

  //取得現行資料庫的所有資料
  let url_list = await ShortURL.find()
    .lean()
    .then(data => {
      //console.log('data: ',data)
      return data
    })
    .catch(error => console.error(error)) // 錯誤處理

  //取得現行資料庫, 符合originalURL的資料
  let url = await ShortURL.findOne({ originalURL: originalURL })
    .lean()
    .then(data => {
      //console.log('data: ',data)
      return data
    })
    .catch(error => console.error(error)) // 錯誤處理

   //驗證取得的資料
   console.log('url_list: ', url_list)
   console.log('url: ', url)

  //如果originalURL不存在DB, 則產生一個新shortURL資料, 存入DB
  if (!url) {
    url = { originalURL: originalURL, shortURL: generateShortURL(5, url_list) }
    console.log('Create new short URL: ', url.shortURL)
    ShortURL.create(url)
  } else {
    console.log('ShortURL already existed:', url.shortURL)
  }
  
  // 將資料傳給 index 樣板
  res.render('result', { host: req.headers.origin, shortURL: url.shortURL })
  console.log('Rendered successfully.')


})

 /*
  //取得資料庫的資料: 將符合originalURL的資料撈出
  ShortURL.findOne({ originalURL: originalURL })
    .lean()
    .then(data => {

      //如果originalURL不存在DB, 則產生一個新shortURL資料, 存入DB
      if (!data) {
        data = { originalURL: originalURL, shortURL: generateShortURL(5) }
        console.log('Create new short URL: ', data.shortURL)
        ShortURL.create(data)

      }

      console.log('ShortURL already existed:', data.shortURL)
      // 將資料傳給 index 樣板
      res.render('result', { host: req.headers.origin, shortURL: data.shortURL })
      console.log('Rendered successfully.')

    })
    .catch(error => console.error(error)) // 錯誤處理
})

*/

//連結至短網址所指的實際網址路由
router.get('/:shortURL', (req, res) => {
  console.log(req.params)
  //取得shortURL
  const shortURL = req.params.shortURL


  //至資料庫找尋相關的data
  ShortURL.findOne({ shortURL: shortURL })
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


// 匯出路由模組
module.exports = router
