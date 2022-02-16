import FormInput from './components/FormInput';
import { useForm } from './hooks/useForm';

const FormTest = () => {
  const { errors, formData, handleChange, handleSubmit, resetForm } = useForm({
    validations: {
      text1: {
        required: { value: true, message: 'Text is required' },
      },
      check1: {
        required: { value: true, message: 'Checkbox is required' },
      },
      select1: {
        required: { value: true, message: 'Select1 is required' },
      },
      multiSelect1: {
        required: { value: true, message: 'Multy is required' },
      },
    },
    initialValues: {
      text1: '',
      check1: false,
      select1: {},
      multiSelect1: [],
    },
    onSubmit: () => {
      console.log('submit');
    },
  });
  return (
    <main>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          onChange={handleChange('text1')}
          error={errors.text1}
          placeholder={'text1'}
          value={formData.text1}
        />

        <FormInput
          type="checkbox"
          onChange={handleChange('check1', { targetAttribute: 'checked' })}
          error={errors.check1}
          placeholder={'checkbox'}
          value={formData.check1}
        />

        <FormInput
          type="selectFromMap"
          onChange={handleChange('select1', { rawInput: true })}
          error={errors.select1}
          placeholder={'Select'}
          selectItems={[
            { label: 'a', value: 'a' },
            { label: 'b', value: 'b' },
          ]}
          value={formData.select1}
        />

        <FormInput
          className="my-3"
          type="multiSelectFromMap"
          onChange={handleChange('multiSelect1', {
            rawInput: true,
          })}
          error={errors.multiSelect1}
          placeholder={'multiSelect1'}
          selectItems={[
            { label: 'a', value: 'a' },
            { label: 'b', value: 'b' },
          ]}
          value={formData.multiSelect1}
        />

        {/* BUTTONS */}
        <div className="flex gap-2 mt-3">
          <button
            className="px-4 py-1 bg-indigo-400 text-indigo-100 rounded hover:bg-indigo-300"
            type="submit"
          >
            submit
          </button>
          <button
            className="px-4 py-1 border border-indigo-400 text-indigo-400 rounded hover:bg-indigo-50"
            type="reset"
            onClick={() => resetForm()}
          >
            reset
          </button>
        </div>
      </form>
      {/* JSON */}
      <pre className="text-sm">
        <code>{JSON.stringify({ formData, errors }, null, 2)}</code>
      </pre>
    </main>
  );
};

export default FormTest;
