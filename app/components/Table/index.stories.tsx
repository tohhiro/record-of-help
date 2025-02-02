import { mockThData } from '@/mocks/tableHeader';
import { Meta, StoryObj } from '@storybook/react';
import { Props, Table } from '.';

export default {
  title: 'app/components/Table',
  component: Table,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
} satisfies Meta<typeof Table>;

type Story = StoryObj<typeof Table>;

const mockTdData: Props = [
  {
    person: 'taro',
    curtain: 100,
    dish: 0,
    landry: 0,
    prepareEat: 20,
    special: 0,
    comments: null,
    created_at: '2024-1-2',
  },
  {
    person: 'hide',
    curtain: 100,
    dish: 0,
    landry: 0,
    prepareEat: 20,
    special: 0,
    comments: null,
    created_at: '2024-1-2',
  },
  {
    person: 'taro',
    curtain: 200,
    dish: 10,
    landry: 20,
    prepareEat: 20,
    special: 40,
    comments: 'テストコメント',
    created_at: '2024-1-2',
  },
];

const mockTdDataDiff: Props = [
  {
    diff_id: 1,
    person: 'taro',
    curtain: 100,
    dish: 0,
    landry: 0,
    prepareEat: 20,
    special: 0,
    comments: null,
    created_at: '2024-1-2',
  },
  {
    diff_id: 2,
    person: 'hide',
    curtain: 100,
    dish: 0,
    landry: 0,
    prepareEat: 20,
    special: 0,
    comments: null,
    created_at: '2024-1-2',
  },
  {
    diff_id: 3,
    person: 'taro',
    curtain: 200,
    dish: 10,
    landry: 20,
    prepareEat: 20,
    special: 40,
    comments: 'テストコメント',
    created_at: '2024-1-2',
  },
];

export const Default: Story = {
  args: { thData: mockThData, tdData: mockTdData },
};

export const DifferentThAndTdLength: Story = {
  args: { thData: mockThData, tdData: mockTdDataDiff },
};

export const Null: Story = {
  args: { thData: mockThData, tdData: null },
};
