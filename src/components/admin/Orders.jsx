import { useState } from "react";
import { db } from "../../firebase"
import { collection, getDocs,orderBy,query } from "firebase/firestore"
import { useEffect } from "react";
import moment from "moment/moment";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    const getOrders = async () => {
        const querySnapshot = await getDocs (query(collection(db, 'orders'),orderBy('date','desc')));
        const ordersData = querySnapshot.docs.map((doc) => doc.data());
        setOrders(ordersData);
    };


    useEffect(() => {
        getOrders();
    }, []);


    return (
        <div className='w-full flex flex-col border rounded-[0.5rem] overflow-hidden'>
            <table className="w-[100%] border-spacing-0">
                <thead>
                    <tr className="bg-[#ededed]">
                        <th className="p-[1.5rem] text-justify text-[1.45rem]">Store ID</th>
                        <th className="p-[1.5rem] text-justify text-[1.45rem]">Status</th>
                        <th className="p-[1.5rem] text-justify text-[1.45rem]">Total</th>
                        <th className="p-[1.5rem] text-justify text-[1.45rem]">Date</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        orders[0] && orders.map((order, index) => {
                            return (
                                <tr key={index} className="border-b last:border-0">
                                    <td className='p-[1.5rem] text-[1.35rem]'>{order?.user_id}</td>
                                    <td aria-hidden className="p-[1.5rem] text-[1.35rem]">
                                        <span className={`rounded-full px-[0.75rem] text-[1rem] py-[0.25rem] text-white ${order.status === "pending" ? "bg-red-500" : "bg-green-500"}`}>{order.status}</span>
                                    </td>
                                    <td className='p-[1.5rem] text-[1.35rem]'>{order.total}</td>
                                    <td className='p-[1.5rem] text-[1.35rem]'>{moment(order.date.seconds * 1000).format('YYYY-MM-DD')}</td>
                                    

                                </tr>
                            )
                        })
                    }
                </tbody >
            </table>

        </div>
    )
}

export default Orders