from pydantic import BaseModel, field_validator, Field
from datetime import datetime
from typing import Optional

class Campaign(BaseModel):
    id: str
    name: str
    description: str
    createdAt: datetime = Field(default_factory=datetime.now)
    updatedAt: datetime = Field(default_factory=datetime.now)
    image_count: int = 0
    annotation_count: int = 0
    path: Optional[str] = None
    eotdlDatasetId: Optional[str] = None
    # storage
    # labels

    # TODO: checks and validations
      
    # @field_validator("name")
    # def check_name_is_valid(cls, name):
    #     if name is not None:
    #         assert validate_name(name) == name
    #     return name


    @classmethod
    def from_tuple(cls, data: tuple):
        return cls(
            id=data[0],
            name=data[1],
            description=data[2],
            createdAt=datetime.fromisoformat(data[3]),
            updatedAt=datetime.fromisoformat(data[4]),
            image_count=data[5],
            annotation_count=data[6],
            path=data[7],
            eotdlDatasetId=data[8]
        )
    
    model_config = {
        "json_encoders": {
            datetime: lambda dt: dt.isoformat()
        }
    }