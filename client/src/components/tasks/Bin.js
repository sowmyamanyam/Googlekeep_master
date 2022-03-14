import React from 'react'
import {connect} from 'react-redux'
import {Row,Col,Button} from 'react-bootstrap'
import {startTaskDelete} from '../../actions/tasks'
import swal from 'sweetalert'
class Bin extends React.Component{
    handleTaskDelete=(e,id)=>{
        swal({
            title: "Are you sure you want to Delete it Permanently?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
            this.props.dispatch(startTaskDelete(id))
              swal("Successfully Deleted", {
                icon: "success",
                timer: 500
              });
        
    }
})
    }
    render(){
        return(
            <div>
                <div className="container">
                    <h1>Bin</h1>
                    <div className="row">
                   
                   {this.props.binList.map((t)=>{
                       if(t.bin){
                        return(
                           <div key={t._id} className="card col-lg-3 offset-1" style={{maxWidth: "18rem",backgroundColor:`${t.color}`}}>
                               <div className="card-header">
                               <strong>{t.title}</strong>
                             
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
                                   <Col className="col-md-3 offset-3">
                                   <Button className="btn btn-danger" onClick={(e)=>this.handleTaskDelete(e,t._id)} >Delete</Button>
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
               
                    
                  </div>
                  </div>
            </div>
        )
    }
}


const mapStateToProps=(state)=>{
    return{
        binList:state.taskList
    }
}


export default connect(mapStateToProps)(Bin)