import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Button, Row, Input, Form } from "antd";
import logo from "../../assets/logos/icon_only_small-removebg.png";
import "./index.css";
// import { GlobalFooter } from 'components'

const FormItem = Form.Item;

function Login() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  function handleLogin() {
    setLoading(true);
    setTimeout(() => {
      history.push("/dashboard");
    }, 1000);
  }

  function handleOk() {}

  return (
    <Fragment>
      <div className="form">
        <div className="logo">
          <img alt="logo" src={logo} />
          <span>Chapperone</span>
        </div>
        <Form onFinish={handleOk}>
          <FormItem name="username" rules={[{ required: true }]} hasFeedback>
            <Input placeholder="Username" />
          </FormItem>
          <FormItem name="password" rules={[{ required: true }]} hasFeedback>
            <Input type="password" placeholder="Password" />
          </FormItem>
          <Row>
            <Button
              onClick={handleLogin}
              type="primary"
              htmlType="submit"
              loading={loading}
              // loading={loading.effects.login}
            >
              Sign in
            </Button>
            <p>
              <span className="margin-right">Username ：guest</span>
              <span>Password ：guest</span>
            </p>
          </Row>
        </Form>
      </div>
    </Fragment>
  );
}

Login.propTypes = {
  form: PropTypes.object,
  // dispatch: PropTypes.func,
  // loading: PropTypes.object,
};

export default Login;
