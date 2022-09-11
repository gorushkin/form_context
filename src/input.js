import { Form, Input } from 'antd';
import {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  createRef,
  useRef,
  memo,
  useLayoutEffect,
} from 'react';
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
    onSetValues: (value) => {
      console.log('name: ', name);
      console.log('value: ', value);
      setValue(value);
      // console.log(value);
      // console.log(name, ':', value);
      // setValue(name)
      // if (values[name]) {
      //   console.log(name);
      //   console.log(values);
      // }
      // setIsValid(true);
      // isFieldTouched.current = false;
      // if (values[name]) {
      //   console.log(name);
      //   console.log(values[name]);
      //   setValue(values[name]);
      // }
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
    <div>
      <span>{name}</span>
      <Form.Item validateStatus={isValid ? 'success' : 'error'} className='form_item'>
        <Input name={name} onChange={onChange} value={value} />
      </Form.Item>
    </div>
  );
});

export const MInput = memo(({ name, rowIndex }) => {
  const ref = createRef();

  const { form } = useStoreContext();
  const fieldName = `${rowIndex}_${name}`;

  form.setRef(fieldName, ref);
  form.addField(fieldName);

  // useEffect(() => {
  //   if (form) {

  //     return () => form.removeField(fieldName);
  //   }
  // }, [form, fieldName]);


  return <InnerInput name={fieldName} handleChange={form.handleChange} ref={ref} />;
});
