import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CompletedRegisterPage from "./registercomponents/CompletedRegisterPage";
import Profile from "./Profile";
import {ProfileInfoProvider} from './contexts/ProfileContext';
import {ErrorProvider} from './contexts/ErrorContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/success" element={<CompletedRegisterPage />}></Route>
      <Route path="/profile" 
         element={<ProfileInfoProvider>
          <ErrorProvider>
             <Profile />
          </ErrorProvider>
        </ProfileInfoProvider>}>
      </Route>
    </Routes>
  </Router>
  </StrictMode>,
)
