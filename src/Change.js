import React, {useState} from 'react';
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';
import './Change.css'
import './App.css'

class Main extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            userName:this.props.location.data.userName,
            userMobile: this.props.location.data.userMobile,
            identityCode: this.props.location.data.userIdentityCode,
            response: []
        };
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render(){
        return(
            <>
            <div className = "Change-div">
            <header className = "Change-header">
            <a className = "Change-headline">个人主页</a>
            </header>

            <div className = "Change-jump">
            <button onClick={() => this.props.history.push({pathname:'/Main', data : this.props.location.data})} className="btn-gradient red">返回主页</button>
            </div>

            <div className = "Change-info">
            <p>用户名:{this.state.userName}</p>
        <Button type="primary" onClick={this.showModal}> Open Modal </Button><br/>
            <p>手机号码:{this.state.userMobile}</p>
            <p>身份证号:{this.state.identityCode}</p>
            </div>
            </div>
        <Modal
        title="Basic Modal"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel} >
            <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        </Modal>
        </>
    )
    }
}

export default Main;