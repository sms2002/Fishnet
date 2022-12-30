import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../components/Card/Card';
import './userlanding.css';
const baseurl = 'http://127.0.0.1:8000'



const Userlanding = () => {

    const [data,setData] = useState([])
    const [logdata,setSearch]=useState({
        search:''
    })

    const addData = (e)=>{
        // console.log(e.target);
        const {name,value} = e.target;
        setSearch(()=>{
            return{
                ...logdata,
                [name]:value
            }
                
        })
        console.log(data)
    }

    useEffect(()=>{
        fetchData();
    },[1])

    async function fetchData(){
        try {
            if(localStorage.getItem('token')==null){
                window.location.href='/signin'
            }
            else{
                await axios.get(`${baseurl}/client`).then((response)=>{
                    if(response.status==200){
                        setData(response.data)
                    }
                })
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    async function searchproduct(){
        try {
            const config = {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              }
            let str1 = logdata.search
            await axios.get(`${baseurl}/client/search/${str1.toLowerCase()}`,config).then(response=>{
                console.log(response)
                setData(response.data)
            })
            
        } catch (error) {
            
        }
    }


  return (
    <div >
        <div class="search-local">
	<div class="icon">
		<ion-icon name="location-outline"></ion-icon>
	</div>

	<input type="text" placeholder="Enter element to search" name='search' value={logdata.search} onChange={addData}/>
	<button>
		<a onClick={()=>{searchproduct()}}>Search</a>
		<ion-icon name="search-outline" class="search-icon"></ion-icon>
	</button>
        </div>
        <div className='carddisplay'>
            {
                data.map(d=>{
                    return(<Card 
                        id = {d.id}
            name={d.name}
            description={d.description}
            contact={d.contact}
            location={d.location}
            quantity={d.qty}
            time={d.time.slice(0,16)}
            cost= {d.cost}/>)
                })
            }
        
        </div>
      
    </div>
  )
}

export default Userlanding
