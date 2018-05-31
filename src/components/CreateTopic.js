import React, { Component } from 'react';
import axios from 'axios'
class CreateTopic extends Component {
    state ={
        title:'',
        content:''
    }
    handelChange = (text,e) =>{
        this.setState({
            [text]:e.target.value
        })
    }
    handelSubmit = () => {
        const { title, content } = this.state
        if(title.trim().length >= 7 && content.trim()){
            const uri = 'https://cnodejs.org/api/v1/topics'
            const contentObj = {
                accesstoken: sessionStorage.accesstoken,
                title:title,
                tab:'dev',
                content:content
            }
            axios.post(uri,contentObj).then(res =>{
                this.setState({
                    title: '',
                    content: ''
                })
                this.props.history.push(`/topic/${res.data.topic_id}`)
            })
        }
    }
    render() {
        const {title ,content} = this.state
        console.log(title,content)
        return (
            <div>
                <input onChange={e => this.handelChange('title',e)} value={title} type="text"/>
                <textarea onChange={e => this.handelChange('content',e)} value={content}></textarea>
                <button onClick={this.handelSubmit}>提交</button>
            </div>
        )
    }
}

export default CreateTopic;