import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer";

// Page Imports
import {About, About2, Home, Home2, Courses, Course2, Login, PrivacyPolicy, Signup, Profile, EditProfile} from "../pages/Index";
import {AddCourse, AdminCourse, AdminDashboard, AdminInstructor, AdminLogin, AdminStudent, EditStudent, AddInstructors, EditCourse, EditInstructor} from '../components/Admin/Index'
import {Flutter, WebDev, WebDevlopment, Hacking, Nodejs, WebMaster} from '../components/AllCourses/Index'
import {FlutterPayment, WebDevPayment, WebDevlopmentPayment, HackingPayment, NodejsPayment, WebMasterPayment} from '../components/Payment/Index'
import {FlutterSyllabus, HackingSyllabus, WebDevSyllabus, WebDevelopmentSyllabus, WebMasterSyllabus} from '../components/Syllabus/Index'
import {PayFlutter, PayHacking, PayNodejs, PayWebDev, PayWebDevlopment, PayWebMaster} from '../components/PayScanner/index'
import { InstructorLogin, InstructorDashboard, InstructorCourses, InstructorProfile } from '../components/Instructor/Index'

function AppContent() {
  const location = useLocation();

  // Helper to check if current path matches Admin or Edit routes (including dynamic IDs)
  const pathMatches = (path, routesArray) => {
    return routesArray.some((route) => {
      if (route.includes(":")) {
        const pattern = new RegExp("^" + route.replace(/:\w+/g, "[^/]+") + "$");
        return pattern.test(path);
      }
      return route === path;
    });
  };

  // Logic for UI Elements
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";
  
  const hideNavbarRoutes = [
    "/admin/login", "/admin/dashboard", "/admin/courses", "/admin/students", 
    "/admin/instructors", "/admin/students/edit/:id", "/editprofile", 
    "/admin/addcourses", "/admin/addinstructors", "/admin/editcourse/:courseId", 
    "/admin/editinstructor/:id",
    "/instructor/login", "/instructor/dashboard", "/instructor/courses"
  ];

  const hideFooterRoutes = [
    "/login", "/signup", "/admin/login", "/admin/dashboard", "/admin/courses", 
    "/admin/students", "/admin/instructors", "/admin/students/edit/:id", 
    "/editprofile", "/admin/addcourses", "/admin/addinstructors", 
    "/admin/editcourse/:courseId", "/admin/editinstructor/:id",
    "/instructor/login", "/instructor/dashboard", "/instructor/courses"
  ];

  const showNavbar = !pathMatches(location.pathname, hideNavbarRoutes) && !isAuthPage;
  const showFooter = !pathMatches(location.pathname, hideFooterRoutes);

  return (
    <>   
      {/* Navbar shows only on main pages */}
      {showNavbar && <Navbar />} 

      <Routes>
        {/* Auth Routes - Now properly handled by the Router */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Main Content Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/course" element={<Courses />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home2" element={<Home2/>} />
        <Route path="/course2" element={<Course2/>} />
        <Route path="/about2" element={<About2/>} />
        <Route path="/editprofile" element={<EditProfile />} />

        {/* All Courses */}
        <Route path="/courses/web-development" element={<WebDevlopment />} />
        <Route path="/courses/hacking" element={<Hacking />} />
        <Route path="/courses/flutter" element={<Flutter />} />
        <Route path="/courses/nodejs" element={<Nodejs />} />
        <Route path="/courses/web-dev-cohort" element={<WebDev />} />
        <Route path="/courses/web-development-master" element={<WebMaster />} />

        {/* All Syllabus */}
        <Route path="/FlutterSyllabus" element={<FlutterSyllabus />} />
        <Route path="/WebDevSyllabus" element={<WebDevSyllabus />} />
        <Route path="/WebDevelopmentSyllabus" element={<WebDevelopmentSyllabus />} />
        <Route path="/WebMasterSyllabus" element={<WebMasterSyllabus />} />
        <Route path="/HackingSyllabus" element={<HackingSyllabus />} />

        {/* All Admin Pages */}
        <Route path="/admin/login" element={<AdminLogin/>} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/courses" element={<AdminCourse />} />
        <Route path="/admin/students" element={<AdminStudent />} />
        <Route path="/admin/instructors" element={<AdminInstructor />} />
        <Route path="/admin/students/edit/:id" element={<EditStudent />} />
        <Route path="/admin/addcourses" element={<AddCourse/>} />
        <Route path="/admin/addinstructors" element={<AddInstructors/>} />
        <Route path="/admin/editcourse/:courseId" element={<EditCourse/>} />
        <Route path="/admin/editinstructor/:id" element={<EditInstructor/>} />

        {/* All Instructor Pages */}
        <Route path="/instructor/login" element={<InstructorLogin/>} />
        <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
        <Route path="/instructor/courses" element={<InstructorCourses />} />
        <Route path="/instructor/profile" element={<InstructorProfile />} />

        {/* All payment page */}
        <Route path="/FlutterPayment" element={<FlutterPayment/>}/>
        <Route path="/WebDevPayment" element={<WebDevPayment/>}/>
        <Route path="/WebDevelopmentPayment" element={<WebDevlopmentPayment/>}/>
        <Route path="/HackingPayment" element={<HackingPayment/>}/>
        <Route path="/NodejsPayment" element={<NodejsPayment/>}/>
        <Route path="/WebMasterPayment" element={<WebMasterPayment/>}/>

        {/* All PayScanner page */}
        <Route path="/PayFlutter" element={<PayFlutter/>} />
        <Route path="/PayWebDev" element={<PayWebDev/>} />
        <Route path="/PayWebDevelopment" element={<PayWebDevlopment/>} />
        <Route path="/PayHacking" element={<PayHacking/>} />
        <Route path="/PayNodejs" element={<PayNodejs/>} />
        <Route path="/PayWebMaster" element={<PayWebMaster/>} />
      </Routes>

      {/* Conditionally render Footer */}
      {showFooter && <Footer />}
    </>
  );
}

function AppRoutes() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default AppRoutes;