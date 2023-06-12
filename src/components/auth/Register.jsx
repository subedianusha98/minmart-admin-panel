import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { toast } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    company_name: "",
    contact_person: "",
    confirm_password: "",
    mobile_no: "",
    company_address: "",
    pan_no: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(data);

    const {
      email,
      password,
      confirm_password,
      company_address,
      company_name,
      pan_no,
      mobile_no,
      contact_person,
    } = data;
    const toastId = toast.loading("processing");
    if (!email || !password || !confirm_password || !company_address || !company_name || !pan_no|| !mobile_no || !contact_person) {
      return toast.error("Please fill in all the fields.", { id: toastId });
    }
    if (password !=confirm_password){
    return toast.error("password doesn't match!",{id:toastId});
    }
 try{
    createUserWithEmailAndPassword(auth, email, password);
    toast.success("Registered successfully!",{id:toastId});
    navigate('/admin');

 }
 catch(err){
  console.log(message)  
 }
    
  };

  return (
    <form className="h-[100vh] px-[2rem] flex flex-col justify-center items-center border" onSubmit={submitHandler}>
      <div className="w-[50rem] bg-white rounded-lg shadow-lg py-8 px-10 grid grid-cols-2 gap-6">
        <div className="col-span-2 mb-6  ">
          <h2 className="text-[2.75rem] text-center mb-4 font-serif">
            Register
          </h2>
          <span className="text-[1.5rem] text-center block font-serif">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </span>
        </div>
        <div>
          <label className="text-[1.45rem] text-black-500 font-serif">
            Company Name
          </label>
          <input
            name="company_name"
            type="text"
            autoComplete="off"
            value={data.company_name}
            onChange={handleChange}
            className="border border-gray-400 p-[1rem] rounded-[0.5rem] text-[1.5rem]"
          />
        </div>
        <div>
          <label className="text-[1.45rem] text-black-500 font-serif">
            Company Address
          </label>
          <input
            name="company_address"
            type="text"
            autoComplete="off"
            value={data.company_address}
            onChange={handleChange}
            className="border border-gray-400 p-[1rem] rounded-[0.5rem] text-[1.5rem]"
          />
        </div>
        <div>
          <label className="text-[1.45rem] text-black-500 font-serif">
            PAN Number
          </label>
          <input
            name="pan_no"
            type="text"
            autoComplete="off"
            value={data.pan_no}
            onChange={handleChange}
            className="border border-gray-400 p-[1rem] rounded-[0.5rem] text-[1.5rem]"
          />
        </div>
        <div>
          <label className="text-[1.45rem] text-black-500 font-serif">
            Contact Person
          </label>
          <input
            name="contact_person"
            type="text"
            autoComplete="off"
            value={data.contact_person}
            onChange={handleChange}
            className="border border-gray-400 p-[1rem] rounded-[0.5rem] text-[1.5rem]"
          />
        </div>
        <div>
          <label className="text-[1.45rem] text-black-500 font-serif">
            Email
          </label>
          <input
            name="email"
            type="email"
            autoComplete="off"
            value={data.email}
            onChange={handleChange}
            className="border border-gray-400 p-[1rem] rounded-[0.5rem] text-[1.5rem]"
          />
        </div>
        <div>
          <label className="text-[1.45rem] text-black-500 font-serif">
            Password
          </label>
          <input
            name="password"
            type="password"
            autoComplete="off"
            value={data.password}
            onChange={handleChange}
            className="border border-gray-400 p-[1rem] rounded-[0.5rem] text-[1.5rem]"
          />
        </div>
        <div>
          <label className="text-[1.45rem] text-black-500 font-serif">
        
            Confirm Password
          </label>
          <input
            name="confirm_password"
            type="password"
            autoComplete="off"
            value={data.confirm_password}
            onChange={handleChange}
            className="border border-gray-400 p-[1rem] rounded-[0.5rem] text-[1.5rem]"
          />
        </div>
        <div>
          <label className="text-[1.45rem] text-black-500 font-serif">
            Mobile Number
          </label>
          <input
            name="mobile_no"
            type="text"
            value={data.mobile_no}
            onChange={handleChange}
            className="border border-gray-400 p-[1rem] rounded-[0.5rem] text-[1.5rem]"
          />
        </div>

        <button
          type="submit"
          className="col-span-2 bg-gradient-to-r text-[1.5rem] from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 text-[#fff] px-[3rem] py-[1rem] rounded-[0.5rem] shadow-lg"
        >
          Register
        </button>
        <div className="col-span-2 text-center text-gray-500">
          <p className="mr-[0.5rem] text-[1.45rem]">
            Already have an account? Click here to
          </p>
          <button type='button' onClick={() => navigate('/login')} className='text-[1.45rem] hover:cursor-pointer bg-transparent underline'>login</button>

        </div>
      </div>
    </form>
  );
};

export default Register;
