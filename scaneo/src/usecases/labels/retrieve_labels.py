from ...models import Label
from ...repos import LabelsDBRepo

def retrieve_labels(campaign):
    repo = LabelsDBRepo()
    data = repo.retrieve_labels(campaign)
    labels = [Label.from_tuple(d) for d in data]
    return labels