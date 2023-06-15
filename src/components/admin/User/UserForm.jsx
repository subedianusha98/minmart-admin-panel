import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-hot-toast";
import { auth } from "../../../firebase";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";

const UserForm = ({ openDrawer, setOpenDrawer, onSaveUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [role, setRole] = useState("Admin");

  const resetForm = () => {
    setEmail(""), setPassword(""), setName(""), setNumber(""), setRole("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Processing...");

    if (!email || !password || !name || !role || !number) {
      return toast.error("Please fill in all the fields.", { id: toastId });
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userData = {
        email,
        role,
        mobile_number: number,
      };

      const uid = userCredential.user.uid;
      await setDoc(doc(db, "users", uid), {
        email,
        role,
        mobile_number: number,
      });
      toast.success(" add successfully!", { id: toastId });

      onSaveUser(userData);
    } catch (err) {
      console.log(err);
      let errorMessage;
      switch (err) {
        case "auth/invalid-email":
          errorMessage = "Invalid email.";
          break;

        case "auth/weak-password":
          errorMessage = "Password should be at least 6 characters long.";
          break;

        case "auth/email-already-use":
          errorMessage = "The email address is already use.";
        default:
          errorMessage = "An error occurred. Please try again.";
          break;
      }
      toast.error(errorMessage, { id: toastId });
    }
  };

  const handleClose = () => {
    setOpenDrawer(false);
    resetForm();
  };
  return (
    <>
      {openDrawer && (
        <div
          onClick={(e) => {
            if (e.target.id === "overlay") {
              onClick = { handleClose };
            }
          }}
          id="overlay"
          className=" absolute top-0 right-0 bottom-0 left-0 bg-gray-500 bg-opacity-50 transition-all ease-out duration-200"
        ></div>
      )}

      <div
        className={`${
          openDrawer ? "right-[0]" : "right-[-50rem]"
        } w-[50rem] p-[2rem] absolute top-0 bottom-0 h-full transition-all ease-in-out duration-300 z-[50] bg-[#ededed] `}
      >
        <div className="flex justify-between items-center mb-[1rem]">
          <i
            className="fa-sharp fa-solid fa-xmark  text-3xl"
            onClick={handleClose}
          ></i>
        </div>

        <form
          className="h-[100vh] px-[2rem] flex flex-col justify-center items-center border"
          onSubmit={submitHandler}
        >
          <h1 className="text-3xl font-bold ">Add User</h1>

          <div className="w-[40rem] mb-[2rem] flex flex-col gap-[0.5rem]">
            <label className="text-[1.45rem] text-black-500">Name</label>
            <input
              name="mobile_name"
              type="text"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-400 p-[1rem] rounded-[0.5rem] text-[1.5rem]"
            />
          </div>
          <div className="w-[40rem] mb-[2rem] flex flex-col gap-[0.5rem]">
            <label className="text-[1.45rem] text-black-500">Email</label>
            <input
              name="email"
              type="text"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-400 p-[1rem] rounded-[0.5rem] text-[1.5rem]"
            />
          </div>

          <div className="w-[40rem] mb-[2rem] flex flex-col gap-[0.5rem]">
            <label className="text-[1.45rem] text-black-500">Password</label>
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
              Mobile Number
            </label>
            <input
              name="number"
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="border border-gray-300 p-[1rem] rounded-[0.5rem] text-[1.5rem]"
            />
          </div>
          <div className="w-[40rem] mb-[2rem] flex flex-col gap-[0.5rem]">
            <label className="text-[1.45rem] text-black-500">Role</label>
            <select
              className=" border border-gray-300 rounded-[0.5rem]  p-[1rem] text-[1.5rem]"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option className="bg-white">Admin</option>
              <option className="bg-white">Staff</option>
            </select>
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

export default UserForm;
