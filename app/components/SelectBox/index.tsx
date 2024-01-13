import React from 'react';
import Select from 'react-select';
import '../../styles/globals.css';
import { SelectBoxStyles } from './index.styles';

export type Props = {
  value: string;
  label: string;
};

export const SelectBox = ({
  options,
  id,
  isDisabled,
  label,
}: {
  options: Props[];
  id: string;
  isDisabled?: boolean;
  label: string;
}) => {
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
      />
    </div>
  );
};
