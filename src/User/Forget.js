import React from 'react';
import './Register.css'
import './App.css'
import { message,Button } from 'antd';
import {sha1} from '../Utils/sha1'
import cookie from 'react-cookies'

class Forget extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userMobile: '',
            passwd: '',
            password: '',
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

    sendSMS(){
        if(this.state.userMobile === ''){
            message.error('手机号码不能为空！');
            return;
        }
        var data = new FormData();
        let maxTime;
        data.append("userMobile", this.state.userMobile);
        if(cookie.load('sentInterval') !== undefined){
            maxTime = cookie.load('sentInterval');
        }else {
            maxTime = 60;
            cookie.save('sentInterval', maxTime);
        }
        this.timer = setInterval(() => {
            maxTime = cookie.load('sentInterval');
            if (maxTime > 0) {
                --maxTime
                this.setState({
                    buttenText: '重新获取(' + maxTime + ')',
                    buttonStatus: true
                })
                cookie.save('sentInterval', maxTime);
            }
            else {
                this.setState({
                    buttenText: '发送验证码',
                    buttonStatus: false
                })
                cookie.remove('sentInterval');
            }
        }, 1000)
        fetch('http://www.chewingtogether.com:8085/user/verifyCode/get',{
            // post提交
            method:"POST",
            body:data})
            .then(res => {
                return res.json()
            }).then(resdata => {
            if(resdata.hasOwnProperty("message")) {
                alert(resdata.message)
            }
            else{
                console.log(resdata)
                message.success("验证码已发送")
            }
        })
    }

    componentDidMount(){
        if(cookie.load('sentInterval') !== undefined){
            let maxTime = cookie.load('sentInterval');
            this.setState({
                buttenText: '重新获取(' + maxTime + ')',
                buttonStatus: true
            })
            this.timer = setInterval(() => {
                maxTime = cookie.load('sentInterval');
                if (maxTime > 0) {
                    --maxTime
                    this.setState({
                        buttenText: '重新获取(' + maxTime + ')',
                        buttonStatus: true
                    })
                    cookie.save('sentInterval', maxTime);
                }
                else {
                    this.setState({
                        buttenText: '发送验证码',
                        buttonStatus: false
                    })
                    cookie.remove('sentInterval');
                }
            }, 1000)
        }
    }
    
    userForget(){
        if (this.state.userMobile === '' || this.state.verifyCode === ''){
            message.error("手机号码或验证码不能为空！")
            return;
        }
        if (this.state.passwd !== this.state.password){
            message.error("两次输入的密码不一致！")
            return;
        }const data ={
            userName:this.state.userName,
            userMobile:this.state.userMobile,
            newPasswd:sha1(this.state.passwd),
            verifyCode:this.state.verifyCode
        }
        fetch('http://www.chewingtogether.com:8085/user/forget',{
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
                message.success("密码已更换为新密码！")
                this.props.history.push('')
            }
        })
    }
    
    render(){
        return(
            <div className="Register-forget">
            <header className = "App-header">
            <h1 className = "Register-headline">一起嚼嚼忘记密码</h1>
            </header>

            <div className = "App-jump">
            <button onClick={() => this.props.history.push('')} className="btn-gradient red">返回首页</button>
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
                            <td><input style={{ width: '30%' }} name="verifyCode" onChange={this.handleChange}/><Button type="primary" onClick={()=>this.sendSMS()} disabled={this.state.buttonStatus}> {this.state.buttenText} </Button></td>
                        </tr>
                        <tr>
                            <td>新密码:</td>
                            <td><input height="20" type="password" name="passwd" onChange={this.handleChange}/></td>
                        </tr>
                        <tr>
                            <td>确认新密码:</td>
                            <td><input height="20" type="password" name="password" onChange={this.handleChange}/></td>
                        </tr>
                        <tr>
                            <td><button className="btn-gradient red">取消</button></td>
                            <td><button className="btn-gradient green" onClick={()=>this.userForget()}>提交</button></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
        </div>
        )
    }
}

export default Forget;