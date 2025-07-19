import{ useState } from "react"; //React hook to manage component-level state.
import api from "../services/api";  //Custom Axios instance that sends requests to your backend with proper configuration (like base URL and token).
import { useNavigation, Link } from "react-router-dom";   //useNavigate: Navigate to another route programmatically. //Link: Component to navigate between routes (client-side routing).

import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
//MUI icons and button to show/hide password toggle.

export default function Signup(){
    const [from, setForm] = useState({ email:"", password:""});
    const [error, setError] =useState("");
    const [showPassword, setshowPasswod] = useState(false);
    const navigate = useNavigation();

    const validatePassword = (password)=> {
        if (password.length<8){
            return "Password must be at least 8 characters";
        }
        if (!/[A-Z]/.test(password)){
            return "Password must include at least one uppercase letter."
        }
        if (!/[a-z]/.test(password)) {
      return "Password must include at least one lowercase letter.";
        }
        if (!/\d/.test(password)) {
        return "Password must include at least one number.";
        }
         if (!/[\W_]/.test(password)) {
         return "Password must include at least one special character.";
        }
        return "";
    };

    const handleChange =(e) =>{
        setForm({...form, [e.target.name]: e.target.value});
        //Updates form state when input changes.
        if (e.target.value ==="password"){
            const pwdError= validatePassword(e.target.value);
            setError(pwdError);
        } //If password is being typed, validate it and show error immediately.
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError("");
        //Prevents default form reload and clears existing errors.
        const pwdError= validatePassword(form.password);
        if(pwdError){
            setError(pwdError);
            return;
        }  //Final validation before submitting form.

        try{
            await api.post("/signup", form);  //Sends a POST request to backend /signup.
            navigate("/login");  //Redirects to login if successful.
        } catch(err){
            setError(err.response?.data.msg ||"signup failed");
        }   //Shows backend error message if failed.
        
    };

    return (
        <div className="min-h-screen bg-gradiant-to-br form-indigo-600 via-purple-500 to-pink-500 flex items-center justify-center px-4">
            {/* Full-screen gradient background with center alignment.*/}
            <div className="w-full max-w-md bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-2xl p-10 space-y-6">
                {/* Signup form box with blur, rounded corners, and shadow. */}
                <h2 className="text-4xl font-bold text-center text-white drop-shadow-sm">
                 Create Account
                </h2>  
                <p className="text-center text-sm text-white/80">Sign up to get started</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="text-sm font-medium text-white">
                            Email address
                        </label>
                        <input 
                        type="email"
                        name="email"
                        id="email"
                        placeholder="you@example.com"
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/90 text-gray-800 border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm transition duration-200 placeholder-gray-400"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-sm font-medium text-white">
                            password
                        </label>
                        <div className="relative w-full flex justify-between item-center rounded-xl bg-white/90 text-gray-800 outline-none">
                        <input
                         type={showPassword?"text":"password"}
                         name="password"
                         id="password"
                         placeholder="create a password"
                         onChange={handleChange}
                         required
                         className="w-[100%] px-4 py-3 pr-10 rounded-xl bg-white/90 text-gray outline-none"
                          />
                          <IconButton
                          type="button"
                          onClick={()=> setshowPasswod((prev)=> !prev)}
                          className="text-gray-600 bg-white/90 absolute"
                          aria-label={showPassword? "Hide password" : "Show password"}
                          size="small" 
                          >
                          {showPassword?<VisibilityOff/> :<Visibility/>}
                          </IconButton>
                        </div>
                    </div>
                    {error &&(
                        <div className="bg-red-100/70 border border-red-300 text-red-800 text-sm-rounded-ig px-4 py-2 text-center font-medium">
                            {error}
                        </div>
                    )}
                    <button 
                    type="submit"
                    className="cursor-pointer w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-ig transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={!!error}
                    >
                    register
                    </button>
                </form>
                <p className="text-center text-white/80 text-sm">
                Already have an account?{" "}
                <link to="/login" className="text-white font-semibold hover:underline">
                login
                </link>
                </p>
             </div>
        </div>
    );
}
