import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CompletedRegisterPage from "./CompletedRegisterPage";

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/success" element={<CompletedRegisterPage />}>
      </Route>
    </Routes>
  </Router>
  </StrictMode>,
)
