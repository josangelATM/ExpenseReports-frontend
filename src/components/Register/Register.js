import React, { useState } from 'react'
import '../Login/Login.scss';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { Redirect } from 'react-router';
import Loader from '../UI/Loader/Loader'
const validationSchema = Yup.object({
    username: Yup.string().required(),
    password: Yup.string().required(),
    passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Contraseñas deben coincidir')
})


const Register = () => {
    const [showPassword,setShowPassword] = useState(false)
    const [status,setStatus] = useState('BEFORE')
    const handleSubmit = (values) =>{
        console.log(values)
        setStatus('LOADING')
        axios.post('/users/register',values)
        .then(res =>{
            alert(res.data)
            setStatus('SUCCESS')
        }).catch(err =>{
            alert(err)
            setStatus('FAIL')
        })
    }

    switch(status){
        case 'FAIL':
        case 'BEFORE': //Return Register form
            return(
                <div className='login'>
            <h1 className='login__title'>REGISTRO</h1>
            <Formik
                initialValues={{username:'',password:'',passwordConfirmation:''}}
                validationSchema={validationSchema}
                onSubmit={(values) =>{
                    handleSubmit(values);    
                }}
            >
                {({dirty, isValid, values,errors}) =>(
                    <Form className='login__form'>
                       <Field type='text' name='username' placeholder='Usuario' className='input login__input'/>
                       <Field type={showPassword ? 'text':'password'} name='password' placeholder='Contraseña' className='input login__input'/>
                       <Field type={showPassword ? 'text':'password'} name='passwordConfirmation' placeholder='Contraseña' className='input login__input'/>
                       <div className='login__showPassword' onClick={() => setShowPassword(!showPassword)}>
                            <Field type='checkbox' className='login__checkbox' id='showPassword' checked={showPassword}/>
                            <label htmlFor='showPassword'>Mostrar contraseña</label>
                       </div> 
                       <button className='button--normal' disabled={!dirty || !isValid}>Registrarme</button>     
                        {console.log(errors)}
                    </Form>
                )}
            </Formik>
        </div>
            )
        case 'LOADING':
            return(
                <Loader/>
            )
        case 'SUCCESS': //Redirect to Login
            return(
                <Redirect to='/login' />
            )
        
    }


}

export default Register;