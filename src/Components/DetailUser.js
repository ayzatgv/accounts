import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';

import api from '../api';

import "./Main.css";

class DetailUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:''
        }
    }

    componentDidMount() {
        this.setState({id: this.props.match.params.id});

        api.get(`accounts/${this.state.id}`)
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log(error)
            });
    }

    render() {
        const validate = Yup.object({
            firstName: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            lastName: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            mail: Yup.string()
                .email('Email is invalid'),
            mobileNo: Yup.string()
                .matches(/^[0-9]+$/, "Must be only digits")
                .min(11, 'Must be exactly 11 digits')
                .max(11, 'Must be exactly 11 digits')
                .required('Required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 charaters')
                .required('Password is required'),
        })
        return (

            <div className="main">
                <div className="aha">

                    <Formik
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            nationalId: '',
                            personalCode: '',
                            birthDate: '',
                            address: '',
                            mobileNo: '',
                            phoneNo: '',
                            isActive: true,
                            profileImageCode: '',
                            expireDate: '',
                            password: '',
                            mail: ''
                        }}
                        validationSchema={validate}
                        onSubmit={values => {
                            console.log(values)
                            api.put(`accounts/${this.state.id}`, {values})
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
                                    <TextField label="Birth Date" name="birthDate" type="text" />
                                    <TextField label="Mobile Number" name="mobileNo" type="text" />
                                    <TextField label="Email" name="mail" type="email" />
                                    <TextField label="password" name="password" type="password" />
                                    <button className="btn btn-dark mt-2" type="submit">Register</button>
                                    <button className="btn btn-danger mt-2 mx-1" type="reset">Reset</button>
                                </Form>
                            </div>
                        )}
                    </Formik>
                </div>
            </div>
        );
    }
}

export default (DetailUser);