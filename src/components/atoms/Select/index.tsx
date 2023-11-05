import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type SelectProps = {
  placeholder: string;
  options: string[];
  formRegister: UseFormRegisterReturn
}
const Select: FC<SelectProps> = ({ placeholder, options, formRegister }) => {

  return (
    <select placeholder={placeholder} className="select select-primary w-full" {...formRegister}>
      <option disabled>{placeholder}</option>
      {
        options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))
      }
    </select>
  );
}

export default Select;