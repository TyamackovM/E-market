import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../../store/user/actionCreators";
import style from "../Registr/Registr.module.css";
import { changeBooleanStateAC } from "../../store/modal/actionCreators";

const LoginPage = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [emailTrue, setEmailTrue] = useState(false);
  const [passwordTrue, setPasswordTrue] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputHandler = async (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
      credentials: "include",
    });
    const toJson = await res.json();
    if (toJson === "PasswordNotDone") {
      setPasswordTrue(true);
      setTimeout(() => {
        setPasswordTrue(false)
      }, 3000)
      // alert("Incorrect password");
    } 
    else if (toJson === "EmailNotDone") {
      setEmailTrue(true);
      setTimeout(() => {
        setEmailTrue(false)
      }, 3000)
      // alert("Incorrect email");
    } 
    else {
      dispatch(getUser(toJson));
      // dispatch(changeBooleanStateAC(false))
      navigate("/");
    }
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input placeholder="Email"
            name="email"
            onChange={inputHandler}
            style={{ width: "300px", borderRadius: "5px" }}
          />
        </Form.Item>

        <Form.Item

          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            placeholder="Password"
            name="password"
            onChange={inputHandler}
            style={{ width: "300px", borderRadius: "5px" }}
          />
        </Form.Item>
        {passwordTrue ? (
          <div style={{display: 'flex', justifyContent: 'center', color: 'red'}}>Incorrect password</div>
        ) : (<></>)}
        {emailTrue ? (
          <div style={{display: 'flex', justifyContent: 'center', color: 'red'}}>Incorrect email</div>
        ) : (<></>)}
      </div>
      <Button
        className={style.btnReg}
        onClick={handleLogin}
        style={{ width: "300px", height: "40px" }}
        type="primary"
        shape="round"
        htmlType="submit"
      >
        Sign in
      </Button>
    </Form>
  );
};
export default LoginPage;
