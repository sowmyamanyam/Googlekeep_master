import React from 'react'
import {Container,Row,Col,Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {startTaskTrash,startUnArchive} from '../../actions/tasks'
import AddTask from './AddTask'
import EditTask from './EditTask'
// import { Icon } from '@iconify/react';
// import thumbTack from '@iconify/icons-fa/thumb-tack';
import {Link} from 'react-router-dom'
//import trash from '@iconify/icons-fa/trash';
import './task.css'
//import archive from '@iconify/icons-fa/archive';
class TaskList extends React.Component{
   handleTaskDelete=(obj,id)=>{
        obj.bin=true
        this.props.dispatch(startTaskTrash(obj,id))
    }
    handleUnArchive=(t,id)=>{
        t.archive=true
        this.props.dispatch(startUnArchive(t,id))
    }
    render(){
        //console.log(this.props.taskList)
        return(
            <React.Fragment>
                <Container>
                    <Row>
                    <Col className="col-lg-3 ">
                        <Link className="button" to ="label">Labels</Link><br/>
                        <Link className="button" to ="archive">Archive</Link><br/>
                        <Link className="button" to ="bin">Bin</Link><br/>
                        </Col>
                    <Col className="col-lg-6 ">
                    <AddTask/>
             
                     </Col>
                    </Row>
                </Container>
                 <br/>
                <div className="row"> 
                    {this.props.taskList.map((t)=>{
                        if(t.pinTask && !t.archive && !t.bin){
                        return(
                            <div key={t._id} className="card col-lg-3  offset-1" style={{maxWidth: "18rem",backgroundColor:`${t.color}`}}>
                                <div className="card-header ">
                                    <strong>{t.title}</strong>  
                                    { (t.pinTask)? <p>Pinned</p>:null} 
                                </div>
                                {t.imageUrl.map((i,ind)=>{
                                     return <img key={ind} src={i} className="card-img-top" alt="some"></img>
                                })}
                                <div className="card-body">
                                    <p className="card-text" >{t.taskBody}</p>
                                    <hr/>
                                    {t.label.length>0 && <strong>Label</strong>}
                                     
                                    {t.label.length>0 && t.label.map((l,i)=>{
                                    return <p key={i}>{l}</p>
                                    })
                                    }
                                <Row>
                                    <Col className="col-md-2 offset-1">
                                        <EditTask taskInfo={t}/> 
                                    </Col>
                                    <Col className="col-md-3 offset-1">
                                        <Button className="btn btn-sm" onClick={(e)=>this.handleUnArchive(t,t._id)}>Archive</Button>
                                   
                                   </Col>   
                                    <Col className="col-md-3 offset-1">
                                        <Button className="btn btn-sm" onClick={()=>this.handleTaskDelete(t,t._id)}>Trash</Button>
                                    
                                    </Col>   
                                </Row>
                                </div>
                                <br/>
                            </div>
                        )
                        }
                        else{
                            return null
                        }
                    })}
                   
                    {this.props.taskList.map((t)=>{
                        if(!t.pinTask && !t.archive && !t.bin){
                        return(
                            <div key={t._id} className="card col-lg-3 offset-1" style={{maxWidth: "18rem",backgroundColor:`${t.color}`}}>
                                <div className="card-header ">
                                    <strong>{t.title}</strong> 
                                 
                                    { (t.pinTask)?<p>Pinned</p>:null} 
                                </div>
                                {t.imageUrl.map((i,ind)=>{
                                    
                                   return <img key={ind} src={i} className="card-img-top" alt="some"></img>
                                })}
                                <div className="card-body">
                                    <p  className="card-text" >{t.taskBody}</p>
                                    <hr/>
                                    {t.label.length>0 && <strong>Label</strong>} 
                                    {t.label.length>0 && t.label.map((l,i)=>{
                                    return <p key={i}>{l}</p>
                                    })
                                    }
                                <Row>
                                    <Col className="col-md-2 offset-1">
                                        <EditTask taskInfo={t}/>  
                                    </Col>
                                    <Col className="col-md-3 offset-1">
                                        <Button className="btn btn-sm" onClick={(e)=>this.handleUnArchive(t,t._id)} >Archive</Button>
                                   </Col>  
                                    <Col className="col-md-3 offset-1">                                  
                                        <Button className="btn btn-sm" onClick={()=>this.handleTaskDelete(t,t._id)} >Trash</Button>
                                    </Col> 
                                </Row>
                                
                                </div>
                            
                            </div>
                           
                        )
                        }else{
                            return null
                        }
                    })}
                    
                   
                </div>
              
            </React.Fragment>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        taskList:state.taskList
    }
}

export default connect(mapStateToProps)(TaskList)