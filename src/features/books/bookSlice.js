import { createSlice } from '@reduxjs/toolkit';
import {
	getOrderBookData,
	unsubscribeSocket,
} from './bookAPI';

const initialState = {
	data: {},
};

export const bookDataSlice = createSlice({
  name: 'bookData',
  initialState,
  reducers: {
		setDataChannel: (state, { payload }) => {
			state.channel = payload;
		},
		setBookUpdates: (state, { payload }) => {
			state.data = { ...state.data, ...payload };
		},
		clearDataChannel: (state) => {
			state.channel = undefined;
		}
	},
});

export const { setBookUpdates, setDataChannel, clearDataChannel } = bookDataSlice.actions;

export const selectChannel = (state) => state.bookData.channel

export const subscribeToApi = () => (dispatch, getState) => {
	getOrderBookData((channel, data = null) => {
		const currentChannel = selectChannel(getState());
		if (!currentChannel && channel) {
			dispatch(setDataChannel(channel))
		}
		console.log('&&&&&', data, currentChannel, channel)
		if (data) {
			dispatch(setBookUpdates(data))
		}
	});
};

export const unsubscribeFromApi = () => (dispatch, getState) => {
	const currentChannel = selectChannel(getState());
	unsubscribeSocket(currentChannel);
	dispatch(clearDataChannel())
}

export default bookDataSlice.reducer;
