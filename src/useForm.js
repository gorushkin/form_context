import { useEffect, useState, useCallback, useRef } from 'react';

export const useForm = () => {
  const formRef = useRef();
  const values = useRef({});

  const finishForm = useCallback(() => {
    formRef.current.handleSave();
  }, []);

  const resetForm = useCallback(() => {
    formRef.current.handleReset();
  }, []);

  const submitRow = useCallback((index) => {
    formRef.current.handleSubmitRow(values.current, index);
  }, []);

  const setValues = useCallback(() => {
    formRef.current.handleSetValue(values.current);
  }, []);

  const handleChange = useCallback(
    ({ value, name }) => {
      values.current = { ...values.current, [name]: value };
    },
    [values]
  );

  const getValue = useCallback(
    (name) => {
      if (values.current[name]) return values.current[name];
      values.current = { ...values.current, [name]: undefined };
    },
    [values]
  );

  const getValues = useCallback(() => values.current, [values]);

  return {
    form: {
      formRef,
      values,
      finishForm,
      resetForm,
      submitRow,
      setValues,
      handleChange,
      getValues,
      getValue,
    },
  };
};
