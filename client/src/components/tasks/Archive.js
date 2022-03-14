import React from 'react'
import {connect} from 'react-redux'
//import { Icon } from '@iconify/react';
//import thumbTack from '@iconify/icons-fa/thumb-tack';
//import archive from '@iconify/icons-fa/archive';
import {Row,Col,Button} from 'react-bootstrap'
import EditTask from './EditTask'
import {startUnArchive} from '../../actions/tasks'
class Archive extends React.Component{
    handleUnArchive=(t,id)=>{
        t.archive=false
        this.props.dispatch(startUnArchive(t,id))
    }
    render(){
        return(
            <div>
                <div className="container">
                    <h1>Archive</h1>
                    <div className="row">
                   
                    {this.props.archiveList.map((t)=>{
                       if(t.pinTask && t.archive){
                            return(
                                <div key={t._id} className="card col-lg-3 offset-1" style={{maxWidth: "18rem",   backgroundColor:`${t.color}`}}>
                                    <div className="card-header">
                                    {t.title}    
                                    { (t.pinTask)?<p>Pinned</p>:null} 
                                </div>
                                    {t.imageUrl.map((i,ind)=>{
                                        
                                        return <img key={ind}src={i} className="card-img-top" alt="some"></img>
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
                                        
                                        <Col className="col-md-4 offset-1">
                                            <Button onClick={(e)=>this.handleUnArchive(t,t._id)}>UnArchive</Button>
                                        
                                        </Col>  
                                    </Row>
                                    </div>
                                    
                                </div>
                       )
                       }else{
                           return null
                       }
                   })}
                   {this.props.archiveList.map((t)=>{
                        if(!t.pinTask && t.archive){
                        return(
                            <div key={t._id} className="card col-lg-3 offset-1" style={{maxWidth: "18rem",backgroundColor:`${t.color}`,margin:'5px'}}>
                                <div className="card-header">
                                {t.title}  
                               { (t.pinTask)? <p>Pinned</p>:null} 
                                </div>
                                {t.imageUrl.map((i,ind)=>{  
                                   return <img src={i} key={ind} className="card-img-top" alt="some"></img>
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
                                <Col className="col-md-4 offset-1">
                                    <Button onClick={(e)=>this.handleUnArchive(t,t._id)} >UnArchive</Button>
                                   
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
                </div>
            </div>
        )
    }
}


const mapStateToProps=(state)=>{
    return{
        archiveList:state.taskList
    }
}


export default connect(mapStateToProps)(Archive)