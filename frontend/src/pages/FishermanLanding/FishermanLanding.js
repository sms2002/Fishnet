import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Plus from '../../components/Plus/Plus';
import FishermanCard from '../../components/FishermanCard/FishermanCard';

const baseurl = 'http://127.0.0.1:8000'

let pic = [
    "https://cdn.pixabay.com/photo/2021/04/19/21/44/mackerel-6192529_1280.png",
    "http://4.bp.blogspot.com/-TK7OOd3SljY/Tum7WWfH6oI/AAAAAAAAFsY/Ev390ZyUsf8/s1920/fish_hd_wallpaper-7.jpg",
    "https://4.bp.blogspot.com/-YRiO6SqoLZQ/UolAjC-GliI/AAAAAAAAD10/pz8KL2ezKFQ/s1600/Tropical_Fish_4.jpg",
    "http://2.bp.blogspot.com/_W90V87w3sr8/TRITDupmFWI/AAAAAAAAAeg/vZYB-OOf1r0/s1600/Angel_fish_white.jpg"
]

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
                    img = {pic[d.id%4]} 
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