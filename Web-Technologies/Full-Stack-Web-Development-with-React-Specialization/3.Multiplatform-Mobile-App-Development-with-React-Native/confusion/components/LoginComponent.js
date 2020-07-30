import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Input, CheckBox, Button, Icon } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { baseUrl } from '../shared/baseUrl';

import { Asset } from "expo-asset";
import * as ImageManipulator from "expo-image-manipulator";
import * as SecureStore from 'expo-secure-store';


// double check and test
class LoginTab extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            remember: false
        }
    }

    componentDidMount() {
        SecureStore.getItemAsync('userinfo')
            .then((userdata) => {
                let userinfo = JSON.parse(userdata);
                if (userinfo) {
                    this.setState({username: userinfo.username});
                    this.setState({password: userinfo.password});
                    this.setState({remember: true})
                }
            })
    }

    static navigationOptions = {
        title: 'Login',
        // something missing
    };

    handleLogin() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember)
            SecureStore.setItemAsync('userinfo', JSON.stringify({username: this.state.username, password: this.state.password}))
                .catch((error) => console.log('Could not save user info', error));
        else
            SecureStore.deleteItemAsync('userinfo')
                .catch((error) => console.log('Could not delete user info', error));

    }

    render() {
        return (
            <View style={styles.container}>
                <Input
                    placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    />
                <CheckBox title="Remember Me"
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckbox}
                    />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleLogin()}
                        title="Login"
                        color="#512DA8"
                        />
                </View>
            </View>
        );
    }

}

class RegisterTab extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: baseUrl + 'images/logo.png'
        }
    }

    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
            if (!capturedImage.cancelled) {
                console.log(capturedImage);
                this.setState({imageUrl: capturedImage.uri });
            }
        }

    }

    getImageFromGallery = async () => {
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    
        if (cameraRollPermission.status === 'granted') {
          const libraryImage = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            mediaTypes: 'Images',
          });
    
          if (!libraryImage.cancelled) {
            this.processImage(libraryImage.uri);
          }
        }
    }
    
    processImage = async (imageUri) => {
        try {
          const processedImage = await ImageManipulator.manipulateAsync(
            imageUri,
            [
              { resize: { width: 400 } },
            ],
            { format: 'png' },
          );
    
          this.setState({ imageUrl: processedImage.uri });
        } catch (error) {
          console.log(error);
        }
    }

    static navigationOptions = {
        title: 'Register',
        tabBarIcon: ({ tintColor, focused }) => (
            <Icon
              name='user-plus'
              type='font-awesome'            
              size={24}
              iconStyle={{ color: tintColor }}
            />
          ) 
    };

    handleRegister() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember)
            SecureStore.setItemAsync('userinfo', JSON.stringify({username: this.state.username, password: this.state.password}))
                .catch((error) => console.log('Could not save user info', error));
    }

    render() {
        return(
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image 
                        source={{uri: this.state.imageUrl}} 
                        loadingIndicatorSource={require('./images/logo.png')}
                        style={styles.image} 
                        />
                    <Button
                        title="Camera"
                        onPress={this.getImageFromCamera}
                        />
                    <Button
                        title="Gallery"
                        onPress={this.getImageFromGallery}
                    />
                </View>
                <Input
                    placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="First Name"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(lastname) => this.setState({firstname})}
                    value={this.state.firstname}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Last Name"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(lastname) => this.setState({lastname})}
                    value={this.state.lastname}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Email"
                    leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                    containerStyle={styles.formInput}
                    />
                <CheckBox title="Remember Me"
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckbox}
                    />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleRegister()}
                        title="Register"
                        icon={
                            <Icon
                                name='user-plus'
                                type='font-awesome'            
                                size={24}
                                color= 'white'
                            />
                        }
                        buttonStyle={{
                            backgroundColor: "#512DA8"
                        }}
                        />
                </View>
            </View>
            </ScrollView>
        );
    }
}

const LoginTabNavigator = createBottomTabNavigator();

function Login({ navigation }) {
    return (
    <LoginTabNavigator.Navigator

      tabBarOptions= {{
        activeBackgroundColor: '#9575CD',
        inactiveBackgroundColor: '#D1C4E9',
        activeTintColor: '#ffffff',
        inactiveTintColor: 'gray'
    }}>

        <LoginTabNavigator.Screen 
            name="Login" 
            component={LoginTab}/>
        <LoginTabNavigator.Screen name="Register" component={RegisterTab} />

    </LoginTabNavigator.Navigator>
    );
}



const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 40,
    },
    formInput: {
        margin: 20
    },
    formCheckbox: {
        margin: 40,
        backgroundColor: null
    },
    formButton: {
        margin: 60
    }
});


export default Login;