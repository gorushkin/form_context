import { Form, Input } from 'antd';
import { useEffect, useState, forwardRef, useImperativeHandle, createRef, useRef } from 'react';
import { useStoreContext } from './context';

export const InnerInput = forwardRef(({ handleChange, name, qwe, setQwe }, ref) => {
  // const [value, setValue] = useState(name);

  const isFieldTouched = useRef(false);

  const [isValid, setIsValid] = useState(true);

  useImperativeHandle(ref, () => ({
    validateTrigger: () => {
      // setIsValid(!!value);
    },
    onFormReset: () => {
      // setIsValid(true);
      // setValue('');
      // isFieldTouched.current = false;
    },
    onSetValues: (values) => {
      // setValue('');
      // setIsValid(true)
      // isFieldTouched.current = false;
      // if (values[name]) {
      //   console.log('------');
      //   console.log(name);
      //   console.log(values[name]);
      //   setValue(values[name]);
      // }
    },
  }));

  // useEffect(() => {
  //   if (isFieldTouched.current) setIsValid(!!value);
  // }, [value]);

  const onChange = ({ target: { value, name } }) => {
    console.log(name, value);
    setQwe(value);
    handleChange({ name, value });
    // isFieldTouched.current = true;
    // setValue(value);
  };

  return (
    <div>
      <span>{name}</span>
      <Form.Item validateStatus={isValid ? 'success' : 'error'} className='form_item'>
        <Input name={name} onChange={onChange} value={qwe} />
      </Form.Item>
    </div>
  );
});

export const TestInput = ({ name, rowIndex }) => {
  const fieldName = `${rowIndex}_${name}`;
  console.log('fieldName: ', fieldName);
  const [value, setValue] = useState(fieldName);

  const onChange = ({ target: { value, name } }) => {
    console.log(name, value);
    setValue(value);
  };

  return <input onChange={onChange} name={fieldName} value={value} />;
};
