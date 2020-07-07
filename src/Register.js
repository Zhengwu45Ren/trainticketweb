import React from 'react';
import './Register.css'
import './App.css'
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
            response: []
        };
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    userRegister(){
        if (this.state.userMobile === '' || this.state.passwd === ''){
            alert("手机号码或密码不能为空！")
            return;
        }
        if (this.state.identityCode === '' || this.state.userName === ''){
            alert("个人信息不能为空！")
            return;
        }
        if (this.state.passwd !== this.state.password){
            alert("两次输入的密码不一致！")
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
                alert("注册成功！")
                this.props.history.push('')
            }
        })
    }

    render(){
        return(
            <div className = "Register-div">
            <header className = "App-header">
            <a className = "Register-headline">火车订票网站用户注册</a>
            </header>

            <div className = "App-jump">
            <button onClick={() => this.props.history.push('')} class="btn-gradient red large">返回首页</button>
            </div>

            <div className = "App-form">
            <h1>用户注册</h1>
            用户名:<br/>
            <input height="20" name="userName" onChange={this.handleChange}/><br/>
            手机号码:<br/>
            <input height="20" name="userMobile" onChange={this.handleChange}/><br/>
            密码:<br/>
            <input height="20" type="password" name="passwd" onChange={this.handleChange}/><br/>
            确认密码:<br/>
            <input height="20" type="password" name="password" onChange={this.handleChange}/><br/>
            身份证号:<br/>
            <input height="20" name="identityCode" onChange={this.handleChange}/><br/>
            <input value="提交" class="btn-gradient green" onClick={()=>this.userRegister()}/>
            <input type="reset" value="重置" className="btn-gradient red"/>
            </div>

            </div>
        )
    }
}

export default Register;