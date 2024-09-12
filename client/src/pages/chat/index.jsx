import { useAppStore } from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../profile";
import { toast } from "sonner";

const Chat = () =>{
    const {userInfo} = useAppStore();
    const navigate = useNavigate();
    useEffect(()=>{
        if(!userInfo.profileSetup){
            toast("please setup your profile to continue");
            navigate("/profile");
        }
    }, [userInfo, navigate]);

    return <div>
CHAT
    </div>
};
export default Chat;