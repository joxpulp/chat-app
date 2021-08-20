import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { socket } from '../../services/socket/socket';
import dayjs from 'dayjs';

function ChatBox() {
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);

	const sendMessage = () => {
		socket.emit('sendMessage', {
			email,
			message,
			date: dayjs().format('DD/MM/YYYY'),
			time: dayjs().format('HH:mm:ss'),
		});
		setMessage('');
	};

	useEffect(() => {
		socket.on('messages', (data) => {
			setMessages(data);
		});
		return () => {
			socket.off('messages');
		};
	}, [messages]);

	return (
		<div className='container'>
			<h2 className='text-center mb-4 text-light'>Centro de Mensajes</h2>
			<div className='container d-flex justify-content-center'>
				<div className='form-floating'>
					<input
						type='email'
						required
						className='form-control'
						id='email'
						name='email'
						placeholder='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label htmlFor='email'>Correo Electronico</label>
				</div>
			</div>
			<hr style={{ backgroundColor: 'white' }} />
			<div
				style={{
					width: '80%',
					height: '400px',
					borderRadius: '5px',
					overflowY: 'scroll',
                    overflowX: 'hidden'
				}}
				className='container bg-light p-3'
			>
				{messages.map((amessage, index) => (
					<motion.div
						initial={{ opacity: 0, x: '-100%' }}
						animate={{ opacity: 1, x: 0 }}
						className='container d-flex flex-column flex-lg-row'
						key={index}
					>
						<p className='me-2 text-primary'>{amessage.email}</p>
						<p className='me-2 text-danger'>
							[{amessage.date} {amessage.time}]:
						</p>

						<p className='me-2 text-success'>{amessage.message}</p>
						<hr style={{ backgroundColor: 'black' }} />
					</motion.div>
				))}
			</div>
			<div
				style={{ width: '80%' }}
				className='form-floating mx-auto my-2 d-flex'
			>
				<input
					type='text'
					className='form-control'
					id='message'
					name='message'
					placeholder='message'
					value={message}
					disabled={!/^[\w]+@{1}[\w]+\.[a-z]{2,3}$/.test(email)}
					onChange={(e) => setMessage(e.target.value)}
					onKeyUp={(e) => e.key === 'Enter' && sendMessage()}
				/>
				<label htmlFor='message'>Mensaje</label>
				<button
					className='btn btn-success ms-2'
					disabled={!/^[\w]+@{1}[\w]+\.[a-z]{2,3}$/.test(email)}
					onClick={sendMessage}
				>
					Enviar
				</button>
			</div>
		</div>
	);
}

export default ChatBox;
