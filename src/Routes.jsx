import { createBrowserRouter } from "react-router-dom";
import Weather from "./pages/weather/Weather";
import Layout from "./pages/Layout";
import Login from "./pages/login/Login";
const Routes = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {path: "/", element: <Login/>},
            {path: "/weather", element: <Weather/>}
        ]
    }
]);

export default Routes;