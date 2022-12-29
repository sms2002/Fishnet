import React from 'react'
import './Speciescard.css'

const Speciescard = (props) => {
  return (
    <div>
      <div id="mainbox">
<div class="card">
  <h1>{props.name}</h1>
  <h3>pH: {props.ph}</h3>
  <h3>dH: {props.dh}</h3>
  <h3>size: {props.size}</h3>
  <h3>breeding: {props.breeding}</h3>

</div>   
</div>
    </div>
  )
}

export default Speciescard
