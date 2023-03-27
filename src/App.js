import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Pages/signIn";
import './App.css';
import HomePage from "./Pages/home";
import Dashboard  from "./Pages/dashboard";
import TestPage from "./Pages/textPage";
import DashboardAdmin from "./Pages/dashboardRecruit";
import TestPagePreview from "./Pages/textPagePreview";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="recruiter" element={<DashboardAdmin />} />
          <Route path="testpreview" element={<TestPagePreview />} />
          <Route path="test" element={<TestPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;