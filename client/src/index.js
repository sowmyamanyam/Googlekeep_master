import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'
import axios from './config/axios'
import {setUser} from './actions/user'
import {startSetTasks} from './actions/tasks'

const store = configureStore()

// console.log(store.getState())
// store.subscribe(()=>{
//     console.log(store.getState())
// })

if(localStorage.getItem('authToken')){
    axios.get('/users/account',{
        headers:{
            'x-auth':localStorage.getItem('authToken')
        }
    })
    .then((response)=>{
        const user=response.data
        store.dispatch(setUser(user))
        store.dispatch(startSetTasks()) 
    })
}

ReactDOM.render(<Provider store={store}>
<App /> </Provider> , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
