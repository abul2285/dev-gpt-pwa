import Head from 'next/head';
import { useState } from 'react';
import { Button, Col, Form, Input, Layout, Row, Tag, Typography } from 'antd';

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
          <Row justify='center' style={{ padding: 24 }}>
            <Col>
              <Tag color='#87d068' style={{ margin: '12px' }}>
                {predefinedCommands[tag].title}
              </Tag>
            </Col>

            {description ? (
              <Col span={24}>
                <pre style={{ whiteSpace: 'pre-wrap' }}>{description}</pre>
              </Col>
            ) : (
              <Col span={24}>
                <Form.Item size='small'>
                  <Input.TextArea
                    disabled={loading}
                    rows={30}
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                  />
                </Form.Item>
              </Col>
            )}

            <Col span={24}>
              <Form.Item>
                <Button
                  block
                  type='primary'
                  htmlType='submit'
                  disabled={loading}
                  loading={loading}
                >
                  {description
                    ? 'Another Try'
                    : loading
                    ? 'Generating'
                    : 'Generate'}
                </Button>
                <Typography.Text
                  success
                  strong
                  style={{ marginTop: 8, display: 'block' }}
                >
                  {loading ? 'Please wait, Dev GPT is thinking...' : ''}
                </Typography.Text>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Layout>
    </>
  );
}
