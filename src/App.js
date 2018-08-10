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

  moveShelve = (book, value, shelf) => {
    const books = this.state.books
    const index = books.findIndex(x => x.title === book.title);

    books[index].shelf = value

    BooksAPI.update(book, value)

    this.setState({ books })
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
          render={() => (<BookShelve books={this.state.books} shelves={this.state.shelves} onSelectShelve={this.moveShelve}/>)} 
        />

        <Route 
          path='/search'
          component={ BookSearch }/>
      </div>
    )
  }
}

export default BooksApp
