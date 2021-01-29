import React from 'react';
import './App.css';
import './buttonstyle.css'
import { message,Input } from 'antd';
import {sha1} from './sha1'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userMobile: '',
            passwd: '',
            response: []
        };
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    userlogin(){
        if (this.state.userMobile === '' || this.state.passwd === ''){
            message.error("手机号码或密码不能为空！")
            return;
        }
        const data ={
            userMobile:this.state.userMobile,
            passwd:sha1(this.state.passwd)
        }
        fetch('http://www.chewingtogether.com:8085/user/login',{
            // post提交
            method:"POST",
            credentials:"include",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(data)})
            .then(res => {
                return res.json()
            }).then(resdata => {
                if(resdata.hasOwnProperty("message")) {
                    alert(resdata.message)
                }
                else{
                    message.success("登录成功");
                    this.props.history.push({pathname:'Main', data: resdata.user})
                }
            })
    }

    onKeyPress = (e) =>{
        if(e.which === 13) {
            this.userlogin()
        }
    }

    render() {
        return (
            <div className = "App-div" >

            <header className = "App-header">
            <h1 className = "App-headline">一起嚼嚼订票主页</h1>
            </header>

            <div className = "App-jump">
            <button onClick={() => this.props.history.push('Register')} className="btn-gradient blue">点我注册</button>
            <br/>
            <button onClick={() => this.props.history.push('Forget')} className="btn-gradient yellow">忘记密码</button>
            </div>

            <div className = "App-form">
            <h1>登陆入口</h1>
            手机号码:<input style={{ width: '15%' }} name = "userMobile" onChange={this.handleChange} onKeyPress={this.onKeyPress}/><br/>
            账户密码:
                <Input.Password name = "passwd" onChange={this.handleChange} onKeyPress={this.onKeyPress} style={{ width: '15%' }}
                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                /><br/>
            <button className="btn-gradient red">重置</button>
            <button className="btn-gradient cyan" onClick={()=>this.userlogin()}>提交</button>
            </div>

            <footer className = "App-footer">
            <a href='http://beian.miit.gov.cn'>京ICP备19033483号</a>
            </footer>

            <div className = "App-icon">
            <p><strong>如有问题，请咨询公众号</strong></p>
            <img src={require("../public/img/gongzhonghao.png")} width="192" height="192"/>
            </div>

            </div>
        );
    }
}

export default Login;
