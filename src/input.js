import { Form, Input } from 'antd';
import { useEffect, useState, memo } from 'react';
import { useStoreContext } from './context';

export const MInput = memo(({ name, rowIndex: index }) => {
  const fieldName = `${index}_${name}`;

  const { form } = useStoreContext();
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setIsValid(!!value);
    form.registerField({ index, name });
  }, [form, index, name, value]);

  useEffect(() => {
    setValue(form.getValue({ index, name }));
  }, [form, index, name]);

  useEffect(() => {}, [value]);

  const onChange = ({ target: { value } }) => {
    setValue(value);
    form.handleChange({ index, value, name });
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
