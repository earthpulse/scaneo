from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List

class Model(BaseModel):
    id: str
    name: str
    description: str
    url: str
    createdAt: datetime = Field(default_factory=datetime.now)
    updatedAt: datetime = Field(default_factory=datetime.now)
    task: str
    preprocessing: Optional[List[str]] = []
    postprocessing: Optional[List[str]] = []

    @classmethod
    def from_tuple(cls, data: tuple):
        return cls(
            id=data[0],
            name=data[1],
            description=data[2],
            url=data[3],
            createdAt=datetime.fromisoformat(data[4]),
            updatedAt=datetime.fromisoformat(data[5]),
            task=data[6],
            preprocessing=data[7].split(',') if data[7] else [],
            postprocessing=data[8].split(',') if data[8] else []
        )
    
class LabelMapping(BaseModel):
    id: str
    campaignId: str
    modelId: str
    labelId: str
    output_index: int

    @classmethod
    def from_tuple(cls, data: tuple):
        return cls(
            id=data[0],
            campaignId=data[1],
            modelId=data[2],
            labelId=data[3],
            output_index=data[4]
        )