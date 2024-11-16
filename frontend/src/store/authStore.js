import {create} from 'zustand';
import axios from 'axios';

axios.defaults.withCredentials=true;
const API_URL = 'http://localhost:5000/api'
export const useAuthStore = create((set)=>({
    user:null,
    isAuthenticated:false,
    error:null,
    isLoading:false,
    isCheckingAuth:true,

    signup: async(email,password, name)=>{
        set({isLoading:true, error:null});
        try {
            const res = await axios.post(`${API_URL}/auth/signup`, {email, password, name});
            set({user:res.data.user, isAuthenticated:true, isLoading:false});
        } catch (error) {
            set({error:error.response.data.message, isLoading:false});
        }
    },
    
}))
