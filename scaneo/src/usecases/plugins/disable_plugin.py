from ...repos import PluginsDBRepo
from ...models import Plugin

def disable_plugin(name):
	repo = PluginsDBRepo()
	data = repo.retrieve_plugin(name)
	plugin = Plugin.from_tuple(data)
	plugin.enabled = False
	repo.update_plugin(plugin)
	return plugin