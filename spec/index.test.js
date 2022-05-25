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

  test('2. no options', () => {
    marked.use(markedVars());
    expect(marked('[key_2]<<[value_2]\n')).toBe('<p>[key_2]&lt;&lt;[value_2]</p>\n');
  });

  test('3. enable: false', () => {
    marked.use(markedVars({ enable: false }));
    expect(marked('[key_3]<<[value_3]\n')).toBe('<p>[key_3]&lt;&lt;[value_3]</p>\n');
  });

  test('4. enable: true, variable definition line is removed from output', () => {
    marked.use(markedVars({ enable: true }));
    expect(marked('ABC\n[key_4]<<[value_4]\nMNO\nkey_4>>\nXYZ')).toBe('<p>ABC\nMNO\nkey_4&gt;&gt;\nXYZ</p>\n');
  });

  test('5. enable: true, define and call', () => {
    marked.use(markedVars({ enable: true }));
    expect(marked('ABC\n[key_5]<<[value_5]\nMNO\n[key_5]>>\nXYZ\n')).toBe('<p>ABC\nMNO\nvalue_5\nXYZ</p>\n');
  });

  test('6. enable: true, define and call, markdown in value', () => {
    marked.use(markedVars({ enable: true }));
    expect(marked('ABC\n[key_6]<<[*value_6*]\nMNO\n[key_6]>>\nXYZ\n')).toBe('<p>ABC\nMNO\n<em>value_6</em>\nXYZ</p>\n');
  });

  test('7. enable: true, undefined key', () => {
    marked.use(markedVars({ enable: true }));
    expect(marked('ABC\nMNO\n[key_7]>>\nXYZ\n')).toBe('<p>ABC\nMNO\n[key_7]>>\nXYZ</p>\n');
  });

  test('8. enable: true, undefined key, markdown in key', () => {
    marked.use(markedVars({ enable: true }));
    expect(marked('ABC\nMNO\n[*key_8*]>>\nXYZ\n')).toBe('<p>ABC\nMNO\n[<em>key_8</em>]>>\nXYZ</p>\n');
  });
});
