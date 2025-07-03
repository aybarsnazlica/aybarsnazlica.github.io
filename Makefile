PANDOC=pandoc
TEMPLATE=template.html
CONTENT_DIR=content
OUTPUT_DIR=apps

MD_FILES := $(wildcard $(CONTENT_DIR)/*.md)
HTML_FILES := $(patsubst $(CONTENT_DIR)/%.md,$(OUTPUT_DIR)/%.html,$(MD_FILES))

.PHONY: all clean

all: $(HTML_FILES)

$(OUTPUT_DIR)/%.html: $(CONTENT_DIR)/%.md $(TEMPLATE)
	@mkdir -p $(OUTPUT_DIR)
	$(PANDOC) $< \
	  --template=$(TEMPLATE) \
	  --metadata title="$(shell basename $< .md | sed 's/^./\U&/')" \
	  -o $@

live:
	live-server

format:
	npx prettier . --write

clean:
	rm -f $(OUTPUT_DIR)/*.html