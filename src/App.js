import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import SearchPage from './SearchPage'
import { Route } from 'react-router-dom'
import MainPage from './MainPage'

class BooksApp extends React.Component {
  constructor(props){
    super(props)
    this.updateSearched = this.updateSearched.bind(this)
  }
  state = {
    books: [],
    searchedBooks: []
  }
  componentDidMount(){
    BooksAPI.getAll()
      .then((books) => {
       this.setState(() => ({
          books
        }))
        })
  }
  updateSearched(update){
    /*
      @description function takes input and updates searched book results,
         based on whether input is blank, valid search word or invalid search word
    */
    if(update === 'blank'){
      this.setState(() => ({
        searchedBooks: []
      }))
    } else {
      BooksAPI.search(update)
        .then((searchedBooks) => {
          let copySearch = JSON.parse(JSON.stringify(searchedBooks))
          copySearch.forEach((book) => {
           book.shelf = 'none'
          })
          
          let mainBookFilter = {}
          this.state.books.forEach(( book ) =>  {
            mainBookFilter[ book.id ] = book
        })
        copySearch.forEach((copyBook) => {
          if(mainBookFilter.hasOwnProperty(copyBook.id)){
            return copyBook.shelf = mainBookFilter[copyBook.id].shelf
          }
        })
        this.setState(() => ({
          searchedBooks: copySearch
        }))
        }).then(() => {
          BooksAPI.getAll()
            .then((books) => {
              this.setState(() => ({
                books
              }))
          })
        })
    }
  }
  mainPageMoveShelf = (message, bookChanged) => {
    /*
      @description = takes book to be moved and shelf to move to. copies the state,
         makes the shelf change, sets state to update, updates API via health
    */
    let booksCopy = JSON.parse(JSON.stringify(this.state.books))
    const bookIWant = (bookChanged) => {
      return booksCopy.filter((book) => book.title === bookChanged.title)
    }
    bookIWant(bookChanged)[0].shelf = message
    this.setState(() => ({
      books: booksCopy
    }))
    BooksAPI.update(bookChanged, message)
  }
  searchPageMoveShelf = (message, bookChanged) => {
    /*
     @description = takes book (from search page) to have its shelf moved and the shelf
       to move it to an makes update to Book API. Then updates the state of 'main bookshelf'.
       lastly, searchedBooks state is re-filtered and modified to set shelf of books that
       appear in mainBook state to be reflected in searchBooks and make display match.
    */
    BooksAPI.update(bookChanged, message).then(() => {
      BooksAPI.getAll()
      .then((books) => {
       this.setState(() => ({
          books
        }))
        }).then(() => {
          let copySearch = this.state.searchedBooks
          copySearch.forEach((book) => {
           book.shelf = 'none'
          })
          
          let mainBookFilter = {}
          this.state.books.forEach(( book ) =>  {
            mainBookFilter[ book.id ] = book
        })
        copySearch.forEach((copyBook) => {
          if(mainBookFilter.hasOwnProperty(copyBook.id)){
            return copyBook.shelf = mainBookFilter[copyBook.id].shelf
          }
        })
        this.setState(() => ({
          searchedBooks: copySearch
        }))
        })
    })
  }
  render() {
    /*
      @ description = three constants are passed down to sort books to shelves
        on main page
    */
    const displayApiCurrent = this.state.books.filter((book) => {
      return book.shelf === 'currentlyReading'
    })
    const displayApiWant = this.state.books.filter((book) => {
      return book.shelf === 'wantToRead'
    })
    const displayApiRead = this.state.books.filter((book) => {
      return book.shelf === 'read'
    })
    return (
      <div className="app">
        <Route path='/' exact render={()=> (
          <MainPage
          displayApiCurrent={displayApiCurrent}
          displayApiWant={displayApiWant}
          displayApiRead={displayApiRead}
          BooksAPI={BooksAPI}
          mainPageMoveShelf={this.mainPageMoveShelf}
          />
        )}/>
        <Route path='/search' render={() => (
          <SearchPage
          BooksAPI={BooksAPI}
          searchPageMoveShelf={this.searchPageMoveShelf}
          setSearch={this.setSearch}
          updateSearched={this.updateSearched}
          searchedBooks={this.state.searchedBooks}
          books={this.state.books}
          />
        )}/>
      </div>
      )
    }
  }
  
  export default BooksApp