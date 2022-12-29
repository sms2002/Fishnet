import React from 'react'
import './Card.css';
export default function Card(props) {
    return (
        <div>
 	<div class="product-card">
		<div class="badge">Hot</div>
		<div class="product-tumb">
			<img src="https://cdn.pixabay.com/photo/2021/04/19/21/44/mackerel-6192529_1280.png" alt=""/>
		</div>
		<div class="product-details">
			<h4 className='card-title'>{props.name}</h4>
			<p className='card-para'>{props.description}</p>
			<p className='card-para'>Location: {props.location}</p>
			<p className='card-para'>Contact: {props.contact}</p>
			<div class="product-bottom-details">
				<span><div class="product-price">RS.{props.cost}</div> <button className='buynowbtn'>BUY NOW</button></span>
				
			</div>
			<p className='card-para'>posted at {props.time}</p>
		</div>
	</div>
    </div>
    )
}
