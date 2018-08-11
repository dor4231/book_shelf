import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'

import * as BooksAPI from './BooksAPI'

class BookSearch extends Component {
    state = {
        books: []
    }

    isBookAlreadyOnAShelf = (searchBook) => {
        console.log("Check if book on the shelf")
        const book = this.props.books.filter((shelfBook) => (shelfBook.id === searchBook.id))
        console.log(book)
        if (book.length === 1) {
            return book[0].shelf
        } else {
            return false
        }
    }

    searchInAPI = (query) => {
        console.log("Send search query")
        if (query === '') {
            this.setState({ books: [] })
        } else {
            console.log(escapeRegExp(query))
            BooksAPI.search(escapeRegExp(query).trim()).then((books) => {
                if (books.error) {
                    this.setState({ books: [] })
                }else if (books) {
                    this.setState({ books })
                } else {
                    this.setState({ books: [] })
                }
            }).catch(
                this.setState({ books: []})
            )
        }
    }

    render() {
        console.log("Rendring BookSearch!")
        return (
            <div className="search-books">
              <div className="search-books-bar">
                <Link className="close-search" to='/'>Close</Link>
                <div className="search-books-input-wrapper">
                  <input type="text" placeholder="Search by title or author" onChange={(e) => this.searchInAPI(e.target.value)}/>
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                    {this.state.books.map((book) => (
                        <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" 
                                         style={{ width: 128, 
                                                  height: 188, 
                                                  backgroundImage: ("imageLinks" in book) ? `url("${book.imageLinks.thumbnail}")` : 'none' }}></div>
                                        <div className="book-shelf-changer">
                                            <select 
                                            value={(this.isBookAlreadyOnAShelf(book) || 'none')}
                                            onChange={(e) => {this.props.onSelectShelve(book, e.target.value); }}>
                                            <option value="move" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{("authors" in book) ? book.authors: 'Not Specified'}</div>
                            </div>
                        </li>
                    ))}
                </ol>
              </div>
            </div>
          )
    }
}


export default BookSearch