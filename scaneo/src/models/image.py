from pydantic import BaseModel

class Image(BaseModel):
    id: int
    path: str
    campaign_id: str
    # labels

    @classmethod
    def from_tuple(cls, data: tuple):
        return cls(
            id=data[0],
            path=data[1],
            campaign_id=data[2]
        )