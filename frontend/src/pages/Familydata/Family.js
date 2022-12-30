import React from 'react'
import Speciescard from '../../components/Speciescard/Speciescard'
import './Family.css'

const Family = (props) => {
  return (
    <div>
        <h1 className='family_head'>{props.familyname}</h1>
        <div className='center_fam'>
            {
                props.cardvalue.map(d=>{
                    return(
                        <Speciescard 
                        name={d[0]}
                        temp = {d[1]}
                        ph={d[2]}
                        dh={d[3]}
                        size={d[4]}
                        breeding={d[5]}
                    />
                    )
                    
                })
            }
        </div>
        
    </div>
  )
}

export default Family
