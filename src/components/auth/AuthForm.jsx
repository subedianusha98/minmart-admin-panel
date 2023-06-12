import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AuthForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
     const [variant, setVariant] = useState("LOGIN");

    const changeVariant = () => {
        if (variant === "LOGIN") setVariant("REGISTER");
        else setVariant("LOGIN");
    }

    const submitHandler = (e) => {
        e.preventDefault();
        navigate('/admin');
    }


    return (
        <form className='h-[100vh] px-[2rem] flex flex-col justify-center items-center border' onSubmit={submitHandler}>
            <div className="w-full text-center mb-10">
                <h2 className='text-[2.75rem]'>{variant === "LOGIN" ? "Sign In" : "Sign Up"}</h2>
                <span className='text-[1.5rem]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </span>
            </div>

            <div className="w-[40rem] mb-[2rem] flex flex-col gap-[0.5rem]">
                <label className='text-[1.45rem] text-gray-500'>Email</label>
                <input
                    name="email"
                    type="text"
                    autoComplete='off'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className='border border-gray-400 p-[1rem] rounded-[0.5rem] text-[1.5rem]'
                />
            </div>

            <div className="w-[40rem] mb-[2rem] flex flex-col gap-[0.5rem]">
                <label className='text-[1.45rem] text-gray-500'>Password</label>
                <input
                    name="password"
                    type="password"
                    autoComplete='new-password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className='border border-gray-300 p-[1rem] rounded-[0.5rem] text-[1.5rem]'
                />
            </div>

            {variant === "REGISTER" &&
                <div className="w-[40rem] mb-[2rem] flex flex-col gap-[0.5rem]">
                    <label className='text-[1.45rem] text-gray-500'>Confirm Password</label>
                    <input
                        name="confirmPassword"
                        type="password"
                        autoComplete='new-password'
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        className='border border-gray-300 p-[1rem] rounded-[0.5rem] text-[1.5rem]'
                    />
                </div>
                }
                      {variant === "REGISTER" &&
                <div className="w-[40rem] mb-[2rem] flex flex-col gap-[0.5rem]">
                    <label className='text-[1.45rem] text-gray-500'>Confirm Password</label>
                    <input
                        name="confirmPassword"
                        type="password"
                        autoComplete='new-password'
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        className='border border-gray-300 p-[1rem] rounded-[0.5rem] text-[1.5rem]'
                    />
                </div>
                }
                      {variant === "REGISTER" &&
                <div className="w-[40rem] mb-[2rem] flex flex-col gap-[0.5rem]">
                    <label className='text-[1.45rem] text-gray-500'>Confirm Password</label>
                    <input
                        name="confirmPassword"
                        type="password"
                        autoComplete='new-password'
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        className='border border-gray-300 p-[1rem] rounded-[0.5rem] text-[1.5rem]'
                    />
                </div>
                }

            <div className='w-[40rem] mb-[2rem] flex justify-between'>
                <div>
                    <input type='radio' className='h-[1.5rem] w-[1.5rem] mr-2 text-[1.5rem]' />
                    <span className='text-[1.5rem]'>Remember me?</span>
                </div>
                <Link to="#" className='text-blue-500 text-[1.5rem]'>Forgot password?</Link>
            </div>

            <button type='submit' className="w-[40rem] bg-gradient-to-r text-[1.5rem] from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 text-[#fff] px-[3rem] py-[1rem] rounded-[0.5rem] mb-[1rem] shadow-lg">
                {variant === "LOGIN" ? "Login" : "Register"}
            </button>

            <div className='text-center text-gray-500 flex justify-center'>
                <p className='mr-[0.5rem] text-[1.45rem]'>{variant === "LOGIN" ? "Dont have an account? Click here to" : "Already have an account? Click here to"}</p>
                <button type='button' onClick={changeVariant} className='text-[1.45rem] hover:cursor-pointer bg-transparent underline'>{variant === "LOGIN" ? "register" : "login"}</button>
            </div>
        </form>
    )
}

export default AuthForm;