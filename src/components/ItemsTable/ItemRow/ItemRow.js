import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import './ItemRow.scss'
import { useDispatch } from 'react-redux'
import { deleteItem } from '../../../store/actions/index'
import { objectDateToString } from '../../../helpers/helpers'

const ItemRow = (props) =>{
    const dispatch = useDispatch()
    console.log(props.item)
    return(
        <tr className='row'>
            <td className='row__data'>{objectDateToString(props.item.date)}</td> 
            <td className='row__data'>{props.item.accountName}</td>
            <td className='row__data'>{ props.item.description.length > 55 ? `${props.item.description.substring(0,35)}...` : props.item.description}</td>
            <td className='row__data'>{parseFloat(props.item.totalItem).toFixed(2)}</td>
            <td className='row__data'><FontAwesomeIcon className='row__icon' icon={faTrashAlt} onClick={()=>dispatch(deleteItem(props.item.id))}/></td>
        </tr>
    )
}
    
export default ItemRow;