import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import { Button } from "react-bootstrap";
import { TextField } from './TextField';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import api from '../api';

import "./Main.css";

class Register extends Component {
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
            firstName: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            lastName: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            nationalId: Yup.string()
                .required('Required'),
            personalCode: Yup.string()
                .required('Required'),
            birthDate: Yup.string()
                .required('Required'),
            mobileNo: Yup.string()
                .matches(/^[0-9]+$/, "Must be only digits")
                .min(11, 'Must be exactly 11 digits')
                .max(11, 'Must be exactly 11 digits')
                .required('Required'),
            expireDate: Yup.string()
                .required('Required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 charaters')
                .required('Password is required'),
        })
        return (
            <div className="main">
                <div className="aha">

                    <Link id='GoToLogin' style={{ display: 'none' }} to="/login">a</Link>

                    <Formik
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            nationalId: '',
                            personalCode: '',
                            birthDate: '',
                            mobileNo: '',
                            expireDate: '',
                            password: '',
                        }}
                        validationSchema={validate}
                        onSubmit={values => {
                            const data = {
                                firstName: values.firstName,
                                lastName: values.lastName,
                                nationalId: values.nationalId,
                                personalCode: values.personalCode,
                                birthDate: values.birthDate,
                                address: "placeholder",
                                mobileNo: values.mobileNo,
                                phoneNo: "placeholder",
                                isActive: true,
                                profileImageCode: "placeholder",
                                expireDate: values.expireDate,
                                password: values.password,
                                mail: "placeholder"
                            }
                            console.log(values)
                            console.log(data)
                            api.post(`accounts​`, data)
                                .then(res => {
                                    alert('حساب کاربری شما با موفقیت ساخته شد')
                                    console.log(res)
                                })
                                .catch(error => {
                                    alert('ساخت حساب کاربری شما با خطا مواجه شد')
                                    console.log(error)
                                });
                        }}
                    >
                        {formik => (
                            <div>
                                <h1 className="my-4 font-weight-bold .display-4">Sign Up</h1>
                                <Form>
                                    <TextField label="First Name" name="firstName" type="text" />
                                    <TextField label="Last Name" name="lastName" type="text" />
                                    <TextField label="National ID" name="nationalId" type="text" />
                                    <TextField label="Personal Code" name="personalCode" type="text" />
                                    <TextField label="Birth date" name="birthDate" type="text" />
                                    <TextField label="Mobile Number" name="mobileNo" type="text" />
                                    <TextField label="Expire date" name="expireDate" type="text" />
                                    <TextField label="password" name="password" type="password" />
                                    <button className="btn btn-dark mt-2" type="submit">Register</button>
                                    <button className="btn btn-danger mt-2 mx-1" type="reset">Reset</button>
                                    <Button className="mt-2 mx-1" onClick={() => { document.getElementById('GoToLogin').click(); }} block> Go To Login </Button>
                                </Form>
                            </div>
                        )}
                    </Formik>
                </div>
            </div>
        );
    }
}

export default (Register);