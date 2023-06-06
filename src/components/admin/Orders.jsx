
const Orders = () => {
    return (
        <div className='w-full flex flex-col custom-shadow'>
            <table className="w-[100%] border-spacing-0">
                <thead>
                    <tr>
                        <th className="p-[1rem] text-justify text-[1.25rem] bg-[#ededed]">Order ID</th>
                        <th className="p-[1rem] text-justify text-[1.25rem] bg-[#ededed]">Order Status</th>
                        <th className="p-[1rem] text-justify text-[1.25rem] bg-[#ededed]">Payment Status</th>
                        <th className="p-[1rem] text-justify text-[1.25rem] bg-[#ededed]">Order Total</th>
                        <th className="p-[1rem] text-justify text-[1.25rem] bg-[#ededed]">Ordered On</th>
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <td className="p-[1rem] text-[1.25rem] bg-white border-b">01</td>
                        <td className="p-[1rem] text-[1.25rem] bg-white border-b">pending</td>
                        <td className="p-[1rem] text-[1.25rem] bg-white border-b">paid</td>
                        <td className="p-[1rem] text-[1.25rem] bg-white border-b">1200</td>
                        <td className="p-[1rem] text-[1.25rem] bg-white border-b">2022-02-12</td>
                    </tr>

                    <tr>
                        <td className="p-[1rem] text-[1.25rem] bg-white border-b">01</td>
                        <td className="p-[1rem] text-[1.25rem] bg-white border-b">pending</td>
                        <td className="p-[1rem] text-[1.25rem] bg-white border-b">paid</td>
                        <td className="p-[1rem] text-[1.25rem] bg-white border-b">1200</td>
                        <td className="p-[1rem] text-[1.25rem] bg-white border-b">2022-02-12</td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export default Orders