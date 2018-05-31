import React, { Component } from 'react';
import styled from 'styled-components'
import axios from 'axios'
import {Link} from 'react-router-dom'
class ShowTopic extends Component {
    state={
        topic:null,
        collects:[],
        is_collect:false,
        comment:''
    }
    getTopic = () =>{
        const { id } = this.props.match.params
        const { accesstoken } = sessionStorage
        const params = accesstoken ? `?accesstoken=${accesstoken}` : ''
        const uri = `https://cnodejs.org/api/v1/topic/${id}${params}`
        axios.get(uri).then(res => {
            this.setState({
                topic: res.data.data,
                is_collect: accesstoken ? res.data.data.is_collect : false
            })
        })
    }
    componentDidMount() {
        this.getTopic()
        // const { loginname } = sessionStorage
        // const uri1 = `https://cnodejs.org/api/v1/topic_collect/${loginname}`
        // axios.get(uri1).then(res => {
        //     this.setState({
        //         collects:res.data.data
        //     })
        // })
    }
    // handelClick = topic_id => {
    //     const { collects } = this.state
    //     if (collects.find(t => t.id === topic_id)){
    //         const uri = `https://cnodejs.org/api/v1/topic_collect/de_collect`
    //         axios.post(uri,{accesstoken:sessionStorage.accesstoken,topic_id}).then(res => {
    //             this.setState({
    //                 collects:collects.filter(t => t.id !== topic_id)
    //             })
    //         })
    //     }else{
    //         const uri = `https://cnodejs.org/api/v1/topic_collect/collect`
    //         axios.post(uri, { accesstoken: sessionStorage.accesstoken,topic_id }).then(res => {
    //             console.log(res.data)
    //             const { loginname } = sessionStorage
    //             const uri1 = `https://cnodejs.org/api/v1/topic_collect/${loginname}`
    //             axios.get(uri1).then(res => {
    //                 this.setState({
    //                     collects: res.data.data
    //                 })
    //             })
    //         }) 
    //     }
    // }
    

    handelClick = topic_id => {
        if (sessionStorage.accesstoken){
            const { is_collect } = this.state
            const uriLast = is_collect ? 'de_collect' : 'collect'
            const uri = `https://cnodejs.org/api/v1/topic_collect/${uriLast}`
            axios.post(uri, { accesstoken: sessionStorage.accesstoken, topic_id }).then(res => {
                this.setState({
                    is_collect: ! is_collect
                })
            })
            // if (is_collect) {
            //     const uri = 'https://cnodejs.org/api/v1/topic_collect/de_collect'
            //     axios.post(uri, { accesstoken: sessionStorage.accesstoken, topic_id }).then(res => {
            //         this.setState({
            //             is_collect: false
            //         })
            //     })
            // } else {
            //     const uri = 'https://cnodejs.org/api/v1/topic_collect/collect'
            //     axios.post(uri, { accesstoken: sessionStorage.accesstoken, topic_id }).then(res => {
            //         this.setState({
            //             is_collect: true
            //         })
            //     })
            // }
        }
    }
    handelComment= e => {
        this.setState({
            comment: e.target.value
        })
    }
    addComment = () =>{
        const {comment,topic} = this.state
        const uri = `https://cnodejs.org/api/v1/topic/${topic.id}/replies`
        axios.post(uri, { accesstoken: sessionStorage.accesstoken,content:comment}).then(res =>{
            this.setState({
                comment:''
            })
            this.getTopic()
        })
    }
    handelUp = id =>{
        const uri = `https://cnodejs.org/api/v1/reply/${id}/ups`
        axios.post(uri, { accesstoken: sessionStorage.accesstoken}).then(res =>{
            this.getTopic()
        })
    }
    
    
    render() {
        const { topic,is_collect,comment } = this.state
        const replayList = !topic ? '╮(╯▽╰)╭ 啥也没有' : <div>
            {topic.replies.length === 0 ? '评论为空' : topic.replies.map(reply => <div key={reply.id}><Link to={`/user/${reply.author.loginname}`}><img style={{width:'40px',height:'40px'}} src={reply.author.avatar_url} alt=""/></Link>
            <span>{reply.author.loginname}</span>
            <p dangerouslySetInnerHTML={{ __html: reply.content }}></p>
            <span onClick={() => this.handelUp(reply.id)}>赞{reply.ups.length}</span>
            </div> ) }
        </div> 
        return (
            <Wrapper>
                <Min>
                    <div className="top">
                        {topic ?(  <div> {topic.top ? <span>置顶</span> : topic.good ? <span>精华</span> : ''}
                        <h2>{topic.title}</h2>
                        <span>作者 {topic.author.loginname}</span>
                        <span style={{ marginLeft: '20px' }}>{topic.visit_count} 次浏览</span>
                            {/* <button onClick={() => this.handelClick(topic.id)}>
                                {collects.find(t => t.id === topic.id) ? '取消收藏':'收藏'}
                            </button> */}
                            <Btn onClick={() => this.handelClick(topic.id)}>{is_collect ? '取消收藏' : '收藏'}</Btn>
                        <Content dangerouslySetInnerHTML={{ __html: topic.content }}></Content> </div> ): '请稍等'}
                    </div>
                </Min>
                <div>
                    <span>回复</span>
                    <div style={{ display: 'flex' }}>{replayList}</div>
                </div>
                <div>
                    {sessionStorage.accesstoken ? (<div>
                         <h4>添加回复</h4>
                        <textarea value={comment} onChange={this.handelComment}></textarea>
                        <button onClick={this.addComment}>回复</button>
                    </div>) : ''
                    }
                </div> 
             </Wrapper>
         )
    }
}

export default ShowTopic;

const Wrapper = styled.div`
    width:100%;
    background-color:#e1e1e1;
    padding:20px 0;
`

const Min = styled.div`
        width:1500px;
        background-color:#fff;
        margin:0 auto;
        padding:30px 155px;
    .top{
        padding-bottom:10px;
        border-bottom:1px solid #e1e1e1;
    }
    span{
        font-size:12px;
        color:#9e9e9e;
    }
`

const Content = styled.div`
    img{
        width:100%;
    }
    p{
        line-height:20px;
    }
`


const Btn = styled.button`
    float:right;
    background-color:#e1e1e1;
`