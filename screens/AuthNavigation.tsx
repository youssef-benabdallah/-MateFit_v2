import { createStackNavigator } from 'react-navigation-stack'
import Signup from '../screens/Signup'
import Signin from "./Signin";

const AuthNavigation = createStackNavigator(
    {
        Signup: { screen: Signup },
        Signin: { screen: Signin },

    },
    {
        initialRouteName: 'Signin',
        headerMode: 'none'
    }
)

export default AuthNavigation