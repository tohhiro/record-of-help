import { expect } from '@playwright/test';
import { getNowMonthFirstLast } from '.';

describe('getNowMonthFirstLast', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2021-10-10'));
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  const expected = { startDate: '2021-10-01', endDate: '2021-10-31' };

  test('その月の最初の1日と月末の日付を含む年月日が返る', () => {
    expect(getNowMonthFirstLast()).toEqual(expected);
  });
});
