import LogoUSTP from '../assets/images/logoUSTP.png'
import LoginUsername from '../assets/images/login_username.png'
import LoginPassword from '../assets/images/login_password.png'
import supabase from '../../supabase/config'
import { useNavigate } from 'react-router-dom'

export default function LogIn() {
    const navigate = useNavigate()

    // METHOD 
    const handleClickSignUp = async (e) => {
        e.preventDefault({

        })
        const { data, error } = await supabase.auth.signInWithPassword({
            email: e.target.email.value,
            password: e.target.password.value,

        })
        if (error) {
            console.log(error)
        } else if (!error) {
            navigate('/dashboard')
        }
    }

    return (
        // BACKGROUND IMAGE
        <div className="flex justify-center items-center min-h-screen min-w-screen bg-background-image bg-cover">

            {/* CARD CONTAINER */}
            <form method="POST" onSubmit={handleClickSignUp} className="flex flex-col items-center justify-around h-96 w-80 p-6 rounded-sm  bg-acc-edd shadow-4xl">
                
                {/* USTP LOGO */}
                <div className="flex flex-col items-center">
                    <img src={LogoUSTP} className="h-20 w-20" />
                </div>

                {/* USERNAME  */}
                <div className="flex h-9 border border-gray-400 rounded-sm">
                    <img src={LoginUsername} className="p-1 w-12 h-7.5 bg-white" />
                    <input
                        className="border-l border-gray-400 p-2 outline-none"
                        placeholder="Username"
                        name="email"
                        type="email"
                    />
                </div>

                {/* PASSWORD */}
                <div className="flex h-9 border border-gray-400 rounded-sm">
                    <img src={LoginPassword} className="p-1 w-12 h-7.5 bg-white" />
                    <input
                        className="border-l border-gray-400 p-2 outline-none"
                        placeholder="Password"
                        name="password"
                        type="password"
                    />
                </div>

                {/* TERMS OF CONDITIONS AND PRIVACY POLICY OF JRS */}
                <a href="" className="text-xs text-center  w-52">
                    By logging in, I agree to the Terms of Conditions and Privacy Policy
                    of JRS.
                </a>

                {/* LOGIN BUTTON */}
                <button onClick={() => navigate("/dashboard")}
                    className="w-60 p-1 font-semibold bg-yellow-500 hover:bg-yellow-600 transition duration-115 hover:ease-in"
                    type="submit"
                >
                    LOG IN
                </button>

                {/* FORGOT PASSWORD */}
                <a href="" className="text-xs text-center ">
                    Forgot Password
                </a>
                {/* <span className="text-red-500 font-semibold">{showError}</span> */}
            </form>

        </div>
    )
}
