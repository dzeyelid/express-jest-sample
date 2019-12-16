const greetingService = require('./greetingService');

test('greetingService.greet() が正しい値を返却すること', () => {
  const value = greetingService.greet();
  expect(value).toBe('Hello');
  expect(value).not.toMatch(/!/);
});
