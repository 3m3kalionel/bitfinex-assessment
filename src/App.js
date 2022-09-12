import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
	subscribeToApi,
	unsubscribeFromApi,
} from './features/books/bookSlice';

import logo from './logo.svg';
import { BookTable } from './features/books/BookTable';
import './App.css';


function App() {
	const dispatch = useDispatch();
	const orderChannel = useSelector(state => state.bookData.channel)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
				<button
          aria-label="Decrement value"
					onClick={() => dispatch(subscribeToApi())}
					disabled={!!orderChannel}
        >
          Subscribe
        </button>

				<button
          aria-label="Decrement value"
					onClick={() => dispatch(unsubscribeFromApi())}
					disabled={!orderChannel}
        >
          Unsubscribe
        </button>
				<BookTable />

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
