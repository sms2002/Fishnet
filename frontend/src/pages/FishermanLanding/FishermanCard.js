import React from 'react'
import './FishermanCard.css';
import Plus from '../../components/Plus/Plus';
export default function FishermanCard() {
	return (
		<div>
			<div class="product-card">
				<div class="badge">Hot</div>
				<div class="product-tumb">
					<img src="https://cdn.pixabay.com/photo/2021/04/19/21/44/mackerel-6192529_1280.png" alt="" />
				</div>
				<div class="product-details">
					<div className="button_fish_flex">
						<a href="#" className="btn btn-outline">Update</a>
						<a href="#" className="btn btn-outlined">Delete</a>
					</div>
					<h4 className='card-title'>Mackerel</h4>
					<p className='card-para'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, possimus nostrum!</p>
					<div class="product-bottom-details">
						<div class="product-price">$230.99</div>
					</div>
				</div>
			</div>
			<Plus/>
		</div>
	)
}
