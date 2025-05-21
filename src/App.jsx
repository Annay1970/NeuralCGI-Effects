import React, { useState, useEffect, useRef } from 'react'
import Webcam from 'react-webcam'
import * as tf from '@tensorflow/tfjs'
import * as faceapi from '@tensorflow-models/face-landmarks-detection'
import { SelfieSegmentation } from '@mediapipe/selfie_segmentation'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [effect, setEffect] = useState('none')
  const [model, setModel] = useState(null)
  const webcamRef = useRef(null)
  const canvasRef = useRef(null)

  const effects = [
    { id: 'none', name: 'No Effect' },
    { id: 'fire', name: 'Fire Effect' },
    { id: 'matrix', name: 'Matrix Effect' },
    { id: 'neon', name: 'Neon Glow' }
  ]

  useEffect(() => {
    const loadModels = async () => {
      try {
        await tf.ready()
        const segmenter = new SelfieSegmentation({locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`
        }})
        segmenter.setOptions({
          modelSelection: 1,
        })
        setModel(segmenter)
        setIsLoading(false)
      } catch (error) {
        console.error('Error loading models:', error)
      }
    }

    loadModels()
  }, [])

  const handleUserMedia = () => {
    setIsLoading(false)
  }

  const applyEffect = async (videoElement) => {
    if (!model || !videoElement) return

    try {
      const results = await model.send({image: videoElement})
      // Effect processing would go here
    } catch (error) {
      console.error('Error applying effect:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">NeuralCGI Effects</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full"
              style={{ display: 'none' }}
            />
          </div>

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