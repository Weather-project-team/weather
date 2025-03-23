import logo from "../../assets/logo.png";

export default function Login() {
  const KakaoLogin = () => {
    window.location.href = `http://116.34.191.73:8090/oauth2/authorization/kakao`;
  };
  const GoogleLogin = () => {
    window.location.href =
      "http://116.34.191.73:8090/oauth2/authorization/google";
  };

  return (
    <>
      <div className="text-center flex justify-center">
        <img
          className="w-[300px] h-[300px] object-cover rounded-full bg-green-500"
          src={logo}
          alt="더미 이미지"
        />
      </div>

      <div className="w-full m-auto mt-5 mb-5 h-[2px] p-1 rounded-4xl bg-blue-400"></div>

      <div className="flex flex-col">
        <button
          onClick={KakaoLogin}
          className="m-auto cursor-pointer py-2 px-4 shadow-md font-bold text-black bg-[#FEE500] w-[50%] rounded-lg mb-2 h-xs"
        >
          카카오 로그인
        </button>
        <button
          onClick={GoogleLogin}
          className="m-auto cursor-pointer bg-[#4285F4] text-white w-[50%] font-bold py-2 px-4 shadow-md rounded-lg mb-2 h-xs"
        >
          구글 로그인
        </button>
      </div>
    </>
  );
}
