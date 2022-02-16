import { ReactNode } from 'react';
import Select from 'react-select';

type FormInputType = {
  type: string;
  onChange: any;
  placeholder: string | ReactNode;
  value: any;
  className?: string;
  error: any;
  selectItems?: any;
};

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

  if (type == 'select')
    return (
      <div className="my-2">
        <div className="inline-block relative ">
          <select
            onChange={onChange}
            defaultValue={value}
            className="brk-input-select"
          >
            <option value="DEFAULT" disabled>
              {placeholder}
            </option>
            {selectItems.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
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
