import { Form, Input } from 'antd';
import { useEffect, useState, memo } from 'react';
import { useStoreContext } from './context';

export const MInput = memo(({ name, rowIndex }) => {
  const fieldName = `${rowIndex}_${name}`;

  const { form } = useStoreContext();
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setIsValid(!!value);
  }, [value]);

  useEffect(() => {
    setValue(form.getValue(fieldName));
  }, [form, fieldName]);

  useEffect(() => {}, [value]);

  const onChange = ({ target: { value, name } }) => {
    setValue(value);
    form.handleChange({ value, name });
  };

  return (
    <div>
      <span>{fieldName}</span>
      <Form.Item validateStatus={isValid ? 'success' : 'error'} className='form_item'>
        <Input value={value} name={fieldName} onChange={onChange} />
      </Form.Item>
    </div>
  );
});
