import './App.css';
import { Divider, List, Typography, Card, Row, Col, Button, Form, Input } from 'antd';
import { useStore } from './useStore';
import { MInput } from './input';
import StoreProvider from './context';
import { useEffect } from 'react';

const dataSource = [
  { text: 'Racing car sprays burning fuel into crowd.' },
  { text: 'Japanese princess to wed commoner.' },
  { text: 'Australian walks 100km after outback crash.' },
  { text: 'Man charged over missing wedding girl.' },
  { text: 'Los Angeles battles huge wildfires.' },
];

const App = () => {
  const { data, addRow, handleChange, resetData, deleteRow, updateRow, form, formRef } = useStore({
    dataSource,
    defaultPropertiesValues: { isClosed: false },
  });

  const handleAddClick = () => addRow();

  const handleSaveClick = () => {
    formRef.current.handleSave();
  };

  const handleResetClick = () => {
    formRef.current.handleReset();

  }

  useEffect(() => {
    addRow();
  }, []);

  return (
    <Card>
      <Row>
        <Col className='button-wrapper' span={12} offset={6}>
          <Button onClick={handleAddClick} type='primary'>
            Add
          </Button>
          <div>
            <Button onClick={handleResetClick} type='primary'>
              Reset
            </Button>
            <Button onClick={handleSaveClick} type='primary'>
              Save
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={12} offset={6}>
          <StoreProvider ref={formRef} form={form}>
            <List
              size='small'
              bordered
              dataSource={data}
              renderItem={(item) => {
                if (item.isClosed) return <List.Item>{item.text}</List.Item>;
                const field = 'text';
                const name = `${item.index}_${field}`;
                const props = { name };

                const hanldeDeleteRow = () => {
                  deleteRow(item.index);
                };

                return (
                  <Col className='input_wrapper'>
                    <MInput {...props} />
                    <div>
                      <button
                        onClick={hanldeDeleteRow}
                        className='button button__delete'
                        color='#7cb305'
                      >
                        Delete
                      </button>
                      <button className='button button__add' color='#7cb305'>
                        Save
                      </button>
                    </div>
                  </Col>
                );
              }}
            />
          </StoreProvider>
        </Col>
      </Row>
    </Card>
  );
};

export default App;
