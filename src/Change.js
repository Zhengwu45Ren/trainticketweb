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
            type: '',
            baseUserName:this.props.location.data.userName,
            baseUserMobile: this.props.location.data.userMobile,
            baseIdentityCode: this.props.location.data.userIdentityCode,
            response: []
        };
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
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
            <span>用户名:{this.state.baseUserName}
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            <Button type="primary" onClick={(event)=>{this.showModal();this.setState({type: 'userName'});}}> 修改 </Button>
            </span>
            <span>手机号码:{this.state.baseUserMobile}
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            <Button type="primary" onClick={(event)=>{this.showModal();this.setState({type: 'userMobile'});}}> 修改 </Button>
            </span>
            <span>身份证号:{this.state.baseIdentityCode}
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            <Button type="primary" onClick={(event)=>{this.showModal();this.setState({type: 'identityCode'});}}> 修改 </Button>
            </span>
            </div>
            </div>
            <Modal title="修改信息" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
            <div className = "Change-modal">
            <p>请输入新的{this.state.type}</p>
            <input height="20" name = {this.state.type} onChange={this.handleChange}/>
            </div>
            </Modal>
        </>
    )
    }
}

export default Main;