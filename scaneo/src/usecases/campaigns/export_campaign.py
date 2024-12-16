from ..labels import export_labels
from ..annotations import export_annotations

async def export_campaign(campaign_id, export_type, export_path, progress_callback=None):
    export_labels(campaign_id, export_type, export_path)
    await export_annotations(campaign_id, export_type, export_path,progress_callback)
    return