import React, { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { HexColorPicker } from 'react-colorful';
import { FiUpload, FiSliders, FiDownload } from 'react-icons/fi';
import * as tf from '@tensorflow/tfjs';
import * as ml5 from 'ml5';

function App() {
  const [video, setVideo] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [effect, setEffect] = useState('neural-style');
  const [color, setColor] = useState('#6366f1');
  const [intensity, setIntensity] = useState(50);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file?.type.startsWith('video/')) {
      setVideo(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'video/*': [] },
    maxFiles: 1
  });

  const effects = [
    { id: 'neural-style', name: 'Neural Style Transfer' },
    { id: 'cinematic', name: 'Cinematic Grade' },
    { id: 'hollywood', name: 'Hollywood FX' },
    { id: 'custom', name: 'Custom Effect' }
  ];

  const processVideo = async () => {
    if (!video) return;
    setProcessing(true);
    
    try {
      // Initialize AI models
      await tf.ready();
      const styleModel = await ml5.styleTransfer('models/udnie');
      
      // Process video frames
      const videoEl = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      videoEl.addEventListener('play', async () => {
        while (!videoEl.paused && !videoEl.ended) {
          ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
          const processedFrame = await styleModel.transfer(canvas);
          ctx.drawImage(processedFrame, 0, 0);
          await tf.nextFrame();
        }
      });
      
    } catch (error) {
      console.error('Error processing video:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">NeuralCGI Effects</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {!video ? (
              <div {...getRootProps()} className="dropzone h-[480px] flex items-center justify-center">
                <input {...getInputProps()} />
                <div className="text-center">
                  <FiUpload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-xl font-semibold">Drop your video here</p>
                  <p className="text-gray-400">or click to select</p>
                </div>
              </div>
            ) : (
              <div className="relative bg-black rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  src={video}
                  className="w-full"
                  controls
                />
                <canvas
                  ref={canvasRef}
                  className="absolute top-0 left-0 w-full h-full"
                  style={{ display: processing ? 'block' : 'none' }}
                />
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="glass rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Effects</h2>
              <div className="space-y-3">
                {effects.map((e) => (
                  <button
                    key={e.id}
                    onClick={() => setEffect(e.id)}
                    className={`w-full px-4 py-2 rounded-lg text-left transition ${
                      effect === e.id
                        ? 'bg-primary text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {e.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Effect Color
                  </label>
                  <HexColorPicker color={color} onChange={setColor} />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Intensity
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={intensity}
                    onChange={(e) => setIntensity(e.target.value)}
                    className="slider"
                  />
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={processVideo}
              disabled={!video || processing}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? 'Processing...' : 'Apply Effect'}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;