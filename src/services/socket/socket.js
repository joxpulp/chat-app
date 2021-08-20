import io from 'socket.io-client';

export const socket = io('https://lily-enshrined-shop.glitch.me/', {
	transports: ['websocket'],
});
