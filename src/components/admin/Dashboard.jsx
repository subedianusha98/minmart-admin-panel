import Widget from './Widget'
import BarChart from './BarChart'
import PieChart from './PieChart'

const Dashboard = () => {
    return (
        <div className='h-full w-full flex flex-col'>
            <div className='mb-[2rem] grid gap-[2rem] grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
                <Widget title="Total Sales" icon={<i className="fa-solid fa-money-bill mr-[1rem] text-[1.75rem]"></i>} value="Rs 20,000" percent="5%" message="Since last month" />
                <Widget title="Total Users" icon={<i className="fa-solid fa-user-group mr-[1rem] text-[1.75rem]"></i>} value="200" percent="8%" message="Since last month" />
                <Widget title="Total Orders" icon={<i className="fa-solid fa-cart-shopping mr-[1rem] text-[1.75rem]"></i>} value="50" percent="-2%" message="Since last month" />
                <Widget title="Total Revenue" icon={<i className="fa-solid fa-money-bill-trend-up mr-[1rem] text-[1.75rem]"></i>} value="Rs 50,000" percent="10%" message="Since last month" />
            </div>

            <div className='h-[40rem] flex w-full gap-[2rem] items-start lg:flex-col'>
                <div className='h-full w-[60%] rounded-[0.5rem] p-[2rem] custom-shadow lg:w-full'>
                    <p className='text-center mb-[1rem] text-[2rem] font-bold-300'>Some Bar Topic</p>
                    <BarChart />
                </div>
                <div className='h-full flex-grow rounded-[0.5rem] p-[4rem] custom-shadow flex flex-col items-center lg:w-full'>
                    <p className='text-center mb-[1rem] text-[2rem] font-bold-300'>Some Pie Topic</p>
                    <PieChart />
                </div>
            </div>

        </div>
    )
}

export default Dashboard