import React from 'react';
import AdminRoutes from '../../../routes/AdminRoutes';
import Header from './Header';




function Main(props) {
    return (
        <div>
            <Header />
           <AdminRoutes/>
        </div>
    );
}

export default Main;