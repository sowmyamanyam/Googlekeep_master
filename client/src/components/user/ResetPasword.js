import React from 'react'
import {Container,Row,Col,Button,Form} from 'react-bootstrap'
import axios from '../../config/axios'
class ResetPassword extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            issubmit:false
        }
    }
    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    handleLoginSubmit=(e)=>{
        e.preventDefault()
        axios.post('/reset',this.state)
        .then((response)=>{
            if(response.data.errors){
                alert(response.data.errors)

            }else{
               
                this.setState({email:'',issubmit:true})
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
                        {(this.state.issubmit)?<h1>Password reset Link is sent to the Registered Email.Please Login using the link</h1>:
                            <Form onSubmit={this.handleLoginSubmit}>
                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control name="email" value={this.state.email} onChange={this.handleChange} type="email" placeholder="Enter email" />
                                </Form.Group>
                            <Button variant="primary" type="submit">
                            Submit</Button>
                            </Form>
                    }
            </Col>
            </Row>
            </Container>
        )
    }
}

export default ResetPassword