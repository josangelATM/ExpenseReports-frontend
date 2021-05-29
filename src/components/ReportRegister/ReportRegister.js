import React, { useEffect, useState } from 'react'
import { Formik, Form, Field} from 'formik';
import * as Yup from 'yup'
import './ReportRegister.scss'
import ItemsTable from '../ItemsTable/ItemsTable';
import  { useDispatch, useSelector } from 'react-redux'
import { addItem,clearItems } from '../../store/actions/index'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import { checkDatesValidity, dateToObject } from '../../helpers/helpers';
import Loader from '../UI/Loader/Loader';

const validationSchema = Yup.object({
    concept: Yup.string().required(),
    dateFrom: Yup.date().required(),
    dateTo: Yup.date().required(),
    date: Yup.date(),
    accountName: Yup.string(),
    description: Yup.string(),
    totalItem: Yup.string(),
    employeeName: Yup.string().required(''),
    employeePosition: Yup.string().required(''),
    employeeDepartment: Yup.string().required(''),
    employeeSupervisor: Yup.string().required(''),
    totalAmount: Yup.number(),
    approvedBy: Yup.string().required('')
})

const initialValues = {
    concept: '',
    dateFrom: '',
    dateTo: '',
    date: '',
    accountName: '',
    description: '',
    totalItem: '',
    employeeName: '',
    employeePosition: '',
    employeeDepartment: '',
    employeeSupervisor: '',
    totalAmount: '',
    approvedBy: '',
}

const ReportRegister = () => {
    const dispatch = useDispatch()
    const items = useSelector(state => state.item.currentItems)
    const totalAmount = useSelector(state => state.item.totalAmount)
    const user = useSelector(state => state.auth.user)
    const [status,setStatus] = useState('BEFORE')

    const handleSubmit = (values,resetForm) =>{
        setStatus('LOADING')
        let data = values;
        data.items = items;
        data.totalAmount = totalAmount;
        data.createdBy = user.username;
        data.dateTo = dateToObject(data.dateTo)
        data.dateFrom = dateToObject(data.dateFrom)
        axios.post('/reports',data)
        .then(res=>{
            alert(res.data)
            resetForm()
            dispatch(clearItems())
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

    useEffect(()=>{
        dispatch(clearItems())
    },[])

    return(
        <div className='reportRegister'>
            { status === 'LOADING' ? <Loader/> : null}
            <h1 className='reportRegister__title'>REGISTRAR REPORTE DE GASTOS</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values,{ resetForm }) =>{
                    if(checkDatesValidity(values.dateFrom,values.dateTo,items)){
                        handleSubmit(values,resetForm); 
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
                                    <Field className ='input input__report input__report--small'type='number' name='totalItem' id='totalItem'/>
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
                        <button type='submit' className='button--normal' disabled={!dirty || !isValid}>Registrar</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ReportRegister;