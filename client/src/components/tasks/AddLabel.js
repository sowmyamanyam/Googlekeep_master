import React from 'react'
import { Button,Modal,Form } from 'react-bootstrap';

class AddLabel extends React.Component {

    constructor(props){
        super(props)
        this.state={
                show:false,
                label:''
        }
    }

    handleChange=(e)=>{
      
        this.setState({label:e.target.value})
      
    }
    handleClose=()=> {
        this.setState({ show: false });
      }
    
      handleShow=()=> {
        this.setState({ show: true });
      }
      handleLableSubmit=(e)=>{
          e.preventDefault()
          e.stopPropagation()
          this.setState({ show: false });
          this.props.handleLableSubmit(this.state.label)
          this.setState({label:''})
          }
      


    render(){
    return (
        <React.Fragment>
        <Button className="btn btn-primary btn-sm"  onClick={this.handleShow}>
          Add Label
        </Button>
                <Modal show={this.state.show} onHide={this.handleClose}
                        size="sm"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                            <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Add New Label
                            </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <Form onSubmit={this.handleLableSubmit}>
                        <Form.Group controlId="formGroupEmail">
                                <Form.Label>Label Name</Form.Label>
                                <Form.Control name="label" value={this.state.label} onChange={this.handleChange} type="text" placeholder="Label name..." />
                            </Form.Group>
                            </Form>
                            </Modal.Body>
                            <Modal.Footer>
                            <Button onClick={this.handleClose}>Close</Button>
                            </Modal.Footer>
                    </Modal>
                    </React.Fragment>
    );
    }
  }

  export default AddLabel
  
  