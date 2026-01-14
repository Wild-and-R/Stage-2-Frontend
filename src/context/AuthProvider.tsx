import {useState} from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({children} : {children: React.ReactNode}) {
    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem("authToken");
    });

    const Login = (token: string) => {
        localStorage.setItem("authToken", token);
        setToken(token);
    }

    const Logout = () => {
        localStorage.removeItem("authToken");
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{token, Login, Logout}}>
            {children}
        </AuthContext.Provider>
    )
}
