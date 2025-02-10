import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function Login() {
    return(
            
            <>
             <div className="text-center flex justify-center">
                <img className="w-[300px] h-[300px] object-cover rounded-full bg-green-500" src={logo} alt="더미 이미지" />
            </div>

            <div className="w-full m-auto mt-5 mb-5 h-[2px] p-1 rounded-4xl bg-blue-400"></div>

            <div className="flex flex-col">
            <button className="m-auto cursor-pointer py-2 px-4 shadow-md font-bold text-black bg-[#FEE500] w-[50%] rounded-lg mb-2 h-xs">
                카카오 로그인
            </button>
            <button className="m-auto cursor-pointer bg-[#4285F4] text-white w-[50%] font-bold py-2 px-4 shadow-md rounded-lg mb-2 h-xs">
                구글 로그인
            </button>
            </div>
            <Link to="/weather" className="cursor-pointer bg-gray-500 text-white w-full py-3 rounded-lg h-xs">
                접속
            </Link>
            </>
    )
}
