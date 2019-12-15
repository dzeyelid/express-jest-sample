const greetingService = require('./greetingService');

test('Return correct string', () => {
  expect(greetingService.greet()).toBe('Hello');
});