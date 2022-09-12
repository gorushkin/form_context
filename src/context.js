import { createContext, useContext, useMemo, useImperativeHandle, forwardRef, memo } from 'react';

const StoreContext = createContext({});
export const useStoreContext = () => useContext(StoreContext);

const StoreProvider = forwardRef(({ children, form }, ref) => {
  useImperativeHandle(ref, () => ({
    handleSave: () => {
      console.log('handleSave');
    },

    handleReset: () => {},

    handleSetValue: (values) => {
      console.log('handleSetValue');
    },
    handleSubmitRow: (values, index) => {
      console.log('handleSubmitRow');
    },
  }));

  const contextValue = useMemo(() => ({ form }), [form]);

  return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>;
});

const StoreWrapper = ({ children, onFinish, form }) => {

  const submitHandler = (e) => {
    e.preventDefault();
    const values = form.getValues();
    console.log('values: ', values);
    // form.finishForm();
    // onFinish(values);
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
