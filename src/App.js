import React from 'react'
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelve from './BookShelve'
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
      books.map((book) => {
        console.log(book);
      })

      console.log("Books:", this.state.books)
    });
    
    BooksAPI.get("evuwdDLfAyYC").then(
      (res) => console.log(res)
    )
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
          render={() => (
            <div className="search-books">
              <div className="search-books-bar">
                <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
                <div className="search-books-input-wrapper">
                  {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                  */}
                  <input type="text" placeholder="Search by title or author"/>

                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid"></ol>
              </div>
            </div>
          )}/>
      </div>
    )
  }
}

export default BooksApp
