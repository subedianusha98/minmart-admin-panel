import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../firebase";
import UserForm from "../User/UserForm";
import { getAuth, updatePassword } from "firebase/auth";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [changePassword, setChangePassword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);

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

  const handleCloseModal = () => {
    setShowModal(false);
    setChangePassword("");

    if (changePassword.trim() !== "") {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        updatePassword(user, changePassword)
          .then(() => {
            console.log("password updated successfully");
          })
          .catch((error) => {
            console.log("error updating password", error);
          });
      }
    }
  };

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
                    onClick={() => setShowModal(true)}
                  ></i>
                  {showModal && (
                    <div className="absolute top-0 right-0 bottom-0 left-0 pt-[20rem] bg-gray-300 bg-opacity-50  transition-all ease-out duration-200">
                      <div className=" w-auto my-6 mx-auto max-w-3xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                          <div className="relative p-6 flex-auto">
                            <div className="w-[40rem] mb-[2rem] flex flex-col gap-[0.5rem]">
                              <label className="text-[1.45rem] text-black-500">
                                New Password
                              </label>
                              <input
                                name="changePassword"
                                type="text"
                                autoComplete="off"
                                value={changePassword}
                                onChange={(e) =>
                                  setChangePassword(e.target.value)
                                }
                                className="border border-gray-400 p-[1rem] rounded-[0.5rem] text-[1.5rem]"
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-end p-6 rounded-b">
                            <button
                              className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-lg px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={handleCloseModal}
                              disabled={!changePassword.trim()}
                            >
                              Update
                            </button>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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
      </div>
    </>
  );
};

export default Users;
