from ...models import Model, LabelMapping, Model
from ...repos import ModelsDBRepo, LabelMappingsDBRepo

def retrieve_models(campaign_id: str = None):
    repo = ModelsDBRepo()
    if not campaign_id:
        data = repo.retrieve_models()
        models = [Model.from_tuple(d) for d in data]
        return models
    # retrieve models that have label mapping to the campaign
    repo = ModelsDBRepo()
    label_mappings_repo = LabelMappingsDBRepo()
    label_mappings = label_mappings_repo.retrieve_label_mappings(campaign_id) 
    label_mappings = [LabelMapping.from_tuple(d) for d in label_mappings]
    model_ids = [lm.modelId for lm in label_mappings]
    models = repo.retrieve_models_by_ids(model_ids)
    models = [Model.from_tuple(d) for d in models]
    return models

