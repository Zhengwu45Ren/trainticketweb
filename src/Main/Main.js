import React from 'react';
import './Main.css'
import '../User/App.css'
import 'antd/dist/antd.css';
import cookie from 'react-cookies'
import {Divider, Table, Button, Modal, message, DatePicker, Select} from 'antd';
const { Option } = Select;

class Main extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userName:this.props.location.data.userName,
            userMobile: this.props.location.data.userMobile,
            identityCode: this.props.location.data.userIdentityCode,
            startStation:null,
            endStation:null,
            startTime:null,
            response: [],
            totalCount:0,
            ticketVOList:[],
            visible: false,
            passengerId:0
        };
        this.handleChange = this.handleChange.bind(this)
        this.onStartChange = this.onStartChange.bind(this)
        this.onEndChange = this.onEndChange.bind(this)
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    componentDidMount(){
        window.addEventListener("beforeunload",cookie.remove('sentInterval'));

        var baseUrl = 'http://www.chewingtogether.com:8085/passenger/searchTicket?';
        if(this.state.startStation !== null){
            baseUrl = baseUrl + 'startStation=' + this.state.startStation + '&'
        }
        if(this.state.endStation !== null){
            baseUrl = baseUrl + 'endStation=' + this.state.endStation + '&'
        }
        if(this.state.startTime !== null){
            baseUrl = baseUrl + 'startTime=' + this.state.startTime + '&'
        }
        fetch(baseUrl,{
            // post提交
            method:"GET",
            credentials:"include",
            headers:{
                "Content-type":"application/json"
            }})
            .then(res => {
                return res.json()
            }).then(resdata => {
            if(resdata.hasOwnProperty("message")) {
                alert(resdata.message)
            } else {
                this.setState({totalCount: resdata.totalCount})
                this.setState({ticketVOList: resdata.ticketVOList})
            }
        })
    }

    handleOk = () => {
        const id ={
            passengerId:this.state.passengerId
        }
        fetch('http://www.chewingtogether.com:8085/passenger/returnTicket',{
            // post提交
            method:"POST",
            credentials:"include",
            body:JSON.stringify(id),
            headers:{
                "Content-type":"application/json"
            }})
            .then(res => {
                return res.json()
            }).then(resdata => {
            if(resdata.hasOwnProperty("message")) {
                alert(resdata.message)
            } else {
                this.componentDidMount();
                this.handleCancel();
                message.success("退票成功");
            }
        })
    };

    handleCancel = () => {
        this.setState({
            visible: false
        });
    };

    handleChange(e) {
        if(e !== null) {
            this.setState({startTime: e._d.getTime()})
        }else {
            this.setState({startTime: null})
        }
    }

    onStartChange(e) {
        this.setState({startStation : e})
    }

    onEndChange(e) {
        this.setState({endStation : e})
    }

    render(){
        return(
            <>
            <div className = "Main-div">
            <header className = "Main-header">
            <h1 className = "Main-headline">个人主页</h1>
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

            <div className = "Main-buy">
            <button onClick={() => this.props.history.push('Buy')} className="btn-gradient purple">点我去买票</button>
            </div>

            <div className = "Main-divider">
            <Divider>已购买车票</Divider>
            </div>

            <div className = "Main-search">
                <table border="0">
                <tbody>
                <tr>
                    <td>出发地</td>
                    <td><Select
                        showSearch
                        style={{ width: 150 }}
                        placeholder="选择出发地"
                        onChange={this.onStartChange}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }>
                        <Option value="北京">北京</Option>
                        <Option value="上海">上海</Option>
                        <Option value="广州">广州</Option>
                    </Select></td>
                    <td>目的地</td>
                    <td><Select
                        showSearch
                        style={{ width: 150 }}
                        placeholder="选择目的地"
                        onChange={this.onEndChange}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }>
                        <Option value="北京">北京</Option>
                        <Option value="上海">上海</Option>
                        <Option value="广州">广州</Option>
                    </Select></td>
                    <td>发车日期</td>
                    <td><DatePicker onChange={this.handleChange}/></td>
                    <td><Button type="primary" onClick={()=> this.componentDidMount()}>搜索</Button></td>
                </tr>
                </tbody>
                </table>
            </div>
                
            <div className = "Main-ticket">
                <table border="3" className = "Main-content">
                    <thead>
                        <tr>
                            <th>车次号</th>
                            <th>座位号</th>
                            <th>始发站</th>
                            <th>终点站</th>
                            <th>发车时间</th>
                            <th>预计到达时间</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.ticketVOList.map(ticketVO=> {
                            return (
                                <tr key={ticketVO.id}>
                                    <td>{ticketVO.trainType}{ticketVO.trainId}</td>
                                    <td>{ticketVO.seatNo}</td>
                                    <td>{ticketVO.startStation}</td>
                                    <td>{ticketVO.endStation}</td>
                                    <td>{ticketVO.startTime}</td>
                                    <td>{ticketVO.endTime}</td>
                                    <td><Button type="primary" onClick={()=> {this.setState({passengerId: ticketVO.id});this.showModal();}}>退票</Button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
        <Modal title="确认退票" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
            <div className = "Main-modal">
                <p>是否确认退票</p>
            </div>
        </Modal>
        </>
        )
    }
}

export default Main;