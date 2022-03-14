import React from 'react';
import {startSetUser} from '../../actions/user'
import {connect} from 'react-redux'
import {Container,Row,Col,Button,Form} from 'react-bootstrap'
import {Link} from 'react-router-dom'

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email:"",
            password:""
        }
    }
    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    handleLoginSubmit=(e)=>{
        e.preventDefault()
        const redirect= ()=>this.props.history.push('/')
        this.props.dispatch(startSetUser(this.state,redirect))
    }

    render(){
        return(
            <div>
                <Container>
                    <Row>
                       
                    <Col className="col-lg-3"></Col>
                    <Col className="col-lg-6">
                    <h3>Login</h3>
                    <Form onSubmit={this.handleLoginSubmit}>
                        <Form.Group controlId="formGroupEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control name="email" value={this.state.email} onChange={this.handleChange} type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group controlId="formGroupPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="password" value={this.state.password} onChange={this.handleChange}   type="password" placeholder="Password" />
                            </Form.Group>
                            <Link to="/reset">Forgot Password ?</Link><br/>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                    </Form>
                </Col>
                </Row>
                </Container>
            </div>

        )
    }
}

export default connect()(Login)