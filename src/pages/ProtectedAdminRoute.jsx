import React from 'react';
import { Navigate } from 'react-router-dom';
import Upload from '../admin/pages/Upload';

const ProtectedAdminRoute = ({ adminRoute }) => {

    return (
        adminRoute ? <Upload /> : <Navigate to={'/home'} />
    )
}

export default ProtectedAdminRoute;