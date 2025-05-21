import React, { useState } from 'react'
import Webcam from 'react-webcam'
import * as faceapi from '@tensorflow-models/face-landmarks-detection'
import * as tf from '@tensorflow/tfjs'
import { SelfieSegmentation } from '@mediapipe/selfie_segmentation'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [effect, setEffect] = useState('none')
  const webcamRef = React.useRef(null)

  const effects = [
    { id: 'none', name: 'No Effect' },
    { id: 'fire', name: 'Fire Effect' },
    { id: 'matrix', name: 'Matrix Effect' },
    { id: 'neon', name: 'Neon Glow' }
  ]

  // Handle camera permissions
  const handleUserMedia = () => {
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">NeuralCGI Effects</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main preview area */}
          <div className="md:col-span-2 bg-black rounded-lg overflow-hidden shadow-xl">
            {isLoading && (
              <div className="flex items-center justify-center h-[480px]">
                <div className="text-white">Loading camera...</div>
              </div>
            )}
            <Webcam
              ref={webcamRef}
              className="w-full"
              mirrored
              onUserMedia={handleUserMedia}
              onLoadedData={() => setIsLoading(false)}
            />
          </div>

          {/* Controls sidebar */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-white mb-4">Effects</h2>
            <div className="space-y-3">
              {effects.map((e) => (
                <button
                  key={e.id}
                  onClick={() => setEffect(e.id)}
                  className={`w-full px-4 py-2 rounded-lg text-left transition ${
                    effect === e.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {e.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App