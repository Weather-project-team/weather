import { RouterProvider } from "react-router-dom";
import "./App.css";
import Routes from "./Routes";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <>
      <RecoilRoot>
        <RouterProvider router={Routes} />
      </RecoilRoot>
    </>
  );
}

export default App;
