import React from 'react'
import {Row,Col,Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {startAddTask,startEditTask} from '../../actions/tasks'
//import archive from '@iconify/icons-fa/archive';
//import { Icon } from '@iconify/react';
//import thumbTack from '@iconify/icons-fa/thumb-tack';
import AddLabel from './AddLabel'
import './task.css'

class AddTask extends React.Component{

    constructor(props){
        super(props)
        this.state={
            title:(props.taskInfo)?props.taskInfo.title:'',
            taskBody: (props.taskInfo)?props.taskInfo.taskBody:'',
            color:(props.taskInfo)?props.taskInfo.color:'#ffffff',
            pinTask:(props.taskInfo)?props.taskInfo.pinTask:false,
            label:(props.taskInfo)?props.taskInfo.label:[],
            archive:(props.taskInfo)?props.taskInfo.archive:false,
            file:(props.taskInfo)?props.taskInfo.file:''
        }

    }
    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})

    }
    handlePinClick=(e)=>{
        this.setState({pinTask:true})
    }
    handleIconClick=(e)=>{
        this.setState({pinTask:false})
    }
    handleLableSubmit=(label)=>{
        
        this.setState((prevState)=>{
            return{
                label:[...prevState.label,label]
            }
        })
    }
    
    
    handleIconArchiveClick=(e)=>{
        this.setState({archive:false})
    }
    handleArchiveClick=(e)=>{
        this.setState({archive:true})
    }
    

    fileHandle = (e) => {

        const file = e.target.files
        this.setState(() => ({ file }))
    }
    
    handleSubmit=(e)=>{
        e.preventDefault()
        if(this.props.taskInfo){
            const obj=Object.assign({},this.state)
            this.props.dispatch(startEditTask(obj,this.props.taskInfo._id))
          }
          else{
             
              const formData = new FormData();
              const {title,taskBody,color,pinTask,label}=this.state
              formData.append('title',title)
              formData.append('taskBody',taskBody)
              formData.append('color',color)
              formData.append('pinTask',pinTask)
              formData.append('label',label)
              for (const file of this.state.file) {
                formData.append('image', file)
            }

          this.setState({title:'',taskBody:'',color:'#ffffff',pinTask:false,file:'',label:[],archive:false})
            this.props.dispatch(startAddTask(formData))
          }
        
    }
  
    render(){
        return(
            <React.Fragment>
                
                <form  onSubmit={(e)=>this.handleSubmit(e)}>
                    <div style={{backgroundColor:`${this.state.color}`}} className="card">
                        <div className="card-header">
                            Add Note
                        </div>
                        <div className="card-body">
                            <input type="text" className="card-title form-control" placeholder="Title" onChange={(e)=>this.handleChange(e)} name="title" value={this.state.title}></input>
                            <br/>
                            <textarea className="form-control" rows="3" type="text"  placeholder="Take a note..." onChange={(e)=>this.handleChange(e)} name="taskBody" value={this.state.taskBody}></textarea>
                            <br/>
                           {this.state.label.length>0 && <strong>Labels</strong>} 
                            <Row>

                            <Col>
                            {this.state.label.length>0 && this.state.label.map((l,i)=>{
                                    return <p key={i}>{l}</p>
                                    })
                                    
                            }
                            </Col>
                                </Row>
                                <Row>
                            <Col className="col-sm-2 form-buttons">
                                <label> Color: 
                                    
                            <input type="color"  value={this.state.color} name="color" onChange={(e)=>this.handleChange(e)}/>
                            
                            </label>
                            </Col>
                            <Col className="col-sm-3 form-buttons">
                            {(this.state.pinTask)?<Button onClick={(e)=>this.handleIconClick(e)}>Un Pin</Button>:<Button type="button" onClick={(e)=>this.handlePinClick(e)} className="btn btn-primary btn-sm">Pin Task</Button>}
                            </Col>
                            <Col className="col-sm-3 form-buttons">
                            {(this.state.archive)?<Button onClick={(e)=>this.handleIconArchiveClick(e)}>Un Archive</Button>:<Button type="button" onClick={(e)=>this.handleArchiveClick(e)} className="btn btn-primary btn-sm">Archive</Button>}
                            </Col>
                            <Col className="col-sm-3 form-buttons ">
                            
                            < AddLabel handleLableSubmit={this.handleLableSubmit}/>
                            </Col>
                           
                            <Col className="col-sm-3 form-buttons">
                            <Button className="btn btn-success" type="submit">Submit</Button>
                            </Col>
                            </Row>
                            <Row>
                            <Col className="col-sm-6 form-buttons ">
                            <input
                                name="image" onChange={this.fileHandle}
                                multiple
                                type="file"
                                 />
                            </Col>
                            </Row>
                        </div>
                    </div>
                </form>
            </React.Fragment>
        )}

        }

export default connect()(AddTask)
