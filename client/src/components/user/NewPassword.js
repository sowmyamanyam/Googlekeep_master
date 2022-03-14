import React from 'react'
import {Container,Row,Col,Button,Form} from 'react-bootstrap'
import axios from '../../config/axios'
class NewPassword extends React.Component{
    constructor(props){
        super(props)
        this.state={
            password:'',
            confirmPassword:''
        }
    }
    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    handleLoginSubmit=(e)=>{
        e.preventDefault()
        console.log(this.props.location)
        axios.post(`/new-password${this.props.location.search}`,this.state)
        .then((response)=>{
            if(response.data.errors){
                alert(response.data.errors.message)
            }
            else{
                if(response.data._id){
                    this.props.history.push('/users/login')
                }
            }
           
            
    })
        .catch((err)=>{
            alert(err)
        })
        
    }
    render(){
        return(
            <Container>
                <Row>
                    <Col className="col-lg-5">
                            <Form onSubmit={this.handleLoginSubmit}>
                            <Form.Group controlId="formGroupPassword">
                                    <Form.Label>Passoword</Form.Label>
                                    <Form.Control name="password" value={this.state.password} onChange={this.handleChange} type="password" required={true} placeholder="Enter password" />
                                </Form.Group>
                                <Form.Group controlId="formGroupConfirmPassword">
                                    <Form.Label>Confirm password</Form.Label>
                                    <Form.Control name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange} required={true} type="password" placeholder="Re-enter Password" />
                                </Form.Group>
                           {(this.state.password===this.state.confirmPassword)? <Button variant="primary" type="submit">
                            Submit</Button>:<p>Passwords did not match</p>}
                            </Form>
                    
            </Col>
            </Row>
            </Container>
        )
    }
}

export default NewPassword