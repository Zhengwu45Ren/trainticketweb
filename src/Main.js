import React from 'react';
import './Main.css'
import './App.css'

class Main extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userName:this.props.location.data.userName,
            userMobile: this.props.location.data.userMobile,
            identityCode: this.props.location.data.userIdentityCode,
            response: []
        };
    }

    getPartt(){
        alert(this.state.userName)
    }

    render(){
        return(
            <div className = "Main-div">
            <header className = "Main-header">
            <a className = "Main-headline">个人主页</a>
            </header>

            <div className = "Main-jump">
            <button onClick={() => this.props.history.push({pathname : '/Change', data : this.props.location.data})} className="btn-gradient cyan">修改信息</button><br/>
            <button onClick={() => this.props.history.push('')} className="btn-gradient red">退出登录</button>
            </div>

            <div className = "Main-info">
            用户名:{this.state.userName}<br/>
            手机号码:{this.state.userMobile}<br/>
            身份证号:{this.state.identityCode}<br/>
            </div>
        </div>
        )
    }
}

export default Main;