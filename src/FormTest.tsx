import FormInput from './components/FormInput';
import { useForm } from './hooks/useForm';

const FormTest = () => {
  const { errors, formData, handleChange, handleSubmit, resetForm } = useForm({
    validations: {
      text1: {
        required: { value: true, message: 'Is required' },
      },
      check1: {
        required: { value: true, message: 'Is required' },
      },
      select1: {
        required: { value: true, message: 'Is required' },
      },
    },
    initialValues: {
      text1: '',
      check1: false,
      select1: [],
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
          onChange={handleChange('select1')}
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
          onChange={handleChange('select1')}
          error={errors.multiSelect1}
          placeholder={'multiSelect1'}
          selectItems={[
            { label: 'a', value: 'a' },
            { label: 'b', value: 'b' },
          ]}
          value={formData.multiSelect1}
        />

        <div className="flex gap-2 mt-3">
          <button
            className="px-4 py-1 bg-indigo-400 text-indigo-100 rounded"
            type="submit"
          >
            submit
          </button>
          <button
            className="px-4 py-1 border border-indigo-400 text-indigo-400 rounded"
            type="reset"
            onClick={() => resetForm()}
          >
            reset
          </button>
        </div>
      </form>
    </main>
  );
};

export default FormTest;
