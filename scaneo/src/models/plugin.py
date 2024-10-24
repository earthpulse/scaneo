from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class Plugin(BaseModel):
    id: int
    name: str
    status: str = Field(default="uninstalled")
    createdAt: datetime = Field(default_factory=datetime.now)
    updatedAt: datetime = Field(default_factory=datetime.now)

    @classmethod
    def from_tuple(cls, data: tuple):
        return cls(
            id=data[0],
            name=data[1],
            status=data[2],
            createdAt=datetime.fromisoformat(data[3]),
            updatedAt=datetime.fromisoformat(data[4])
        )