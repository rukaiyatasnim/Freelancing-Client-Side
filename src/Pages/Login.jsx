import React, { useState, useContext, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { sendPasswordResetEmail, getAuth } from 'firebase/auth';
import { toast } from 'react-hot-toast';

const Login = () => {
    const [error, setError] = useState("");
    const [showPassword, setShowPassWord] = useState(false);
    const [loading, setLoading] = useState(false);
    const { signIn, signInWithGoogle } = useContext(AuthContext);
    const emailRef = useRef();
    const location = useLocation();
    const navigate = useNavigate();
    const auth = getAuth();

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        setLoading(true);
        signIn(email, password)
            .then((res) => {
                const user = res.user;
                toast.success("Login successful!");
                navigate(location.state ? location.state : "/");
            })
            .catch((error) => {
                setError(error.message);
                toast.error("Login failed: " + error.message);
            })
            .finally(() => setLoading(false));
    };

    const handleGoogleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        signInWithGoogle()
            .then(() => {
                toast.success("Logged in with Google!");
                navigate(location.state ? location.state : "/");
            })
            .catch((error) => {
                setError(error.message);
                toast.error("Google login failed: " + error.message);
            })
            .finally(() => setLoading(false));
    };

    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            toast.error("Please enter your email address.");
            return;
        }

        setLoading(true);  // Show loading spinner during password reset attempt
        sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.success("Password reset email sent.");
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                toast.error("Error: " + error.message);
                setLoading(false);
            });
    };

    return (
        <div className='flex justify-center min-h-screen items-center'>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
                <h2 className='font-semibold text-2xl text-center'>Login Your Account</h2>
                <div className="card-body">
                    <form onSubmit={handleLogin} className="fieldset">
                        <label className="label">Email</label>
                        <input type="email" className="input" placeholder="Email" name='email' ref={emailRef} required />

                        <label className="label">Password</label>
                        <div className='relative'>
                            <input type={showPassword ? 'text' : 'password'} className="input" placeholder="Password" name='password' required />
                            <button type="button" onClick={() => setShowPassWord(!showPassword)} className='btn btn-xs absolute top-2 right-4'>
                                {showPassword ? <FaEyeSlash /> : <FaRegEye />}
                            </button>
                        </div>

                        {error && <p className='text-red-600 text-sm'>{error}</p>}

                        <button type="submit" className="btn btn-neutral mt-4" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>

                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="btn bg-white text-black border-[#e5e5e5] mt-4 flex items-center justify-center"
                            disabled={loading}
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
                            {loading ? "Logging in with Google..." : "Login with Google"}
                        </button>

                        <p className='font-semibold text-center pt-5'>
                            Don't Have An Account? <Link className='text-red-700' to="/auth/register">Register</Link>
                        </p>

                        <p className='text-center text-sm pt-2'>
                            <Link onClick={handleForgetPassword} className='text-blue-600 hover:text-blue-800'>
                                {loading ? 'Sending...' : 'Forgot Password?'}
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;