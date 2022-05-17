const getDate = require('./date');

test('getDate returns non empty string', () => {
    const date = getDate();
    expect(date).not.toBe('');

})