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
export default function BookingRequest({navigation, route}) {


    const ApiKey = 'AIzaSyAHenjJYVRsj5kVTKTmFZbdSfGvn1zk3vI';
    const [modalVisible, setModalVisible] = useState(false);


    // const [activity, setActivity] = useState('');
    const [booking, setBooking] = useState(route.params.booking);


    useEffect(() => {
        Load();
        getLocation();
        getDistinationCoordinate();
    }, []);

    const Reload = () => {
        Load();
    }

    const Load = () => {

        fetch('https://matefit-test.herokuapp.com/api/booking/' + booking.id,
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
                setBooking(res);
            }).catch((error) => {
            console.error(error)
        })
    }


    const accept_booking = () => {
        fetch('https://matefit-test.herokuapp.com/api/booking/' + booking.id + '/accept',
            {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + global.user.token,
                }
            })
            .then(res => {
                alert('booking accepted')
                Load();

                console.log(res)
            }).catch((error) => {
            console.error(error)
        })
    }

    const decline_booking = () => {
        fetch('https://matefit-test.herokuapp.com/api/booking/' + booking.id + '/decline',
            {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + global.user.token,
                }
            })
            .then(res => {
                alert('booking declined')
                Load();

                console.log(res)
            }).catch((error) => {
            console.error(error)
        })
    }


    const show_request_button = () => {
        if (booking.status == "pending")

            return [
                <Button key={'Button1' + booking.id} onPress={decline_booking} title="Decline"></Button>,

                <Button key={'Button2' + booking.id} onPress={accept_booking} title="Accept"></Button>
            ]
    }


    const show_users_list = (id) => {
        return <TouchableOpacity style={styles.userbutton} key={'TouchableOpacity' + id} onPress={() => {
            navigation.navigate('Profile', {id: id})
        }}>
            <Ionicons name="person" size={20} color="green"/>
            <Text style={styles.usertext} key={'userText' + id}>{id}</Text>

            {/*<Text style={styles.usertext} key={'userText' + user.id}>{user.name.toUpperCase()}</Text>*/}
        </TouchableOpacity>
    }


    const [mapView, setMapView] = useState();


    const [locationCoordinate, setLocationCoordinate] = useState({latitude: 0, longitude: 0});

    const [errorMsg, setErrorMsg] = useState(null);


    let getLocation = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();

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
        const uri = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + booking.location + '&key=' + ApiKey;
        const resp = await fetch(uri);
        const respJson = await resp.json();
        await setData(respJson);
        await setDestinationCoordinate({
            latitude: respJson.results[0].geometry.location.lat,
            longitude: respJson.results[0].geometry.location.lng
        });

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
                                onPress={(e) => {
                                }}
                                icon={require("./icons8-geo-fence-100.png")}
                            />

                            <Marker
                                key={"destination"}
                                coordinate={destinationCoordinate}
                                title={booking.description}
                                description={booking.description}
                            />

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


            <Text style={styles.activity}>{booking.title}</Text>
            <Text style={styles.description}>{booking.description}</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>

                <View style={styles.row1}>
                    <Ionicons name="location" size={25} color="green"/>
                    <Text style={styles.location}>{booking.location}</Text>

                </View>
            </TouchableOpacity>

            <View style={styles.row1}>
                <Ionicons name="time" size={25} color="green"/>
                <Text style={styles.time}>{booking.time}</Text>
            </View>

            <View style={styles.row1}>
                <Ionicons name="people" size={25} color="green"/>
                <Text style={styles.map}> {booking.maxppl}</Text>
            </View>

            <FlatList style={styles.teilnehmer} data={booking.users} renderItem={({item}) => show_users_list(item)}/>

            {show_users_list(booking.mate_id)}
            {show_request_button()}
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
    },   title:{
        fontSize: 20,
        fontWeight: 'bold',
        color:'#F4EBD9',
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
        flexDirection: 'column',


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