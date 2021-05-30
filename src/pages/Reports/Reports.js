import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReportTables from '../../components/ReportsTable/ReportsTable'
import './Reports.scss'
import Loader from '../../components/UI/Loader/Loader'
import Error from '../Error/Error'
const Reports = () =>{
    const [reports,setReports] = useState([])
    const [status,setStatus] = useState('LOADING')

    const fetchReports = () =>{
        axios.get('/reports')
        .then((res) =>{
            setReports(res.data)
            setStatus('SUCCESS')
        }).catch((err)=>{
            alert(err)
            setStatus('FAIL')
        })
    }

    

    useEffect(() =>{
        fetchReports()
    },[])


    switch(status){
        case 'LOADING':
            return(
                <Loader/>
            )
        case 'SUCCESS':
            return(
                <div className='reports'>
                    <h1 className='reports__title'>REPORTES DE GASTOS</h1>
                    <ReportTables reports={reports}/>
                </div>
            )
        case 'FAIL':
        default:
            <Error/>
    }
}

export default Reports;