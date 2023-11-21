import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type SelectOption = {
  label: string;
  value: string;
}
type SelectProps = {
  placeholder: string;
  options: SelectOption[];
  formRegister: UseFormRegisterReturn
}
const Select: FC<SelectProps> = ({ placeholder, options, formRegister }) => {
  return (
    <select placeholder={placeholder} className="select select-primary w-full" {...formRegister}>
      <option disabled defaultValue={''}>{placeholder}</option>
      {
        options.map((option, index) => (
          <option key={index} value={option.value}>{option.label}</option>
        ))
      }
    </select>
  );
}

export default Select;