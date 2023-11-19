import {createContext, useState, useContext,useEffect} from 'react'
import {registerRequest, loginRequest, verifyTokenRequest } from '../api/auth'
import Cookies from 'js-cookie'

export const AuthContext = createContext()

export const useAuth = () =>{
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth must be used within an AuthPROvider");
    };
    return context;
}

export const AuthProvider = ({children}) =>{
    const[user,setUser] = useState(null);
    const[isAuthenticated, setIsAuthenticated] = useState(false);
    const[errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const signup = async (user) =>{
        try {
            const res = await registerRequest(user);
            console.log(res);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error.response);
            setErrors(error.response.data);
        }
    }

    const login = async(user) =>{
        try {
            const res = await loginRequest(user);
            console.log(res);
            setIsAuthenticated(true);
            setUser(res.data);
        } catch (error) {
            console.error(error);
            if(Array.isArray(error.response.data)){
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }

    const logout = () =>{
        Cookies.remove("token");
        setIsAuthenticated(false);
        setUser(null);
    }

    useEffect(() =>{
    async function checkLogin() {
        const cookies =Cookies.get();
        if(!cookies.token){
            setIsAuthenticated(false);
            setLoading(false);
            return setUser(null);
        }
            try {
                const res = await verifyTokenRequest(cookies.token)
                if(!res.data) {
                    setIsAuthenticated(false)
                    setLoading(false);
                    return;
                }

                setIsAuthenticated(true)
                setUser(res.data)
                setLoading(false);
            } catch (error) {
                console.log(error);
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
        
    }
    checkLogin();
    }, []);

    return(
        <AuthContext.Provider value={{
            signup, login , logout,user, isAuthenticated,errors, loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}
