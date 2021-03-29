import React from 'react';
import Helmet from 'react-helmet';
import './jtSchool.css'

class jtSchool extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            getTime:''
        };
    }

    componentDidMount(){
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
    }

    render() {
        return (
            <>
                <Helmet>
                    <title>动态码</title>
                </Helmet>
                <div className="jtSchool-head">
                    <p>{this.state.getTime}</p>
                </div>
                <div className="jtSchool-content">
                    <div className="jtSchool-time">
                        <p>{this.state.getTime}</p>
                    </div>
                </div>
            </>
        );
    }
}

export default jtSchool;