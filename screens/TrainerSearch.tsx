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
import {Picker} from "@react-native-picker/picker";


// @ts-ignore
export default function TrainerSearch({navigation}) {

    const [trainers, setTrainers] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDiscipline, setSelectedDiscipline] = useState("Fußball");

    const [name, setName] = useState('');
    const [discipline, setDiscipline] = useState('');



    const SearchTrainer = async () => {

        await fetch('https://matefit-test.herokuapp.com/api/searchtrainer',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // @ts-ignore
                    Authorization: 'Bearer ' + global.user.token,
                },
                body: JSON.stringify({
                    name: name,
                    dicipline: selectedDiscipline,

                })
            }).then(res => res.json())
            .then(res => {
                setTrainers(res);
                setModalVisible(true);
                console.log(res);
            }).catch((error) => {
                console.error(error)
            })

    }

    const trainer_template = () => {
        console.log(global.user.token);
        if (trainers)
        return (
            trainers.map((trainer) => {
                return [
                    <TouchableOpacity style= {styles.component} key={'TouchableOpacity' + trainer.id} onPress={() =>{
                        setModalVisible(false);
                        navigation.navigate('BookTrainer',{profileID:trainer.id})}}>

                        <View key={'trainerView1' + trainer.id} style={styles.row}>
                            <Text style ={styles.title2} key={'title' + trainer.id}>{trainer.name? trainer.name.toUpperCase():null}</Text>
                            <Text style ={styles.type} key={'type' + trainer.id}>Trainer</Text>
                        </View>

                        <View key={'trainerView2' + trainer.id}style={styles.row2}>

                            <Text style ={styles.location} key={'location' + trainer.id}>{trainer.dicipline}</Text>
                        </View>


                        <View key={'trainerView3' + trainer.id} style={styles.row1}>

                            <Text style ={styles.time} key={'time' + trainer.id}>{trainer.gender}</Text>
                        </View>

                    </TouchableOpacity>,

                ]
            })
        )

    }




    return (

        <View style={styles.container}>

            <Text></Text>
            <Text style={styles.title}>Trainer Search</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>

            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{width: '100%', marginTop: 10}}
                contentContainerStyle={{width: '100%', alignItems: 'center'}}
            >

                <Text>Name</Text>
                <TextInput key={'name'}
                           style={styles.inputText}
                           onChangeText={
                               (Name) => {
                                   setName(Name);

                               }
                           }/>
                {/*<Text>Discipline</Text>*/}
                {/*<TextInput key={'Discipline'}*/}
                {/*           style={styles.inputText}*/}
                {/*           onChangeText={*/}
                {/*               (Discipline) => {*/}
                {/*                   setDiscipline(Discipline);*/}

                {/*               }*/}

                {/*           }/>*/}
                <View style={{borderWidth:1, width:180, marginLeft:15, marginTop:15}}>
                <Picker
                    style={styles.selectMenu}
                    dropdownIconColor={'red'}
                    itemStyle={{borderWidth:6}}

                    key={'discipline'}
                    selectedValue={selectedDiscipline}
                    onValueChange={(itemValue, itemIndex) => setSelectedDiscipline(itemValue)}>
                    <Picker.Item label="Fußball" value="fußball"/>
                    <Picker.Item label="Basketball" value="basketball"/>
                    <Picker.Item label="Other" value="other"/>

                </Picker>
                </View>



<Text></Text>
                <Text></Text>

                <Button key={'TrainerSearchButton'} onPress={SearchTrainer} title='Search Trainer'></Button>



            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);

                }} style ={styles.modal}
            >

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}style ={styles.modal}>
                    <View style={[styles.centeredView,styles.modal]}>
                        <View style={[styles.modalView,styles.modal]}>
                            {trainer_template()}


                        </View>
                    </View>
                    <Pressable
                        style={[styles.button, styles.buttonClose, styles.modal]}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Text style={styles.textStyle}>Close</Text>
                    </Pressable>
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
        width:'100%',
    },
    selectMenu:{

        marginLeft: 0,
        borderRadius: 7,
        borderColor: "black",
        backgroundColor : '#000000',
        height: 40,
        width: 177,
        // backgroundColor: "#FFFFFF",
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
        elevation: 2,
        width:'100%'
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
    modal:{
        width:'100%'

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
        width: '100%',
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
