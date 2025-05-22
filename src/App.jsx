import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

function App() {
  const [selectedTab, setSelectedTab] = useState('home');
  const [script, setScript] = useState('');
  const [generatedScenes, setGeneratedScenes] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateScenes = async () => {
    setIsGenerating(true);
    try {
      // This would connect to your AI service
      const scenes = await Promise.resolve([
        {
          description: script,
          imageUrl: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg'
        }
      ]);
      setGeneratedScenes(scenes);
    } catch (error) {
      console.error('Failed to generate scenes:', error);
    }
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 p-6">
        <div className="flex items-center mb-8">
          <h1 className="text-2xl font-bold">Movie Generator</h1>
        </div>
        
        <div className="space-y-2">
          <button 
            onClick={() => setSelectedTab('home')}
            className={`w-full text-left px-4 py-2 rounded ${
              selectedTab === 'home' ? 'bg-blue-600' : 'hover:bg-gray-700'
            }`}
          >
            Home
          </button>
          <button 
            onClick={() => setSelectedTab('script')}
            className={`w-full text-left px-4 py-2 rounded ${
              selectedTab === 'script' ? 'bg-blue-600' : 'hover:bg-gray-700'
            }`}
          >
            Script Editor
          </button>
        </div>
      </div>

      <div className="ml-64 p-8">
        {selectedTab === 'script' ? (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-8">Script to Scene Generator</h2>
            <div className="grid grid-cols-1 gap-8">
              <div className="bg-gray-800 rounded-lg p-8 shadow-xl">
                <textarea
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                  placeholder="Write your script here..."
                  className="w-full h-[480px] bg-gray-700 text-white p-6 rounded-lg mb-4"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={generateScenes}
                  disabled={isGenerating}
                  className="bg-blue-600 px-6 py-2 rounded-lg font-medium"
                >
                  {isGenerating ? 'Generating...' : 'Generate Scenes'}
                </motion.button>
              </div>

              {generatedScenes.length > 0 && (
                <div className="bg-gray-800 rounded-lg p-8">
                  <h3 className="text-xl font-semibold mb-4">Generated Scenes</h3>
                  <div className="space-y-3">
                    {generatedScenes.map((scene, index) => (
                      <div key={index} className="bg-gray-700 p-6 rounded-lg">
                        <img 
                          src={scene.imageUrl} 
                          alt={`Scene ${index + 1}`}
                          className="w-full rounded-lg mb-4"
                        />
                        <ReactMarkdown className="text-gray-300">
                          {scene.description}
                        </ReactMarkdown>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-8">Welcome to Movie Generator</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800 rounded-lg p-8"
              >
                <h3 className="text-xl font-semibold mb-4">Start New Script</h3>
                <p className="text-gray-300 mb-4">Create a new script and generate scenes automatically</p>
                <button
                  onClick={() => setSelectedTab('script')}
                  className="bg-blue-600 px-6 py-2 rounded-lg font-medium"
                >
                  Create Script
                </button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800 rounded-lg p-8"
              >
                <h3 className="text-xl font-semibold mb-4">Tutorial</h3>
                <p className="text-gray-300 mb-4">Learn how to use the Movie Generator effectively</p>
                <button className="bg-blue-600 px-6 py-2 rounded-lg font-medium">
                  Watch Tutorial
                </button>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;