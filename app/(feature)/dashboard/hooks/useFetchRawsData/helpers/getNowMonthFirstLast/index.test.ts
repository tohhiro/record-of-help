import { getNowMonthFirstLast } from '.';

describe('getNowMonthFirstLast', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test.each([
    { value: '2021-10-1', expectStartDate: '2021-10-01', expectEndDate: '2021-10-31' },
    { value: '2021-10-10', expectStartDate: '2021-10-01', expectEndDate: '2021-10-31' },
    { value: '2021-10-30', expectStartDate: '2021-10-01', expectEndDate: '2021-10-31' },
    { value: '2021-11-11', expectStartDate: '2021-11-01', expectEndDate: '2021-11-30' },
    // JSTでは翌月だがUTCではまだ前月 → JST基準で正しく翌月を返すことを検証
    { value: '2021-09-30T16:00:00Z', expectStartDate: '2021-10-01', expectEndDate: '2021-10-31' },
  ])('$valueの1日と月末の日付を含む年月日が返る', ({ value, expectStartDate, expectEndDate }) => {
    jest.setSystemTime(new Date(value));
    expect(getNowMonthFirstLast()).toEqual({ startDate: expectStartDate, endDate: expectEndDate });
  });
});
