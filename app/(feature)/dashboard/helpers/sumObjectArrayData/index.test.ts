import { mockRawsData } from '@/mocks/rawsData';
import { sumObjectArrayData } from '.';

const mockSumItem = ['dish', 'curtain', 'prepareEat', 'laundry', 'special'];

describe('sumObjectArrayData', () => {
  test('250で計算される', () => {
    const result = sumObjectArrayData(mockRawsData.data, mockSumItem);
    expect(result).toBe(250);
  });
});
