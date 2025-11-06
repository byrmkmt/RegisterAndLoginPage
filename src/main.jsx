import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CompletedRegisterPage from "./CompletedRegisterPage";
import Profile from "./Profile";
import {ProfileInfoProvider} from './contexts/ProfileContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/success" element={<CompletedRegisterPage />}></Route>
      <Route path="/profile" 
         element={<ProfileInfoProvider>
          <Profile />
        </ProfileInfoProvider>}>
      </Route>
    </Routes>
  </Router>
  </StrictMode>,
)
