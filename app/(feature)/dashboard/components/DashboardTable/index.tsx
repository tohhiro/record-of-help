'use client';
import { useTransition } from 'react';
import { Button } from '@/app/components/Button';
import { Table, type Props as TableProps } from '@/app/components/Table';
import type { Database } from '@/supabase/schema';
import { deleteRecord } from '@/app/(feature)/dashboard/actions';

export type Props = Database['public']['Tables']['raws_data']['Row'][] | null;

// del_flagをフィルターする
const filterData = (data: Props) => {
  if (!data) return null;
  return data.filter((item) => item.del_flag !== true);
};

// created_atを変換する
type ConvertedData = Omit<NonNullable<Props>[number], 'del_flag'> & { created_at: string };
const convertDateTime = (data: Props): ConvertedData[] | null => {
  if (!data) return null;
  return data.map(({ del_flag: _delFlag, ...item }) => {
    return {
      ...item,
      created_at: new Date(item.created_at).toLocaleDateString(),
    };
  });
};

// thの順番に並び替える
const sortData = (
  data: ConvertedData[] | null,
  th: Record<string, string>,
  handleClick: (_id: string) => void,
): TableProps | null => {
  if (!data) return null;
  return data.map((item) => {
    const row: TableProps[number] = {};
    Object.keys(th).forEach((key) => {
      if (key === 'id') {
        row[key] = (
          <Button
            key={item.id}
            label="削除"
            type="submit"
            intent="primary"
            onClick={() => handleClick(item.id)}
          />
        );
      } else {
        row[key] = item[key as keyof typeof item];
      }
    });
    return row;
  });
};

export const DashboardTable = ({ th, td }: { th: Record<string, string>; td: Props }) => {
  const [, startTransition] = useTransition();

  if (!Object.keys(th).length || !td) return null;

  const filteredData = filterData(td);
  const convertedData = convertDateTime(filteredData);

  const handleClick = (id: string) => {
    // eslint-disable-next-line no-alert
    if (window.confirm('このレコードを削除しますか？')) {
      startTransition(async () => {
        await deleteRecord({ id });
      });
    }
  };

  const sortedData = sortData(convertedData, th, handleClick);

  return (
    <Table thData={th} tdData={sortedData} />
  );
};
