import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser } = useAuth();
    const handleRegistration = (data) => {
        console.log(data);
        registerUser(data.email, data.password)
            .then(result => {
                console.log(result.user);
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl p-6">
            <h3 className="text-3xl font-extrabold text-center">Welcome to ProFast</h3>
            <p className='text-center'>Please Create an Account</p>
            <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
                <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input type="email" {...register("email", { required: true })} className="input" placeholder="Email" />
                    {errors.email?.type === "required" && <p className='text-red-500'>Email is required.</p>}
                    {/* password */}
                    <label className="label">Password</label>
                    <input type="password" {...register("password", { required: true, minLength: 6, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/ })} className="input" placeholder="Password" />
                    {errors.password?.type === "required" && <p className='text-red-500'>Password is required.</p>}
                    {errors.password?.type === "minLength" && <p className='text-red-500'>Password must be 6 characters or more</p>}
                    {errors.password?.type === "pattern" && <p className='text-red-500'>Password must have one uppercase, one lowercase, one number and one special character</p>}
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Register</button>
                </fieldset>
                <p>Already Have an Account <Link to="/login" className='text-secondary font-bold underline'>Login</Link></p>
            </form>
        </div>
    );
};

export default Register;