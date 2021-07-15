import * as React from 'react';
import {
    Alert,
    Button,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';

import {Text, View} from '../components/Themed';
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import {useState} from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import MapView, {Marker} from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";


// @ts-ignore
export default function ActivitySearch({navigation}) {
    const ApiKey = 'AIzaSyAHenjJYVRsj5kVTKTmFZbdSfGvn1zk3vI';
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [dateShow, setDateShow] = useState(false);
    const [timeShow, setTimeShow] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const [activities, setActivities] = useState([]);

    const [locationCoordinate, setLocationCoordinate] = useState({latitude: 0, longitude: 0});
    const [destinationCoordinate, setDestinationCoordinate] = useState({latitude: 0, longitude: 0});




    const showDate = (date: Date) => {
        let year = date.getFullYear().toString();
        let month = (parseInt(date.getUTCMonth().toString()) + 1).toString();
        let day = date.getUTCDate().toString();

        let monthToNumber = parseInt(month);
        let dayToNumber = parseInt(day);

        if (dayToNumber < 10)
            day = '0' + day;
        if (monthToNumber < 10)
            month = '0' + month;

        return year + '-' + month + '-' + day;
    }

    const showTime = (date: Date) => {
        let minutes = date.getMinutes().toString();
        let hours = date.getHours().toString();

        let minutesToNumber = parseInt(minutes);
        let hoursToNumber = parseInt(hours);

        if (minutesToNumber < 10)
            minutes = '0' + minutes;
        if (hoursToNumber < 10)
            hours = '0' + hours;

        return hours + ':' + minutes + ':00';
    }


    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDateShow(false);
        setDate(currentDate);


        console.log(currentDate);
    };

    const onChangeTime = (event, selectedTime) => {
        const currentTime = selectedTime || time;
        setTimeShow(false);
        setTime(currentTime);

        console.log(currentTime);
    };


    const _showDate = () => {
        setDateShow(true);
    };
    const _showTime = () => {
        setTimeShow(true);
    };


    const [selectedAddress, setSelectedAddress] = useState('');

    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    // const [time, setTime] = useState('');



    const show_price = (type: string, price: number) => {
        if (type == "event" )
            return [ <View key={'activityView4' + price}style={styles.row2}>
                <MaterialIcons name="attach-money" size={24} color="#EF6461" />
                <Text style ={styles.price} key={'price' + price}> {price} € </Text>
            </View>
            ]

    }


    const SearchActivty = async () => {

        await fetch('https://matefit-test.herokuapp.com/api/search',
            {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // @ts-ignore
                    Authorization: 'Bearer ' + global.user.token,
                },
                body: JSON.stringify({
                    title: title,
                    plz: location ,
                    // date: showDate(date) + ' :00:00:00',
                    // location : location,
                      //time: time,

                    // title : "Fußball",
                    // description : "Deutschland gegen Tunesien",
                    // location: "Oldenburger Straße 19, Berlin, Germany",
                    // time : "2021-06-20 17:03:41",
                    // price : 20,
                    // maxppl : "90",
                })
            }).then(res => res.json())
            .then(res => {
                setActivities(res);
                setModalVisible(true);
                console.log(res);
            }).catch((error) => {
                console.error(error)
            })

    }

    const activity_template = (activities: any[]) => {


        return (
            activities.map((activity) => {
                return [
                    <TouchableOpacity style= {styles.component} key={'TouchableOpacity' + activity.id} onPress={() => navigation.navigate('Activity',{activity:activity})}>

                        <View key={'activityView1' + activity.id} style={styles.row}>
                            <Text style ={styles.title2} key={'title' + activity.id}>{activity.title.toUpperCase()}</Text>
                            <Text style ={styles.type} key={'type' + activity.id}>{activity.type.toUpperCase()}</Text>
                        </View>

                        <View key={'activityView2' + activity.id}style={styles.row2}>
                            <Ionicons key={'icon1' + activity.id} name="location" size={20} color="#EF6461" />
                            <Text style ={styles.location} key={'location' + activity.id}>{activity.location.toUpperCase()}</Text>
                        </View>


                        {show_price(activity.type, activity.price)}



                        <View key={'activityView3' + activity.id} style={styles.row1}>
                            <Ionicons key={'icon2' + activity.id} name="time" size={20} color="#EF6461"/>
                            <Text style ={styles.time} key={'time' + activity.id}>{activity.time.substring(0,16)}</Text>
                        </View>

                    </TouchableOpacity>,

                ]
            })
        )

    }

    const [data, setData] = useState(null);




    let getDistinationCoordinate = async (location: string) => {
        const uri = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&key=' + ApiKey;
        const resp = await fetch(uri);
        // console.log(uri);
        const respJson = await resp.json();
        await setData(respJson);
        await setDestinationCoordinate({latitude: respJson.results[0].geometry.location.lat, longitude: respJson.results[0].geometry.location.lng});

    }

    const showMarker = ()=>{
        return (
            activities.map((activity) => {

                getDistinationCoordinate(activity.location);

                    return [
                        <Marker
                            key={"Marker" + activity.id}
                            coordinate={destinationCoordinate}
                            title={activity.title}
                            description={activity.description}
                        />,
                    ]
                }
            )
        )

    }


    return (

        <View style={styles.container}>

            <Text></Text>
            <Text style={styles.title}>Activity Search</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>

            <Text>Address</Text>
            <GooglePlacesAutocomplete
                placeholder='Search Address'
                onPress={(getAddressText) => {
                    setLocation(getAddressText.description);
                    // console.log('description', selectedAdress);
                }}

                // onPress={(data, details = null) => {
                //     // 'details' is provided when fetchDetails = true
                //     console.log(data, details);
                // }}
                query={{
                    key: ApiKey,
                    language: 'en',
                }}
                styles={{
                    container: {
                        flex: 0,
                    },
                    textInputContainer: {
                        borderWidth: 1,
                        borderRadius: 7,
                        margin: 10,
                        marginTop: 20,
                        width: '80%',

                    },
                    textInput: {
                        // backgroundColor: '#FFFFFF',
                        color: 'black',
                        height: 24,
                        width: '100%',
                        marginTop: 7,
                        marginRight: 0,
                        paddingTop: 2,
                        paddingLeft: 5,
                        paddingRight: 0,
                        fontSize: 15,
                        flex: 0,
                    },
                    poweredContainer: {
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        borderBottomRightRadius: 5,
                        borderBottomLeftRadius: 5,
                        borderColor: '#c8c7cc',
                        borderTopWidth: 0.5,
                    },
                    powered: {},
                    listView: {},
                    row: {
                        backgroundColor: '#FFFFFF',
                        padding: 13,
                        height: 44,
                        flexDirection: 'row',
                    },
                    separator: {
                        height: 0.5,
                        backgroundColor: '#c8c7cc',
                    },
                    description: {},
                    loader: {
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        height: 20,
                    },
                }}
            />


            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{width: '100%', marginTop: 10}}
                contentContainerStyle={{width: '100%', alignItems: 'center'}}


            >

                <Text>Title</Text>
                <TextInput key={'Title'}
                           style={styles.inputText}
                           onChangeText={
                               (Title) => {
                                   setTitle(Title);

                               }
                           }/>

                <Text>Date and Time</Text>

                {timeShow && (
                    <DateTimePicker
                        minimumDate={new Date()}
                        testID="dateTimePicker"
                        value={date}
                        mode='time'
                        is24Hour={true}
                        display="default"
                        onChange={onChangeTime}
                        minuteInterval={15}

                    />
                )}

                    {dateShow && (
                        <DateTimePicker
                            minimumDate={new Date()}
                            testID="dateTimePicker"
                            value={date}
                            mode='date'
                            is24Hour={true}
                            display="default"
                            onChange={onChangeDate}
                        />
                    )}

                <View style={{flexDirection:'row', justifyContent:"space-between", width:'60%'}}>

                <Button onPress={_showTime} title="Select Time"/>

                <Button onPress={_showDate} title="Select Date"/>

                </View>

                <Text> {showDate(date)}</Text>

                <Text> {showTime(time)}</Text>



                <Button key={'ActivitySearchButton'} onPress={SearchActivty} title='Search Activity'></Button>


                {/*<MapView*/}
                {/*    showsUserLocation={true}*/}
                {/*    initialRegion={{*/}
                {/*        latitude: 52.53207787115868,*/}
                {/*        longitude: 13.33709847387337,*/}
                {/*        latitudeDelta: 0.055,*/}
                {/*        longitudeDelta: 0.025,*/}
                {/*    }}*/}
                {/*    style={styles.googleMap}*/}

                {/*>*/}
                {/*    <Marker*/}
                {/*        key={"myPosition"}*/}
                {/*        coordinate={locationCoordinate}*/}
                {/*        title={"My Position"}*/}
                {/*        description={"My Position"}*/}
                {/*        onPress={(e)=>{console.log(e)}}*/}
                {/*        icon={require("./icons8-geo-fence-100.png")}*/}
                {/*    />*/}

                {/*    {showMarker()}*/}




                    {/*<Marker draggable={true}*/}
                    {/*    // coordinate={{latitude: location.latitude, longitude: location.longitude}}*/}
                    {/*        coordinate={coord}*/}

                    {/*        onDragEnd={(e) => setCoord(e.nativeEvent.coordinate)}*/}
                    {/*        icon={require("./icons8-geo-fence-100.png")}*/}
                    {/*/>*/}



                {/*</MapView>*/}

            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);

                }}
            >

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {activity_template(activities)}

                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </Pressable>
                    </View>
                </View>
                </ScrollView>

            </Modal>



        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    inputText: {
        height: 30,
        borderRadius: 7,
        width: '80%',
        margin: 10,
        marginTop: 10,
        borderWidth: 1,
        // textAlign: 'center',
        fontSize: 16,
        fontFamily: 'serif',
        paddingLeft: 5,
    },button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        }
    },


    map: {
        width: 330,
        // width: Dimensions.get('screen').width,
        // height: Dimensions.get('screen').height,
        height: 330,
        position: 'relative',
        margin:15,
        marginTop:50,
        borderWidth: 1,
        justifyContent: 'center',
    },
    component:{
        backgroundColor:'#313638',
        borderRadius:10,
        width:'100%',
        padding: 20,
        marginBottom:10,

    },row:{
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
        backgroundColor:'transparent'

    },
    row1:{
        backgroundColor:'transparent',
        flex: 1,
        flexDirection: 'row',
        alignContent:'center',
        marginTop:10,





    },
    row2:{
        flex: 1,
        flexDirection: 'row',
        marginTop:10,
        backgroundColor:'transparent',
        alignContent:'center',



    },
    title2:{
        fontSize: 20,
        fontWeight: 'bold',
        color:'#F4EBD9',
    },

    location:{
        marginLeft:15,
        paddingTop:5,
        color:'#F4EBD9',
    },
    price:{
        marginLeft:9,
        paddingTop:5,
        color:'#F4EBD9',

    },
    time:{
        marginLeft:15,
        color:'#F4EBD9',

    },
    type:{

        backgroundColor:'#EF6461',
        borderRadius:5,
        padding:5,
        overflow:'hidden',
        color:'#313638',



    },

    title1: {
        marginVertical:10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    googleMap: {
        width: 330,
        // width: Dimensions.get('screen').width,
        // height: Dimensions.get('screen').height,
        height: 330,
        position: 'relative',
        margin: 15,
        marginTop: 50,
        borderWidth: 1,
        justifyContent: 'center',
    },

});
