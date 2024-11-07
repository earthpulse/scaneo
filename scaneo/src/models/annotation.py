from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
import json

class Annotation(BaseModel):
    id: str
    type: str
    value: str
    bb: Optional[list[list[float]]] = None
    image_id: int
    createdAt: datetime = Field(default_factory=datetime.now)
    updatedAt: datetime = Field(default_factory=datetime.now)

    @classmethod
    def from_tuple(cls, data: tuple):
        return cls(
            id=data[0],
            type=data[1],
            value=data[2],
            image_id=data[3],
            createdAt=datetime.fromisoformat(data[4]),
            updatedAt=datetime.fromisoformat(data[5]),
            bb=json.loads(data[6]) if data[6] else None
        )

