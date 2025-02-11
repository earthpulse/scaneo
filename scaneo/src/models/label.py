from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class Label(BaseModel):
    id: str
    name: str
    campaign_id: str
    color: str
    createdAt: datetime = Field(default_factory=datetime.now)
    updatedAt: datetime = Field(default_factory=datetime.now)

    @classmethod
    def from_tuple(cls, data: tuple):
        return cls(
            id=data[0],
            name=data[1],
            color=data[2],
            campaign_id=data[3],
            createdAt=datetime.fromisoformat(data[4]),
            updatedAt=datetime.fromisoformat(data[5])
        )
