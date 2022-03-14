import axios from '../config/axios'
import swal from 'sweetalert'
export const addTask=(task)=>{
    return {
        type:"ADD_TASK",
        payload:task
    }
}
export const setTasks=(tasks)=>{
    return{
        type:"SET_TASK",
        payload:tasks
    }
}
export const editTask=(task)=>{
    return {
        type:"EDIT_TASK",
        payload:task
    }
}
export const deleteTask=(id)=>{
    return{
        type:"REMOVE_TASK",
        payload:id
    }
}
export const startEditTask=(obj,id)=>{
    return(dispatch)=>{
        axios.put(`/task/${id}`,obj,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            if(response.data.errors){
                swal(`${response.data.errors.message}`,"","error")
            }
            else{
            swal({
                title: "Edited!",
                text: `Edited! You can close the Modal`,
                icon: "success",
                timer: 2000
                })
            dispatch(editTask(response.data))
            }
        })
        .catch((err)=>{
            alert(err)
        })
    }
}

export const startTaskDelete=(id)=>{
    return(dispatch)=>{
        axios.delete(`/task/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            if(response.data.errors){
                swal(`${response.data.errors.message}`,"","error")
            }
            else{
                swal({
                    title: "Deleted!",
                    text: `Deleted!`,
                    icon: "success",
                    timer: 1000
                    })
            dispatch(deleteTask(id))
            }
        })
        .catch((err)=>{
            alert(err)
        })
    }
}

export const startUnArchive=(obj,id)=>{
    return(dispatch)=>{
        axios.put(`/task/${id}`,obj,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            if(response.data.errors){
                swal(`${response.data.errors.message}`,"","error")
            }
            else{
                if(response.data.archive){
            swal({
                title: "Archived!",
                text: `Archived!`,
                icon: "success",
                timer: 1000
                })
            }
            else{
                swal({
                    title: "UnArchived!",
                    text: `UnArchived!`,
                    icon: "success",
                    timer: 1000
                    })
            }
            dispatch(editTask(response.data))
            }
        })
    
        .catch((err)=>{
            alert(err)
        })
    }

}

export const startTaskTrash=(obj,id)=>{
    return(dispatch)=>{
        axios.put(`/task/${id}`,obj,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            if(response.data.errors){
                swal(`${response.data.errors.message}`,"","error")
            }
            else{
            swal({
                title: "Deleted!",
                text: `Moved to Trash`,
                icon: "success",
                timer: 1000
                })
            dispatch(editTask(response.data))
            }
        })
    
        .catch((err)=>{
            alert(err)
        })
    }
}

export const  startSetTasks=()=>{
    return(dispatch)=>{
    axios.get('/task',{
        headers:{
            'x-auth':localStorage.getItem('authToken')
        }
    })
    .then((response)=>{
        if(response.data.hasOwnProperty('errors')){
            swal(`${response.data.errors.message}`,"","error")
        }
        else{
            //console.log(response.data)
            dispatch(setTasks(response.data))
        }   
    })
    .catch((err)=>{
        alert(err)
    })
}
}


export const startAddTask=(task)=>{
    return (dispatch)=>{
        axios({
            method:'post',
            url:'/task',
            data:task,
            headers:{
                'x-auth':localStorage.getItem('authToken'),
                
            }

        })
        .then((response)=>{
            if(response.data.hasOwnProperty('errors')){
                swal(`${response.data.errors.message}`,"","error")
            } else {
                swal({title: "Task Created!",
                    text: `You created new task`,
                    icon: "success",
                    timer: 1000})
                    //console.log(response.data)
                    dispatch(addTask(response.data))
            }

        })
        .catch((err)=>{
            alert(err)
        })
    }
}