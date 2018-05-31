import React, { Component } from 'react';
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import axios from 'axios'
class Header extends Component {
    state = {
        text:'ebf66c6c-896f-45a7-87aa-49f0b8def6c4',
        userInfo:null,
    }
    handelInput = e =>{
        this.setState({
            text:e.target.value
        })
    }
    componentDidMount() {
        const accesstoken = sessionStorage.accesstoken
        if(accesstoken){
            const uri = 'https://cnodejs.org/api/v1/accesstoken'
            axios.post(uri,{accesstoken:accesstoken}).then(res => {
                this.setState({
                    userInfo: res.data
                })
            })
        }
    }
    
    handelLogin= () => {
        const {text} = this.state
        if(text.trim()){
            const uri = 'https://cnodejs.org/api/v1/accesstoken'
            axios.post(uri,{accesstoken:text}).then(res =>{
                sessionStorage.accesstoken = text
                sessionStorage.loginname = res.data.loginname
                this.setState({
                    userInfo:res.data,
                    text:''
                })
            })
        }
    }
    handelLoginout = () =>{
        this.setState({
            userInfo:null
        })
        sessionStorage.removeItem('accesstoken')
        sessionStorage.removeItem('loginname')
    }
    render() {
        const {text,userInfo} = this.state
        return (
            <Head>
                <Link to='/'><img style={{width:'150px'}} src="https://o4j806krb.qnssl.com/public/images/cnodejs_light.svg" alt=""/></Link>
                {userInfo ? <div>
                    <img style={{width:'40px'}} src={userInfo.avatar_url} alt=""/>
                    <span onClick={this.handelLoginout}>退出</span>
                    <Link style={{color:'cyan',marginLeft:'40px'}} to='/topic/create'>发布话题</Link>
                </div> :<div>
                    <input type="text" value={text} onChange={this.handelInput} />
                    <span onClick={this.handelLogin}>登录</span>
                </div>}
            </Head>
        )
    }
}

export default Header;

const Head = styled.header`
    background-color: #3e3e3e;
    display:flex;
    align-items:center;
    width:100%;
    padding:20px;
    input{
        line-height:20px;
        text-indent:10px;
        box-shadow: 0px 2px 0px 0px #ccc;
        margin-left:50px;
    }
    span{
        margin-left:40px;
        padding:2px 6px;
        font-size:12px;
        border-radius: 5px;
        color:#ccc;
        background-color:green;
    }
`