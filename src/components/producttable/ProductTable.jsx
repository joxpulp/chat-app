import React from 'react';

function ProductTable({products}) {
	return (
		<div className='container'>
			{products.length !== 0 ? (
				<>
					<h2 className='text-center mb-4 text-light'>Vista de productos</h2>
					<table className='table table-dark'>
						<thead>
							<tr>
								<th scope='col'>Producto</th>
								<th scope='col'>Precio</th>
								<th scope='col'>Foto</th>
							</tr>
						</thead>
						{products.map((product, index) => (
							<tbody key={index}>
								<tr>
									<td>{product.title}</td>
									<td>{product.price}</td>
									<td>
										<img
											style={{ width: '50px', height: 'auto' }}
											src={product.thumbnail}
											alt='products'
										/>
									</td>
								</tr>
							</tbody>
						))}
					</table>
				</>
			) : (
				<div className='alert alert-info text-center' role='alert'>
					No hay productos disponibles, agrega uno en el formulario de arriba
				</div>
			)}
		</div>
	);
}

export default ProductTable;
