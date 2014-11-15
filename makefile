build:
	rm -rf dist/report.csv
	mkdir -p dist
	node lib/reports.js > dist/report.csv

build-data:
	rm -rf ./data
	mkdir -p data
	node bin/update-data.js

.PHONY: build build-data
