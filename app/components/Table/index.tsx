import React, { forwardRef } from 'react';
import '../../styles/globals.css';
import { tableStyles } from './index.styles';
import type { Database } from '../../../supabase/schema';

export type Props = Database['public']['Tables']['raws_data']['Row'][] | null;

export const Table = forwardRef(
  (
    { thData, tdData }: { thData: { [key: string]: string }; tdData: Props | null | undefined },
    _ref,
  ) => {
    const createTable = (tableData: Props) => {
      if (!tableData) return;
      const filteredTableData = tableData && tableData.filter((item) => item.del_flag === false);
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
            {filteredTableData.map((item) => (
              <tr key={item.id} className={tableStyles.tr}>
                {Object.keys(thData).map((key: string, idx) => (
                  <td key={`${idx}${key}`} className={tableStyles.td}>
                    {(key as keyof typeof item) === 'created_at'
                      ? String(new Date(String(item[key as keyof typeof item])).toLocaleString())
                      : String(item[key as keyof typeof item])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    };

    return (
      <div className={tableStyles.container}>
        {tdData ? createTable(tdData) : <div>データがありません</div>}
      </div>
    );
  },
);
