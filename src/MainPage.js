import React, { Component } from 'react'
import MainPageBookDisplay from './MainPageBookDisplay'
import { Link } from 'react-router-dom'

class MainPage extends Component {
  componentDidMount(){
    this.props.BooksAPI.getAll()
    .then((books) => {
     this.setState(() => ({
        books
      }))
      })
  }
  render(){
    return (
      <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">

                  {this.props.displayApiCurrent.map((book, index) => <MainPageBookDisplay key={index} book={book} mainPageMoveShelf={this.props.mainPageMoveShelf}/>)}

                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">

                  {this.props.displayApiWant.map((book, index) => <MainPageBookDisplay key={index} book={book} mainPageMoveShelf={this.props.mainPageMoveShelf}/>)}

                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">

                  {this.props.displayApiRead.map((book, index) => <MainPageBookDisplay key={index} book={book} mainPageMoveShelf={this.props.mainPageMoveShelf}/>)}

                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <Link to='/search'></Link>
          </div>     
        </div>
  )
  }
}

export default MainPage