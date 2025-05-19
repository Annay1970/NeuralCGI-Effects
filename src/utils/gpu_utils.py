import torch

def check_gpu():
    """Check if CUDA GPU is available"""
    return torch.cuda.is_available()

def get_gpu_info():
    """Get GPU information if available"""
    if not check_gpu():
        return "No GPU detected"
    
    return {
        "device_name": torch.cuda.get_device_name(0),
        "memory_allocated": torch.cuda.memory_allocated(0),
        "memory_cached": torch.cuda.memory_cached(0)
    }