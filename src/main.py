import cv2
import numpy as np
import streamlit as st
from pathlib import Path
from effects.background_removal import BackgroundRemover
from effects.cgi_effects import CGIEffects
from utils.camera import CameraManager
from utils.gpu_utils import check_gpu

class NeuralCGIApp:
    def __init__(self):
        self.camera_manager = CameraManager()
        self.background_remover = BackgroundRemover()
        self.cgi_effects = CGIEffects()
        
    def setup_ui(self):
        st.title("NeuralCGI Effects")
        st.sidebar.title("Controls")
        
        # Camera selection
        cameras = self.camera_manager.get_available_cameras()
        selected_camera = st.sidebar.selectbox("Select Camera", cameras)
        
        # Effect selection
        effects = self.cgi_effects.get_available_effects()
        selected_effect = st.sidebar.selectbox("Select Effect", effects)
        
        return selected_camera, selected_effect
        
    def run(self):
        if not check_gpu():
            st.warning("GPU not detected. Performance may be limited.")
            
        selected_camera, selected_effect = self.setup_ui()
        
        if st.button("Start"):
            try:
                self.camera_manager.start_capture(selected_camera)
                while True:
                    frame = self.camera_manager.get_frame()
                    if frame is None:
                        break
                        
                    # Process frame
                    processed_frame = self.background_remover.remove_background(frame)
                    final_frame = self.cgi_effects.apply_effect(processed_frame, selected_effect)
                    
                    # Display frame
                    st.image(final_frame, channels="BGR", use_column_width=True)
                    
            except Exception as e:
                st.error(f"Error: {str(e)}")
            finally:
                self.camera_manager.release()

if __name__ == "__main__":
    app = NeuralCGIApp()
    app.run()