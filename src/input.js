import { Form, Input } from 'antd';
import { useEffect, useState, forwardRef, useImperativeHandle, createRef, useRef } from 'react';
import { useStoreContext } from './context';

export const InnerInput = forwardRef(({ handleChange, name }, ref) => {
  const [value, setValue] = useState('');

  const isFieldTouched = useRef(false);

  const [isValid, setIsValid] = useState(true);

  useImperativeHandle(ref, () => ({
    validateTrigger: () => setIsValid(!!value),
    onFormReset: () => {
      setIsValid(true);
      setValue('');
      isFieldTouched.current = false;
    },
  }));

  useEffect(() => {
    if (isFieldTouched.current) setIsValid(!!value);
  }, [value]);

  const onChange = ({ target: { value, name } }) => {
    handleChange({ name, value });
    isFieldTouched.current = true;
    setValue(value);
  };

  return (
    <Form.Item  validateStatus={isValid ? 'success' : 'error'} className='form_item'>
      <Input name={name} onChange={onChange} value={value} />
    </Form.Item>
  );
});

export const MInput = ({ name, rowIndex }) => {
  const ref = createRef();

  const { form } = useStoreContext();
  const fieldName = `${rowIndex}_${name}`;

  useEffect(() => {
    if (form) {
      form.addField(fieldName);

      return () => form.removeField(fieldName);
    }
  }, [form, fieldName]);

  form.setRef(fieldName, ref);

  return <InnerInput name={fieldName} handleChange={form.handleChange} ref={ref} />;
};
