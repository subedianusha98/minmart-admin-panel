import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

// import css
import './App.css'

// import components
import Home from './components/pages/Home/Home';
import RootLayout from './components/layout/RootLayout';
import Auth from './components/auth/Auth';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path='login' element={<Auth />} />
        </Route>
    )
);

function App() {

    return (
        <>
            <div className="app">
                <RouterProvider router={router} />
            </div>
        </>
    )
}

export default App
