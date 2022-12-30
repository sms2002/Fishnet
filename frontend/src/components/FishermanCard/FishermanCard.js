import axios from 'axios';
import React from 'react'
import './FishermanCard.css';

const baseurl1='http://127.0.0.1:8000';
export default function FishermanCard(props) {

	async function deleteProduct(){
		try {
			const config = {
				headers: {
				  Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			  }
			await axios.delete(`${baseurl1}/products/${props.id}`,config).then(response=>{
				if(response.status==200){
					window.location.reload();
				}
			})
		} catch (error) {
			console.log(error)
		}
	}


	return (
		<div>
			<div class="product-card">
				<div class="badge">Fresh</div>
				<div class="product-tumb">
					<img src="https://cdn.pixabay.com/photo/2021/04/19/21/44/mackerel-6192529_1280.png" alt="" />
				</div>
				<div class="product-details">
					<div className="button_fish_flex">
						<a onClick={()=>{window.location.href=`/update/${props.id}`}} className="btn btn-outline"><h1 className='update_head'>Update</h1></a>
						<a onClick={()=>{deleteProduct();}} className="btn btn-outlined"><h1 className='update_head'>Delete</h1></a>
					</div>
					<h4 className='card-title'>{props.name}</h4>
					<p className='card-para'>{props.description}</p>
					<h4 className='card-title'>Quantity: {props.quantity}</h4>
					<p className='card-para'>Location: {props.location}</p>
					<p className='card-para'>Contact: {props.contact}</p>
					<div class="product-bottom-details">
						<span><div class="product-price">RS.{props.cost}</div></span>
					</div>
					<p className='card-para'>posted at {props.time}</p>
				</div>
			</div>
		</div>
			
	)
}		
