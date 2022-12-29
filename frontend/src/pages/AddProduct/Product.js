import React,{useState} from 'react'
import axios from'axios';

export default function Product() {
        const baseurl = 'http://127.0.0.1:8000'

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

    async function Token(){
        try {
                if (localStorage.getItem('token') === null) {
                  window.location.href = '/signin'
                }
                const config = {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                  }
                }
            await axios.post(`${baseurl}/products`,{
                name:logdata.name,
                description:logdata.description,
                cost:logdata.cost,
                qty:logdata.qty,
                contact:logdata.contact,
                location:logdata.location
            },config).then((response)=>{
                if(response.data.status==200){
                    window.location.href = '/'
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
                    Product
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
                        Token()
                    }}>
                        Enter
                    </button>


                </div>
            </div>
        </div>
    )
}
