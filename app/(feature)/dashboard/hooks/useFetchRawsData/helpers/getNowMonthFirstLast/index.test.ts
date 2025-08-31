import { expect } from '@playwright/test';
import { getNowMonthFirstLast } from '.';

describe('getNowMonthFirstLast', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test.each([
    { value: '2021-10-1', expectStartDate: '2021-10-01', expectEndDate: '2021-10-31' },
    { value: '2021-10-10', expectStartDate: '2021-10-01', expectEndDate: '2021-10-31' },
    { value: '2021-10-30', expectStartDate: '2021-10-01', expectEndDate: '2021-10-31' },
    { value: '2021-11-11', expectStartDate: '2021-11-01', expectEndDate: '2021-11-30' },
  ])('$valueの1日と月末の日付を含む年月日が返る', ({ value, expectStartDate, expectEndDate }) => {
    jest.setSystemTime(new Date(value));
    expect(getNowMonthFirstLast()).toEqual({ startDate: expectStartDate, endDate: expectEndDate });
  });
});
