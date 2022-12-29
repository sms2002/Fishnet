import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../components/Card/Card';
import './userlanding.css';
const baseurl = 'http://127.0.0.1:8000'



const Userlanding = () => {

    const [data,setData] = useState([])

    useEffect(()=>{
        fetchData();
    },[])

    async function fetchData(){
        try {
            if(localStorage.getItem('token')==null){
                window.location.href='/signin'
            }
            else{
                await axios.get(`${baseurl}/client`).then((response)=>{
                    console.log(response.data)
                    if(response.status==200){
                        setData(response.data)
                    }
                })
            }
            
        } catch (error) {
            console.log(error)
        }
    }



  return (
    <div >
        <div class="search-local">
	<div class="icon">
		<ion-icon name="location-outline"></ion-icon>
	</div>

	<input type="text" placeholder="Enter element to search"/>
	<button>
		<a href="/">Search</a>
		<ion-icon name="search-outline" class="search-icon"></ion-icon>
	</button>
        </div>
        <div className='carddisplay'>
            {
                data.map(d=>{
                    return(<Card 
            name={d.name}
            description={d.description}
            contact={d.contact}
            location={d.location}
            time={d.time}
            cost= {d.cost}/>)
                })
            }
        
        </div>
      
    </div>
  )
}

export default Userlanding
