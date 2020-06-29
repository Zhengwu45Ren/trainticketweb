import React from 'react';
import logo from '../public/img/Index.jpg';
import { Link,Router,Route } from 'react-router-dom';
import './App.css';
import './buttonstyle.css'

class Login extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className = "App-div" >

            <header className = "App-header">
            <a className = "App-headline">火车订票网站主页</a>
            </header>

            <div className = "App-jump">
            <button onClick={() => this.props.history.push('Register')} class="btn-gradient blue">点我注册</button>
            <br/>
            <button class="btn-gradient yellow">忘记密码</button>
            </div>

            <div className = "App-form">
            <h1>登陆入口</h1>
            姓名:<input height="20" name="id" id="name"/><br/>
            密码:<input type="password" height="20" name="passwd" id="passwd"/><br/>
            <input type="submit" value="提交" class="btn-gradient cyan"/>
            <input type="reset" value="重置" class="btn-gradient red"/>
            </div>

            <footer className = "App-footer">
            <a>ICP备案号:</a>
            <a href='http://www.beian.miit.gov.cn'>京ICP备19033483号</a>
            </footer>

            </div>
        );
    }
}

export default Login;
