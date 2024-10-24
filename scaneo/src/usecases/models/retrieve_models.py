from ...models import Model
from ...repos import ModelsDBRepo

def retrieve_models():
    repo = ModelsDBRepo()
    data = repo.retrieve_models()
    models = [Model.from_tuple(d) for d in data]
    return models