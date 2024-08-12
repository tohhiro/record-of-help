import { PricesHelpsList } from '@/app/types';

export const mockPricesList = [
  {
    id: 'dish',
    label: '皿洗い',
    column: 'dish',
    value: 30,
  },
  {
    id: 'curtain',
    label: 'カーテン',
    column: 'curtain',
    value: 10,
  },
  {
    id: 'prepareEat',
    label: '食事準備',
    column: 'prepareEat',
    value: 20,
  },
  {
    id: 'landry',
    label: '洗濯物片付け',
    column: 'landry',
    value: 20,
  },
  {
    id: 'special',
    label: 'スペシャル',
    column: 'special',
    value: 50,
  },
];

export const mockPricesListRaw: PricesHelpsList = {
  data: [
    {
      created_at: '2021-10-01T00:00:00.000000Z',
      help: 'dish',
      id: '1',
      label: '皿洗い',
      update_at: '2021-10-01T00:00:00.000000Z',
      prices_list: [
        {
          created_at: '2021-10-01T00:00:00.000000Z',
          help_id: null,
          id: 1,
          price: 30,
          update_at: '2021-10-01T00:00:00.000000Z',
        },
      ],
    },
    {
      created_at: '2021-10-01T00:00:00.000000Z',
      help: 'curtain',
      id: '2',
      label: 'カーテン',
      update_at: '2021-10-01T00:00:00.000000Z',
      prices_list: [
        {
          created_at: '2021-10-01T00:00:00.000000Z',
          help_id: null,
          id: 2,
          price: 10,
          update_at: '2021-10-01T00:00:00.000000Z',
        },
      ],
    },
    {
      created_at: '2021-10-01T00:00:00.000000Z',
      help: 'prepareEat',
      id: '3',
      label: '食事準備',
      update_at: '2021-10-01T00:00:00.000000Z',
      prices_list: [
        {
          created_at: '2021-10-01T00:00:00.000000Z',
          help_id: null,
          id: 3,
          price: 20,
          update_at: '2021-10-01T00:00:00.000000Z',
        },
      ],
    },
    {
      created_at: '2021-10-01T00:00:00.000000Z',
      help: 'landry',
      id: '4',
      label: '洗濯物片付け',
      update_at: '2021-10-01T00:00:00.000000Z',
      prices_list: [
        {
          created_at: '2021-10-01T00:00:00.000000Z',
          help_id: null,
          id: 4,
          price: 20,
          update_at: '2021-10-01T00:00:00.000000Z',
        },
      ],
    },
    {
      created_at: '2021-10-01T00:00:00.000000Z',
      help: 'special',
      id: '5',
      label: 'スペシャル',
      update_at: '2021-10-01T00:00:00.000000Z',
      prices_list: [
        {
          created_at: '2021-10-01T00:00:00.000000Z',
          help_id: null,
          id: 5,
          price: 50,
          update_at: '2021-10-01T00:00:00.000000Z',
        },
      ],
    },
  ],
  error: null,
};

export const mockPricesListErrorRaw: PricesHelpsList = {
  data: [],
  error: {
    message: 'error',
    details: 'error',
    hint: 'This is a hint',
    code: '404',
  },
};
