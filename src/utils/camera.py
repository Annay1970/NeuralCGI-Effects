import cv2

class CameraManager:
    def __init__(self):
        self.cap = None
        
    def get_available_cameras(self):
        """Returns list of available camera indices"""
        available_cameras = []
        for i in range(5):  # Check first 5 camera indices
            cap = cv2.VideoCapture(i)
            if cap.isOpened():
                available_cameras.append(i)
                cap.release()
        return available_cameras if available_cameras else [0]
        
    def start_capture(self, camera_index):
        """Start video capture from selected camera"""
        if self.cap is not None:
            self.release()
        self.cap = cv2.VideoCapture(camera_index)
        
    def get_frame(self):
        """Get frame from current camera"""
        if self.cap is None:
            return None
        ret, frame = self.cap.read()
        return frame if ret else None
        
    def release(self):
        """Release current camera"""
        if self.cap is not None:
            self.cap.release()
            self.cap = None