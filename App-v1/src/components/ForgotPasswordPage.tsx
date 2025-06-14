import React, { useState } from 'react';
import { Mail, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/forgot-password`, { email });
      setMessage('If the email exists, a reset link has been sent.');
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indian-navy via-indian-maroon to-indian-emerald relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-indian-pattern opacity-10"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 border-4 border-indian-gold rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 border-4 border-indian-gold rounded-full opacity-20 animate-pulse delay-1000"></div>
      
      {/* Supreme Court Pillars Effect */}
      <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-b from-indian-gold to-transparent opacity-20"></div>
      <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-b from-indian-gold to-transparent opacity-20"></div>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo Section */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-indian-gold rounded-full mb-4 shadow-2xl animate-glow">
            <Shield className="h-12 w-12 text-indian-maroon" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-white mb-2">
            न्याय सहायक
          </h1>
          <h2 className="text-2xl font-serif font-semibold text-indian-gold mb-1">
            Nyaaya Sahayak
          </h2>
          <p className="text-indian-cream text-sm font-medium">
            Your Guide to Indian Justice
          </p>
        </div>

        {/* Forgot Password Form */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-indian-gold/20 animate-slide-up">
          <h3 className="text-2xl font-serif font-semibold text-indian-maroon mb-4">
            Forgot Your Password?
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Enter your email address and we'll send you a link to reset your password.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-indian-maroon mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indian-maroon/60" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-indian-maroon/20 rounded-lg focus:ring-2 focus:ring-indian-gold focus:border-indian-gold transition-all duration-300 bg-white/80"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            {/* Message */}
            {message && <p className="text-sm text-gray-600">{message}</p>}
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indian-maroon to-indian-navy text-white py-3 px-6 rounded-lg font-semibold text-lg hover:from-indian-navy hover:to-indian-maroon transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Send Reset Link
            </button>
          </form>
          {/* Back to Login */}
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-sm text-indian-maroon hover:text-indian-gold transition-colors font-medium"
            >
              Back to Login
            </button>
          </div>
        </div>

        {/* Cultural Quote */}
        <div className="text-center mt-8 animate-fade-in">
          <blockquote className="text-indian-cream/80 italic text-sm font-medium">
            "सत्यमेव जयते" - Truth Alone Triumphs
          </blockquote>
          <p className="text-indian-cream/60 text-xs mt-1">National Motto of India</p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;