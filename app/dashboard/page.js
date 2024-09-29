import Dashboard from "@/components/Dashboard";
import Loading from "@/components/Loading";
import Login from "@/components/Login";
import Main from "@/components/Main";
import { useAuth } from "@/context/AuthContext";

export const metadata = {
    title: "Moodle ⋅ dashboard",
  };

export default function DashboardPage(){

    

    return(
        <Main>
            <Dashboard />
        </Main>
    )
}