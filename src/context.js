import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  createRef,
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

  const getRefs = useCallback(
    (name) => {
      console.log(refs.current);
      // return refs.current[name];
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
    () => ({ form: { ...form, addField, removeField, refs, setRef, getRefs } }),
    [addField, form, removeField, refs, setRef, getRefs]
  );

  return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>;
});

export default memo(StoreProvider);
