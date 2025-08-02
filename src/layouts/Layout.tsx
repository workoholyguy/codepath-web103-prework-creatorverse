// src/layouts/Layout.tsx
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import '../App.css'


const Layout = () => {
    return (
        <div className='layout-container' data-theme="auto">
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;