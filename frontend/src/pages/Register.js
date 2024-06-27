import React, { useEffect, useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon,
}
    from 'mdb-react-ui-kit';

import '../styles/Register.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { register } from '../redux/actions/authActions';

const Register = () => {
    const initialState = { email: '', password: '', fullname: '', username: '', confirmPassword: '', gender: 'male' }

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [userData, setUserData] = useState(initialState);
    const { fullname, username, email, password, confirmPassword, gender } = userData;

    const { auth, alert } = useSelector(state => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }

    useEffect(() => {
        if (auth.token) {
            navigate('/')
        }
    }, [auth.token, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(userData));
    }

    return (
        <MDBContainer fluid>

            <MDBRow className='d-flex justify-content-center align-items-center h-100' >
                <MDBCol
                    md='12'>
                    <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
                        <MDBCardBody className='p-5 w-100 d-flex flex-column'>

                            <h2 className="fw-bold mb-2 text-center">Sign Up</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="d-flex flex-row align-items-center mb-4 ">
                                    <MDBIcon
                                        fas
                                        icon="user me-3"
                                        size='lg' />
                                    <MDBInput
                                        value={fullname}
                                        name="fullname"
                                        onChange={handleChange}
                                        label='Enter Your FullName'
                                        type='text'
                                        className='w-100'
                                        placeholder={alert.fullname ? `${alert.fullname}` : 'Enter Your FullName'}
                                    />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4 ">
                                    <MDBIcon
                                        fas
                                        icon="user me-3"
                                        size='lg' />
                                    <MDBInput
                                        type="text"
                                        label='Enter Your username'
                                        name="username"
                                        value={username.toLowerCase().replace(/ /g, '')}
                                        onChange={handleChange}
                                        className='w-100'
                                        placeholder={alert.username ? `${alert.username}` : 'Enter Your Usernam'}
                                    />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon
                                        fas
                                        icon="envelope me-3"
                                        size='lg' />
                                    <MDBInput
                                        value={email}
                                        name="email"
                                        onChange={handleChange}
                                        label='Enter Your Email'
                                        placeholder={alert.email ? <small style={{ color: 'red' }}>{alert.email}</small> : ''}
                                        type='email' />
                                </div>


                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas
                                        icon="lock me-3"
                                        size='lg' />
                                    <MDBInput value={password}
                                        name="password"
                                        onChange={handleChange}
                                        label='Enter Password'
                                        placeholder={alert.password ? <small style={{ color: 'red' }}>{alert.password}</small> : ''}
                                        type={showPassword ? "type" : "password"}

                                    />
                                    <div className="register-dataformshowpass" onClick={() => setShowPassword(!showPassword)}>
                                        <MDBIcon icon={showPassword ? "eye-slash" : "eye"} />
                                    </div>


                                </div>


                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas
                                        icon="key me-3" size='lg' />
                                    <MDBInput
                                        value={confirmPassword}
                                        name="confirmPassword"
                                        onChange={handleChange}
                                        label='Enter Confirm your password'
                                        type={showConfirmPassword ? "type" : "password"}
                                        placeholder={alert.confirmPassword ? <small style={{ color: 'red' }}>{alert.confirmPassword}</small> : ''}

                                    />
                                    <div className="register-dataformshowConfirmpass" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                        <MDBIcon icon={showConfirmPassword ? "eye-slash" : "eye"} />
                                    </div>
                                </div>


                                <select className='register-dataformselect d-flex flex-row align-items-center mb-4' name="gender" value={gender} onChange={handleChange}>
                                    <option value='male'>Male</option>
                                    <option value='female'>Female</option>
                                    <option value='other'>Other</option>
                                </select>

                                <MDBBtn className=''>Register</MDBBtn>

                                <div className='text-center text-md-start mt-4 pt-2'>
                                    <p className="small fw-bold mt-2 pt-1 mb-2">Already have an account? <a href="/login" className="link-danger">Login</a></p>
                                </div>
                            </form>

                        </MDBCardBody>
                    </MDBCard>

                </MDBCol>
            </MDBRow>

        </MDBContainer>
    );
}

export default Register;