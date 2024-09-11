'use strict'

const gBooks = [
  { id: '101', title: 'Book 1', price: 110, imgUrl: '' },
  { id: '102', title: 'Book 2', price: 120, imgUrl: '' },
  { id: '103', title: 'Book 3', price: 130, imgUrl: '' },
]

function getBooks() {
  return gBooks
}

function removeBook(bookId) {
  console.log('bookId:', bookId)
  const bookIdx = gBooks.findIndex(book => book.id === bookId)
  gBooks.splice(bookIdx, 1)
}
