import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";

const Stores = () => {
    const [stores, setStores] = useState([]);
    const[searchTerm,setSearchTerm] =useState("");
    const getStores = async () => {
        const querySnapshot = await getDocs(collection(db, "stores"));
        const storesData = querySnapshot.docs.
        map((doc) => doc.data())
        .filter((store)=>
        store.name.toLowerCase().includes(searchTerm.toLowerCase())||
        store.pan_no.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        setStores(storesData);
    };

    useEffect(() => {
        getStores();
    }, [searchTerm]);
    const handleSearch=(e)=>{
        setSearchTerm(e.target.value);
    };
   

    return (
        <>
        <div className="flex justify-end mb-4 ">
        <div className="relative">
          <input
            className="border border-gray-800 rounded-md py-3 px-5 pr-16 w-64 text-[19px]"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="absolute top-1/2 right-4 transform -translate-y-1/2">
            <i className="fas fa-search text-gray-500 text-xl "></i>
          </button>
        </div>
      </div>
      
        <div className='w-full flex flex-col border rounded-[0.5rem] overflow-hidden'>
            <table className="w-[100%] border-spacing-0">
                <thead>
                    <tr className="bg-[#ededed]">
                        <th className="p-[1.5rem] text-justify text-[1.45rem]"> Company Name</th>
                        <th className="p-[1.5rem] text-justify text-[1.45rem]"> Contact Person</th>
                        <th className="p-[1.5rem] text-justify text-[1.45rem]">Email</th>
                        <th className="p-[1.5rem] text-justify text-[1.45rem]"> Phone Number </th>
                        <th className="p-[1.5rem] text-justify text-[1.45rem]">Address</th>
                        <th className="p-[1.5rem] text-justify text-[1.45rem]"> PAN Number </th>

                    </tr>
                </thead>
                <tbody>
                    {stores.map((store, i) => (
                        <tr key={i} className="border-b last:border-0">
                            <td className="p-[1.5rem] text-[1.35rem] ">{store.name}</td>
                            <td className="p-[1.5rem] text-[1.35rem]"> {store.contact_person} </td>
                            <td className="p-[1.5rem] text-[1.35rem]">{store.email}</td>
                            <td className="p-[1.5rem] text-[1.35rem]">{store.mobile_no}</td>
                            <td className="p-[1.5rem] text-[1.35rem]">{store.address}</td>
                            <td className="p-[1.5rem] text-[1.35rem] ">{store.pan_no}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
};

export default Stores;
