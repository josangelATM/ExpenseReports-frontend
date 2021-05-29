import React, { useState } from 'react'
import './Login.scss';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { Redirect } from 'react-router';
import { useDispatch } from 'react-redux';
import { login } from '../../store/actions/index'
const validationSchema = Yup.object({
    username: Yup.string().required(),
    password: Yup.string().required()
})


const Login = () => {
    const [showPassword,setShowPassword] = useState(false)
    const [status,setStatus] = useState('BEFORE')
    const dispatch = useDispatch()

    const handleSubmit = (values) =>{
        setStatus('LOADING')
        axios.post('/users/login',values)
        .then(res=>{
            localStorage.setItem('user_expenseReport', JSON.stringify(res.data))
            dispatch(login(res.data))
            setStatus('SUCCESS')
        })
        .catch(err=>{
            setStatus('FAIL')
            alert(err)
        })
    }

    switch(status){
        case 'FAIL':
        case 'BEFORE': //Return the login form.
            return(
                <div className='login'>
                    <h1 className='login__title'>INICIAR SESIÓN</h1>
                    <Formik
                        initialValues={{username:'',password:''}}
                        validationSchema={validationSchema}
                        onSubmit={(values) =>{
                            handleSubmit(values);    
                        }}
                    >
                        {({dirty, isValid, values}) =>(
                            <Form className='login__form'>
                               <Field type='text' name='username' placeholder='Usuario' className='input login__input'/>
                               <Field type={showPassword ? 'text':'password'} name='password' placeholder='Contraseña' className='input login__input'/>
                               <div className='login__showPassword' onClick={() => setShowPassword(!showPassword)}>
                                    <Field type='checkbox' className='login__checkbox' id='showPassword' checked={showPassword}/>
                                    <label htmlFor='showPassword'>Mostrar contraseña</label>
                               </div> 
                               <button className='button--normal' disabled={!dirty || !isValid}>Ingresar</button>       
                            </Form>
                        )}
                    </Formik>
                </div>
            )
        case 'LOADING': //Return the loader
            return(<div></div>)
        case 'SUCCESS': //Redirect to reports
            return(
                <Redirect to='/reports/index'/>
            )
        default: 
            return(
                <div>Hubo un error, intentelo más tarde</div>
            )
    }
}

export default Login;