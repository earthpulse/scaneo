from ..labels import export_labels
from ..annotations import export_annotations

async def export_campaign(campaign_id, progress_callback=None):
    export_labels(campaign_id)
    await export_annotations(campaign_id, progress_callback)
    return