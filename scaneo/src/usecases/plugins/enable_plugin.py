import subprocess

from ...repos import PluginsDBRepo
from ...models import Plugin

def enable_plugin(name):
	repo = PluginsDBRepo()
	data = repo.retrieve_plugin(name)
	plugin = Plugin.from_tuple(data)
	plugin.enabled = True
	repo.update_plugin(plugin)
	return plugin