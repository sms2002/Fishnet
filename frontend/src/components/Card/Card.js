import React, { useState } from 'react'
import './Card.css';
import axios from 'axios';
export default function Card(props) {


	const [logdata,setData] = useState({
		qty:1
	})

	const addData = (e)=>{
        // console.log(e.target);
        const {name,value} = e.target;
        setData(()=>{
            return{
                ...logdata,
                [name]:value
            }
                
        })
    }

	const baseurl='http://127.0.0.1:8000';
	async function update(){
		try {
			if(props.quantity>=logdata.qty){
				if((props.quantity-logdata.qty)==0){
					await axios.delete(`${baseurl}/products/universal/${props.id}`)
				}
				else{
					await axios.put(`${baseurl}/products/universal/${props.id}?qty=${props.quantity-logdata.qty}`,{
	
					})
				}
			}

			
			window.location.reload();
			
		} catch (error) {
			console.log(error)
		}
		
	}

	let maxlen = 20
    return (
        <div>
 	<div class="product-card">
		<div class="badge">Fresh</div>
		<div class="product-tumb">
			<img src={props.img} alt=""/>
		</div>
		<div class="product-details">
			<a onClick={()=>{window.location.href=`/nutrients/${props.name}`}}><h4 className='card-title'>{props.name}</h4></a>
			<p className='card-para'>{props.description}</p>
			<p className='card-para'>Quantity: {props.quantity}</p>
			<p className='card-para'>Location: {props.location}</p>
			<p className='card-para'>Contact: {props.contact}</p>
			<div class="product-bottom-details">
				
				<span><div class="product-price">RS.{props.cost}</div><di><input className = 'qtyinput' value = {logdata.qty} min={1} max={props.quantity}type={'number'} defaultValue={1} onChange = {addData} name='qty' ></input></di> <button onClick={()=>{update()}} className='buynowbtn'>BUY NOW</button></span>
				
			</div>
			<p className='card-para'>posted at {props.time}</p>
		</div>
	</div>
    </div>
    )
}
