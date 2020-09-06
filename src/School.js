import React from 'react';
import Helmet from 'react-helmet';
import './School.css'

class School extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            getTime:''
        };
    }

    componentDidMount(){
        fetch('http://www.chewingtogether.com:8085/school',{
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
                this.setState({getTime: resdata})
            }
        })
    }

    render() {
        return (
            <>
            <Helmet>
                <title>请假外出、返校权限查询通行码</title>
            </Helmet>
            <div className="School-head">
                <img className="School-div" src={require("../public/img/head.png")}/>
            </div>
            <div className="School-content">
                <img className="School-div" src={require("../public/img/uppart.png")}/>
                <img className="School-div" src={require("../public/img/midpart.png")}/>
            <div className="School-time">
                <p>{this.state.getTime}</p>
            </div>
            <div>
                    <img className="School-div" src={require("../public/img/bottompart.png")}/>
            </div>
            </div>
            <div className="School-tail">
                <img className="School-div" src={require("../public/img/tail.png")}/>
            </div>
            </>
        );
    }
}

export default School;