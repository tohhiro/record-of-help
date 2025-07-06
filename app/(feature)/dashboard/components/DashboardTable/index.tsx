import { Button } from '@/app/components/Button';
import { Table } from '@/app/components/Table';
import type { Database } from '@/supabase/schema';

export type Props = Database['public']['Tables']['raws_data']['Row'][] | null;

export const DashboardTable = ({ th, td }: { th: Record<string, string>; td: Props }) => {
  if (!Object.keys(th).length || !td) return null;
  // del_flagをフィルターする
  const filterData = td.filter((item) => item.del_flag !== true);

  // created_atを変換する
  const convertData = filterData?.map(({ del_flag: _delFlag, ...item }) => {
    return {
      ...item,
      created_at: new Date(item.created_at).toLocaleDateString(),
    };
  });

  const handleClick = () => {
    // TODO: 削除処理を実装する
    if (window.confirm('削除ボタンがクリックされました')) {
      console.log('削除処理を実行します');
    }
  };

  // thの順番に並び替える
  const sortData = convertData.map((item) => {
    return Object.keys(th).map((key) => {
      if (key === 'id') {
        return (
          <Button key={item.id} label="削除" type="submit" intent="primary" onClick={handleClick} />
        );
      }
      return item[key as keyof typeof item];
    });
  });

  return (
    // TODO: asで型を変換しているが、as unknown asを使うのは避けたい
    <Table thData={th} tdData={sortData as unknown as Record<string, string | number | null>[]} />
  );
};
