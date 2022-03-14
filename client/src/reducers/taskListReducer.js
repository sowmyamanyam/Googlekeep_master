const taskListReducer=(state=[],action)=>{
    switch(action.type){
        case 'ADD_TASK':
            return [...state, action.payload]
        case 'SET_TASK':
            return [...action.payload]
        case 'REMOVE_TASK':
            return state.filter((t)=>{return t._id!==action.payload})
        case "EDIT_TASK":
            return state.map((t)=>{if(t._id===action.payload._id){
                                return action.payload
                                    }
                                    else{
                                        return t
                                    }
        })
        default:
            return state
    }
}

export default taskListReducer