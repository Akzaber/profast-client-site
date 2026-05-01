import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {signInUser} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogIn = (data) => {
        console.log('login data', data)
        signInUser(data.email, data.password)
        .then(result => {
            console.log(result.user);
            navigate(location?.state || '/');
        })
        .catch(error => {
            console.log(error);
        })
    }
    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl p-6">
            <h3 className="text-3xl font-extrabold text-center">Welcome Back</h3>
            <p className='text-center'>Please Login</p>
            <form onSubmit={handleSubmit(handleLogIn)} className="card-body">
                <fieldset className="fieldset">
                    {/* Email field */}
                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                    {errors.email?.type === "required" && <p className='text-red-500'>Email is required.</p>}
                    {/* Password field */}
                    <label className="label">Password</label>
                    <input type="password" {...register("password", { required: true, minLength: 6, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/ })} className="input" placeholder="Password" />
                    {errors.password?.type === "required" && <p className='text-red-500'>Password is required.</p>}
                    {errors.password?.type === "minLength" && <p className='text-red-500'>Password must be 6 characters or more</p>}
                    {errors.password?.type === "pattern" && <p className='text-red-500'>Password must have one uppercase, one lowercase, one number and one special character</p>}
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                </fieldset>
                <p>New to ProFast <Link state={location?.state} className='text-secondary font-bold underline' to='/register'>Register Now</Link></p>
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Login;