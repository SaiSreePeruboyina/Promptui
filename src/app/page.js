

'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const PromptUI = () => {
  const router = useRouter();

  const handleExploreClick = () => {
    router.push('/generate');
  };
  const handleSignup = () => {
    router.push('/signup'); // This will navigate to the signup page
  };
  const handleLogin = () => {
    router.push('/login'); // This will navigate to the signup page
  };


  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Background Grid + Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(123,97,255,0.2),_transparent_70%)]">
        <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.08)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.08)_1px,_transparent_1px)] bg-[50px_50px] z-0" />
      </div>

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 relative z-10">
        <div className="text-xl font-bold text-purple-400">Prompt.</div>
        <div className="flex gap-8 items-center text-sm font-medium">
          
          <button className="border border-purple-400 px-4 py-2 rounded-full hover:bg-purple-400 hover:text-black transition"
          onClick={handleLogin}>Login</button>
          <button className="border border-purple-400 px-4 py-2 rounded-full hover:bg-purple-400 hover:text-black transition"
          onClick={handleSignup}>Signup</button>
           {/* <a href="/authentication/signup" className="border border-purple-400 px-4 py-2 rounded-full hover:bg-purple-400 hover:text-black transition">Sign Up</a>
          <a href="/authentication/login" className="border border-purple-400 px-4 py-2 rounded-full hover:bg-purple-400 hover:text-black transition">Log In</a> */}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center h-[calc(100vh-100px)] relative z-10 px-4">
        <h1 className="text-[64px] sm:text-[80px] font-bold tracking-wider">
          <span className="text-purple-400">PROMPT</span> <span className="text-white">UI</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mt-4">
          Where ideas ignite, and development flows.
        </p>
        

        <div className="flex gap-4 mt-6">
          <button className="border border-gray-400 px-6 py-3 rounded-full hover:bg-white hover:text-black transition font-semibold">
            How it works
          </button>
          <button
            className="bg-purple-400 px-6 py-3 rounded-full text-white hover:bg-purple-500 transition font-semibold flex items-center gap-2"
            onClick={handleExploreClick}
          >
            Explore Now <span className="text-lg">→</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default PromptUI;
