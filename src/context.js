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
} from 'react';

const StoreContext = createContext({});
export const useStoreContext = () => useContext(StoreContext);

const StoreProvider = forwardRef(({ children, form }, ref) => {
  const [fields, setFields] = useState([]);

  const refs = useRef();

  const setRef = useCallback(
    (name, ref) => {
      refs.current = { ...refs.current, [name]: ref };
    },
    [refs]
  );

  const addField = useCallback((name) => {
    setFields((state) => [...state, name]);
  }, []);

  const removeField = useCallback((name) => {
    setFields((state) => state.filter((item) => item !== name));
  }, []);

  useImperativeHandle(ref, () => ({
    handleSave: () => {
      console.log(fields);
      fields.forEach((item) => {
        refs.current[item].current.validateTrigger();
      });
    },

    handleReset: () => {
      fields.forEach((item) => {
        refs.current[item].current.onFormReset();
      });
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
