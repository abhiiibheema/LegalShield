import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scale, Shield, Eye, EyeOff, Mail, Lock, UserPlus } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle authentication here
    navigate('/dashboard');
  };

  const handleSignUp = () => {
    navigate('/onboarding');
  };

  const handlePublicSearch = () => {
    navigate('/');
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
            Lawyer Management Platform
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-indian-gold/20 animate-slide-up">
          <div className="flex items-center justify-center mb-6">
            <Scale className="h-8 w-8 text-indian-maroon mr-3" />
            <h3 className="text-2xl font-serif font-semibold text-indian-maroon">
              Lawyer Login
            </h3>
          </div>

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
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-indian-maroon/20 rounded-lg focus:ring-2 focus:ring-indian-gold focus:border-indian-gold transition-all duration-300 bg-white/80"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-indian-maroon mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indian-maroon/60" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-12 py-3 border border-indian-maroon/20 rounded-lg focus:ring-2 focus:ring-indian-gold focus:border-indian-gold transition-all duration-300 bg-white/80"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indian-maroon/60 hover:text-indian-maroon transition-colors"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indian-maroon to-indian-navy text-white py-3 px-6 rounded-lg font-semibold text-lg hover:from-indian-navy hover:to-indian-maroon transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Login to Dashboard
            </button>

            {/* Sign Up Button */}
            <button
              type="button"
              onClick={handleSignUp}
              className="w-full bg-gradient-to-r from-indian-emerald to-green-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:from-green-600 hover:to-indian-emerald transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              New Lawyer? Register Here
            </button>

            {/* Additional Links */}
            <div className="space-y-3 text-center">
              <a
                href="#"
                className="block text-sm text-indian-maroon hover:text-indian-gold transition-colors font-medium"
              >
                Forgot your password?
              </a>
              <button
                onClick={handlePublicSearch}
                className="block w-full text-sm text-indian-maroon hover:text-indian-gold transition-colors font-medium border border-indian-maroon/20 py-2 rounded-lg hover:bg-indian-cream"
              >
                Public Legal Search (No Login Required)
              </button>
            </div>
          </form>
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

export default LoginPage;