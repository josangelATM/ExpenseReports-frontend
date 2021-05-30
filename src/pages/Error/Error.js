import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFrown } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import './Error.scss'
const Error = () =>(
    <div className='error'>
        <FontAwesomeIcon icon={faFrown} size='10x'/>
        <h1>Ha ocurrido un error, lo sentimos mucho, intentalo más tarde</h1>
    </div>
)

export default Error;