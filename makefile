build:
	rm -rf scaneo/ui
	rm -rf ui/.svelte-kit
	rm -r -f ui/static/docs 
	cd ui/mkdocs && mkdocs build
	cp -r ui/mkdocs/site ui/static/docs
	rm -r ui/static/img
	mv ui/static/docs/img ui/static
	cd ui && pnpm build
	cp -r ui/build scaneo/ui
	sed -i 's/^version = .*/version = "$(v)"/' pyproject.toml
	sed -i 's/^__version__ = .*/__version__ = "$(v)"/' scaneo/main.py
	poetry build

publish:
	poetry publish

dev:
	python scaneo/main.py -r -d data