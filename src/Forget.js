import React from 'react';
import './Register.css'
import './App.css'
import { message } from 'antd';
import {sha1} from './sha1'

class Forget extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userMobile: '',
            passwd: '',
            password: '',
            identityCode: '',
            response: []
        };
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }
    
    userForget(){
        if (this.state.userMobile === '' || this.state.identityCode === ''){
            message.error("手机号码或身份证号不能为空！")
            return;
        }
        if (this.state.passwd !== this.state.password){
            message.error("两次输入的密码不一致！")
            return;
        }const data ={
            userName:this.state.userName,
            userMobile:this.state.userMobile,
            newPasswd:sha1(this.state.passwd),
            userIdentityCode:this.state.identityCode
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
            <a className = "Register-headline">火车订票网站</a>
            </header>

            <div className = "App-jump">
            <button onClick={() => this.props.history.push('')} className="btn-gradient red">返回首页</button>
            </div>

            <div className = "App-form">
            <h1>忘记密码</h1>
            手机号码:<br/>
            <input height="20" name="userMobile" onChange={this.handleChange}/><br/>
            身份证号:<br/>
            <input height="20" name="identityCode" onChange={this.handleChange}/><br/>
            新密码:<br/>
            <input height="20" type="password" name="passwd" onChange={this.handleChange}/><br/>
            确认新密码:<br/>
            <input height="20" type="password" name="password" onChange={this.handleChange}/><br/>
            <button className="btn-gradient red">重置</button> 
            <button className="btn-gradient green" onClick={()=>this.userForget()}>提交</button>
            </div>
        </div>
        )
    }
}

export default Forget;