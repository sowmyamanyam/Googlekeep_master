import axios from '../config/axios'
import swal from 'sweetalert'

export const setUser = (user) => {
    return {
        type: 'SET_USER',
        payload: user
    }
}
export const removeUser = () => {
    return {
        type: 'REMOVE_USER'
    }
}


export const startSetUser=(loginData,redirect)=>{
    return (dispatch)=>{
        axios.post('/users/login',loginData,)
        .then(response=>{
            if(response.data.hasOwnProperty('errors')){
                swal(`${response.data.errors}`,"","error")
            } else {
                swal({title: "LoggedIn!",
                    text: `Successfully LoggedIn!`,
                    icon: "success",
                    timer: 1000})
                localStorage.setItem('authToken',response.data.token)
                dispatch(setUser(response.data.user))
                redirect() 
                setTimeout(()=>document.location.reload(),100)
            }
        })
        .catch((err)=>{
            alert(err)
        })

    }
}


export const startAddUser = (registerData,redirect) => {
    return(dispatch=>{
        axios.post('/users/register',registerData)
            .then(response=>{
                console.log(response.data)
                if(response.data.errors){
                    swal(`${response.data.errors.message || response.data.errors.errmsg}`,"","error")
                } else {
                    swal({title: "Registered!",
                    text: `Successfully Registered!`,
                    icon: "success",
                    timer: 1000})
                    redirect()
                   
                }
            })

            .catch((err)=>{
                alert(err)
             })
    })

}
export const startRemoveUser = () => {
    return(dispatch=>{
        axios.delete('/users/logout',{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response=>{
                if(response.data.errors){
                    alert(response.data.message)
                } else {
                    localStorage.removeItem('authToken')
                    dispatch(removeUser())
                    window.location.href="/"
                }
            })
    })
}


