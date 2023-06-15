import React, { useState } from "react";
import { createUserWithEmailAndPassword, reauthenticateWithCredential } from "firebase/auth";
import { toast } from "react-hot-toast";
import { auth } from "../../../firebase";
// import { updatePassword } from "firebase/auth";


const PasswordForm = ({ openForm, setOpenForm }) => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const resetForm = () => {
    setPassword(""), setNewPassword("");
  };
  // const userPass = {
  // password,
  // newPassword
    
  
  // };
  // onSaveData(userPass);


  const submitHandler = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Processing...");

    if (!password || !newPassword) {
      return toast.error("Please fill in all the fields.", { id: toastId });
    }

    try {
      const user=auth.currentUser;
      if(user){
        const credentials =createUserWithEmailAndPassword(auth,user.email,password);
        await auth.reauthenticateWithCredential(credentials);


        await updatePassword(user, newPassword);
        toast.success("Password updated successfully !",{id: toastId});
        resetForm();
        handleClose();

      }
      else{
        throw new err("User not found.");
      }
      
    } catch (err) {
      let errorMessage;
      switch (err) {
        case "auth/weak-password":
          errorMessage = "Password should be at least 6 characters long.";
          break;
        default:
          errorMessage = "An error occurred. Please try again.";
          break;
      }
      toast.error(errorMessage, { id: toastId });
    }
  };

  const handleClose = () => {
    setOpenForm(false);
    resetForm();
  };
  return (
    <>
      {openForm && (
        <div
          onClick={(e) => {
            if (e.target.id === "overlay") {
              handleClose();
            }
          }}
          id="overlay"
          className=" absolute top-0 right-0 bottom-0 left-0 bg-gray-500 bg-opacity-50 transition-all ease-out duration-200"
        ></div>
      )}

      <div
        className={`${
          openForm ? "right-[0]" : "right-[-50rem]"
        } w-[50rem] p-[2rem] absolute top-0 bottom-0 h-full transition-all ease-in-out duration-300 z-[50] bg-[#ededed] `}
      >
        <div className="flex justify-between items-center mb-[1rem]">
          <i
            className="fa-sharp fa-solid fa-xmark  text-3xl"
            onClick={handleClose}
          ></i>
        </div>

        <form
          className="h-[100vh] px-[2rem] flex flex-col items-center border"
          onSubmit={submitHandler}
        >
          <h1 className="text-3xl font-bold ">Change Password</h1>

          <div className="w-[40rem] mb-[2rem] flex flex-col gap-[0.5rem]">
            <label className="text-[1.45rem] text-black-500"> Old Password</label>
            <input
              name="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-[1rem] rounded-[0.5rem] text-[1.5rem]"
            />
          </div>
          <div className="w-[40rem] mb-[2rem] flex flex-col gap-[0.5rem]">
            <label className="text-[1.45rem] text-black-500">
              New Password
            </label>
            <input
              name="Password"
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border border-gray-300 p-[1rem] rounded-[0.5rem] text-[1.5rem]"
            />
          </div>

          <div className="flex justify-between items-center mb-[1rem]">
            <button
              type="submit"
              className="w-[40rem] bg-gradient-to-r text-[1.5rem] bg-blue-500 transition-all ease duration-200 text-[#fff] px-[3rem] py-[1rem] rounded-[0.5rem] mb-[1rem] shadow-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PasswordForm;
