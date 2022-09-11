import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useImperativeHandle,
  forwardRef,
  memo,
  useRef,
  useEffect,
} from 'react';

const StoreContext = createContext({});
export const useStoreContext = () => useContext(StoreContext);

const StoreProvider = forwardRef(({ children, form }, ref) => {
  const refs = useRef();

  const fields = useRef([]);

  const setRef = useCallback(
    (name, ref) => {
      console.log('setRef', name);
      refs.current = { ...refs.current, [name]: ref };
    },
    [refs]
  );

  const addField = useCallback(
    (name) => {
      if (fields.current.includes(name)) return;
      fields.current = [name, ...fields.current];
    },
    [fields]
  );

  const removeField = useCallback(
    (name) => {
      fields.current = fields.current.filter((item) => item !== name);
    },
    [fields]
  );

  useImperativeHandle(ref, () => ({
    handleSave: () => {
      fields.current.forEach((item) => {
        refs.current[item].current.validateTrigger();
      });
    },

    handleReset: () => {
      fields.current.forEach((item) => {
        refs.current[item].current.onFormReset();
      });
    },

    handleSetValue: (values) => {
      fields.current.forEach((item) => {
        console.log(values[item]);
        console.log(item);
        refs.current[item].current.onSetValues(values[item]);
      });
    },
    handleSubmitRow: (values, index) => {
      console.log('index: ', index);
      console.log('values: ', values);
    },
  }));

  const contextValue = useMemo(
    () => ({ form: { ...form, addField, removeField, refs, setRef } }),
    [addField, form, removeField, refs, setRef]
  );

  return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>;
});

const StoreWrapper = ({ children, form, onFinish }) => {
  const submitHandler = (e) => {
    e.preventDefault();
    const values = form.getValues();
    form.finishForm();
    onFinish(values);
  };

  return (
    <form onSubmit={submitHandler} id='form'>
      <StoreProvider form={form} ref={form.formRef}>
        {children}
      </StoreProvider>
    </form>
  );
};

export default memo(StoreWrapper);
