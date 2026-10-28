import LandingPage from "./pages/Landing";
import SignupPage from "./pages/Signup";
import CompleteYourProfilePage from "./pages/CompleteYourProfile";
import OnboardingAboutYouPage from "./pages/OnboardingAboutYou";
import LoginPage from "./pages/Login";
import { Routes, Route } from "react-router";
import TestApi from "./components/common/TestApi";
import OnboardingRolesPage from "./pages/OnboardingRoles";
import OnboardingPortfolioPage from "./pages/OnboardingPortfolio";
import AuthContext from "./AuthContext";
import { useContext } from "react";
import LoadingScreenPage from "./pages/LoadingScreenPage";
import AuthErrorPage from "./pages/AuthError";
import GuestRoute from "./components/routes/GuestRoute";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import OnboardingRoute from "./components/routes/OnboardingRoute";

const App = () => {
  const auth = useContext(AuthContext);
  if(!auth){
    throw new Error("App must be rendered within an AuthProvider");
  }

  const {authState} = auth;

  if(authState.status === "loading"){
    return <LoadingScreenPage />
  }

  if(authState.status === "error"){
    return <AuthErrorPage />
  }
  

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />}/>

        <Route path="/signup" element={
          <GuestRoute>
            <SignupPage />
          </GuestRoute>
        }/>

        <Route path="/login" element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        }/>

        <Route path="/complete-profile" element={
          <ProtectedRoute>
            <OnboardingRoute>
              <CompleteYourProfilePage />
            </OnboardingRoute>
          </ProtectedRoute>
        }/>

        <Route path="/complete-profile/about-you" element={
          <ProtectedRoute>
            <OnboardingRoute>
              <OnboardingAboutYouPage />
            </OnboardingRoute>
          </ProtectedRoute>
        }/>

        <Route path="/complete-profile/your-roles" element={
          <ProtectedRoute>
            <OnboardingRoute>
              <OnboardingRolesPage />
            </OnboardingRoute>
          </ProtectedRoute>
        }/>

        <Route path="/complete-profile/portfolio" element={
          <ProtectedRoute>
            <OnboardingRoute>
              <OnboardingPortfolioPage />
            </OnboardingRoute>
          </ProtectedRoute>
        }/>
        
        <Route path="test-api" element={<TestApi />}/>
      </Routes>
    </>
  )
}

export default App;