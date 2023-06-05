const Widget = ({ title, icon, value, percent, message }) => {
    return (
        <div className='p-[2rem] rounded-[0.5rem] custom-shadow'>
            <div className="flex items-center">
                {icon}
                <p className='text-[1.5rem]'>{title}</p>
            </div>

            <p className='text-[3rem] my-[0.5rem] font-bold'>{value}</p>
            
            <div className='flex'>
                <div className='flex items-center mr-[2rem]'>
                    <i className="fa-solid fa-arrow-up mr-[0.5rem] text-green-500"></i>
                    <p className='text-[1.5rem] text-green-500'>{percent}</p>
                </div>
                <span className='text-[1.5rem] text-green-500'>{message}</span>
            </div>
        </div>
    )
}

export default Widget