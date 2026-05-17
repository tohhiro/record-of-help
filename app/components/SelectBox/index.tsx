import '@/app/styles/globals.css';
import { type ComponentRef, forwardRef } from 'react';
import Select from 'react-select';
import { SelectBoxStyles } from './index.styles';

export type Props = {
  value: string;
  label: string;
};

export const SelectBox = forwardRef<
  ComponentRef<typeof Select>,
  { options: Props[]; label: string; id: string; isDisabled?: boolean }
>(
  (
    {
      options,
      label,
      id,
      isDisabled,
      ...field
    }: { options: Props[]; label: string; id: string; isDisabled?: boolean },
    ref,
  ) => {
    return (
      <div>
        <label htmlFor={id} className={SelectBoxStyles.label}>
          {label}
        </label>
        <Select
          {...field}
          ref={ref}
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
  },
);

SelectBox.displayName = 'SelectBox';
