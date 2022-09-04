import { useEffect, useState, useCallback, useRef } from 'react';
import { uniqueId } from 'lodash';

export const useStore = ({ dataSource, numberFields = [], defaultPropertiesValues = {} }) => {
  const [data, setData] = useState([]);

  const formRef = useRef();

  const addRow = useCallback(() => {
    setData((state) => [{ isEditable: true, index: uniqueId(), ...defaultPropertiesValues }, ...state]);
  }, [defaultPropertiesValues]);

  const resetData = useCallback(() => setData([]), []);

  const deleteRow = useCallback((index) => {
    setData((state) => state.filter((item) => item.index !== index));
  }, []);

  const updateRow = useCallback((index, props) => {
    setData((state) => state.map((item) => (item.index === index ? { ...item, ...props } : item)));
  }, []);

  const handleChange = useCallback(({ value, name }) => {
    console.log('name: ', name);
    console.log('value: ', value);
  }, []);

  useEffect(() => {
    if (!dataSource) return;

    setData((state) => {
      const ids = state.map(({ id }) => id);
      const filteredData = dataSource
        .filter((item) => !ids.includes(item.id))
        .map((item) => ({ ...item, index: uniqueId(), isClosed: true }));
      return [...state, ...filteredData];
    });
  }, [dataSource]);

  return {
    data,
    addRow,
    handleChange,
    resetData,
    deleteRow,
    updateRow,
    formRef,
    form: {
      data,
      addRow,
      handleChange,
      resetData,
      deleteRow,
      updateRow,
    },
  };
};
