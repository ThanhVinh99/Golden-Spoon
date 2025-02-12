import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Categories from '../pages/admin/categories/Categories';
import Dashboard from '../pages/admin/dashboard/Dashboard';
import UserPage from '../pages/admin/uses_pages/UserPage';
import Profile from '../pages/admin/profile/Profile';
import Package from '../pages/admin/vip/Package';

import Feature from '../pages/admin/vip/Feature';

import Like from '../pages/admin/engagement_pages/Like';
import Watchlist from '../pages/admin/engagement_pages/Watchlist';
import Comment from '../pages/admin/engagement_pages/Comment';
import Trailer from '../pages/admin/media_management/Trailer';
import Author from '../pages/admin/cast_crew/Author';
import Character from '../pages/admin/cast_crew/character/Character';
import Episode from '../pages/admin/media_management/episodes/Episode';
import Movie from '../pages/admin/media_management/movie/Movie';
import Actor from '../pages/admin/cast_crew/actor/Actor';
import Plans from '../pages/admin/vip/plan/Plans';
function AdminRoutes(props) {
    const routes = [
       {path: "/", Comment: <Dashboard /> },
       {path: "/categories/categories", Comment: <Categories />},
       {path: "/media_management/movie", Comment: <Movie/>},
       {path: "/media_management/episode", Comment: <Episode />},
       {path: "/media_management/trailer", Comment: <Trailer/>},
       {path: "/vip/package", Comment: <Package/>},
       {path: "/vip/feature", Comment: <Feature/>},
       {path: "/vip/plans", Comment: <Plans/>},
       {path: "/cast_crew/author", Comment: <Author/>},
       {path: "/cast_crew/character", Comment: <Character/>},
       {path: "/cast_crew/actor", Comment: <Actor/>},
       {path: "/engagement_pages/like", Comment: <Like/>},
       {path: "/engagement_pages/watchlist", Comment: <Watchlist/>},
       {path: "/engagement_pages/comment", Comment: <Comment/>},
       {path: "/user_pages/userpages", Comment: <UserPage/>},
       {path: "/proflie/proflie", Comment: <Profile/>}
    ]
    return (
        <Routes>
            {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.Comment} />
            ))}
        </Routes>
    );
}

export default AdminRoutes;