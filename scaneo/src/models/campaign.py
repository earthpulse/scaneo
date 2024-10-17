from pydantic import BaseModel, field_validator, Field
from datetime import datetime

class Campaign(BaseModel):
    id: int
    name: str
    description: str
    createdAt: datetime = Field(default_factory=datetime.now)
    updatedAt: datetime = Field(default_factory=datetime.now)
    # storage
    # labels

    # TODO: checks and validations
      
    # @field_validator("name")
    # def check_name_is_valid(cls, name):
    #     if name is not None:
    #         assert validate_name(name) == name
    #     return name