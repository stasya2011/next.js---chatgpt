import React, {  useState } from 'react';
import styles from "./PromptForm.module.scss";
import { Button, Form, Input } from 'antd';

const PromptForm = ({onSubmitForm}) => {
    const [prompt, setPrompt] = useState("");


    return (
        <Form className={styles.form} onFinish={() => {
            if(!prompt) {
                return;
            }
            onSubmitForm(prompt);
            setPrompt("");
        }} >
            <Form.Item
            label="Question"
            name="chat-gpt"
            >
                <Input value={prompt} onChange={e => setPrompt(e.target.value)} />
            </Form.Item>
            
            {/* <label>Question</label>
            <input className={styles.input} type="text" value={prompt} onChange={e => setPrompt(e.target.value)} /> */}
            <Button type="primary" htmlType="submit">
                    Submit
            </Button>
        </Form>
    );
};

export default PromptForm;
