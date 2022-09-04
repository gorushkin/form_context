import { Form, Input } from 'antd';
import { useEffect, useState, forwardRef, useImperativeHandle, createRef, useRef } from 'react';
import { useStoreContext } from './context';

export const InnerInput = forwardRef((props, ref) => {
  const { form } = useStoreContext();

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
    form.handleChange({ name, value });
    isFieldTouched.current = true;
    setValue(value);
  };

  return (
    <Form.Item validateStatus={isValid ? 'success' : 'error'} className='form_item'>
      <Input {...props} onChange={onChange} value={value} />
    </Form.Item>
  );
});

export const MInput = (props) => {
  const { form } = useStoreContext();

  const ref = createRef();

  form.setRef(props.name, ref);

  useEffect(() => {
    form.addField(props.name);

    return () => form.removeField(props.name);
  }, [form, props.name]);

  form.getRefs(props.name);

  return <InnerInput ref={ref} {...props} />;
};
