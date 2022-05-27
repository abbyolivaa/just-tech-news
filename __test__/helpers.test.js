const {format_date} = require('../utils/helpers');

test('format_date() returns a date string', () => {
    const date= new Date('2022-05-27 13:41:00');
    expect(format_date(date)).toBe('5/27/2022');
});