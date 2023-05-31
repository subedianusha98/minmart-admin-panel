import { Outlet } from 'react-router-dom'

// import components
import Navbar from './navbar/Navbar'

const RootLayout = () => {
    return (
        <div>
            <header>
                <Navbar />
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default RootLayout