import React, { useState, useEffect } from 'react';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);
  const [showHiddenLink, setShowHiddenLink] = useState(false);

  // Generate stars on mount
  useEffect(() => {
    const generatedStars = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3,
      duration: Math.random() * 3 + 1,
    }));
    setStars(generatedStars);
  }, []);

  // Create meteors periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const meteor = {
        id: Date.now(),
        top: Math.random() * 100,
      };
      setMeteors((prev) => [...prev, meteor]);

      setTimeout(() => {
        setMeteors((prev) => prev.filter((m) => m.id !== meteor.id));
      }, 2000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Space key easter egg
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        const randomColor = `hsl(${Math.random() * 360}, 50%, 15%)`;
        document.body.style.background = randomColor;
        setTimeout(() => {
          document.body.style.background = '';
        }, 500);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleGoBack = () => window.history.back();

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4 overflow-hidden relative">
      {/* Stars Background */}
      <div className="fixed inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDuration: `${star.duration}s`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* Meteors */}
      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="fixed w-0.5 h-0.5 bg-gradient-to-r from-white to-transparent"
          style={{
            top: `${meteor.top}%`,
            left: '100%',
            animation: 'meteor 2s linear forwards',
          }}
        />
      ))}

      {/* Main Content */}
      <div
        className="relative z-10 text-center"
        onMouseEnter={() => setShowHiddenLink(true)}
        onMouseLeave={() => setShowHiddenLink(false)}
      >
        {/* UFO with Beam */}
        <div className="relative mb-8 animate-float">
          <svg className="w-32 h-32 mx-auto" viewBox="0 0 100 100">
            {/* UFO Body */}
            <ellipse cx="50" cy="40" rx="30" ry="10" fill="#4F46E5" />
            <circle cx="50" cy="35" r="20" fill="#818CF8" />
            <ellipse cx="50" cy="30" rx="10" ry="5" fill="#C7D2FE" />
            {/* Beam */}
            <path
              className="animate-beam"
              d="M40 40 L30 80 L70 80 L60 40"
              fill="rgba(79, 70, 229, 0.2)"
            />
          </svg>
        </div>

        {/* 404 Text */}
        <h1 className="text-8xl font-bold text-white mb-4 animate-float">
          4<span className="inline-block animate-portal">0</span>4
        </h1>
        <p className="text-xl text-blue-200 mb-8">Ê Ê Ê Ê!!!! Bạn đã lạc vào vũ trụ rồi 🚀</p>
        <p className="text-lg text-purple-300 mb-8">Học bài mà để tui bơ vơ lâu quá vại! Bấm vào linh lại đi nha 😭</p>

        {/* Interactive Elements */}
        <div className="space-y-4">
          {/* Hidden Portfolio Link */}
          <a
            href="/"
            className={`text-blue-400 hover:text-blue-300 transition block duration-300 ${
              showHiddenLink ? 'opacity-100' : 'opacity-0'
            }`}
          >
            ← Find your way back to safety
          </a>

          {/* Astronaut */}
          <div className="relative inline-block animate-float">
            <div className="w-24 h-24 rounded-full border-4 border-white mx-auto bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center animate-wave">
              <span className="text-4xl">👨‍🚀</span>
            </div>
            <span className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white animate-pulse"></span>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-8 flex-wrap">
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transform hover:scale-105 transition duration-300 shadow-lg"
            >
              <Home className="w-5 h-5" />
              Return Home
            </a>
            <button
              onClick={handleGoBack}
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transform hover:scale-105 transition duration-300 shadow-lg"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </div>
        </div>

        {/* Easter Egg Element */}
        <div className="mt-8 text-gray-500 cursor-pointer hover:text-gray-400 transition">
          <p className="text-sm">Press 'Space' for a surprise!</p>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }

        @keyframes beam {
          0%, 100% { transform: scaleY(0.8); opacity: 0.3; }
          50% { transform: scaleY(1.1); opacity: 0.7; }
        }

        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(20deg); }
        }

        @keyframes portal-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes meteor {
          0% { transform: translate(0, 0) rotate(45deg); opacity: 1; }
          100% { transform: translate(-100px, 100px) rotate(45deg); opacity: 0; }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-beam {
          animation: beam 2s ease-in-out infinite;
          transform-origin: top;
        }

        .animate-wave {
          animation: wave 2s ease-in-out infinite;
          transform-origin: 70% 70%;
        }

        .animate-portal {
          animation: portal-spin 8s linear infinite;
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;