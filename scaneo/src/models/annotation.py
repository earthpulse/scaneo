from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
import json

class Annotation(BaseModel):
    id: str
    type: str
    value: str
    bb: Optional[list[list[float]]] = None
    layer_data: object = None
    image_id: int
    createdAt: datetime = Field(default_factory=datetime.now)
    updatedAt: datetime = Field(default_factory=datetime.now)

    @classmethod
    def from_tuple(cls, data: tuple):
        return cls (
            id=data[0],
            type=data[1],
            value=data[2],
            bb=json.loads(data[3]) if data[3] else None,
            layer_data=json.loads(data[4]) if data[4] else None,
            image_id=data[5],
            createdAt=datetime.fromisoformat(data[6]),
            updatedAt=datetime.fromisoformat(data[7])
        )

