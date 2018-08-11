import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelve from './BookShelve'
import BookSearch from './BookSearch'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    shelves: {
      currentlyReading: "Currently Reading",
      wantToRead: "Want To Read",
      read: "Read",
    }
  }

  moveShelf = (book, value) => {
    const privateBooks = this.state.books
    const index = privateBooks.findIndex(x => x.title === book.title);

    if (index !== -1)
      privateBooks[index].shelf = value;

    BooksAPI.update(book, value)

    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">
        <Route
          exact path="/"
          render={() => (<BookShelve 
                            books={this.state.books}
                            shelves={this.state.shelves}
                            onSelectShelve={this.moveShelf}/>)}
        />

        <Route 
          path='/search'
          render={() => (<BookSearch
                          books = {this.state.books}
                          onSelectShelve={this.moveShelf}/>) }/>
      </div>
    )
  }
}

export default BooksApp
