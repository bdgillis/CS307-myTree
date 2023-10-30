const calcScore = require('../carbonScore');

test('a carpool for one mile adds 0.03 points', () => {
    const actual = calcScore("Transportation", "Drive - Carpool", 1);
    debugger;
    console.log(actual);
    expect(actual).toEqual(0.03);
  });