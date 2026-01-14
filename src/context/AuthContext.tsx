import {createContext} from "react";

export type AuthContextType = {
    token: string | null;
    Login: (token: string) => void;
    Logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);