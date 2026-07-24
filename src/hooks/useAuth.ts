import { AuthContext } from "@/contexts/AuthContexts";
import { useContext } from "react";

export function useAuth() {
    return useContext(AuthContext);
}