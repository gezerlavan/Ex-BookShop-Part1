'use strict'

const BOOKS_KEY = 'books'
const USER_PREF_KEY = 'userPref'

const IMG_URL =
  'https://i.pinimg.com/736x/35/a4/52/35a45204888e5df66d047bb84a6f3ab6.jpg'

var gBooks = []
var gUserPref = ''

_createBooks()

function getBooks(filterBy) {
  if (!filterBy) return gBooks

  const regex = new RegExp(filterBy, 'i')
  return gBooks.filter(book => regex.test(book.title))
}

function getUserPref() {
  return loadFromStorage(USER_PREF_KEY) || 'table'
}

function setUserPref(isTable) {
  gUserPref = isTable ? 'table' : 'cards'
  _saveUserPref()
}

function removeBook(bookId) {
  const bookIdx = gBooks.findIndex(book => book.id === bookId)
  gBooks.splice(bookIdx, 1)

  _saveBooks()
}

function updatePrice(bookId, newPrice) {
  const bookToUpdate = getBookById(bookId)
  bookToUpdate.price = newPrice

  _saveBooks()
}

function updateRating(bookId, newRating) {
  const bookToUpdate = getBookById(bookId)
  if (newRating >= 1 && newRating <= 5) {
    bookToUpdate.rating = newRating
  }

  _saveBooks()
  return bookToUpdate
}

function addBook(title, price) {
  const newBook = _createBook(title, price)
  gBooks.push(newBook)

  _saveBooks()
}

function getBookById(bookId) {
  const book = gBooks.find(book => book.id === bookId)
  return book
}

function getStats() {
  return gBooks.reduce(
    (acc, book) => {
      if (book.price < 80) acc.cheap++
      else if (book.price <= 200) acc.average++
      else acc.expensive++
      return acc
    },
    { expensive: 0, average: 0, cheap: 0 }
  )
}

function _createBooks() {
  gBooks = loadFromStorage(BOOKS_KEY)

  if (gBooks && gBooks.length) return

  gBooks = []
  gBooks.push(_createBook('Book 1', 110, 3))
  gBooks.push(_createBook('Book 2', 120, 4))
  gBooks.push(_createBook('Book 3', 130, 5))

  _saveBooks()
}

function _createBook(title = 'Demo Book', price = 100, rating = 5) {
  return {
    id: makeId(),
    title,
    price,
    rating,
    imgUrl: IMG_URL,
  }
}

function _saveBooks() {
  saveToStorage(BOOKS_KEY, gBooks)
}

function _saveUserPref() {
  saveToStorage(USER_PREF_KEY, gUserPref)
}
