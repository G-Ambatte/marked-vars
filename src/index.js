export default function(options = {
  enable=true
}) {
  if(!enable) {
    return;
  };
  
  return {
    lexer: {
      constructor(options) {
        this.tokens.vars = Object.create(null);
      }
    },
    tokenizer: {
      inline(src, vars) {
        // Define variables:
        // [key]<<[value]
        const varDefine = /^\[(\w+)\]:{2}\[(.+)\]/;
        // Find variables in text:
        // >>[key]
        const varSearch = />{2}\[(\w+)\]/;
        
        if (const cap = varDefine.exec(src)) {
          // console.log(cap[1]);
          // console.log(cap[2]);
          let key = cap[1].replace(/\s+/g, ' ');
          let value = cap[2].replace(/\s+/g, ' ');
          vars[key] = value;
        }
        
        return;
      }
    }
  };
}
