import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../firebase";
import UserForm from "../User/UserForm";
import { getAuth, updatePassword } from "firebase/auth";
import PasswordForm from "./PasswordForm";


const Users = () => {
  const [users, setUsers] = useState([]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openForm,setOpenForm]=useState(false);



  const getUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const usersData = querySnapshot.docs
      .map((doc) => doc.data())
      .filter((user) =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    setUsers(usersData);
  };

  useEffect(() => {
    getUsers();
  }, [searchTerm]);

  const handleSaveUser = (userData) => {
    setUsers([...users, userData]);
  };
 

  return (
    <>
      <div className="w-[100%] flex pb-[1.5rem]">
        <div className="mr-auto relative flex items-center text-[1.25rem] rounded-[0.5rem]">
          <input
            placeholder="Quick search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-[4rem] border border-gray-300 p-[0.75rem] rounded-[0.5rem] text-[1.5rem] pr-[5rem]"
          />
          {!searchTerm && (
            <i className="fa-solid fa-magnifying-glass absolute cursor-pointer text-[#7d817e] text-[1.5rem] bottom-[0.5rem] right-[1rem] transform translate-y-[-50%]"></i>
          )}
          {searchTerm && (
            <i
              onClick={() => setSearchTerm("")}
              className="fa-solid fa-xmark absolute cursor-pointer text-[#7d817e] text-[1.5rem] bottom-[0.5rem] right-[1rem] transform translate-y-[-50%]"
            ></i>
          )}
        </div>
        <button
          className="text-white bg-blue-500 hover:bg-blue-600 mr-[1rem] custom-shadow flex items-center text-[1.25rem] duration-150 text-[#b2eb5] px-[2rem] py-[1rem] rounded-[0.5rem]"
          onClick={() => setOpenDrawer(true)}
        >
          Add user
        </button>
      </div>

      <div className="w-full flex flex-col border rounded-[0.5rem] overflow-hidden">
        <table className="w-[100%] border-spacing-0">
          <thead>
            <tr className="bg-[#ededed]">
              <th className="p-[1.5rem] text-justify text-[1.45rem]">Email</th>
              <th className="p-[1.5rem] text-justify text-[1.45rem]">
                Phone Number
              </th>
              <th className="p-[1.5rem] text-justify text-[1.45rem]">Role</th>
              <th className="p-[1.5rem] text-justify text-[1.45rem]">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-b last:border-0">
                <td className="p-[1.5rem] text-[1.35rem] ">
                  {user.email ? user.email : "-"}
                </td>
                <td className="p-[1.5rem] text-[1.35rem] ">
                  {user.mobile_number ? user.mobile_number : "-"}
                </td>
                <td className="p-[1.5rem] text-[1.35rem] ">
                  {user.role ? user.role : "-"}
                </td>
                <td className="p-[1.5rem] text-[1.35rem]">
                  <i
                    className="fa-solid fa-pencil mr-[1rem] cursor-pointer"
                    onClick={() => setOpenForm(true)}

                  ></i>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <UserForm
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          onSaveUser={handleSaveUser}
        />
        <PasswordForm
        openForm={openForm}
        setOpenForm={setOpenForm}
         />
      </div>
    </>
  );
};

export default Users;
