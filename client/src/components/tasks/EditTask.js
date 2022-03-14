import React from 'react'
import { Button,Modal } from 'react-bootstrap';
import AddTask from './AddTask'


class EditTask extends React.Component{
    constructor(props) {
        super(props);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    
        this.state = {
          show: false
        };
      }
    
      handleClose() {
        this.setState({ show: false });
      }
    
      handleShow() {
        this.setState({ show: true });
      }
    
      render() {
        
    
        return (
          <div>
           
    
            <Button className="btn btn-warning btn-sm" onClick={this.handleShow}>
              Edit 
            </Button>
    
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Task</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <AddTask taskInfo={this.props.taskInfo} />
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.handleClose}>Close</Button>
              </Modal.Footer>
            </Modal>
          </div>
        );
      }
}
export default EditTask