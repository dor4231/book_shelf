import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class BookShelve extends Component {
    

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {['currentlyReading', 'wantToRead', 'read'].map((shelf) => (
                            <div className="bookshelf" key={shelf}>
                                <h2 className="bookshelf-title">{this.props.shelves[shelf]}</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">    
                                        {this.props.books.filter((book) => (book.shelf === shelf)).map((book) => (
                                            <li key={book.id}>
                                                <div className="book">
                                                    <div className="book-top">
                                                        <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                                                        <div className="book-shelf-changer">
                                                        <select 
                                                        value={shelf}
                                                        onChange={(e) => {this.props.onSelectShelve(book, e.target.value)}}>
                                                            <option value="move" disabled>Move to...</option>
                                                            <option value="currentlyReading">Currently Reading</option>
                                                            <option value="wantToRead">Want to Read</option>
                                                            <option value="read">Read</option>
                                                            <option value="none">None</option>
                                                        </select>
                                                        </div>
                                                    </div>
                                                    <div className="book-title">{book.title}</div>
                                                    <div className="book-authors">{book.authors}</div>
                                                </div>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="open-search">
                    <Link 
                        to='/search'
                        >Add a book</Link>
                </div>
            </div>
        )
    }
}

export default BookShelve