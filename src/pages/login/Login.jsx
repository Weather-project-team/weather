import { Link } from "react-router-dom";

export default function Login() {
    return(
            
            <div className="w-full max-w-[700px] mx-auto px-4 min-h-screen bg-gray-100">
             <h1 className="text-2xl font-bold text-center pt-4 pb-5">날씨 알리미</h1>
             <div className="mb-5 border-b-1 pb-5 text-center flex justify-center">
                <img className="w-[300px] h-[300px] object-cover rounded-full bg-green-500" src="https://via.placeholder.com/300x300" alt="더미 이미지" />
            </div>
            <button className="cursor-pointer bg-yellow-500 text-white w-full py-3 rounded-lg mb-2 h-xs">
                카카오 로그인
            </button>
            <button className="cursor-pointer bg-blue-500 text-white w-full py-3 rounded-lg mb-2 h-xs">
                구글 로그인
            </button>
            <Link to="/weather" className="cursor-pointer bg-gray-500 text-white w-full py-3 rounded-lg h-xs">
                접속
            </Link>
            </div>
    )
}
