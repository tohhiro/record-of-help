import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { default as Dashboard } from './page';
import { mockRawsData } from '../../../mocks/rawsData';

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));

jest.mock('../../hooks/useFetchPricesList', () => {
  const originalModule = jest.requireActual('../../hooks/useFetchRawsData');
  const pricesList = jest.requireActual('../../../mocks/rawsData');

  return {
    ...originalModule,
    success: pricesList,
    error: null,
  };
});

describe('Dashboard', () => {
  test('テーブルに入ったpropsがレンダリングされる', () => {
    act(() => {
      render(<Dashboard />);
      waitFor(() => {
        const checkboxes = screen.getAllByRole('cell');
        expect(checkboxes).toHaveLength(mockRawsData.length);
      });
    });
  });
});
