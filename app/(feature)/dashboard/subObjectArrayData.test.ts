import '@testing-library/jest-dom';
import { sumObjectArrayData } from './sumObjectArrayData';
import { mockRawsData } from '../../../mocks/rawsData';

const mockSumItem = ['dish', 'curtain', 'prepareEat', 'landry', 'special'];

describe('sumObjectArrayData', () => {
  test('mockのデータの合計¥250で計算される', async () => {
    const result = sumObjectArrayData(mockRawsData, mockSumItem);
    expect(result).toBe(250);
    expect(result).not.toBe(100);
  });
});
