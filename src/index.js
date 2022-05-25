export default function(options = { enable: true }) {
  if (options.enable === false) return false;
  const variables = [];
  return {
    extensions: [
      {
        name: 'variableDefinition',
        level: 'inline', // Is this a block-level or inline-level tokenizer?
        start(src) { return src.index; }, // Hint to Marked.js to stop and check for a match
        tokenizer(src, tokens) {
          const variableDefinition = /^\[(\w+)\]<{2}\[([^\n\]]+)\]\n/;
          const capDef = variableDefinition.exec(src);

          if (capDef) {
            const item = {
              type: 'variableDefinition',
              raw: capDef[0],
              key: capDef[1],
              value: capDef[2],
              tokens: []
            };
            this.lexer.inline(item.value, item.tokens);
            variables.push(item);
            return item;
          }
        },

        renderer(token) {
          if (token.type === 'variableDefinition') {
            return null;
          }
        }
      },

      {
        name: 'variableCall',
        level: 'inline', // Is this a block-level or inline-level tokenizer?
        start(src) { return src.index; }, // Hint to Marked.js to stop and check for a match
        tokenizer(src, tokens) {
          const variableCall = /^\[([^\n\]]+)\]>{2} */;
          const capCall = variableCall.exec(src);

          if (capCall) {
            const item = {
              type: 'variableCall',
              raw: capCall[0],
              key: capCall[1],
              tokens: []
            };
            this.lexer.inline(item.key, item.tokens);
            return item;
          }
        },

        renderer(token) {
          if (token.type === 'variableCall') {
            // const output = this.parser.parseInline(variables.find((item) => {
            //   return item.key === token.key;
            // })?.tokens || token.tokens);

            const output = variables.find((item) => {
              return item.key === token.key;
            });
            if (output) {
              return this.parser.parseInline(output.tokens);
            }
            return `\[${this.parser.parseInline(token.tokens)}\]&gt;&gt;`;
            // return output;
          }
        }
      }
    ]
  };
}
