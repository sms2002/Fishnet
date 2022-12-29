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
                        temp = {d[2]}
                        ph={d[3]}
                        dh={d[4]}
                        size={d[5]}
                        breeding={d[6]}
                    />
                    )
                    
                })
            }
        </div>
        
    </div>
  )
}

export default Family
