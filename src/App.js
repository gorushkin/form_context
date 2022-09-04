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
  const {
    data,
    addRow,
    handleChange,
    resetData,
    deleteRow,
    updateRow,
    form,
    formRef,
    submitRow,
    finishForm,
    resetForm,
  } = useStore({
    dataSource,
    defaultPropertiesValues: { isClosed: false },
  });

  const handleAddClick = () => addRow();

  const handleClickSave = () => {
    submitRow();
  };

  const handleSubmitForm = (values) => {
    console.log('value: ', values);
  };

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
            <Button onClick={resetForm} type='primary'>
              Reset
            </Button>
            <Button form='form' htmlType="submit" type='primary'>
              Save
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={12} offset={6}>
          <StoreProvider onFinish={handleSubmitForm} form={form}>
            <List
              size='small'
              bordered
              dataSource={data}
              renderItem={(item) => {
                if (item.isClosed) return <List.Item>{item.text}</List.Item>;

                return (
                  <Col className='input_wrapper'>
                    <MInput name='text' rowIndex={item.index} />
                    <div>
                      <button
                        onClick={() => deleteRow(item.index)}
                        className='button button__delete'
                        color='#7cb305'
                      >
                        Delete
                      </button>
                      <button
                        onClick={handleClickSave}
                        className='button button__add'
                        color='#7cb305'
                      >
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
