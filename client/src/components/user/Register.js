import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {startAddUser} from '../../actions/user'
import {connect} from 'react-redux'
import {Container,Row,Col,Button} from 'react-bootstrap'
import './form.css'

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  mobile: Yup.string()
    .max(10, 'Mobile  number  must be 10 digits only!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
    password:Yup.string()
    .min(5, 'Too Short!')
    .required('Required')
});

    const style={
        color:'red'
    }
 const RegisterForm= (props) => {
 return (
  <div>
    <Container >
                    <Row>
                       
                    <Col className="col-lg-3"></Col>
                    <Col className="col-lg-6" >
                    <h3>Register</h3>
    <Formik 
      initialValues={{
        name: '',
        email: '',
        mobile: '',
        password:''
      }}
      validationSchema={SignupSchema}
      onSubmit={values => {
        const redirect = () => props.history.push('/users/login')
        props.dispatch(startAddUser(values,redirect))
      }}
    >
      {({ errors, touched }) => (
        <Form className="customerform">
            <label>Name:-
          <Field className="input form-group" name="name" />
          {errors.name && touched.name ? (
            <div style={style}>{errors.name}</div>
          ) : null}
          </label><br/>
          <label>Mobile:-
          <Field className="input form-group" name="mobile" />
          {errors.mobile && touched.mobile ? (
            <div style={style}>{errors.mobile}</div>
          ) : null}
          </label><br/>
          <label>Email:-
          <Field className="input form-group" name="email" type="email" />
          {errors.email && touched.email ? <div style={style}>{errors.email}</div> : null}
          </label><br/>
          <label>Password:-
          <Field className="input form-group" name="password" type="password" />
          {errors.password && touched.password ? <div style={style}>{errors.password}</div> : null}
          </label><br/>
          <Button variant="primary"type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
    </Col>
                </Row>
                </Container>
  </div>
);
          }

export default connect()(RegisterForm)