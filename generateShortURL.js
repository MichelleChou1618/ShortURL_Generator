// define sample function to randomly return a item in an array
function sample(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

function generateShortURL(length, URL_list){
  // define things user might want
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'

  // create a collection to store things user picked up
  let collection = []
  collection = collection.concat(lowerCaseLetters.split('')).concat(upperCaseLetters.split('')).concat(numbers.split(''))

  // start generating url
  let shortURL = ''
  for (let i = 0; i < Number(length); i++) {
    shortURL += sample(collection)
  }

 //console.log('shortURL', shortURL)
 
//如果產出來的url與原本就有的shortURL重複, 則重新產生
 while(URL_list.filter(data => data.shortURL.includes(shortURL)).length >0) {
   shortURL = generateShortURL(length,URL_list)
 }
  
 // return the generated url
  return shortURL

}

/*
//DUMMY data
const URL_list = [
  { originalURL: "https:www.google.com", shortURL:'23hrd'},
  { originalURL: "https:www.google2.com", shortURL: 'H4JES'},
  { originalURL: "https:www.google3.com", shortURL: '3Ydd9' }]
// invoke generateShortURL function 
let url = generateShortURL(5, URL_list)
// while (URL_list.filter(data => data.shortURL.includes(url)).length >0) {
//   url = generateShortURL(5,URL_list)
// }

console.log('shortURL', url)
*/

// export generateShortURL function for other files to use
module.exports = generateShortURL