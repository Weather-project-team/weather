import { createBrowserRouter } from "react-router-dom";
import Weather from "./pages/weather/Weather";
import Layout from "./pages/Layout";
import Login from "./pages/login/Login";
import OAuthRedirect from "./pages/redirect/OAuthRedirect";
const Routes = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {path: "/", element: <Login/>},
            {path: "/weather", element: <Weather/>},
            {path: "/oauth2/redirect", element: <OAuthRedirect/>}
        ]
    }
]);

export default Routes;