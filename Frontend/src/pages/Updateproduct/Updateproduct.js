import React,{useEffect, useState,useParams} from 'react'
import axios from'axios';
import {  } from 'react-router'

export default function Updateproducts() {
        const baseurl = 'http://127.0.0.1:8000'
        let {id} = useParams();

    const [logdata,setData] = useState({
        name:'',
        description:'',
        cost:'',
        qty:'',
        contact:'',
        location:''
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


    useEffect(()=>{
        fetchData();
        console.log(logdata)
    },[]);
    async function fetchData(){
        try {
                if (localStorage.getItem('token') === null) {
                  window.location.href = '/signin'
                }
                const config = {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                  }
                }
            await axios.get(`${baseurl}/products/${id}`,config).then((response)=>{
                if(response.status==200){
                    console.log(response.data)
                    setData(response.data)

                }
                else{
                    console.log(response.data)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }


    async function updateproduct(){
        try {
            if (localStorage.getItem('token') === null) {
              window.location.href = '/signin'
            }
            const config = {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }
        await axios.put(`${baseurl}/products/${id}`,{
            name:logdata.name,
            description:logdata.description,
            cost:logdata.cost,
            qty:logdata.qty,
            contact:logdata.contact,
            location:logdata.location
        },config).then((response)=>{
            if(response.status==200){
                console.log(response.data)
                window.location.href='/FishermanLanding'

            }
            else{
                console.log(response.data)
            }
        })
    } catch (error) {
        console.log(error)
    }
    }







    return (
        <div>
            <div className="login-signup l-attop" id="signup">
                <div className="login-signup-title">
                    Update Product
                </div>
                <div className="login-signup-content">
                    <div className="input-name">
                        <h2>Name</h2>
                    </div>
                    <input type="text" onChange={addData} name="name" value={logdata.name} className="field-input" />
                    <div className="input-name input-margin">
                        <h2>Description</h2>

                    </div>
                    <input type="text" onChange={addData} name="description" value={logdata.description} className="field-input" />

                    <div className="input-name input-margin">
                        <h2>Cost</h2>

                    </div>
                    <input type="number" onChange={addData} name="cost" value={logdata.cost} className="field-input" />

                    <div className="input-name input-margin">
                        <h2>Qty</h2>

                    </div>
                    <input type="number" onChange={addData} name="qty" value={logdata.qty} className="field-input" />

                    <div className="input-name input-margin">
                        <h2>Contact</h2>

                    </div>
                    <input type="text" onChange={addData} name="contact" value={logdata.contact} className="field-input" />

                    <div className="input-name input-margin">
                        <h2>Location</h2>

                    </div>
                    <input type="text" onChange={addData} name="location" value={logdata.location} className="field-input" />

                    <button className="submit-btn" onClick={() => {
                        console.log(logdata)
                        updateproduct();
                    }}>
                        Enter
                    </button>


                </div>
            </div>
        </div>
    )
}