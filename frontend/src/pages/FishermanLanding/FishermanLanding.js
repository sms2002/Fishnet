import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Plus from '../../components/Plus/Plus';
import FishermanCard from '../../components/FishermanCard/FishermanCard';

const baseurl = 'http://127.0.0.1:8000'

const FishermanLanding = () => {

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
                const config = {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                  }
                await axios.get(`${baseurl}/products/user`,config).then((response)=>{
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
    <div>
        
            {data.length==0&&<h1 style={{ display: 'flex',justifyContent:'center',marginTop:'30rem'
             }}>No Products Listed</h1>}
            {
            data.map(d=>{
                return(
                    <FishermanCard 
                    id = {d.id}
                    name={d.name}
                    description={d.description}
                    quantity={d.qty}
                    contact={d.contact}
                    location={d.location}
                    time={d.time.slice(0,16)}
                    cost= {d.cost}
                    />
                )
            })
        }
        <Plus/>
    </div>
  )
}

export default FishermanLanding