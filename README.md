<!-- The character `|` around a string denotes a place in this markdown file that needs to be changed for each extension. -->
<!-- You may also delete any comments you don't need anymore. -->

# TODO:

- [x] Replace information in `/README.md`
- [ ] Replace information in `/package.json`
- [ ] Write extension in `/src/index.js`
- [ ] Write tests in `/spec/index.test.js`
- [ ] Uncomment release in `/.github/workflows/main.yml`

<!-- Delete this line and above -->

# marked-vars
<!-- Description -->
A simple Marked extension to enable inline variables to be used.  
Based on UziTech's [marked-extension-template](https://github.com/markedjs/marked-extension-template).

# Usage
<!-- Show most examples of how to use this extension -->

```js
const marked = require("marked");
const marked-vars = require("marked-vars");

// or ES Module script
// import marked from "https://cdn.jsdelivr.net/gh/markedjs/marked/lib/marked.esm.js";
// import this extension from "https://cdn.jsdelivr.net/gh/UziTech/marked-|this-extension|/lib/index.mjs";

const options = {
	enable : true
};

marked.use(marked-vars(options));

marked("[key]::[value]\n [key]");
// <p>value</p>
```

## `options`

* enable  
	*(true|false)*  
	Enable use of Markdown variables.
	
* multiline (NYI)  
	*(true|false)*  
	Enable multiline variables
