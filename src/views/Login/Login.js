import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Button, Row, Input, Form } from "antd";
import jwt_decode from "jwt-decode";
import { connect } from "react-redux";

import { getUrl, requests } from "../../globals/requests";
import userUtil from "../../utils/userUtil";
import logo from "../../assets/logos/icon_only_small-removebg.png";
import "./index.css";
import helpers from "../../utils/helpers";
import { getLatestContract } from "../../state/actions/contractActions";
import { getUserOrganisation } from "../../state/actions/organisationActions";

const FormItem = Form.Item;

function Login(props) {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const url = `${getUrl("users")}/loginAdmin`;
      const response = await requests.post(url, formValues);
      const token = response.data;
      await userUtil.setUserToken(token);
      const payload = jwt_decode(token);
      const contract = await props.getLatestContract(payload.organisation);
      await props.getUserOrganisation(payload._id);
      userUtil.setLatestContract(contract);
      setLoading(false);
      history.push("/dashboard");
    } catch (e) {
      helpers.displayMessage(e);
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  return (
    <Fragment>
      <div className="form">
        <div className="logo">
          <img alt="logo" src={logo} />
          <span>Chapperone</span>
        </div>
        <Form onFinish={handleLogin}>
          <FormItem name="username" rules={[{ required: true }]} hasFeedback>
            <Input
              name="username"
              value={formValues.email}
              placeholder="Username"
              onChange={handleChange}
            />
          </FormItem>
          <FormItem name="password" rules={[{ required: true }]} hasFeedback>
            <Input
              type="password"
              name="password"
              value={formValues.password}
              placeholder="Password"
              onChange={handleChange}
              password
            />
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

export default connect(null, { getLatestContract, getUserOrganisation })(Login);
