import React from 'react';
import {BrowserRouter,Route,Link,Switch} from 'react-router-dom'
import Register from './components/user/Register'
import swal from 'sweetalert'
import {Navbar,Nav,NavItem} from 'react-bootstrap'
import {connect} from 'react-redux'
import Login from './components/user/Login'
import {startRemoveUser} from './actions/user'
import Dashboard from './components/tasks/TaskList'
import ResetPassword from './components/user/ResetPasword'
import NewPassword from './components/user/NewPassword'
import Archive from './components/tasks/Archive'
import Bin from './components/tasks/Bin'
import Label from './components/tasks/Label'

function App(props) {
  return (
    <BrowserRouter>
      <Navbar bg="dark" variant="dark" >
      <Navbar.Brand >Google Keep</Navbar.Brand>
      <Nav className="ml-auto">
        
     
      { (Object.keys(props.user).length===0)?(
        <React.Fragment>
          <NavItem>
      <Link to ="/users/register"> Register</Link> |
      </NavItem>
      <NavItem>
      <Link to ="/users/login"> Login </Link> 
      </NavItem>
      </React.Fragment>
      ):
       
      <React.Fragment>
        <NavItem>
        <Link to ="/dashboard">Dashboard</Link>
        </NavItem>

        
      <NavItem> |
      <Link to ="#" onClick={()=>{
            swal({
              title: "Are you sure you want to log out?",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            })
            .then((willDelete) => {
              if (willDelete) {
                swal("Successfully Logged out", {
                  icon: "success",
                  timer: 500
                });
                props.dispatch(startRemoveUser())
              } 
            })
            }}> Logout</Link>
            </NavItem>
       </React.Fragment>
       
          }
       </Nav>
       </Navbar>
      <Switch>
      <Route path="/users/register" component={Register}/>
      <Route path ="/users/login" component={Login}/>
      <Route path ="/dashboard"  component={Dashboard}/>
      <Route path="/reset" exact={true} component={ResetPassword}/>
      <Route path="/api/new-Password" component={NewPassword}/>
      <Route path="/archive" component={Archive}/>
      <Route path ="/bin" component={Bin}/>
      <Route path ="/label" component={Label}/>
      </Switch>
      </BrowserRouter>
  );
}  
const mapStateToProps=(state)=>{
  return{
    user:state.user
  }
}

export default connect(mapStateToProps)(App)
