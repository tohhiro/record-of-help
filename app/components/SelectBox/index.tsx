import React, { forwardRef } from 'react';
import Select from 'react-select';
import '../../styles/globals.css';
import { SelectBoxStyles } from './index.styles';

export type Props = {
  value: string;
  label: string;
};

export const SelectBox = forwardRef(
  (
    {
      options,
      label,
      id,
      isDisabled,
      ...field
    }: { options: Props[]; label: string; id: string; isDisabled?: boolean },
    _ref,
  ) => {
    return (
      <div>
        <label htmlFor={id} className={SelectBoxStyles.label}>
          {label}
        </label>
        <Select
          id={id}
          name="selects"
          inputId="selects"
          isClearable={false}
          isSearchable={false}
          className={SelectBoxStyles.container}
          options={options}
          isDisabled={isDisabled}
          {...field}
        />
      </div>
    );
  },
);
