test:
		@NODE_ENV=test ./node_modules/mocha/bin/mocha  \
     --reporter list

.PHONY: test