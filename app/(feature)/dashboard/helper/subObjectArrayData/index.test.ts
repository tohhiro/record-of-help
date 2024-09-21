import '@testing-library/jest-dom';
import { sumObjectArrayData } from '.';
import { mockRawsData } from '@/mocks/rawsData';

const mockSumItem = ['dish', 'curtain', 'prepareEat', 'landry', 'special'];

describe('sumObjectArrayData', () => {
  test('mockのデータの合計¥250で計算される', () => {
    const result = sumObjectArrayData(mockRawsData.data, mockSumItem);
    expect(result).toBe(250);
    expect(result).not.toBe(100);
  });
});
