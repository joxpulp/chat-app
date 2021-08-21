import io from 'socket.io-client';

export const socket = io('http://lily-enshrined-shop.glitch.me/', {
	transports: ['websocket'],
});
