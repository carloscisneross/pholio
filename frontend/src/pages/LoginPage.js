import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Check if we're returning from auth with session_id
    const hash = window.location.hash;
    if (hash.includes('session_id=')) {
      const urlParams = new URLSearchParams(hash.substring(1));
      const sessionId = urlParams.get('session_id');
      
      if (sessionId) {
        handleLogin(sessionId);
      }
    }
  }, []);

  const handleLogin = async (sessionId) => {
    const result = await login(sessionId);
    if (result.success) {
      navigate('/');
    } else {
      alert('Login failed: ' + result.error);
    }
  };

  const handleLoginClick = () => {
    const currentUrl = window.location.origin + window.location.pathname;
    const authUrl = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(currentUrl)}`;
    window.location.href = authUrl;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">P</span>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome to Pholio
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Where work is performed, not posted
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-8 border border-gray-200">
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Sign in to your account
              </h3>
              <p className="text-gray-600">
                Connect with professionals and showcase your work
              </p>
            </div>

            <button
              onClick={handleLoginClick}
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                By signing in, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            New to Pholio? Your account will be created automatically
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;