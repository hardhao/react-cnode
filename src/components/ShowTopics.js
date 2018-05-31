import React, { Component } from 'react';
import axios from 'axios'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
class ShowTopics extends Component {
    state = {
        topics:[]
    }
    getTopics = tab =>{
        const uri = `https://cnodejs.org/api/v1/topics?tab=${tab}`
        axios.get(uri).then(res => {
            this.setState({
                topics: res.data.data
            })
        })
    }
    componentDidMount() {
        const { tab } = this.props
        this.getTopics(tab)
    }
    componentWillReceiveProps(nextProps) {
        const { tab } = nextProps
        this.getTopics(tab)
    }
    
    hahaha = tab => {
        switch (tab) {
            case 'share': return '分享';
            case 'ask': return '问答';
            case 'job': return '招聘';
            default: return null
        }
    } 
    
    render() {
        const {topics} = this.state
        const goodStyle = {
            color:'#fff',
            backgroundColor:'#80bd01'
        }
        const badStyle = {
            color: '#000',
            backgroundColor: '#9e9e9e'
        }
        console.log(topics)
        const topicsList = topics.length === 0 ? '请稍等' : topics.map(topic => <List key={topic.id}>
            <Link to={`/user/${topic.author.loginname}`}><img src={topic.author.avatar_url} alt=""/></Link>
            <div style={{width:'100px',textAlign:'center'}}>
                <span title='回复数'>{topic.reply_count} <span>/</span> <span title='浏览量'>{topic.visit_count}</span> </span>
            </div>
            <span className='tab' style={(topic.top || topic.good )? goodStyle : badStyle}>{topic.top ? '置顶': topic.good ? '精华' : this.hahaha(topic.tab)}</span>
            <h3><Link to={{
                pathname:`/topic/${topic.id}`,
                // state:topics.find(t => t.id === topic.id),
            }}>{topic.title}</Link></h3>
        </List>)
        return (
            <Wrapper>{topicsList}</Wrapper>
        )
    }
}

export default ShowTopics;

const Wrapper = styled.div`
    background-color:#ccc;
    border-radius:10px;
    margin-top:10px;
`

const List = styled.div`
    display:flex;
    padding:10px;
    align-items:center;
    h3{
        margin:0;
        font-weight:normal;
        margin:0 15px;
        flex-grow:1;
        overflow:hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    h3 a{
        color:#000;
    }
    h3 a:visited{
        color:red;
    }
    h3 a:hover{
        text-decoration: underline;
    }
    span{
        fonst-size:14px;
    }
    img{
        width:40px;
        height:40px;
        margin-right:5px;
    }
    .tab{
        padding:2px 4px;
        border-radius:5px;
        margin-left:10px;
    }
`