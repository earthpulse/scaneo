import rasterio as rio
import numpy as np

class ProcessingStep:
    def __init__(self, name, **kwargs):
        self.name = name
        self.parameters = kwargs
        for k,v in kwargs.items():
            setattr(self, k, v)
    def __str__(self):
        params_str = ", ".join([f"{k}={v}" for k,v in self.parameters.items()])
        return f"{self.name} ({params_str})"

class S2RGB(ProcessingStep):
    def __init__(self):
        super().__init__("S2RGB")
    def __call__(self, x):
        x = x[(3,2,1), ...]
        x = np.clip(x / 3000, 0, 1)
        x = (x * 255).astype(np.uint8)
        return x
    
class SATRGB(ProcessingStep):
    def __init__(self):
        super().__init__("SATRGB")
    def __call__(self, x):
        x = x[(1,2,3), ...]
        x = np.clip(x / 3000, 0, 1)
        return x

class Sigmoid(ProcessingStep):
    def __init__(self, threshold=0.5):
        super().__init__("Sigmoid", threshold=threshold)
    def __call__(self, x):
        probas = 1 / (1 + np.exp(-x))
        if self.threshold is not None:
            return probas > self.threshold
        return probas.astype(np.uint8)
    
class Argmax(ProcessingStep):
    def __init__(self):
        super().__init__("Argmax")
    def __call__(self, x):
        x = x.argmax(axis=0)
        return x

class Threshold(ProcessingStep):
    def __init__(self, threshold=0.5):
        super().__init__("Threshold", threshold=threshold)
    def __call__(self, x):
        return (x > self.threshold).astype(np.uint8)