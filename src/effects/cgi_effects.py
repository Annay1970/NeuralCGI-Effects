import cv2
import numpy as np
from pathlib import Path

class CGIEffects:
    def __init__(self):
        self.effects = {
            'None': self._no_effect,
            'Fire': self._fire_effect,
            'Matrix': self._matrix_effect,
            'Neon': self._neon_effect
        }
        
    def get_available_effects(self):
        return list(self.effects.keys())
        
    def apply_effect(self, frame, effect_name):
        if effect_name in self.effects:
            return self.effects[effect_name](frame)
        return frame
        
    def _no_effect(self, frame):
        return frame
        
    def _fire_effect(self, frame):
        # Add fire-like effect
        fire_overlay = np.zeros_like(frame)
        height, width = frame.shape[:2]
        
        # Create dynamic fire pattern
        for i in range(width):
            for j in range(height-1, height//2, -1):
                r = np.random.randint(150, 255)
                g = np.random.randint(0, 100)
                fire_overlay[j,i] = [0, g, r]
                
        mask = cv2.threshold(cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY), 
                           10, 255, cv2.THRESH_BINARY)[1]
        return cv2.addWeighted(frame, 0.8, fire_overlay, 0.2, 0)
        
    def _matrix_effect(self, frame):
        # Create Matrix-style effect
        green_frame = frame.copy()
        green_frame[:,:,0] = 0  # Blue channel
        green_frame[:,:,2] = 0  # Red channel
        green_frame[:,:,1] = green_frame[:,:,1] * 1.5  # Enhance green
        return green_frame
        
    def _neon_effect(self, frame):
        # Create neon glow effect
        blur = cv2.GaussianBlur(frame, (21, 21), 0)
        frame = cv2.addWeighted(frame, 1.5, blur, -0.5, 0)
        return frame