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
        const id = this.props.location.search.substr(4)
        if(id === "4455") {
            fetch('http://www.chewingtogether.com:8085/school', {
                // post提交
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-type": "application/json"
                }
            })
                .then(res => {
                    return res.json()
                }).then(resdata => {
                if (resdata.hasOwnProperty("message")) {
                    alert(resdata.message)
                } else {
                    this.setState({getTime: resdata})
                }
            })
        }else {
            this.props.history.push({pathname:'/'})
        }
    }

    render() {
        return (
            <>
            <Helmet>
                <title>请假外出、返校权限查询通行码</title>
            </Helmet>
            <div className="School-head">
                <img className="School-div" src={require("../img/head.png")}/>
            </div>
            <div className="School-content">
                <img className="School-div" src={require("../img/uppart.png")}/>
                <img className="School-div" src={require("../img/midpart.png")}/>
            <div className="School-time">
                <p>{this.state.getTime}</p>
            </div>
            <div>
                    <img className="School-div" src={require("../img/bottompart.png")}/>
            </div>
            </div>
            <div className="School-tail">
                <img className="School-div" src={require("../img/tail.png")}/>
            </div>
            </>
        );
    }
}

export default School;