import React, { Component } from 'react';
import { Text, StyleSheet, View, StatusBar, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView} from "react-navigation";
import Api from '../../util/api';
import Theme from '../../util/theme';
import Header from '../../component/navBar';
import Loading from '../../component/loading';
import Num from './num';
import Nav from './nav';
import Dapan from './dapan';
import Activity from './activity';
import Fund from './fund';
import Pingce from './pingce';
import Yulun from './yulun';
import Comment from './comment';
import Report from './report';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: null,
            ref: false,
            loading: true,
            isRefreshing: false,
        };
    }
    render() {
        const { navigation, loginState } = this.props;
        const { loading, dataSource } = this.state;
        return (
           <SafeAreaView style={{flex:1,backgroundColor:Theme.color2}}>
            <View style={Theme.container}>
                <StatusBar
                    backgroundColor={Theme.color2}
                    barStyle="light-content"
                />
                <Header headerOpt={{ back: 'home' }} navigation={navigation} openControlPanel={this.openControlPanel.bind(this)} loginState={loginState} />
                <View style={Theme.content}>
                    {
                        loading ?
                            <Loading />
                            :
                            <ScrollView
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isRefreshing}
                                    onRefresh={this.onRefresh.bind(this)}
                                />
                            }
                            >
                                <Num data={dataSource.homenum} navigation={navigation} />
                                <Nav navigation={navigation} />
                                <Dapan navigation={navigation}  data={{ inamount: dataSource.inamount, markent: dataSource.markent,echartYulun:dataSource.sentviewlist,numYulun:dataSource.sentday,newBlack:dataSource.reblacklist,newZhengyi:dataSource.rezhengyilist }} />
                                
                                <Pingce data={dataSource.mplisttop} navigation={navigation} />
                                <Yulun data={{list:dataSource.sentlist,echart:dataSource.sentviewlist,num:dataSource.sentday}} navigation={navigation} />
                                <Comment data={dataSource.commentlist} navigation={navigation} />
                                <Report data={dataSource.reportslist} navigation={navigation}  />
                                {
                                    versionStatus != 1?
                                    <Activity data={dataSource.flmf} navigation={navigation}  />
                                    :
                                    null
                                }
                                {
                                    versionStatus != 1?
                                    <Fund data={dataSource.listfund} navigation={navigation} />
                                    :
                                    null
                                }
                            </ScrollView>
                    }
                </View>
            </View>
            </SafeAreaView>

        );
    }
    componentDidMount() {
        this.getData()
    }
    openControlPanel() {
        this.props.openControlPanel();
    }
    onRefresh() {
        this.setState({
            isRefreshing: true,
        })
        this.getData();
    }
    getData() {
        let that = this;
        let url = Api.home;
        
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            console.log(responseData)
                            that.setState({
                                dataSource: responseData,
                                loading: false,
                                isRefreshing: false,
                            })
                           
                        })
                }
                else {
                    console.log('网络请求失败')
                }
            })
            .catch((error) => {
                console.log('error:', error)
            })
    }
}

const styles = StyleSheet.create({

})


