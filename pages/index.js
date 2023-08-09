import Head from 'next/head';
import { useRef, useState } from 'react';
import {
  Tag,
  Col,
  Row,
  Form,
  Input,
  Button,
  Divider,
  Layout,
  Typography,
} from 'antd';

import * as commands from '@/commands';

const predefinedCommands = {
  '/improveCode': {
    title: 'Improve Code',
    command: 'improveCode',
  },
  '/dailyReport': {
    title: 'Daily Report',
    command: 'dailyReport',
  },
};

export default function Home() {
  const inputRef = useRef();
  const [tag, setTag] = useState('/dailyReport');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleInputKeyDown = async (event) => {
    const userInput = event.target.value.trim();
    const tag = userInput.split(' ')[0];
    if (event.key === 'Enter') {
      if (predefinedCommands[tag]) {
        event.preventDefault();
        setInput('');
        setTag(tag);
      }
    }
  };

  const handleSubmit = async () => {
    if (description) {
      setInput('');
      inputRef.current.focus();
      return setDescription(null);
    }
    const command = commands[predefinedCommands[tag].command];

    if (!command) return;

    setLoading(true);
    const response = await command({ userInput: input });
    setLoading(false);
    setDescription(response);
  };

  return (
    <>
      <Head>
        <title>Dev GPT</title>
        <meta name='description' content='Dev GPT response generator' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <Form onFinish={handleSubmit}>
          <Row
            justify='center'
            style={{ padding: '0 24px', textAlign: 'center' }}
          >
            <Col span={24}>
              <Tag color='#87d068' style={{ margin: '12px' }}>
                {predefinedCommands[tag].title}
              </Tag>
            </Col>

            <Col xs={description ? 0 : 24} md={10} lg={8}>
              <Form.Item size='small'>
                <Input.TextArea
                  ref={inputRef}
                  disabled={loading}
                  rows={28}
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                />
              </Form.Item>
            </Col>
            <Col xs={0} md={2} lg={4} />
            <Col xs={description ? 24 : 0} md={10} lg={8}>
              <Divider plain>Response</Divider>
              <Typography.Text style={{ marginBottom: 24 }}>
                {description}
              </Typography.Text>
              <br />
              <br />
            </Col>

            <Col span={24}>
              <Form.Item>
                <Typography.Text
                  success
                  strong
                  style={{ marginTop: 8, display: 'block' }}
                >
                  {loading ? 'Please wait, Dev GPT is thinking...' : ''}
                </Typography.Text>
                <Button
                  type='primary'
                  htmlType='submit'
                  disabled={loading}
                  loading={loading}
                >
                  {description
                    ? `New ${predefinedCommands[tag].title}`
                    : loading
                    ? 'Generating...'
                    : 'Generate'}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Layout>
    </>
  );
}
