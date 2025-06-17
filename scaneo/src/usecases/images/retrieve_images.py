from ...models import Image
from ...repos import ImagesDBRepo

def retrieve_images(campaign):
    repo = ImagesDBRepo()
    data = repo.retrieve_images(campaign)
    images = [Image.from_tuple(d) for d in data]
    print(images)
    return images