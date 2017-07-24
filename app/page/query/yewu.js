
import React, { Component } from 'react';
import { Text, StyleSheet, View, StatusBar, TouchableOpacity } from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import Loading from '../../component/Loading';
import TabBar from '../../component/TabBar2';
import Util from '../../util/util';
import Theme from '../../util/theme';
import stylesList from '../../css/listData';

import ListPage from '../../component/listData'
import List from './list'


export default class QueryScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['车贷', '房贷', '票据', '个信', '企业', '网基', '活期', '其它'],
            upDateTime: Util.setDate(new Date()),
            loading: true,
            totalNum: [
                { type: '车贷类', num: 0 },
                { type: '房贷类', num: 0 },
                { type: '票据类', num: 0 },
                { type: '个信类', num: 0 },
                { type: '企业类', num: 0 },
                { type: '网基类', num: 0 },
                { type: '活期类', num: 0 },
                { type: '其它类', num: 0 }
            ],
            index: 0,
        };
    }
    changeUpDateTime(update) {
        this.setState({
            upDateTime: update
        })
    }
    changeTotalNum(totalNum) {
        this.state.totalNum[this.state.index].num = totalNum
        this.setState({
            ref: !this.state.ref
        })
        this.props.changeTotalNum(this.state.totalNum[this.state.index].type, totalNum, 1)
    }
    render() {
        let tabNames = this.state.tabNames;
        let navigation = this.props.navigation;
        if (this.state.loading) {
            return (
                <Loading />
            )
        }
        else {
            return (
                <View style={{ flex: 1 }}>
                    <View style={stylesList.update}>
                        <Text style={[stylesList.updateText, { marginRight: 10, }]}>更新时间</Text>
                        <Text style={stylesList.updateText}>{this.state.upDateTime}</Text>
                    </View>
                    <ScrollableTabView
                        locked={true}
                        renderTabBar={() => <TabBar tabNames={tabNames} />}
                        initialPage={this.props.initialPage}
                        onChangeTab={(obj) => {
                            this.setState({
                                index: obj.i
                            })
                             this.props.changeTotalNum(this.state.totalNum[obj.i].type, this.state.totalNum[obj.i].num, 1)
                        }}
                    >
                        <View style={styles.content} tabLabel='key1'>
                            <ListPage
                                navigation={navigation}
                                itemRow={List}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                changeUpDateTime={this.changeUpDateTime.bind(this)}
                                type={{ column: 'yewu', type: 'chedai', dataName: 'dataList' }}
                                columnDb={false}
                                update={true}
                                Ttype={'车贷'}
                            />
                        </View>
                        <View style={styles.content} tabLabel='key2'>
                            <ListPage
                                navigation={navigation}
                                itemRow={List}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                changeUpDateTime={this.changeUpDateTime.bind(this)}
                                type={{ column: 'yewu', type: 'fangdai', dataName: 'dataList' }}
                                columnDb={false}
                                update={true}
                                Ttype={'房贷'}
                            />
                        </View>
                        <View style={styles.content} tabLabel='key3'>
                            <ListPage
                                navigation={navigation}
                                itemRow={List}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                changeUpDateTime={this.changeUpDateTime.bind(this)}
                                type={{ column: 'yewu', type: 'piaojudiya', dataName: 'dataList' }}
                                columnDb={false}
                                update={true}
                                Ttype={'票据'}
                            />
                        </View>
                        <View style={styles.content} tabLabel='key4'>
                            <ListPage
                                navigation={navigation}
                                itemRow={List}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                changeUpDateTime={this.changeUpDateTime.bind(this)}
                                type={{ column: 'yewu', type: 'xinyongdai', dataName: 'dataList' }}
                                columnDb={false}
                                update={true}
                                Ttype={'个信'}
                            />
                        </View>
                        <View style={styles.content} tabLabel='key4'>
                            <ListPage
                                navigation={navigation}
                                itemRow={List}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                changeUpDateTime={this.changeUpDateTime.bind(this)}
                                type={{ column: 'yewu', type: 'qiyedai', dataName: 'dataList' }}
                                columnDb={false}
                                update={true}
                                Ttype={'企业'}
                            />
                        </View>
                        <View style={styles.content} tabLabel='key4'>
                            <ListPage
                                navigation={navigation}
                                itemRow={List}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                changeUpDateTime={this.changeUpDateTime.bind(this)}
                                type={{ column: 'yewu', type: 'zhaiquanzuhe', dataName: 'dataList' }}
                                columnDb={false}
                                update={true}
                                Ttype={'网基'}
                            />
                        </View>
                        <View style={styles.content} tabLabel='key4'>
                            <ListPage
                                navigation={navigation}
                                itemRow={List}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                changeUpDateTime={this.changeUpDateTime.bind(this)}
                                type={{ column: 'yewu', type: 'huoqilicai', dataName: 'dataList' }}
                                columnDb={false}
                                update={true}
                                Ttype={'活期'}
                            />
                        </View>
                        <View style={styles.content} tabLabel='key4'>
                            <ListPage
                                navigation={navigation}
                                itemRow={List}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                changeUpDateTime={this.changeUpDateTime.bind(this)}
                                type={{ column: 'yewu', type: 'qita', dataName: 'dataList' }}
                                columnDb={false}
                                update={true}
                                Ttype={'其它'}
                            />
                        </View>
                    </ScrollableTabView>
                </View>
            );
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loading: false,
                index: this.props.initialPage,
            })
        }, 10)
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    }
})


