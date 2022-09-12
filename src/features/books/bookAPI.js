const socketFactory = {
	getSocket() {
		if (!this.socket) {
			const socket = new WebSocket("wss://api-pub.bitfinex.com/ws/2");
			this.socket = socket;
			return this.socket;
		}
		return this.socket;
	},
	clearSocket() {
		if (this.socket) {
			delete this.socket;
		}
	},
}

export function getOrderBookData(saveData) {
	const socket = socketFactory.getSocket();
	socket.onopen = (e) => {
		socket.send(JSON.stringify({
			event: 'conf',
			flags: 536870912,
		}))
		socket.send(JSON.stringify({
			event: 'subscribe',
			channel: 'book',
			symbol: 'tBTCUSD'
		}));
	};
	socket.onmessage = (e) => {
		const data = JSON.parse(e.data)
		if (data.chanId) {
			return saveData(data.chanId)
		}
		const channel = data[0];
		if (data && Array.isArray(data[1])) {
			const orderBookData = data[1].reduce((acc, current) => {
				acc[current[0]] = {
					id: current[0],
					price: current[0],
					count: current[1],
					amount: current[2],
				};
				return acc;
			}, {})
			return saveData(channel, orderBookData);
		};
	}
}

export function unsubscribeSocket(channelId) {
	const socket = socketFactory.getSocket();
	socket.send(JSON.stringify({
		event: 'unsubscribe',
		chanId: channelId,
		symbol: 'tBTCUSD'
	}));
	socket.close()
	socketFactory.clearSocket()
};
