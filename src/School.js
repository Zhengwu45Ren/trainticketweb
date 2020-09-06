import React from 'react';
import Helmet from 'react-helmet';
import './School.css'

class School extends React.Component{
    render() {
        return (
            <>
            <Helmet>
                <title>请假外出、返校权限查询通行码</title>
            </Helmet>
            <div>
                <img className="School-div" src={require("../public/img/uppart.png")}/>
                <img className="School-div" src={require("../public/img/midpart.png")}/>
            </div>
            <div className="School-time">
                <p>123</p>
            </div>
            <div>
                <img className="School-div" src={require("../public/img/bottompart.png")}/>
            </div>
            </>
        );
    }
}

export default School;