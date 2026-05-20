import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";
import Home from "../pages/public/Home";
import ResearchPapersPage from "../pages/public/ResearchPapersPage";
import BlogsPage from "../pages/public/BlogsPage";



const myRoute = createBrowserRouter(
    createRoutesFromElements(  
        <>
            <Route path="/" element={<Home />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/research-papers" element={<ResearchPapersPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
        </>
     )
)

export default myRoute;