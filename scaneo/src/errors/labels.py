
class LabelAlreadyExistsError(Exception):
    message = "Label already exists"
    def __init__(self):
        super().__init__(self.message)