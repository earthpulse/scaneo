from pydantic import BaseModel

class Image(BaseModel):
    id: int
    path: str
    campaign_id: str
    bbox: str
    # labels

    @classmethod
    def from_tuple(cls, data: tuple):
        return cls(
            id=data[0],
            path=data[1],
            campaign_id=data[2],
            bbox=data[3],
        )