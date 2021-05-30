import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFrown } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import '../Error/Error.scss'
const NotFound = () =>(
    <div className='error'>
        <FontAwesomeIcon icon={faFrown} size='10x'/>
        <h1>La página que solicitaste no existe, lo sentimos</h1>
    </div>
)

export default NotFound;