from ...models import Label
from ...repos import LabelsDBRepo
from ...errors.labels import LabelAlreadyExistsError

def create_label(name, color, campaign):	
	repo = LabelsDBRepo()
	if repo.get_label_by_name(name, campaign):
		raise LabelAlreadyExistsError()
	label = Label(id=repo.generate_id(), name=name, campaign_id=campaign, color=color)
	repo.create_label(label)
	return label