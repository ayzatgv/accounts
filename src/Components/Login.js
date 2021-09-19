import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { Button } from "react-bootstrap";
import { TextField } from './TextField';
import * as Yup from 'yup';
import { setLogin } from '../Actions/LoginAction';
import { Link } from 'react-router-dom';

import api from '../api';

import "./Main.css";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {

            width: 0,
            height: 0
        }

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    render() {
        const validate = Yup.object({
            mobileNo: Yup.string()
                .required('Mobile Number is required'),
            password: Yup.string()
                .required('Password is required'),
        })
        return (
            <div className="main">
                <div className="aha">
                    <Link id='GoToRegister' style={{ display: 'none' }} to="/register">a</Link>

                    <Formik
                        initialValues={{
                            mobileNo: '',
                            password: '',
                        }}
                        validationSchema={validate}
                        onSubmit={values => {
                            console.log(values)
                            api.post(`accounts/login`, {mobileNo:values.mobileNo,password:values.password})
                                .then(res => {
                                    localStorage.setItem('Token', res.data.data.token);
                                    localStorage.setItem('Full-Name', res.data.data.profile.fullName);

                                    this.props.setLogin(true);

                                    alert('ورود شما با موفقیت انجام شد')
                                    console.log(res)
                                })
                                .catch(error => {
                                    alert('ورود شما با خطا مواجه شد')
                                    console.log(error)
                                });
                        }}
                    >
                        {formik => (
                            <div>
                                <h1 className="my-4 font-weight-bold .display-4">Sign In</h1>
                                <Form>
                                    <TextField label="Mobile Number" name="mobileNo" type="text" />
                                    <TextField label="password" name="password" type="password" />
                                    <button className="btn btn-dark mt-2" type="submit">Login</button>
                                    <button className="btn btn-danger mt-2 mx-1" type="reset">Reset</button>
                                    <Button className="mt-2 mx-1" onClick={() => { document.getElementById('GoToRegister').click(); }} block> Go To Register </Button>
                                </Form>
                            </div>
                        )}
                    </Formik>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    Login: state.Login
});

export default connect(mapStateToProps, { setLogin })(Login);