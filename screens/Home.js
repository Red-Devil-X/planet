import React,{Component} from "react";
import { View,Text,Flatlist,Alert,Stylesheet,SafeAreaView } from "react-native";
import axios from "axios"
import { ListItem } from "react-native-elements/dist/list/ListItem";
export default class HomeScreen extends Component{
    constructor(props){
        super(props)
        this.state={
            listData=[],url:"http://localhost:5000/"
        }
    }
    getPlanets(){
        const {url}=this.state
        axios
        .get(url)
        .then(response=>{
            return this.setState({
                listData:response.data.data
            })
        })
        .catch(error=>{
            Alert.alert(error.message)
        })
    }
    renderItem=({item,index})=>(
        <ListItem 
        key={index}
        title={`Planet: ${item.name}`}
        subtitle={`Distance from Earth: ${item.distance_from_earth}`}
        titleStyle={styles.title}
        containerStyle={styles.listContainer}
        bottomDivider
        chevron
        onPress={()=>{this.props.navigation.navigate("Details",{planet_name:item.name})}}

        >

        </ListItem>
    )
        keyExtractor=(item,index)=>index.toString


    render(){
        const {listData}=this.state
        if(listData.length===0){
            return(
                <View>
                    <Text>Loading....</Text>
                </View>
            )
        }
        return(
            <view style={styles.container}>
                <SafeAreaView/>
                <view style={styles.uppercontainer}>
                    <Text style={styles.headerText}>Planet's World</Text>
                </view>
                <view style={styles.lowercontainer}>
                    <Flatlist
                    keyExtractor={this.keyExtractor}
                    data={this.state.listData}
                    renderItem={this.renderItem}
                    />

                </view>
            </view>
        )
    }
}