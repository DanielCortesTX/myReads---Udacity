import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SearchBookDisplay from './SearchBookDisplay'

class SearchPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      noSearchResults: false
    }
  }
  componentDidMount(){
    this.props.BooksAPI.getAll()
    .then((books) => {
     this.setState(() => ({
        books
      }))
      })
    this.props.updateSearched('blank')
  }
  updateQuery = (query) => {
    /*
      @ description = accepts input and passes information up to change
        search results. error are handled and results display is handled depending 
        input.
    */
      if(query === ''){
        this.props.updateSearched('blank')
        this.setState(() => ({
          noSearchResults: false
        }))
      } else {
        this.props.BooksAPI.search(query)
        .then((searchBooks) => {
          if(!searchBooks.error){
            this.setState(() => ({
              noSearchResults: false,
            }))
            this.props.updateSearched(query)
          } else {
            this.setState(() => ({
              noSearchResults: true
            }))
            this.props.updateSearched('blank')
          }
    })
      }
  }
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link 
            className='close-search'
            to='/'>
            Home Page
          </Link>
          <div className="search-books-input-wrapper"> 
            <input
            className='search-contacts'
            type='text'
            placeholder='Search by title or author'
            onChange={(event) => this.updateQuery(event.target.value)}
          />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {this.props.searchedBooks.length !== 0 ? 
            this.props.searchedBooks.map((book, index) => {
              return <SearchBookDisplay searchPageMoveShelf={this.props.searchPageMoveShelf} key={index} book={book}/>
              })
            : ''}
          {this.state.noSearchResults && <p>Your search yielded no results</p>}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage