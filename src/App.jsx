import React, { useState } from 'react';
import { motion } from 'framer-motion';

function App() {
  const [selectedTab, setSelectedTab] = useState('home');

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-[#1A1A1A] p-6">
        <h1 className="text-2xl font-bold mb-8">NeuralCGI Effects</h1>
        
        <div className="space-y-2">
          <button 
            onClick={() => setSelectedTab('home')}
            className={`w-full text-left px-4 py-2 rounded ${
              selectedTab === 'home' ? 'bg-blue-600' : 'hover:bg-[#252525]'
            }`}
          >
            Home
          </button>
          <button 
            onClick={() => setSelectedTab('assets')}
            className={`w-full text-left px-4 py-2 rounded ${
              selectedTab === 'assets' ? 'bg-blue-600' : 'hover:bg-[#252525]'
            }`}
          >
            My Assets
          </button>
        </div>

        <div className="mt-8">
          <h2 className="text-sm text-gray-400 mb-4">CREATIVE TOOLS</h2>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-2 rounded hover:bg-[#252525]">
              New Storyboard
            </button>
            <button className="w-full text-left px-4 py-2 rounded hover:bg-[#252525]">
              Motion Generator
            </button>
            <button className="w-full text-left px-4 py-2 rounded hover:bg-[#252525]">
              Image Generator
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Start with concept card */}
          <div className="bg-[#1A1A1A] rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Start with a concept</h2>
            <p className="text-gray-400 mb-6">Instantly turn any idea or script into a vivid Project</p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-600 px-6 py-2 rounded-lg font-medium"
            >
              New Project
            </motion.button>
          </div>

          {/* Start from scratch card */}
          <div className="bg-[#1A1A1A] rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Start from scratch</h2>
            <p className="text-gray-400 mb-6">Full freedom to craft your story, shot by shot</p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-600 px-6 py-2 rounded-lg font-medium"
            >
              New blank Project
            </motion.button>
          </div>
        </div>

        {/* More ways to create section */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-6">More ways to create</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1A1A1A] rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Generate Images</h3>
              <p className="text-gray-400 text-sm">Explore your personal image-storming workspace</p>
            </div>
            <div className="bg-[#1A1A1A] rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Motion Generator</h3>
              <p className="text-gray-400 text-sm">Set a still image in motion with realistic, cinematic visuals</p>
            </div>
            <div className="bg-[#1A1A1A] rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Create an Actor</h3>
              <p className="text-gray-400 text-sm">Create a realistic, consistent, and reusable character model</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;