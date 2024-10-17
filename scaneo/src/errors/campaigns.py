class CampaignAlreadyExistsError(Exception):
    message = "Campaign already exists"
    def __init__(self):
        super().__init__(self.message)


class CampaignDoesNotExistError(Exception):
    message = "Campaign doesn't exist"
    def __init__(self):
        super().__init__(self.message)