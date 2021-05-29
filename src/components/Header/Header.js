import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt,faUserPlus,faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.scss'
import { useDispatch, useSelector } from 'react-redux';
import Auxiliary from '../../hoc/Auxiliary.js/Auxiliary';
import { logout } from '../../store/actions';

const Header = () =>{
    const isLogged = useSelector(state => state.auth.isLogged)
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()

    return(
        <header className='header'>
            <nav className='header__nav'>
                <NavLink to='/reports/index' className='header__navlink' activeClassName='header__active'>Reportes</NavLink>
                <NavLink to='/reports/register' className='header__navlink' activeClassName='header__active'>Registrar</NavLink>
                <NavLink to='/reports/search' className='header__navlink' activeClassName='header__active'>Buscar</NavLink>
            </nav>
            <div className='header__user'>
                { isLogged ? 
                <Auxiliary>
                    <div className='header__userName'>
                        <p>{user.username}</p>
                    </div>
                    <div className='header__userBtn' onClick={() => dispatch(logout())}>
                        <span>Logout</span>
                        <FontAwesomeIcon icon={faSignOutAlt} className='header__icon'/>
                    </div>
                </Auxiliary>
                
                :
                <Auxiliary>
                    <Link to='/login' className='header__userBtn'>
                        <span>Iniciar Sesión</span>
                        <FontAwesomeIcon icon={faSignInAlt} className='header__icon'/>
                    </Link>
                    <Link to='/register' className='header__userBtn'>
                        <span>Registrarse</span>
                        <FontAwesomeIcon icon={faUserPlus} className='header__icon'/>
                    </Link> 
                </Auxiliary>
                
                }
                
            </div>
        </header>   
    )
}
export default Header;