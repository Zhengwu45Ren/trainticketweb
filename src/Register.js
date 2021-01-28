import React from 'react';
import './Register.css'
import './App.css'
import { message,Button } from 'antd';
import {sha1} from './sha1'

class Register extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userName:'',
            userMobile: '',
            passwd: '',
            password: '',
            identityCode: '',
            verifyCode: '',
            buttenText:'获取验证码',
            buttonStatus: false,
            response: []
        };
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    userRegister(){
        if (this.state.userMobile === '' || this.state.passwd === ''){
            message.error("手机号码或密码不能为空！")
            return;
        }
        if (this.state.identityCode === '' || this.state.userName === ''){
            message.error("用户名或身份证号不能为空！")
            return;
        }
        if (this.state.passwd !== this.state.password){
            message.error("两次输入的密码不一致！")
            return;
        }
        const data ={
            userName:this.state.userName,
            userMobile:this.state.userMobile,
            passwd:sha1(this.state.passwd),
            userIdentityCode:this.state.identityCode
        }
        fetch('http://www.chewingtogether.com:8085/user/register',{
            // post提交
            method:"POST",
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
                console.log(resdata)
                message.success("注册成功！")
                this.props.history.push('')
            }
        })
    }

    sendSMS(){
        let maxTime = 60;
        const data ={
            userMobile:this.state.userMobile
        }
        this.timer = setInterval(() => {
            if (maxTime > 0) {
                --maxTime
                this.setState({
                    btnText: '重新获取' + maxTime,
                    btnBool: true
                })
            }
            else {
                this.setState({
                    btnText: '发送验证码',
                    btnBool: false
                })
            }
        }, 1000)
        fetch('http://www.chewingtogether.com:8085/verifyCode/get',{
            // post提交
            method:"POST",
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
                console.log(resdata)
                message.success("验证码发送成功！")
                this.props.history.push('')
            }
        })
    }

    render(){
        return(
            <div className = "Register-div">
            <header className = "App-header">
            <h1 className = "Register-headline">一起嚼嚼用户注册</h1>
            </header>

            <div className = "App-jump">
            <button onClick={() => this.props.history.push('')} className="btn-gradient yellow">返回首页</button>
            </div>

            <div className = "Register-form">
            <table border="0" className="Register">
                <tbody>
                <tr>
                    <td>手机号码:</td>
                    <td><input height="20" name="userMobile" onChange={this.handleChange}/></td>
                </tr>
                <tr>
                    <td>手机验证码</td>
                    <td><input style={{ width: '30%' }} name="verifyCode" onChange={this.handleChange}/><Button type="primary" onClick={()=>this.sendSMS()} disable={this.state.buttonStatus}> {this.state.buttenText} </Button></td>
                </tr>
                <tr>
                    <td>密码:</td>
                    <td><input height="20" type="password" name="passwd" onChange={this.handleChange}/></td>
                </tr>
                <tr>
                    <td>确认密码:</td>
                    <td><input height="20" type="password" name="password" onChange={this.handleChange}/></td>
                </tr>
                <tr>
                    <td>用户名:</td>
                    <td><input height="20" name="userName" onChange={this.handleChange}/></td>
                </tr>
                <tr>
                    <td>身份证号:</td>
                    <td><input height="20" name="identityCode" onChange={this.handleChange}/></td>
                </tr>
                <tr>
                    <td><button className="btn-gradient red">取消</button></td>
                    <td><button className="btn-gradient green" onClick={()=>this.userRegister()}>提交</button></td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
        )
    }
}

export default Register;