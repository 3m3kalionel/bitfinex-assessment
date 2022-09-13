import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
	subscribeToApi,
	unsubscribeFromApi,
} from './features/books/bookSlice';

import { BookTable } from './features/books/BookTable';
import './App.css';

function App() {
	const dispatch = useDispatch();
	const orderChannel = useSelector(state => state.bookData.channel)

  return (
    <div className="App">
      <div className="App-header">
				<>
					<div className="button-container">
						<button
							aria-label="connect"
							onClick={() => dispatch(subscribeToApi())}
							disabled={!!orderChannel}
							className="connect"
						>
							Connect
						</button>

						<button
							aria-label="disconnect"
							onClick={() => dispatch(unsubscribeFromApi())}
							disabled={!orderChannel}
							className="disconnect"
						>
							Disconnect
						</button>
					</div>
					<div className="table-container">
						<h3>ORDER BOOK BTC/USD</h3>
						<BookTable progressPending={!!orderChannel} />
					</div>
				</>
      </div>
    </div>
  );
}

export default App;
