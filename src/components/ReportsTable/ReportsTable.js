import React from 'react'
import ReportItem from './ReportItem/ReportItem'
import './ReportsTable.scss'
const ReportsTable = (props) =>{

    return(
        <table className='reports-table'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Concepto</th>
                    <th>Empleado</th>
                    <th>Total</th>
                    <th>Fecha (desde)</th>
                    <th>Fecha (hasta)</th>
                    <th>Aprobado por</th>
                    <th>Detalles</th>
                </tr>
            </thead>
            <tbody>
                {props.reports.map((report)=>(
                    <ReportItem report={report}/>
                ))}
            </tbody>
        </table>
    )
}

export default ReportsTable;