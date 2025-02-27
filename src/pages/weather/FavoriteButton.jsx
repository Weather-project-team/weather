import axios from "axios";
import { AiOutlineStar } from "react-icons/ai";

export function FavoriteButton({ city }) {
  const handleFavorite = async () => {
    console.log(city);
    axios
      .post(
        "http://localhost:8080/api/bookmarks",
        {
          userId: 1,
          location: city,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <p
      className="absolute 
                            right-5 top-1/2 
                            -translate-y-1/2 cursor-pointer p-2 text-2xl"
      onClick={handleFavorite}
    >
      <AiOutlineStar />
    </p>
  );
}
