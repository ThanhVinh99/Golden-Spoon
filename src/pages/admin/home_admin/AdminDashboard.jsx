import React from 'react';
import Menu from './Menu';
import Main from './Main';

function AdminDashboard(props) {
    return (
        < >
            <div className='md:flex'>
                <>
                <Menu />
                </>
                <div className='md:flex-1'>
                <Main />
                </div>
                
            </div>

        </>
    );
}

export default AdminDashboard;