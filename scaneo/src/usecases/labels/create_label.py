from ...models import Label
from ...repos import LabelsDBRepo

def create_label(name, campaign):	
	repo = LabelsDBRepo()
	label = Label(id=repo.generate_id(), name=name, campaign_id=campaign, color="#000000")
	repo.create_label(label)
	return label