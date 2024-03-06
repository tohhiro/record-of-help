import React, { forwardRef } from 'react';
import '../../styles/globals.css';
import { tableStyles } from './index.styles';

export type PropsTableTd = Record<string, string | number | null>[];

export const Table = forwardRef(
  ({ thData, tdData }: { thData: Record<string, string>; tdData: PropsTableTd | null }, _ref) => {
    if (!tdData) return <div>データがありません</div>;
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
