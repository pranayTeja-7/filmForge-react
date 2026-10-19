import LandingPage from "./pages/Landing";
import SignupPage from "./pages/Signup";
import CompleteYourProfilePage from "./pages/CompleteYourProfile";
import OnboardingAboutYouPage from "./pages/OnboardingAboutYou";
import LoginPage from "./pages/Login";
import { Routes, Route } from "react-router";
import TestApi from "./components/common/TestApi";
import OnboardingRolesPage from "./pages/OnboardingRoles";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/signup" element={<SignupPage />}/>
        <Route path="/complete-profile" element={<CompleteYourProfilePage />}/>
        <Route path="/complete-profile/about-you" element={<OnboardingAboutYouPage />}/>
        <Route path="/complete-profile/your-roles" element={<OnboardingRolesPage />}/>
        <Route path="test-api" element={<TestApi />}/>
        <Route path="login" element={<LoginPage />}/>
      </Routes>
    </>
  )
}

export default App;