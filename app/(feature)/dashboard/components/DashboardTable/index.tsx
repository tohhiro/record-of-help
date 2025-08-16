import { Button } from '@/app/components/Button';
import { Table } from '@/app/components/Table';
import type { Database } from '@/supabase/schema';
import { useDeleteRecord } from './hooks/useDeleteRecord';

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
) => {
  if (!data) return null;
  return data.map((item) => {
    return Object.keys(th).map((key) => {
      if (key === 'id') {
        return (
          <Button
            key={item.id}
            label="削除"
            type="submit"
            intent="primary"
            onClick={() => handleClick(item.id)}
          />
        );
      }
      return item[key as keyof typeof item];
    });
  });
};

export const DashboardTable = ({ th, td }: { th: Record<string, string>; td: Props }) => {
  const { deleteRecord } = useDeleteRecord();

  if (!Object.keys(th).length || !td) return null;

  const filteredData = filterData(td);
  const convertedData = convertDateTime(filteredData);

  const handleClick = async (id: string) => {
    // eslint-disable-next-line no-alert
    if (window.confirm('このレコードを削除しますか？')) {
      await deleteRecord({ id });
    }
  };

  const sortedData = sortData(convertedData, th, handleClick);

  return (
    // TODO: asで型を変換しているが、as unknown asを使うのは避けたい
    <Table thData={th} tdData={sortedData as unknown as Record<string, string | number | null>[]} />
  );
};
