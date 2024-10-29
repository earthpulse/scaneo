class ResolutionError(Exception):
    def __init__(self, resolution, size):
        self.message = f"Image shape at {resolution} m resolution: {size} pixels. Currently, we only support size smaller than 2500 x 2500 pixels."
        super().__init__(self.message)


class ImageOutOfBounds(Exception):
    def __init__(self, x, y, z):
        self.message = f"Tile {x}/{y}/{z} is out of bounds"
        super().__init__(self.message)


class ImageDoesNotExistError(Exception):
    message = "Image doesn't exist"

    def __init__(self):
        super().__init__(self.message)
