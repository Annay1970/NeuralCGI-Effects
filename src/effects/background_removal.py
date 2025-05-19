import mediapipe as mp
import numpy as np
import cv2

class BackgroundRemover:
    def __init__(self):
        self.mp_selfie_segmentation = mp.solutions.selfie_segmentation
        self.segmentation = self.mp_selfie_segmentation.SelfieSegmentation(model_selection=1)
        
    def remove_background(self, frame):
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = self.segmentation.process(rgb_frame)
        
        mask = results.segmentation_mask
        mask = np.stack((mask,) * 3, axis=-1) > 0.1
        
        bg_image = np.zeros(frame.shape, dtype=np.uint8)
        output_image = np.where(mask, frame, bg_image)
        
        return output_image