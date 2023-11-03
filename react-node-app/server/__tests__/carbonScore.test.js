const calcScore = require('../src/carbonScore');

test('a carpool for one mile adds 0.03 points', () => {
    const actual = calcScore("Transportation", "Drive - Carpool", 1);
    expect(actual).toEqual(0.03);
});

test('a drive alone for 2 miles adds -0.06 points', () => {
  const actual = calcScore("Transportation", "Drive - Alone", 2);
  expect(actual).toEqual(-0.06);
});

test('a walk for 10 miles adds 0.35 points', () => {
  const actual = calcScore("Transportation", "Walk", 10);
  expect(actual).toEqual(0.35);
});

test('a bike/scooter for zero miles adds 0 points', () => {
  const actual = calcScore("Transportation", "Bike/Scooter", 0);
  expect(actual).toEqual(0);
});

test('a train for two miles adds 0.03 points', () => {
  const actual = calcScore("Transportation", "Train", 2);
  expect(actual).toEqual(0.03);
});

test('a bus for one mile adds 0.015 points', () => {
  const actual = calcScore("Transportation", "Bus", 1);
  expect(actual).toEqual(0.015);
});

test('a flight for 800 miles adds -3.2 points', () => {
  const actual = calcScore("Transportation", "Airline Flight", 800);
  expect(actual).toEqual(-3.2);
});

test('an incorrect category adds 0 points', () => {
  const actual = calcScore("wrong", "Drive - Carpool", 1);
  expect(actual).toEqual(0);
});

test('an incorrect activity adds 0 points', () => {
  const actual = calcScore("Eating", "wrong", 1);
  expect(actual).toEqual(0);
});

test('one shopping trip in a week adds 0.66 points', () => {
  const actual = calcScore("Eating", "Shopping - Grocery Store", 1);
  expect(actual).toEqual(0.66);
});

test('6 shopping trips in a week adds -0.99 points', () => {
  const actual = calcScore("Eating", "Shopping - Grocery Store", 6);
  expect(actual).toEqual(-0.99);
});

test('electricity consumption above 7.06 kWh loses points', () => {
  const actual = calcScore("Household", "Electricity Consumption", 10);
  expect(actual).toBeLessThan(0);
});

test('electricity consumption below 7.06 kWh adds points', () => {
  const actual = calcScore("Household", "Electricity Consumption", 6);
  expect(actual).toBeGreaterThan(0);
});

