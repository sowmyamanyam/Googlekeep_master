import React from 'react'
import Select from 'react-select'
import {connect} from 'react-redux'
//import thumbTack from '@iconify/icons-fa/thumb-tack';
//import { Icon } from '@iconify/react';
import {Row,Col,Container} from 'react-bootstrap'
class Label extends React.Component{

    constructor(props){
        super(props)
        this.state={
           name:'' 
        }
    }
    handleName=(values)=>{
        this.setState({name:values.label})
    }

    render(){ 
        let arr=[]
        this.props.labelList.forEach((t)=>{
           arr =[...arr,...t.label]
       })
       const options=arr.map((l,ind)=>{return({value:ind,label:l})})
       options.unshift({value:'select',label:'Select'})
        return(
            <div>
                <Container>
                    <Row>
                        <Col>
                            <div>
                                <h5>Select Label</h5>
                                <Select  options={options} onChange={(values)=>{this.handleName(values)}}/>
                            </div>
                        </Col>
                    </Row>
                    <br/>
                    <div className="row">
                    {this.props.labelList.map((t)=>{
                        if(t.label.indexOf(`${this.state.name}`)!==-1 && t.label.length!==0){
                        return(
                            
                            <div key={t._id} className="card col-lg-3 offset-1" style={{maxWidth:"16rem",backgroundColor:`${t.color}`}}>
                                <div className="card-header">
                               <strong>{t.title}</strong> 
                                 
                               { (t.pinTask)?<p>Pinned</p>:null} 
                               
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
                                
                                </div>
                               
                            </div>
                        )
                        }else{
                            return null
                        }
                    })}
                    </div>
                </Container>
            </div>

            
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        labelList:state.taskList
    }
}
export default connect(mapStateToProps)(Label)