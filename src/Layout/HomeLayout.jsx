import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Outlet } from 'react-router';

const HomeLayOut = () => {
    return (
        <div>
            <header>
                <Header></Header>
                {import.meta.env.VITE_name}
            </header>
            <main>
                <Outlet></Outlet>
            </main>
            <footer> <Footer></Footer> </footer>
        </div >
    );
};

export default HomeLayOut;