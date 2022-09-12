import { useState, useCallback, useRef } from 'react';
import { isEqual } from 'lodash';

export const useForm = () => {
  const formRef = useRef();
  const values = useRef({});
  const rows = useRef({});

  const handler = useRef();

  const setHandler = useCallback(
    (func) => {
      handler.current = func;
    },
    [handler]
  );

  const [rowsValidations, setRowsValidations] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

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
    ({ value, name, index }) => {
      handler.current({ value, name, index });
      const updatedItem = { ...values.current[index], [name]: value };
      values.current = { ...values.current, [index]: updatedItem };
      const rowValues = values.current[index];
      const isRowValid = Object.entries(rowValues).reduce((acc, [key, value]) => {
        return acc && !!value;
      }, true);

      rows.current = { ...rows.current, [index]: isRowValid };
      if (isEqual(rowsValidations, rows.current)) return;
      setRowsValidations(rows.current);
      // const qwe = Object.values(rows.current).reduce((acc, value) => acc && !!value, true);
    },
    [values, rowsValidations, handler]
  );

  const getValue = useCallback(
    ({ index, name }) => {
      if (values.current?.[index]?.[name]) return values.current[index][name];
    },
    [values]
  );

  const registerField = useCallback(
    ({ index, name }) => {
      if (values.current?.[index]?.[name]) return;

      const newItem = values.current?.[index]
        ? { ...values.current[index], [name]: undefined }
        : { [name]: undefined };

      values.current = { ...values.current, [index]: newItem };
      rows.current = { ...rows.current, [index]: false };
    },
    [values]
  );

  const getValues = useCallback(
    () => ({ values: values.current, rowValidation: rows.current }),
    [values]
  );

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
      registerField,
      setHandler,
    },
  };
};
