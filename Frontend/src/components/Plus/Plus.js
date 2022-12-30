import React from 'react'
import './Plus.css'

export default function Plus() {
    return (
        <div>
            <div class="button__holder group_dashhead">
                <button onClick={()=>{window.location.href='/Product'}} class="plus"></button>
            </div>
        </div>
    )
}
