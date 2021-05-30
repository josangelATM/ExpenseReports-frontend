import './App.scss';
import React from 'react';
import {BrowserRouter as Router,Switch,Route, Redirect } from "react-router-dom";
import Header from './components/Header/Header'
import ReportRegister from './components/ReportRegister/ReportRegister';
import Login from './components/Login/Login'
import Register from './components/Register/Register';
import Reports from './pages/Reports/Reports'
import Report from './pages/Report/Report';
import Search from './pages/Search/Search';
import { useSelector } from 'react-redux';
import NotFound from './pages/NotFound/NotFound';
function App() {
  const isLogged = useSelector(state => state.auth.isLogged)
  return (  
    <Router>
      <div className='app'>
        <Header/>
      <main className='app__main'>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/reports/index'/>
          </Route>
          <Route path='/login' exact>
            <Login/>
          </Route>
          <Route path='/Register' exact>
            <Register/>
          </Route>
          <Route path='/reports/index' exact>
            { isLogged ? <Reports/> : <Redirect to='/login'/> }
          </Route>
          <Route path='/reports/register'>
            { isLogged ? <ReportRegister/> : <Redirect to='/login'/> }
          </Route>
          <Route path='/reports/search'>
            { isLogged ? <Search/> : <Redirect to='/login'/> }
          </Route>
          <Route path='/reports/:ID'>
            { isLogged ? <Report/> : <Redirect to='/login'/> } 
          </Route>
          <Route>
              <NotFound/>
          </Route>
        </Switch>
      </main>
    </div>
    </Router>
  );
}

export default App;
