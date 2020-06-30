import React from 'react';
import logo from '../public/img/Index.jpg';
import './App.css';
import './buttonstyle.css'

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
            alert("用户名或密码不能为空！")
            return;
        }
        const data ={
            userMobile:this.state.userMobile,
            passwd:this.state.passwd
        }
        fetch('http://www.chewingtogether.com:8085/user/login',{
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
                    this.props.history.push('Main')
                }
            })
    }

    render() {
        return (
            <div className = "App-div" >

            <header className = "App-header">
            <a className = "App-headline">火车订票网站主页</a>
            </header>

            <div className = "App-jump">
            <button onClick={() => this.props.history.push('Register')} className="btn-gradient blue">点我注册</button>
            <br/>
            <button onClick={() => this.props.history.push('Forget')} className="btn-gradient yellow">忘记密码</button>
            </div>

            <div className = "App-form">
            <h1>登陆入口</h1>
            手机号码:<input height="20" name = "userMobile" onChange={this.handleChange}/><br/>
            账户密码:<input type="password" height="20" name = "passwd" onChange={this.handleChange}/><br/>
            <input type="submit" value="提交" className="btn-gradient cyan" onClick={()=>this.userlogin()}/>
            <input type="reset" value="重置" className="btn-gradient red"/>
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
