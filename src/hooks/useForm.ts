import React, { useState } from 'react';

// TYPES
type ErrorRecord<T> = Partial<Record<keyof T, string>>;
type Validations<T extends {}> = Partial<Record<keyof T, Validation>>;
interface Validation {
  required?: {
    value: boolean;
    message: string;
  };
  pattern?: {
    value: string;
    message: string;
  };
  custom?: {
    isValid: (value: string) => boolean;
    message: string;
  };
}
interface HandleChangeOptions {
  targetAttribute?: string;
  sanitizeFn?: (value: any) => any;
}

interface UseFormOptions<T> {
  validations?: Validations<T>;
  initialValues?: T;
  onSubmit?: VoidFunction;
}

// CODE

/**
 * Manage form state and validation
 * @param options Object containing validations, initialValues and onSubmit
 * @returns { formData,  
              handleChange,
              handleSubmit,
              resetForm,
              errors,
  }
 */
export const useForm = <T extends Record<keyof T, any> = {}>(
  options: UseFormOptions<T>
) => {
  const [formData, setFormData] = useState<T>(options?.initialValues);
  const [formErrors, setFormErrors] = useState<ErrorRecord<T>>({});

  /**
   * Function used to update the state of each input field
   * @param key name of the key in the formData object to update
   * @param changeOptions
   * @returns
   */
  const handleChange =
    (key: string, changeOptions?: HandleChangeOptions) =>
    (e: React.FormEvent<HTMLInputElement>) => {
      const { targetAttribute = 'value', sanitizeFn } = changeOptions || {};
      const value = sanitizeFn
        ? sanitizeFn(e.target[targetAttribute])
        : e.target[targetAttribute];
      setFormData((data) => {
        const newFormData = {
          ...data,
          [key]: value,
        };
        return newFormData;
      });
    };

  /**
   * function to call in case of validation success
   * @param e DOM event
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = _validate();
    if (isValid) {
      if (options?.onSubmit) {
        options.onSubmit();
      }
    } else {
      console.warn('Form not valid');
    }
  };

  /**
   * Reset form data and error
   */
  const resetForm = () => {
    setFormData(options?.initialValues);
    setFormErrors({});
  };

  const _validate = (updatedValue?: any) => {
    let valid = true;
    const newErrors: ErrorRecord<T> = {};
    for (const key in options.validations) {
      // value of the field we're validating
      const value = updatedValue?.[key] || formData[key];
      // the matching validation rule for this key
      const validation = options.validations[key];
      // REQUIRED
      if (validation?.required?.value && !value) {
        valid = false;
        newErrors[key] = validation?.required?.message;
      }
      // PATTERN
      const pattern = validation?.pattern;
      if (pattern?.value && !RegExp(pattern.value).test(value)) {
        valid = false;
        newErrors[key] = pattern.message;
      }
      // CUSTOM
      const custom = validation?.custom;
      if (custom?.isValid && !custom.isValid(value)) {
        valid = false;
        newErrors[key] = custom.message;
      }
    }

    setFormErrors(newErrors);
    return valid;
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    resetForm,
    errors: formErrors,
  };
};
