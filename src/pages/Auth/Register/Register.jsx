import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, updateUserProfile } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const handleRegistration = (data) => {
        const profileImg = data.photo[0];
        registerUser(data.email, data.password)
            .then(() => {
                // store the image and get the photo url
                const formData = new FormData();
                formData.append('image', profileImg);
                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

                axios.post(image_API_URL, formData)
                    .then(res => {
                        const photoURL = res.data.data.url;

                        // Create user in the database
                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: photoURL
                        }
                        axiosSecure.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user created in the database');
                                }
                            })

                        //Update user profile here
                        const userProfile = {
                            displayName: data.name,
                            photoURL: photoURL
                        }
                        updateUserProfile(userProfile)
                            .then(() => {
                                navigate(location?.state || '/');
                            })
                            .catch(error => {
                                console.log(error);
                            })
                    })
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
                    {/* Name field */}
                    <label className="label">Name</label>
                    <input type="text" {...register("name", { required: true })} className="input" placeholder="Your Name" />
                    {errors.name?.type === "required" && <p className='text-red-500'>Email is required.</p>}
                    {/* Photo field */}
                    <label className="label">Photo</label>
                    <input type="file" {...register("photo", { required: true })} className="file-input" placeholder="Your Photo" />
                    {errors.photo?.type === "required" && <p className='text-red-500'>Photo is required.</p>}
                    {/* Email field */}
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
                <p>Already Have an Account <Link state={location?.state} to="/login" className='text-secondary font-bold underline'>Login</Link></p>
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;