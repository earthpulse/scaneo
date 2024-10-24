from ...repos import PluginsDBRepo
from ...models import Plugin

def retrieve_plugins():
    repo = PluginsDBRepo()
    data = repo.retrieve_plugins()
    plugins = [Plugin.from_tuple(d) for d in data]
    return plugins