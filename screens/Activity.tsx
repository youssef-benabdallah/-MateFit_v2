import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    FlatList,
    TouchableOpacity,
    Modal,
    Alert,
    Pressable,
    Dimensions
} from 'react-native';
import {withNavigation,} from 'react-navigation';
import {useEffect} from 'react';
import {Ionicons} from '@expo/vector-icons';
import MapView, {Marker} from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import * as Location from "expo-location";


// @ts-ignore
export default function Activity({navigation, route}) {


    const ApiKey = 'AIzaSyAHenjJYVRsj5kVTKTmFZbdSfGvn1zk3vI';
    const [modalVisible, setModalVisible] = useState(false);


    // const [activity, setActivity] = useState('');
    const [activity, setActivity] = useState(route.params.activity);




    useEffect(() => {
        Load();
        getLocation();
        getDistinationCoordinate();
    }, []);

    const Reload = () => {
        Load();
    }

    const Load = () => {

        fetch('https://matefit-test.herokuapp.com/api/activity/' + activity.id,
            {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + global.user.token,
                }
            })
            .then(res => res.json())
            .then(res => {
                setActivity(res);
            }).catch((error) => {
            console.error(error)
        })
    }



    const show_participants_list = (list) => {

    }

    const show_activity_price = (price: number) => {
        if (price > 0)
            return <Text key={'price'}> price : {activity.price} euro</Text>
    }

    const participate_to_activity = () => {

        fetch('https://matefit-test.herokuapp.com/api/activity/' + activity.id + '/participate',
            {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + global.user.token,
                }
            })
            .then(res => res.json())
            .then(res => {
                Reload();
                alert(res.message);


            }).catch((error) => {
            console.error(error)
        })
    }

    const cancel_participation_to_activity = () => {

        fetch('https://matefit-test.herokuapp.com/api/activity/' + activity.id + '/cancel',
            {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + global.user.token,
                }
            })
            .then(res => res.json())
            .then(res => {
                Reload();

                alert(res.message)
            }).catch((error) => {
            console.error(error)
        })
    }



    const show_participation_button = (participants) => {
             if (participants) {
            if ((participants.indexOf( parseInt(global.user.id))) > -1) {

                return <Button key={'Button1' + participants.id} onPress={cancel_participation_to_activity}
                               title="cancel"></Button>
            } else
                return <Button key={'Button2' + participants.id} onPress={participate_to_activity}
                               title="participate"></Button>
        }
    }

    const show_users_list = (user) => {
        return <TouchableOpacity style={styles.userbutton} key={'TouchableOpacity' + user.id} onPress={() => {
            navigation.navigate('Profile', {id: user.id})
        }}>
            <Ionicons name="person" size={20} color="green"/>

            <Text style={styles.usertext} key={'userText' + user.id}>{user.name.toUpperCase()}</Text>
        </TouchableOpacity>
    }



    const [mapView, setMapView] = useState();




    const [locationCoordinate, setLocationCoordinate] = useState({latitude: 0, longitude: 0});

    const [errorMsg, setErrorMsg] = useState(null);


    let getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        // let loc= (location);
        let text = JSON.stringify(location);
        setLocationCoordinate({latitude: location.coords.latitude, longitude: location.coords.longitude});

    }

    const [data, setData] = useState();
    const [destinationCoordinate, setDestinationCoordinate] = useState({latitude: 0, longitude: 0});

    let getDistinationCoordinate = async () => {
        const uri = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + activity.location + '&key=' + ApiKey;
        const resp = await fetch(uri);
        const respJson = await resp.json();
        await setData(respJson);
        await setDestinationCoordinate({latitude: respJson.results[0].geometry.location.lat, longitude: respJson.results[0].geometry.location.lng});

    }




    return (
        <View style={styles.component}>





            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);

                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <MapView
                            showsUserLocation={true}
                            initialRegion={{
                                latitude: 52.53207787115868,
                                longitude: 13.33709847387337,
                                latitudeDelta: 0.055,
                                longitudeDelta: 0.025,
                            }}
                            style={styles.googleMap}

                        >
                            <Marker
                                key={"myPosition"}
                                coordinate={locationCoordinate}
                                title={"My Position"}
                                description={"My Position"}
                                onPress={(e)=>{}}
                                icon={require("./icons8-geo-fence-100.png")}
                            />

                            <Marker
                                key={"destination"}
                                coordinate={destinationCoordinate}
                                title={activity.description}
                                description={activity.description}
                            />
                            {/*<Marker draggable={true}*/}
                            {/*    // coordinate={{latitude: location.latitude, longitude: location.longitude}}*/}
                            {/*        coordinate={coord}*/}

                            {/*        onDragEnd={(e) => setCoord(e.nativeEvent.coordinate)}*/}
                            {/*        icon={require("./icons8-geo-fence-100.png")}*/}
                            {/*/>*/}
                            <MapViewDirections
                                origin={locationCoordinate}
                                destination={destinationCoordinate}
                                apikey={ApiKey}
                                lineDashPattern={[0]}
                                strokeWidth={4}
                                strokeColor="hotpink"
                            />


                        </MapView>

                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </Pressable>
                    </View>
                </View>

            </Modal>


            <Text style={styles.activity}>{activity.title}</Text>
            <Text style={styles.description}>{activity.description}</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>

                <View style={styles.row1}>
                    <Ionicons name="location" size={25} color="green"/>
                    <Text style={styles.location}>{activity.location}</Text>

                </View>
            </TouchableOpacity>

            <View style={styles.row1}>
                <Ionicons name="time" size={25} color="green"/>
                <Text style={styles.time}>{activity.time? activity.time.substring(0,16) : null}</Text>
            </View>

            {show_activity_price(activity.price)}
            <View style={styles.row1}>
                <Ionicons name="people" size={25} color="green"/>
                <Text style={styles.map}> {activity.users? activity.users.length :null}/{activity.maxppl}</Text>
            </View>

            <FlatList style={styles.teilnehmer} data={activity.users} renderItem={({item}) => show_users_list(item)}/>

            {show_participation_button(activity.participants)}
        </View>
    );
}

const styles = StyleSheet.create({
    component: {
        backgroundColor: '#ADD8E6',
        borderRadius: 10,
        width: '100%',
        height: '100%',
        padding: 20,
    },


    activity: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 5,


    },

    description: {
        marginBottom: 30,

    },
    location: {

        paddingLeft: 10,
    },
    time: {
        paddingLeft: 10,

    },

    map: {
        paddingLeft: 10,

    },
    teilnehmer: {
        flex: 0,
        flexDirection: 'row',


    },
    userbutton: {
        backgroundColor: '#B8B8B8',
        borderRadius: 5,
        padding: 5,
        overflow: 'hidden',
        margin: 5,
        width: 100,
        paddingLeft: 10,
        flex: -1,
        flexDirection: 'row',

    },
    row1: {
        padding: 5,
        flex: 0,
        flexDirection: 'row',


    },

    usertext: {
        marginLeft: 10,
    },
    button: {
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


})