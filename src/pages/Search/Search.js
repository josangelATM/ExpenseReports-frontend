import React, { useState } from 'react'
import axios from 'axios'
import { Formik, Form, Field} from 'formik';
import * as Yup from 'yup'
import ReportTables from '../../components/ReportsTable/ReportsTable'
import './Search.scss'
import Loader from '../../components/UI/Loader/Loader';
import Error from '../Error/Error';
const validationSchema = Yup.object({
    query: Yup.string().required(),
    field: Yup.string()
})




const Search = () =>{
    const [reports,setReports] = useState([])
    const [status,setStatus] = useState('BEFORE')

    const handleSubmit = (values) =>{
        setStatus('LOADING')
        axios.get(`/reports/search?query=${values.query}&field=${values.field}`)
        .then(res=>{
            setReports(res.data)
            setStatus('SUCCESS')
        }).catch(err=>{
            alert(err)
        })
    }


    let searchResult = null
    switch(status){
        case 'BEFORE':
        case 'SUCCESS':
            searchResult= <ReportTables reports={reports}/>
            break;
        case 'LOADING':
            searchResult = <Loader/>
            break;
        case 'FAIL':
        default:
            searchResult= <Error/>
            break;
        
    }

    return(
        <div className='search'>
            <h1 className='search__title'>Buscador de Reportes</h1>
            <Formik
                initialValues={{query:'',field:'concept'}}
                validationSchema={validationSchema}
                onSubmit={(values) =>{
                    handleSubmit(values);    
                }}
            >
                {({dirty, isValid, values,handleChange}) =>(
                    <Form className='search__form'>
                       <Field type='text' name='query' placeholder='Concepto/Empleado/Posición...' className='input login__input search__input'/>
                       <select name='field' onChange={handleChange} value={values.field} className='input login__input'>  
                            <option value='concept'selected>Concepto</option>
                            <option value='employeeName'>Nombre de Empleado</option>
                            <option value='employeePosition'>Posición de Empleado</option>
                            <option value='employeeDepartment'>Departamento de Empleado</option>
                            <option value='employeeSupervisor'>Supervisor de Empleado</option>
                            <option value='approvedBy'>Aprobado por</option>
                        </select>
                       <button className='button--normal' type='submit' disabled={!dirty || !isValid}>Buscar</button>       
                    </Form>
                )}
                </Formik>
                {searchResult}
        </div>
    )
}

export default Search;