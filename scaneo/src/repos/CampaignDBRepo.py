from .DBRepo import DBRepo

class CampaignDBRepo(DBRepo):
	def __init__(self):
		super().__init__()

	def retrieve_campaigns(self):
		return [ # placeholder data
            {
                "id": "1",
                "name": "Campaign 1",
                "description": "Description 1",
                "createdAt": "2021-01-01",
            },
            {
                "id": "2",
                "name": "Campaign 2",
                "description": "Description 2",
                "createdAt": "2021-01-03",
			},
            {
                "id": "3",
                "name": "Campaign 3",
                "description": "Description 3",
                "createdAt": "2021-01-05",
            },
		]	