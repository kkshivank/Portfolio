import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";
import Home from "../pages/public/Home";
import ResearchPapersPage from "../pages/public/ResearchPapersPage";
import CaseStudiesPage from "../pages/public/CaseStudiesPage";
import CaseStudyDetail from "../pages/public/CaseStudyDetail";
import BlogsPage from "../pages/public/BlogsPage";
import BlogDetail from "../pages/public/BlogDetail";



const myRoute = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Home />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/research-papers" element={<ResearchPapersPage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/case-studies/:id" element={<CaseStudyDetail />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
        </>
     )
)

export default myRoute;