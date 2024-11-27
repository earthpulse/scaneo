from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class Model(BaseModel):
    id: str
    name: str
    description: str
    url: str
    createdAt: datetime = Field(default_factory=datetime.now)
    updatedAt: datetime = Field(default_factory=datetime.now)
    task: str

    @classmethod
    def from_tuple(cls, data: tuple):
        return cls(
            id=data[0],
            name=data[1],
            description=data[2],
            url=data[3],
            createdAt=datetime.fromisoformat(data[4]),
            updatedAt=datetime.fromisoformat(data[5]),
            task=data[6]
        )
