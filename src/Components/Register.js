import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, FormControl, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import api from '../api';

import "./Register.css";


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            email: '',
            password: '',
            fullName: '',
            age: 0,
            gender: 'Male',
            id: 0,
            width: 0,
            height: 0
        }

        this.handleClick = this.handleClick.bind(this);
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

    handleClick() {
        api.post(`users`, { id: this.state.id, userName: this.state.userName, email: this.state.email, password: this.state.password, fullName: this.state.fullName, age: this.state.age, gender: this.state.gender })
            .then(res => {
                alert('حساب کاربری شما با موفقیت ساخته شد')
                console.log(res)
                console.log(this.state.gender)
            })
            .catch(error => {
                alert('ساخت حساب کاربری شما با خطا مواجه شد')
                console.log(error)
                console.log(this.state.gender)
            });
    }

    render() {

        return (
            <>
                <Link id='GoToLogin' style={{ display: 'none' }} to="/login">a</Link>

                <div className="Register">
                    <div className="aha">
                        <FormGroup controlId="userName">
                            <div>نام کاربری</div>
                            <FormControl
                                autoFocus
                                value={this.state.userName}
                                onChange={(e) => this.setState({ userName: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup controlId="email">
                            <div>ایمیل</div>
                            <FormControl
                                value={this.state.email}
                                onChange={(e) => this.setState({ email: e.target.value })}
                                type="email"
                            />
                        </FormGroup>
                        <FormGroup controlId="password">
                            <div>رمز عبور</div>
                            <FormControl
                                value={this.state.password}
                                onChange={(e) => this.setState({ password: e.target.value })}
                                type="password"
                            />
                        </FormGroup>
                        <FormGroup controlId="fullName">
                            <div>نام و نام خانوادگی</div>
                            <FormControl
                                value={this.state.fullName}
                                onChange={(e) => this.setState({ fullName: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup controlId="age">
                            <div>سن</div>
                            <FormControl
                                value={this.state.age}
                                onChange={(e) => this.setState({ age: e.target.value })}
                                type="number"
                            />
                        </FormGroup>
                        <FormGroup controlId="gender">
                            <div>جنسیت</div>
                            <Form.Control onChange={(e) => { this.setState({ gender: e.target.value }) }} as="select">
                                <option value={'Male'}>مرد</option>
                                <option value={'Female'}>زن</option>
                            </Form.Control>
                        </FormGroup>
                        <FormGroup controlId="id">
                            <div>ای دی</div>
                            <FormControl
                                value={this.state.id}
                                onChange={(e) => this.setState({ id: e.target.value })}
                                type="number"
                            />
                        </FormGroup>
                        <Button onClick={this.handleClick} block>
                            ثبت نام
                        </Button>
                        <Button onClick={() => { document.getElementById('GoToLogin').click(); }} block>
                            صفحه ورود
                        </Button>
                    </div>
                </div>
            </>

        );
    }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {})(Register);