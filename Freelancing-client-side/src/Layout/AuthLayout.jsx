import React from 'react';
import Header from '../Components/Header'
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

const AuthLayOut = () => {
    return (
        <div>
            <header className='bg-base-200'>
                <Header></Header>
            </header>
            <main>
                <Outlet></Outlet>
            </main>
            <footer className='top-0'>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default AuthLayOut;