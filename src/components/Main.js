import React, { Component } from 'react';
import styled from 'styled-components'
import ShowTopics from './ShowTopics';
class Main extends Component {
    state = {
        tab:'all'
    }
    handelClick = tab =>{
        this.setState({
            tab:tab
        })
    }
    render() {
        const tabs =[
            {
                tab:'all',
                tabText:'全部',
            },
            {
                tab:'good',
                tabText:'精华',
            },
            {
                tab: 'share',
                tabText:'分享',
            },
            {
                tab: 'ask',
                tabText:'问答',
            },
            {
                tab: 'job',
                tabText:'招聘',
            }
        ]
        // const {show}  = this.state
        const tabList = tabs.map((tab, index) => <Li style={{listStyle:'none'}} key={index}>
            <span style={{ backgroundColor: this.state.tab === tab.tab && '#80bd01', color: this.state.tab === tab.tab && '#fff'}} onClick={() => this.handelClick(tab.tab)}>{tab.tabText}</span></Li>)
        return (
            <Wrapper>
                <nav>
                    <ul style={{ display: 'flex', backgroundColor: '#f6f6f6',width:'1095px'}}>{tabList}</ul>
                </nav>
                <ShowTopics tab={this.state.tab} />
            </Wrapper>
        );
    }
}

export default Main;

const Wrapper = styled.section`
    background-color: #e1e1e1;
    padding:10px 20px;
`

const Li = styled.li`
    color: #80bd01;
    font-size:14px;
    padding: 10px 4px;
    margin: 0 10px;
    span{
        padding:2px 4px;
        cursor: pointer;
        border-radius: 3px;
    }
`