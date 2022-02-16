import { ReactNode } from 'react';
import Select from 'react-select';

type FormInputType = (
  | {
      type: 'text' | 'email' | 'password';
      selectItems?: undefined;
      onChange: Function;
      placeholder?: string;
      value: string;
    }
  | {
      type: 'checkbox';
      selectItems?: undefined;
      onChange: Function;
      placeholder?: ReactNode;
      value: boolean;
    }
  | {
      type: 'selectFromMap' | 'multiSelectFromMap';
      selectItems?: any;
      onChange: any;
      placeholder?: ReactNode;
      value: any;
    }
) & { className?: string; error: ReactNode };

const FormInput = ({
  type = 'text',
  onChange,
  placeholder,
  value,
  className = '',
  error,
  selectItems = [],
}: FormInputType) => {
  if (['text', 'email', 'password'].includes(type))
    return (
      <div className="my-2">
        <input
          type={type}
          onChange={onChange}
          value={value}
          className="brk-input-text"
          placeholder={placeholder as string}
        />

        {error && <p className="text-state-alarm">{error}</p>}
      </div>
    );
  if (type == 'checkbox')
    return (
      <div className="my-4">
        <label className="text-gray-500 cursor-pointer hover:text-gray-600">
          <input
            type="checkbox"
            checked={value}
            onChange={onChange}
            className="mr-2 leading-tight"
          />
          {placeholder}
        </label>
        {error && <p className="text-state-alarm">{error}</p>}
      </div>
    );

  if (type == 'selectFromMap')
    return (
      <div>
        <Select
          value={value}
          className={className}
          options={selectItems}
          placeholder={placeholder}
          onChange={onChange}
          isMulti={false}
        />
        {error && <p className="text-state-alarm">{error}</p>}
      </div>
    );

  if (type == 'multiSelectFromMap')
    return (
      <div>
        <Select
          value={value}
          className={className}
          options={selectItems}
          placeholder={placeholder}
          onChange={onChange}
          isMulti={true}
        />
        {error && <p className="text-state-alarm">{error}</p>}
      </div>
    );

  return <></>;
};

export default FormInput;
