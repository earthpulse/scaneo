from ...models import Model
from ...repos import ModelsDBRepo

def create_model(name, description, url):	
	repo = ModelsDBRepo()
	id = repo.generate_id()
	model = Model(id=id, name=name, description=description, url=url)
	repo.create_model(model)
	return model