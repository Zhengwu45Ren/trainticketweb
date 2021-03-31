import React from 'react';
import Helmet from 'react-helmet';
import './jtSchool.css'
import moment from 'moment';

class jtSchool extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            getTime:'',
            currentTime:'',
            lastTime:'',
            showPic: 'none'
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

        this.setState({lastTime: moment().subtract('minutes',45).subtract('seconds',9).format('YYYY-MM-DD HH:mm:ss')})

        setInterval(() => {
            this.setState({currentTime: moment().format('YYYY-MM-DD HH:mm:ss')})
        }, 1000)

        setInterval(()=>{
            if (this.state.showPic == 'none') {
                this.setState({showPic: 'block'})
            }
            else if (this.state.showPic == 'block') {
                this.setState({showPic: 'none'})
            }
        },500)
    }

    render() {
        return (
            <>
                <Helmet>
                    <title>动态码</title>
                </Helmet>
                <div className="jtSchool-topBrand">
                    <p className="jtSchool-whiteFont">——当前时间：{this.state.currentTime}——</p>
                </div>
                <div className="jtSchool-content">
                    <div className="jtSchool-sub">
                        <img style={{display:this.state.showPic, width:'100%', height:'100%'}} src={require("../img/sub.png")} />
                    </div>
                    <p className="jtSchool-time">{this.state.getTime}</p>
                    <p className="jtSchool-last"><strong>{this.state.lastTime}</strong></p>
                </div>
            </>
        );
    }
}

export default jtSchool;