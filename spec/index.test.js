import { marked } from 'marked';
import markedVars from '../src/index.js';

describe('markedVars', () => {
  beforeEach(() => {
    marked.setOptions({
      mangle: false,
      headerIds: false,
      headerPrefix: false
    });
  });

  test('1. markdown not using this extension', () => {
    marked.use(markedVars());
    expect(marked('*test 1*')).toBe('<p><em>test 1</em></p>\n');
  });

  test('2. variable definition line is removed from output', () => {
    marked.use(markedVars());
    expect(marked('ABC\n[key_3]<<[value_3]\nMNO\nkey_3>>\nXYZ')).toBe('<p>ABC\nMNO\nkey_3&gt;&gt;\nXYZ</p>\n');
  });

  test('3. variable definition removed from output, other markdown tokens exist in output', () => {
    marked.use(markedVars());
    expect(marked('**ABC**\n[key_3]<<[value_3]\nMNO\nkey_3>>\nXYZ')).toBe('<p><strong>ABC</strong>\nMNO\nkey_3&gt;&gt;\nXYZ</p>\n');
  });

  test('4. define and call', () => {
    marked.use(markedVars());
    expect(marked('ABC\n[key_4]<<[value_4]\nMNO\n[key_4]>>\nXYZ\n')).toBe('<p>ABC\nMNO\nvalue_4\nXYZ</p>\n');
  });

  test('5. define and call, markdown in value', () => {
    marked.use(markedVars());
    expect(marked('ABC\n[key_5]<<[*value_5*]\nMNO\n[key_5]>>\nXYZ\n')).toBe('<p>ABC\nMNO\n<em>value_5</em>\nXYZ</p>\n');
  });

  test('6. undefined key', () => {
    marked.use(markedVars());
    expect(marked('ABC\nMNO\n[key_6]>>\nXYZ\n')).toBe('<p>ABC\nMNO\n[key_6]&gt;&gt;\nXYZ</p>\n');
  });

  test('7. undefined key, markdown in key', () => {
    marked.use(markedVars());
    expect(marked('ABC\nMNO\n[*key_7*]>>\nXYZ\n')).toBe('<p>ABC\nMNO\n[<em>key_7</em>]&gt;&gt;\nXYZ</p>\n');
  });

  test('8. recursion attempts fail', () => {
    marked.use(markedVars());
    expect(marked('[key_7a]<<[key_7b]\n[[key_7a]>>]<<[value_7b]\n[key_7b]>>\n')).toBe('<p>[[key_7a]&gt;&gt;]&lt;&lt;[value_7b]\n[key_7b]&gt;&gt;</p>\n');
  });

  test('99. text from README.md', () => {
    marked.use(markedVars());
    expect(marked('[key]<<[value]\n [key]>>')).toBe('<p> value</p>\n');
  });
});
