const extend = () => {
  expect.extend({
    toBeSameDate(received, expected) {
      if (!(received instanceof Date)) {
        received = new Date(received);
      }
      if (!(expected instanceof Date)) {
        expected = new Date(expected);
      }
  
      const pass = received.getTime() === expected.getTime();
      const message = pass ?
        `Received ${received} is same as ${expected}.` :
        `Received ${received} is not same as ${expected}.`;
      return {
        message: () => message,
        pass
      };
    }
  });
}

exports.extend = extend;
