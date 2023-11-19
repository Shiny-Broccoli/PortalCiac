import {Navigate, Outlet}from 'react-router-dom';
import {useAuth} from './contextUser/contextUser'

function ProtectedRoute() {
    const {loading, user, isAuthenticated} = useAuth();
    console.log(loading, isAuthenticated);


    if(loading) return <h1> Loading...</h1>
    if(!loading && !isAuthenticated) return <Navigate to='/'/>
    return <Outlet/>;
    
}

export default ProtectedRoute