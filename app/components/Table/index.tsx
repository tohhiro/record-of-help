import { forwardRef } from 'react';
import '../../styles/globals.css';
import { tableStyles } from './index.styles';

export type Props = Record<string, string | number | null>[];

export const Table = forwardRef(
  ({ thData, tdData }: { thData: Record<string, string>; tdData: Props | null }, _ref) => {
    if (!tdData || !tdData[0]) {
      return <div>データがありません</div>;
    }
    if (Object.keys(thData).length !== Object.keys(tdData[0]).length) {
      return <div>要素の数が異なるため表示できません</div>;
    }
    return (
      <table className={tableStyles.table}>
        <thead className={tableStyles.thead}>
          <tr>
            {Object.keys(thData).map((key: string, idx) => (
              <th key={`${idx}${key}`} className={tableStyles.th}>
                {thData[key]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tdData.map((item, idxA) => (
            <tr key={idxA} className={tableStyles.tr}>
              {Object.keys(item).map((key, idxB) => (
                <td key={`${idxB}${key}`} className={tableStyles.td}>
                  {String(item[key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
);
