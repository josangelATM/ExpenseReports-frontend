import React from 'react' 
import { Link } from 'react-router-dom';
import { formatDate, objectDateToString } from '../../../helpers/helpers';
import './ReportItem.scss'
const ReportItem = (props) =>{
    return(
        <tr className='row'>
            <td className='row__data'>{props.report._id}</td>
            <td className='row__data'>{props.report.concept}</td>
            <td className='row__data'>{props.report.employeeName}</td>
            <td className='row__data'>{ parseFloat(props.report.totalAmount).toFixed(2)}</td>
            <td className='row__data'>{objectDateToString(props.report.dateFrom)}</td>
            <td className='row__data'>{objectDateToString(props.report.dateTo)}</td>
            <td className='row__data'>{props.report.approvedBy}</td>
            <td className='row__data'><Link to={`/reports/${props.report._id}`}>Ver detalles</Link></td>
        </tr>
    )
}

export default ReportItem;