import FormInput from './components/FormInput';
import { useForm } from './hooks/useForm';

const FormTest = () => {
  const { errors, formData, handleChange, handleSubmit, resetForm } = useForm({
    validations: {
      email: {
        required: { value: true, message: 'email is required' },
      },
      password: {
        required: { value: true, message: 'password is required' },
      },
      country: {
        required: { value: true, message: 'country is required' },
      },
      termsAndConditions: {
        required: { value: true, message: 'termsAndConditions is required' },
      },
    },
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      first_name: '',
      last_name: '',
      phone: '',
      company: '',
      country: null,
      termsAndConditions: false,
    },
    onSubmit: (a) => {
      console.log('submit', a);
    },
  });
  return (
    <main>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          onChange={handleChange('email')}
          error={errors.email}
          placeholder={'email'}
          value={formData.email}
        />
        <FormInput
          type="password"
          onChange={handleChange('password')}
          error={errors.password}
          placeholder={'password'}
          value={formData.password}
        />
        <FormInput
          type="selectFromMap"
          onChange={handleChange('country', { rawInput: true })}
          error={errors.country}
          placeholder="country"
          value={formData.country}
          selectItems={[
            { label: 'italy', value: 'ita' },
            { label: 'switzerland', value: 'ch' },
          ]}
        />
        <FormInput
          type="checkbox"
          onChange={handleChange('termsAndConditions', {
            targetAttribute: 'checked',
          })}
          error={errors.termsAndConditions}
          placeholder={
            <span>
              {'terms andcond'}:
              <span className="brk-link text-black ml-1">link</span>
            </span>
          }
          value={formData.termsAndConditions}
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
