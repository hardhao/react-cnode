import React, { Component } from 'react';
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import axios from 'axios'
class User extends Component {
    state = {
        userInfo:null
    }
    componentDidMount() {
        const {username} = this.props.match.params
        const uri = `https://cnodejs.org/api/v1/user/${username}`
        axios.get(uri).then(res =>{
            this.setState({
                userInfo:res.data.data
            })
        })
        .catch(err =>{
            this.setState({
                userInfo:'no'
            })
        })
    }
    
    render() {  
        const {userInfo} = this.state
        const userContent = !userInfo ? '请稍等' : userInfo === 'no' ? '用户不存在' : <div>{userInfo.loginname}</div>
        return (
            <Wrapper>
                <Link to='/'><div className="top">主页 /</div></Link>
                {userContent}
            </Wrapper>
        )
    }
}

export default User;

const Wrapper = styled.div`
    width:100%;
    background-color:#e1e1e1;
    padding:20px 0;
    .min{
        width:1500px;
        background-color:#fff;
        margin:0 auto;
        overflow: hidden;
    }
    .min a{
        color:green;
    }
    .min span{
        display:block;
        float:left;
        margin-top:20px;
        font-size:12px;
        color:#9e9e9e;
    }
    .top{
        padding: 10px;
        background-color: #f6f6f6;
        border-radius: 3px 3px 0 0;
        border-bottom:1px solid #9e9e9e;
    }
`