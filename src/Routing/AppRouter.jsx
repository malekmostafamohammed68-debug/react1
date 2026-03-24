import { createBrowserRouter } from "react-router";
import Posts       from './../Pages/Posts/Posts';
import Layout      from './../Components/Layout/Layout';
import Login       from './../Pages/Login/Login';
import Register    from './../Pages/Register/Register';
import NotFound    from "../Pages/NotFound/NotFound";
import ProtectedRoute from "../Components/ProtectedRoute/ProtectedRoute";
import Profile     from "../Pages/Profile/Profile";
import Friends     from "../Pages/Friends/Friends";
import Videos      from "../Pages/Videos/Videos";
import Marketplace from "../Pages/Marketplace/Marketplace";
import Settings    from "../Pages/Settings/Settings";

const P = ({ children }) => <ProtectedRoute>{children}</ProtectedRoute>;

export const myRouter = createBrowserRouter([
  { path: '', element: <Layout />, children: [
    { path: '',           element: <P><Posts /></P>       },
    { path: 'posts',      element: <P><Posts /></P>       },
    { path: 'profile/:id?', element: <P><Profile /></P>     },
    { path: 'friends',    element: <P><Friends /></P>     },
    { path: 'videos',     element: <P><Videos /></P>      },
    { path: 'marketplace',element: <P><Marketplace /></P> },
    { path: 'settings',   element: <P><Settings /></P>    },
    { path: 'login',      element: <Login />              },
    { path: 'register',   element: <Register />           },
    { path: '*',          element: <NotFound />           },
  ]},
]);
