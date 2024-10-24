from ...repos import PluginsDBRepo
from ...models import Plugin

def uninstall_plugin(name):
	repo = PluginsDBRepo()
	data = repo.retrieve_plugin(name)
	plugin = Plugin.from_tuple(data)
	plugin.status = 'installed' # not used, but still available
	repo.update_plugin(plugin)
	return plugin