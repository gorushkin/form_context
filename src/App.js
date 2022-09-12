import './App.css';
import { Divider, List, Typography, Card, Row, Col, Button, Form, Input } from 'antd';
import { useStore } from './useStore';
import { MInput } from './input';
import StoreProvider from './context';
import { useEffect } from 'react';
import { useForm } from './useForm';

const dataSource = [
  { text: 'Racing car sprays burning fuel into crowd.' },
  { text: 'Japanese princess to wed commoner.' },
  { text: 'Australian walks 100km after outback crash.' },
  { text: 'Man charged over missing wedding girl.' },
  { text: 'Los Angeles battles huge wildfires.' },
];

const App = () => {
  const { data, addRow, deleteRow } = useStore({
    dataSource,
    defaultPropertiesValues: { isClosed: false },
  });

  const { form } = useForm();

  const handleAddClick = () => addRow();

  const handleReset = (index) => {
    form.resetForm();
  };

  const handleSubmitForm = (values) => {
    // console.log('value: ', values);
  };

  const handleClickSave = (index) => {
    console.log(index);
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
            <Button onClick={handleReset} type='primary'>
              Reset
            </Button>
            <Button form='form' htmlType='submit' type='primary'>
              Save
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={12} offset={6}>
          <StoreProvider form={form} onFinish={handleSubmitForm}>
            <List
              size='small'
              bordered
              dataSource={data}
              renderItem={(item) => {
                if (item.isClosed) return <List.Item>{item.text}</List.Item>;

                return (
                  <Col className='input_wrapper'>
                    <MInput name='text' rowIndex={item.index} />
                    <MInput name='description' rowIndex={item.index} />
                    <div>
                      <button
                        onClick={() => deleteRow(item.index)}
                        className='button button__delete'
                        color='#7cb305'
                        type='button'
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleClickSave(item.index)}
                        className='button button__add'
                        color='#7cb305'
                        type='button'
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
