import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { AuthContext } from '../Provider/AuthProvider';
import { toast } from 'react-hot-toast';
import { updateProfile } from 'firebase/auth';

const Register = () => {
    const { createUser, signInWithGoogle, setUser } = useContext(AuthContext);
    const [nameError, setNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassWord] = useState(false);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        // Validation
        if (name.length < 6) {
            setNameError("Name should be at least 6 characters");
            return;
        } else {
            setNameError("");
        }

        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const isLongEnough = password.length >= 6;

        if (!hasUppercase || !hasLowercase || !isLongEnough) {
            setPasswordError("Password must be at least 6 characters and include both uppercase and lowercase letters.");
            return;
        } else {
            setPasswordError("");
        }

        // Create user
        createUser(email, password)
            .then(res => {
                const user = res.user;

                // Update profile
                updateProfile(user, {
                    displayName: name,
                    photoURL: photo
                }).then(() => {
                    setUser(user);
                    toast.success("Registration successful!");
                    form.reset();
                    navigate("/");
                }).catch(err => {
                    toast.error("Profile update failed.", err);
                });
            })
            .catch((err) => {
                if (err.code === 'auth/email-already-in-use') {
                    setPasswordError("This email is already in use.");
                    toast.error("This email is already in use.");
                }
            });
    };

    const handleGoogleSignUp = () => {
        signInWithGoogle()
            .then((res) => {
                const user = res.user;
                setUser(user);
                toast.success("Registration successful with Google!");
                navigate("/");
            })
            .catch((err) => {
                if (err.code === 'auth/account-exists-with-different-credential') {
                    setPasswordError("This email is already associated with a different sign-in method.");
                    toast.error("This email is already associated with another method.");
                } else {
                    toast.error(err);
                }
            });
    };

    return (
        <div className='flex justify-center min-h-screen items-center'>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
                <h2 className='font-semibold text-2xl text-center'>Register Here</h2>
                <div className="card-body">
                    <form onSubmit={handleRegister}>
                        <label className="label">Name</label>
                        <input type="text" className="input" name='name' placeholder="Name" required />
                        {nameError && <p className='text-red-600 text-xs'>{nameError}</p>}

                        <label className="label">PhotoURL</label>
                        <input type="text" className="input" name='photo' placeholder="PhotoURL" required />

                        <label className="label">Email</label>
                        <input type="email" className="input" name='email' placeholder="Email" required />

                        <label className="label">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="input w-full pr-10"
                                placeholder="Password"
                                name='password'
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassWord(!showPassword)}
                                className='absolute right-3 top-1/2 -translate-y-1/2 text-xl'
                            >
                                {showPassword ? <FaEyeSlash /> : <FaRegEye />}
                            </button>
                        </div>
                        {passwordError && <p className='text-red-600 text-xs'>{passwordError}</p>}

                        <button type="submit" className="btn btn-neutral mt-4 w-full">Register</button>

                        <button
                            type="button"
                            onClick={handleGoogleSignUp}
                            className="btn bg-white text-black border-[#e5e5e5] mt-4 flex items-center justify-center w-full"
                        >
                            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <g>
                                    <path d="m0 0H512V512H0" fill="#fff"></path>
                                    <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                                    <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                                    <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                                    <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                                </g>
                            </svg>
                            <span className='ml-2'>Sign Up with Google</span>
                        </button>

                        <p className='font-semibold text-center pt-5'>
                            Already Have An Account? <Link className='text-red-700' to="/auth/login">Login Here</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;