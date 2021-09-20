import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import api from '../api';

import "./Main.css";

import { parse, isDate } from "date-fns";

function parseDateString(value, originalValue) {
    const parsedDate = isDate(originalValue)
        ? originalValue
        : parse(originalValue, "yyyy-MM-dd", new Date());

    return parsedDate;
}

class DetailUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            today: new Date(),

            id: '',
            user: []
        }
    }

    componentDidMount() {
        let id = this.props.match.params.id;

        api.get(`accounts/${id}`)
            .then(res => {
                console.log('here')
                console.log(res)
                this.setState({ user: res.data, id: this.props.match.params.id })
            })
            .catch(error => {
                console.log(error)
            });
    }

    render() {
        <Link id='GoToUsers' style={{ display: 'none' }} to="/user">a</Link>

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
            birthDate: Yup.date()
                .transform(parseDateString)
                .max(this.state.today,'birth date is bigger than todays date')
                .required('Required'),
            mobileNo: Yup.string()
                .matches(/^[0-9]+$/, "Must be only digits")
                .min(11, 'Must be exactly 11 digits')
                .max(11, 'Must be exactly 11 digits')
                .required('Required'),
            expireDate: Yup.date()
                .transform(parseDateString)
                .min(this.state.today,'expire date is smaller than todays date')
                .required('Required'),
        })
        return (

            <div className="main">
                <div className="aha">

                    <Formik
                        initialValues={{
                            firstName: this.state.user.firstName,
                            lastName: this.state.user.lastName,
                            nationalId: this.state.user.nationalId,
                            personalCode: this.state.user.personalCode,
                            birthDate: this.state.user.birthDate,
                            address: this.state.user.address,
                            mobileNo: this.state.user.mobileNo,
                            phoneNo: this.state.user.phoneNo,
                            profileImageCode: this.state.user.profileImageCode,
                            expireDate: this.state.user.expireDate,
                            mail: this.state.user.mail
                        }}
                        validationSchema={validate}
                        onSubmit={values => {
                            console.log('works')
                            const data = {
                                firstName: values.firstName,
                                lastName: values.lastName,
                                nationalId: values.nationalId,
                                personalCode: values.personalCode,
                                birthDate: values.birthDate,
                                address: values.address,
                                mobileNo: values.mobileNo,
                                phoneNo: values.phoneNo,
                                profileImageCode: values.profileImageCode,
                                expireDate: values.expireDate,
                                password: values.password,
                                mail: values.mail,
                            }
                            console.log(values)
                            console.log(data)
                            api.put(`accounts/${this.state.id}`, data)
                                .then(res => {
                                    alert('حساب کاربری شما با موفقیت ساخته شد')
                                    console.log(res)

                                    document.getElementById('GoToUsers').click();
                                })
                                .catch(error => {
                                    alert('ساخت حساب کاربری شما با خطا مواجه شد')
                                    console.log(error)
                                });
                        }}
                        enableReinitialize
                    >
                        {formik => (
                            <div>
                                <h1 className="my-4 font-weight-bold .display-4">Update User Info</h1>
                                <Form>
                                    <TextField label="First Name" name="firstName" type="text" />
                                    <TextField label="Last Name" name="lastName" type="text" />
                                    <TextField label="National ID" name="nationalId" type="text" />
                                    <TextField label="Personal Code" name="personalCode" type="text" />
                                    <TextField label="Birth date" name="birthDate" type="text" />
                                    <TextField label="Mobile Number" name="mobileNo" type="text" />
                                    <TextField label="Expire date" name="expireDate" type="text" />
                                    <button className="btn btn-dark mt-2" type="submit">Update</button>
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