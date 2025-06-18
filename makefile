build:
	rm -rf dist
	rm -rf scaneo/ui
	rm -rf ui/.svelte-kit
	rm -r -f ui/static/docs 
	cd ui/mkdocs && uv run mkdocs build
	cp -r ui/mkdocs/site ui/static/docs
	rm -r ui/static/img
	mv ui/static/docs/img ui/static
	cd ui && bun run build
	cp -r ui/build scaneo/ui
	sed -i 's/^version = .*/version = "$(v)"/' pyproject.toml
	sed -i 's/^__version__ = .*/__version__ = "$(v)"/' scaneo/main.py
	# sed -i '' 's/^version = .*/version = "$(v)"/' pyproject.toml
	# sed -i '' 's/^__version__ = .*/__version__ = "$(v)"/' scaneo/main.py
	uv build

publish:
	uv publish --username "__token__" --password "$(token)"

dev:
	uv run scaneo/main.py -r -p 8000

.PHONY: inference
inference:
	uv run uvicorn inference.main:app --host 0.0.0.0 --port 8001 --reload