import { marked } from 'marked';
import markedVars from '../src/index.js';

describe('markedVars', () => {
  beforeEach(() => {
    marked.setOptions(marked.getDefaults());
  });

  test('1. markdown not using this extension', () => {
    marked.use(markedVars());
    expect(marked('*test 1*')).toBe('<p><em>test 1</em></p>\n');
  });

  test('2. enable: false', () => {
    marked.use(markedVars({ enable: false }));
    expect(marked('ABC\n[key_2]<<[value_2]\nMNO\nkey_2>>\nXYZ')).toBe('<p>ABC\n[key_2]&lt;&lt;[value_2]\nMNO\nkey_2&gt;&gt;\nXYZ</p>\n');
  });

  test('3. variable definition line is removed from output', () => {
    marked.use(markedVars());
    expect(marked('ABC\n[key_3]<<[value_3]\nMNO\nkey_3>>\nXYZ')).toBe('<p>ABC\nMNO\nkey_3&gt;&gt;\nXYZ</p>\n');
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
    expect(marked('ABC\nMNO\n[key_6]>>\nXYZ\n')).toBe('<p>ABC\nMNO\n[key_6]>>\nXYZ</p>\n');
  });

  test('7. undefined key, markdown in key', () => {
    marked.use(markedVars());
    expect(marked('ABC\nMNO\n[*key_7*]>>\nXYZ\n')).toBe('<p>ABC\nMNO\n[<em>key_7</em>]>>\nXYZ</p>\n');
  });

  test('99. text from README.md', () => {
    marked.use(markedVars());
    expect(marked('[key]<<[value]\n [key]>>')).toBe('<p> value</p>\n');
  });
});
