import io from 'socket.io-client';

export const socket = io('https://prochatapi.glitch.me/', {
	transports: ['websocket'],
});
