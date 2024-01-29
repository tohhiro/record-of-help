import '@testing-library/jest-dom';
import { sumObjectArrayData } from './sumObjectArrayData';
import { mockRawsData } from '../../mocks/rawsData';

const mockSumItem = ['dish', 'curtain', 'prepareEat', 'landry', 'towel'];

describe('sumObjectArrayData', () => {
  test('mockのデータの合計180で計算される', async () => {
    const result = sumObjectArrayData(mockRawsData, mockSumItem);
    expect(result).toBe(180);
    expect(result).not.toBe(100);
  });
});
