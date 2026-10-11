import LandingPage from "./pages/Landing";
import SignupPage from "./pages/Signup";
import CompleteYourProfilePage from "./pages/CompleteYourProfile";
import { Routes, Route } from "react-router";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/signup" element={<SignupPage />}/>
        <Route path="/complete-profile" element={<CompleteYourProfilePage />}/>
      </Routes>
    </>
  )
}

export default App;