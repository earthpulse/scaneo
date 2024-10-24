import subprocess

from ...repos import PluginsDBRepo
from ...models import Plugin

def install_plugin(name):
	repo = PluginsDBRepo()
	data = repo.retrieve_plugin(name)
	plugin = Plugin.from_tuple(data)
	if plugin.status != "enabled":
		try:
			exec(f"import {name}")
			plugin.status = "enabled"
		except ImportError:
			subprocess.check_call(["pip", "install", name])
			try:
				exec(f"import {name}")
				plugin.status = "enabled"
			except ImportError:
				raise Exception(f"Problems installing plugin {name}")
	repo.update_plugin(plugin)
	return plugin