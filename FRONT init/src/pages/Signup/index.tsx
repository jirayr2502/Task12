import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBInput,
}
    from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { InputUser } from '../../Lib/types';
import { handleSignUp } from '../../Lib/api';
import { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form'

const Schema = yup.object({
    name: yup.string()
        .required('Name is required')
        .min(4, 'Name must be at least 4 characters long')
        .max(10, 'Name cannot exceed 10 characters')
        .test(
            'is-first-letter-capital-name',
            'First letter of name must be capitalized',
            value => value ? /^[A-Z]/.test(value) : false
        ),
    surname: yup.string()
        .required('Surname is required')
        .min(6, 'Surname must be at least 6 characters long')
        .max(15, 'Surname cannot exceed 15 characters')
        .test(
            'is-first-letter-capital-surname',
            'First letter of surname must be capitalized',
            value => value ? /^[A-Z]/.test(value) : false
        ),
    login: yup.string()
        .required('Login is required')
        .min(6, 'Login must be at least 6 characters long')
        .max(15, 'Login cannot exceed 15 characters'),
    password: yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters long')
        .max(15, 'Password cannot exceed 15 characters'),
});


export function Signup() {

    const [error, setError] = useState<string>('')

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors }, reset } = useForm<InputUser>({
        resolver: yupResolver(Schema)
    })

    const onSubmit = (data: InputUser): void => {
        handleSignUp(data)
            .then(response => {
                if (response.status == 'error' && response.message) {
                    setError(response.message)
                } else {
                    navigate('/profile')
                    reset()
                }
            })
    }

    return (
        <MDBContainer fluid>
            <MDBRow className='d-flex justify-content-center align-items-center'>
                <MDBCol lg='8'>
                    <MDBCard className='my-5 rounded-3' style={{ maxWidth: '600px' }}>
                        <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp' className='w-100 rounded-top' alt="Sample photo" />
                        <MDBCardBody className='px-5'>
                            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Registration Info</h3>
                            <p>Already have an account? <Link to={'/login'}>Login Now</Link></p>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {error && <p className='text-danger'>{error}</p>}
                                {errors.name && <p className='text-danger'>{errors.name.message}</p>}
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Name'
                                    type='text'
                                    {...register('name')}
                                />
                                {errors.surname && <p className='text-danger'>{errors.surname.message}</p>}
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Surname'
                                    type='text'
                                    {...register('surname')}
                                />
                                {errors.login && <p className='text-danger'>{errors.login.message}</p>}
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Login'
                                    type='text'
                                    {...register('login')}
                                />
                                {errors.password && <p className='text-danger'>{errors.password.message}</p>}
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Password'
                                    type='password'
                                    {...register('password')}
                                />
                                <button type='submit' className='btn btn-outline-info' >Submit</button>
                            </form>
                        </MDBCardBody>
                    </MDBCard>

                </MDBCol>
            </MDBRow>

        </MDBContainer>
    );
}