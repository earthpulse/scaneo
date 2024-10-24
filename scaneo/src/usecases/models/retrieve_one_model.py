from ...models import Model
from ...repos import ModelsDBRepo

def retrieve_one_model(model_id):
    repo = ModelsDBRepo()
    data = repo.retrieve_one_model(model_id)
    return Model.from_tuple(data)