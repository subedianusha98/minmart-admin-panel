import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [changePassword, setChangePassword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const getUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const usersData = querySnapshot.docs
      .map((doc) => doc.data())
      .filter(
        (user) =>
          user.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    setUsers(usersData);
  };

  useEffect(() => {
    getUsers();
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (option) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setChangePassword("");
    setSelectedOption("");
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <div className="relative">
          <input
            className="border border-gray-800 rounded-md py-3 px-5 pr-16 w-64 text-[19px]"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="absolute top-1/2 right-4 transform -translate-y-1/2">
            <i className="fas fa-search text-gray-500 text-xl"></i>
          </button>
        </div>
      </div>

      <div className="w-full flex flex-col border rounded-[0.5rem] overflow-hidden">
        <table className="w-[100%] border-spacing-0">
          <thead>
            <tr className="bg-[#ededed]">
              <th className="p-[1.5rem] text-justify text-[1.45rem]">Email</th>
              <th className="p-[1.5rem] text-justify text-[1.45rem]">Phone Number</th>
              <th className="p-[1.5rem] text-justify text-[1.45rem]">Role</th>
              <th className="p-[1.5rem] text-justify text-[1.45rem]">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={i} className="border-b last:border-0">
                <td className="p-[1.5rem] text-[1.35rem]">{user.email}</td>
                <td className="p-[1.5rem] text-[1.35rem]">{user.mobile_number}</td>
                <td className="p-[1.5rem] text-[1.35rem]">{user.role}</td>
                <td className="p-[1.5rem] text-[1.35rem]">
                  <i
                    className="fa-solid fa-pencil mr-[1rem] cursor-pointer"
                    onClick={() => setShowModal(true)}
                  ></i>
                  {showModal && (
                    <div className="justify-center items-center flex overflow-x-hidden absolute inset-0 py-0 px-0 bg-gray-100 opacity-50">
                      <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                          <div className="relative p-6 flex-auto">
                            <div className="w-[40rem] mb-[2rem] flex flex-col gap-[0.5rem]">
                              {selectedOption ? (
                                <span className="p-[1rem] text-[1.5rem] border border-gray-400 rounded-[0.5rem]">
                                  {selectedOption}
                                </span>
                              ) : (
                                <select
                                  className="rounded-[0.5rem] p-[1rem] text-[1.5rem] border border-gray-400 appearance-none"
                                  onChange={(e) => handleOptionSelect(e.target.value)}
                                >
                                  <option value="" disabled>Select an option</option>
                                  <option className="bg-white">Admin</option>
                                  <option className="bg-white">Staff</option>
                                </select>
                              )}
                              <button className="absolute justify-center top-[4rem] right-[3rem] transform -translate-y-1/2">
                                <i className="fas fa-caret-down text-gray-500 "> </i>
                              </button>
                            </div>

                            <div className="w-[40rem] mb-[2rem] flex flex-col gap-[0.5rem]">
                              <label className="text-[1.45rem] text-black-500">New Password</label>
                              <input
                                name="changePassword"
                                type="text"
                                autoComplete="off"
                                value={changePassword}
                                onChange={(e) => setChangePassword(e.target.value)}
                                className="border border-gray-400 p-[1rem] rounded-[0.5rem] text-[1.5rem]"
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-end p-6 rounded-b">
                            <button
                              className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-lg px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={handleCloseModal}
                            >
                              Update
                            </button>
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
      </div>
    </>
  );
};

export default Users;
