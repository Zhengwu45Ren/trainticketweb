import React from 'react';
import { Modal, Button,message } from 'antd';
import 'antd/dist/antd.css';
import './Change.css'
import './App.css'
import {sha1} from './sha1'

class Main extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            passwdVisible: false,
            type: '',
            oldPasswd:'',
            passwd:'',
            passwdagain:'',
            userName: this.props.location.data.userName,
            userMobile:this.props.location.data.userMobile,
            identityCode:this.props.location.data.userIdentityCode,
            baseUserName:this.props.location.data.userName,
            baseUserMobile: this.props.location.data.userMobile,
            baseIdentityCode: this.props.location.data.userIdentityCode,
            response: []
        };
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
        this.setState({changed: e.target.value})
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    showPasswdModal = () => {
        this.setState({
            passwdVisible: true,
        });
    };

    handleOk = e => {
        this.setState({
            visible: false,
        });
        if (this.state.changed === ''){
            message.error("修改信息不能为空！")
            return;
        }
        const data ={
            userName:this.state.userName,
            userMobile: this.state.userMobile,
            userIdentityCode: this.state.identityCode
        }
        fetch('http://www.chewingtogether.com:8085/user/change/info',{
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
                console.log(resdata)
                message.success("修改成功");
                this.props.history.push({pathname:'Main', data: resdata.user})
            }
        })
    };

    handlePasswdOk = e => {
        this.setState({
            passwdVisible: false,
        });
        if (this.state.passwd !== this.state.passwdagain){
            message.error("两次密码不一致！")
            return;
        }
        const passwd ={
            oldPasswd:sha1(this.state.oldPasswd),
            newPasswd: sha1(this.state.passwd)
        }
        fetch('http://www.chewingtogether.com:8085/user/change/passwd',{
            // post提交
            method:"POST",
            credentials:"include",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(passwd)})
            .then(res => {
                return res.json()
            }).then(resdata => {
            if(resdata.hasOwnProperty("message")) {
                alert(resdata.message)
            }
            else{
                message.success("修改成功");
                this.props.history.push({pathname:'Main', data: resdata.user})
            }
        })
    };

    handleCancel = e => {
        this.setState({
            visible: false
        });
        this.setState({
            passwdVisible: false
        });
    };

    render(){
        return(
            <>
            <div className = "Change-div">
            <header className = "Change-header">
            <h1 className = "Change-headline">个人主页</h1>
            </header>

            <div className = "Change-jump">
            <button onClick={() => this.props.history.push({pathname:'/Main', data : this.props.location.data})} className="btn-gradient red">返回主页</button>
            </div>

            <div className = "Change-info">
            <table border = "0" className = "Change">
            <tr>
            <td> 用户名:{this.state.baseUserName}</td>
            <td><Button type="primary" onClick={(event)=>{this.showModal();this.setState({type: 'userName'});}}> 修改 </Button></td>
            </tr>
            <tr>
            <td>手机号码:{this.state.baseUserMobile}</td>
            <td><Button type="primary" onClick={(event)=>{this.showModal();this.setState({type: 'userMobile'});}}> 修改 </Button></td>
            </tr>
            <tr>
            <td>身份证号:{this.state.baseIdentityCode}</td>
            <td><Button type="primary" onClick={(event)=>{this.showModal();this.setState({type: 'identityCode'});}}> 修改 </Button></td>
            </tr>
            <tr>
            <td colspan = "2"><Button type="primary" onClick={()=>this.showPasswdModal()}> 修改密码 </Button></td>
            </tr>
            </table>
            </div>
            </div>
            <Modal title="修改信息" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
            <div className = "Change-modal">
            <p>请输入新的{this.state.type}</p>
            <input height="20" name = {this.state.type} onChange={this.handleChange}/>
            </div>
            </Modal>
            <Modal title="修改密码" visible={this.state.passwdVisible} onOk={this.handlePasswdOk} onCancel={this.handleCancel}>
            <div className = "Change-modal">
            <p>请输入旧密码</p>
            <input type="password" height="20" name = "oldPasswd" onChange={this.handleChange}/>
            <p>请输入新密码</p>
            <input type="password" height="20" name = "passwd" onChange={this.handleChange}/>
            <p>请确认新密码</p>
            <input type="password" height="20" name = "passwdagain" onChange={this.handleChange}/>
            </div>
            </Modal>
        </>
    )
    }
}

export default Main;