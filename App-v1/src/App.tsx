
import { BrowserRouter as Router, Routes, Route, Form } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import SignupPage from './components/SignupPage'
import ForgotPasswordPage from './components/ForgotPasswordPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-indian-cream via-white to-indian-cream">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path='/signup' element={ <SignupPage/>} />
          <Route path='/forgotpassword' element={ <ForgotPasswordPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;