import React, { Component } from 'react'

class SearchBookDisplay extends Component {
  handleChange = (event) => {
    /*
      @ description = pass shelf change up for handling
    */
    this.props.searchPageMoveShelf(event.target.value, this.props.book)
  }
  checkInvalidThumnail(){
    /*
      @ description = handle if book has no image for display
    */
    if(!this.props.book.imageLinks){
      return ''
    } else {
      return this.props.book.imageLinks.thumbnail
    }
  }
  checkInvalidAuthor(){
    /*
      @ description = handle if book has no author(s)
    */
    if(!this.props.book.authors){
     return 'no author listed'
    } else {
      const authorList = this.props.book.authors.map((author) => {
        return `${author} `
      })
      return authorList
    }
  }
  render(){
    let image = this.checkInvalidThumnail()
    let authors = this.checkInvalidAuthor()
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${image}")` }}></div>
            <div className="book-shelf-changer">
              <form>
              
              </form>
              <select value={this.props.book.shelf} onChange={this.handleChange}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">{authors}</div>
        </div>
      </li>
    )
  }
}

export default SearchBookDisplay