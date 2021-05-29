import React from 'react'
import  { useSelector }  from 'react-redux'
import ItemRow from './ItemRow/ItemRow'
import './ItemsTable.scss'
const ItemsTable = (props) =>{
    const items = useSelector(state => state.item.currentItems)
    return(
        <table className='items-table'>
        <thead>
            <tr>
                <th>Fecha</th>
                <th>Cuenta</th>
                <th>Descripción</th>
                <th>Total</th>
                <th>Eliminar</th>
            </tr>
        </thead>
        <tbody>
            {items.map((item,idx) =>(
                <ItemRow item={item} key={idx}/>
            ))}
        </tbody>
    </table>
    )
}

export default ItemsTable;