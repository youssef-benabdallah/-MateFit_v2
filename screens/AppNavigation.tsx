import { createStackNavigator } from 'react-navigation-stack'
import Home from '../screens/Home'
import Signin from "./Signin";
import Activity from "./Activity";
import App from "../App";
import Profile from "./Profile";
import BookTrainer from "./BookTrainer";
import MyProfile from "./MyProfile";
import BookingRequest from "./BookingRequest";

const AppNavigation = createStackNavigator(
    {
        Home: { screen: Home },
        Activity: { screen: Activity },
        Profile: { screen: Profile },
        BookTrainer: { screen: BookTrainer },
        MyProfile : {screen : MyProfile},
        BookingRequest: { screen: BookingRequest },



        // Signin: {screen : Signin},

    },
    {
        initialRouteName: 'Home',
        headerMode: 'none',


    }
)

export default AppNavigation