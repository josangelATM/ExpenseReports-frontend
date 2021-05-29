import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Redirect, withRouter } from 'react-router-dom'
import { Formik, Form, Field} from 'formik';
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { addItem, clearItems } from '../../store/actions/index'
import ItemsTable from '../../components/ItemsTable/ItemsTable'
import { v4 as uuidv4 } from 'uuid';
import { dateToObject, formatDateToInitialValues,checkDatesValidity } from '../../helpers/helpers';
import './Report.scss'
import Loader from '../../components/UI/Loader/Loader';
const validationSchema = Yup.object({
    concept: Yup.string().required(),
    dateFrom: Yup.date().required(),
    dateTo: Yup.date().required(),
    employeeName: Yup.string().required(''),
    employeePosition: Yup.string().required(''),
    employeeDepartment: Yup.string().required(''),
    employeeSupervisor: Yup.string().required(''),
    totalAmount: Yup.number(),
    approvedBy: Yup.string().required('')
})

const Report = (props) =>{
    const ID = props.match.params.ID;
    const [report, setReport] = useState({})
    const [status,setStatus] = useState('LOADING')
    const dispatch = useDispatch()
    const totalAmount = useSelector(state=> state.item.totalAmount)
    const items = useSelector(state => state.item.currentItems)

    const fetchReport = () =>{
        axios.get(`/reports/${ID}`)
        .then(res=>{
            res.data.dateFrom = formatDateToInitialValues(res.data.dateFrom)
            res.data.dateTo = formatDateToInitialValues(res.data.dateTo)
            setReport(res.data)
            res.data.items.forEach((item =>{
                item.id = uuidv4();
                dispatch(addItem(item))
            }))   
            setStatus('SUCCESS')         
        }).catch(err=>{
            alert(err)
            setStatus('FAIL')
        })
    }

    const addItemRedux = (values) =>{
        let item = {
            date : dateToObject(values.date),
            accountName : values.accountName,
            description: values.description,
            totalItem : values.totalItem,
            id: uuidv4()
        }
        dispatch(addItem(item))
    }

    const updateReport = (values) =>{
        let data = values;
        data.items = items;
        data.totalAmount = totalAmount;
        data.dateTo = dateToObject(data.dateTo)
        data.dateFrom = dateToObject(data.dateFrom)
        axios.patch(`/reports/${ID}`,data)
        .then(res=>{
            alert(res.data)
        }).catch(err=>{
            alert(err)
        })
    }

    const deleteReport = () =>{
        setStatus('LOADING')
        axios.delete(`/reports/${ID}`)
        .then(res=>{
            setStatus('DELETED')
            alert(res.data)
        }).catch(err=>{
            setStatus('FAIL')
            alert(err)
        })
    }


    const confirmationAlert = () =>{
        const answ = window.confirm('¿Seguro que deseas eliminar este reporte?')
        if(answ){
            deleteReport()
        }
    }

    useEffect(()=>{
        dispatch(clearItems())
        fetchReport()
    },[ID])

    switch(status){
        case 'LOADING':
            return(
                <Loader/>
            )
        case 'SUCCESS':
            return(
                <div className='reportRegister'>
        <h1 className='reportRegister__title'>{`REPORTE DE GASTO #${report._id}`}</h1>
        <Formik
            initialValues={report}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={(values) =>{
                if(checkDatesValidity(values.dateFrom,values.dateTo,items)){
                    updateReport(values); 
                }  
            }}
        >
            {({dirty, isValid, values,errors}) =>(
               
                <Form className='reportRegister__form'>
                    <div className='reportRegister__upper-inputs'>
                        <div className='reportRegister__input-container'>
                            <label htmlFor='concept'>Concepto</label>
                            <Field className ='input input__report input__report--small' type='text' name='concept' id='concept'/>
                        </div>
                        <div className='reportRegister__input-container'>
                            <label htmlFor='dateFrom'>Fecha (desde)</label>
                            <Field className ='input input__report input__report--small' type='date' name='dateFrom' id='dateFrom'/>
                        </div >
                        <div className='reportRegister__input-container'>
                            <label htmlFor='dateTo'>Fecha (hasta)</label>
                            <Field className ='input input__report input__report--small' type='date' name='dateTo' id='dateTo'/>
                        </div>
                    </div>
                    <h3>Información del empleado</h3>
                    <div className='reportRegister__employee-container'>
                        <div className='reportRegister__employee-subcontainer'>
                            <div className='reportRegister__input-container'>
                                <label htmlFor='employeeName'>Nombre</label>
                                <Field className ='input input__report'type='text' name='employeeName' id='employeeName'/>
                            </div>
                            <div className='reportRegister__input-container'>
                                <label htmlFor='employeePosition'>Posición</label>
                                <Field className ='input input__report'type='text' name='employeePosition' id='employeePosition'/>
                            </div>   
                        </div>
                        <div className='reportRegister__employee-subcontainer'>
                            <div className='reportRegister__input-container'>
                                <label htmlFor='employeeDepartment'>Departamento</label>
                                <Field className ='input input__report'type='text' name='employeeDepartment' id='employeeDepartment'/>
                            </div>
                            <div className='reportRegister__input-container'>
                                <label htmlFor='employeeSupervisor'>Supervisor</label>
                                <Field className ='input input__report'type='text' name='employeeSupervisor' id='employeeSupervisor'/>
                            </div> 
                        </div>
                    </div>
                    <div className='reportRegister__expense-container'>
                        <h3 className='title'>Agregar gasto</h3>
                        <div className='reportRegister__expense-form'>
                            <div className='reportRegister__input-container'>
                                <label htmlFor='date'>Fecha</label>
                                <Field className ='input input__report input__report--small'type='date' name='date' id='date'/>
                            </div> 
                            <div className='reportRegister__input-container'>
                                <label htmlFor='accountName'>Cuenta</label>
                                <Field className ='input input__report input__report--small'type='text' name='accountName' id='accountName'/>
                            </div> 
                            <div className='reportRegister__input-container'>
                                <label htmlFor='description'>Descripción</label>
                                <Field as='textarea' rows="4" cols="50" className ='input input__report input__report--small'type='text' name='description' id='description'/>
                            </div> 
                            <div className='reportRegister__input-container'>
                                <label htmlFor='totalItem'>Total</label>
                                <Field className ='input input__report input__report--small'type='text' name='totalItem' id='totalItem'/>
                            </div> 
                        </div>
                        <button type={'button'} className='button--normal reportRegister__addButton' onClick={() => addItemRedux(values)} >Agregar</button>
                        
                        <ItemsTable/>
                    </div>


                    <div className='reportRegister__input-container'>
                        <label htmlFor='totalAmount'>Monto Total</label>
                        <Field className ='input input__report input__report--medium' type='text' disabled name='totalAmount' id='totalAmount' value={totalAmount}/>
                    </div>
                    <div className='reportRegister__input-container'>
                        <label htmlFor='approvedBy'>Aprobado por</label>
                        <Field className ='input input__report input__report--medium'type='text' name='approvedBy' id='approvedBy'/>
                    </div> 
                    <div className='reportRegister__input-container'>
                        <label htmlFor='createdBy'>Creado por</label>
                        <Field className ='input input__report input__report--medium'type='text' name='createdBy' id='createdBy' disabled/>
                    </div> 
                    <div>
                        <button type='submit' className='button--normal' disabled={!isValid}>Actualizar</button>
                        <button type='button' className='button--normal reportRegister__addButton' onClick={confirmationAlert}>Eliminar</button>
                    </div>
                    
                </Form>
            )}
        </Formik>
    </div>
            )
        case 'DELETED':
            return(
                <Redirect to='/reports/index'/>
            )
        case 'FAIL':
        default:
            return(
                <div>Hubo un error intentalo más tarde</div>
            )
    }
}

export default withRouter(Report);