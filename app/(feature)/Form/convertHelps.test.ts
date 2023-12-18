import { convertHelps } from './convertHelps';
import type { Helps, Props } from './page';

describe('convertHelps', () => {
  it('data.helpsにある文字列、dish、curtainがtrueでオブジェクトに入る', () => {
    const helps: Helps[] = [
      { id: 'dish', label: 'Dish' },
      { id: 'curtain', label: 'Curtain' },
      { id: 'prepareEat', label: 'Prepare to eat' },
    ];

    const data: Props = {
      person: 'John',
      comments: 'I need help',
      helps: ['dish', 'curtain'],
    };

    const result = convertHelps(helps, data);
    expect(result).toEqual({
      dish: true,
      curtain: true,
      prepareEat: false,
    });
  });
});
