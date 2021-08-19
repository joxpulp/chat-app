import React, { useState, useEffect } from 'react';
import { socket } from './services/socket/socket';
import AddProduct from './components/addproduct/AddProduct';
import ProductTable from './components/producttable/ProductTable';
import ChatBox from './components/chatbox/ChatBox';

function App() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		socket.on('products', (data) => {
			setProducts(data);
		});
		return () => {
			socket.off('products');
		};
	}, [products]);

	return (
		<div
			style={{ height: '100%' }}
			className='d-flex flex-column
			justify-content-center align-items-center'
		>
			<h1 className='text-center my-4 text-light'>
				Bienvenido a la API de Productos
			</h1>
			<hr style={{ backgroundColor: 'white', width: '80%' }} />
			<AddProduct />
			<hr style={{ backgroundColor: 'white', width: '80%' }} />
			<ProductTable products={products} />
			<hr style={{ backgroundColor: 'white', width: '80%' }} />
			<ChatBox />
		</div>
	);
}

export default App;
