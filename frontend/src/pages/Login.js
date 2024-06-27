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
    MDBCheckbox
}
    from 'mdb-react-ui-kit';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom'
import { login } from '../redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
    const initialState = { email: '', password: '' };
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [userData, setUserData] = useState(initialState);
    const dispatch = useDispatch();
    const { auth } = useSelector(state => state);
    const { email, password } = userData;

    useEffect(() => {
        if (auth.token) {
            navigate('/');
        }
    },)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(login(userData));
    }

    return (
        <MDBContainer fluid>

            <MDBRow className='d-flex justify-content-center align-items-center h-100' >
                <MDBCol col='12'>

                    <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
                        <MDBCardBody className='p-5 w-100 d-flex flex-column'>

                            <h2 className="fw-bold mb-2 text-center">Sign in</h2>
                            <p className="text-white-50 mb-3">Please enter your login and password!</p>
                            <form onSubmit={handleSubmit}>
                                <MDBInput wrapperClass='mb-4 w-100'
                                    name='email'
                                    value={email}
                                    onChange={handleChange}
                                    label='Email address'
                                    id='formControlLgEmail'
                                    type='email'
                                    size="lg" />

                                <MDBInput
                                    className='login-dataformpass'
                                    wrapperClass='mb-4 w-100'
                                    name='password'
                                    value={password}
                                    onChange={handleChange}
                                    label='Password'
                                    id='formControlLgPass'
                                    type={showPassword ? "type" : "password"}
                                    size="lg" >

                                    <div className="login-dataformshowpass" onClick={() => setShowPassword(!showPassword)}>
                                        <MDBIcon icon={showPassword ? "eye-slash" : "eye"} />
                                    </div>
                                </MDBInput>



                                <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />

                                <MDBBtn size='lg'>
                                    Login
                                </MDBBtn>
                                <div className='text-center text-md-start mt-4 pt-2'>
                                    <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="/register" className="link-danger">Register</a></p>
                                </div>
                            </form>

                            <hr className="my-4" />

                            <MDBBtn className="mb-2 w-100" size="lg" style={{ backgroundColor: '#dd4b39' }}>
                                <MDBIcon fab icon="google" className="mx-2" />
                                Sign in with google
                            </MDBBtn>

                            <MDBBtn className="mb-4 w-100" size="lg" style={{ backgroundColor: '#3b5998' }}>
                                <MDBIcon fab icon="facebook-f" className="mx-2" />
                                Sign in with facebook
                            </MDBBtn>

                        </MDBCardBody>
                    </MDBCard>

                </MDBCol>
            </MDBRow>

        </MDBContainer>
    )
}

export default Login;
