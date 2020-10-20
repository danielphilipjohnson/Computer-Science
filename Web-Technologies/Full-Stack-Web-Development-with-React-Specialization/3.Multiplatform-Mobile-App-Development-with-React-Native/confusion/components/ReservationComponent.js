import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Modal, Alert } from 'react-native';
import { Icon } from 'react-native-elements';

import * as Animatable from 'react-native-animatable';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';
import { Notifications } from 'expo';
class Reservation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            guests: 1,
            smoking: false,
            date: new Date(),
            showModal: false,
            showDate: false
        }

     
    }


 


    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }
    async obtainCalendarPermission() {
        let permission = await Permissions.getAsync(Permissions.CALENDAR);
        if (permission.status !== 'granted') {
          permission = await Permissions.askAsync(Permissions.CALENDAR);
          if (permission.status !== 'granted') {
            Alert.alert('Permission not granted to access the calendar');
          }
        }
        return permission;
      }

    


    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for '+ date + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        });
    }
    

    async getDefaultCalendarSource() {

        const defaultCalendarSource =
        Platform.OS === 'ios'
          ? await addReservationToCalendar()
          : { isLocalAccount: true, name: 'Expo Calendar' };
        console.error(defaultCalendarSource)
       return defaultCalendarSource;
        
    }

    async addReservationToCalendar(date) {
        //let defaultCalendarSource  = Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);


        //https://docs.expo.io/versions/latest/sdk/calendar/#calendarcreatecalendarasyncdetails
        let newCalendarID = await Calendar.createCalendarAsync({
          title: 'Con Fusion Table Reservation',
            color: 'blue',
            startDate: Date(Date.parse(date)),
            endDate: Date(Date.parse(date + (2 * 60 * 60 * 1000))),
            location: "121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong",
            timeZone: "Asia/Hong_Kong",
            source: {
                isLocalAccount: true,
                name: 'internalCalendarName',
                type: 'isLocalAccount'
            },
            
            name: 'internalCalendarName',
            ownerAccount: 'personal',
            accessLevel: Calendar.CalendarAccessLevel.OWNER,

        });
        Alert.alert('Reservation has been added to your calendar');
        console.log(`Your new calendar ID is: ${newCalendarID}`);
      }
      



   

    static navigationOptions = {
        title: 'Reserve Table',
    };

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    handleReservation() {
        Alert.alert(
            'Your Reservation OK?',
            'Number of Guests: ' + this.state.guests + '\nSmoking? ' + this.state.smoking + '\nDate and Time: ' + this.state.date,
            [
            {text: 'Cancel', onPress: () => this.resetForm(), style: 'cancel'},
            {text: 'OK', onPress: () => this.confirmReservation(this.state.date)},
            ],
            { cancelable: false }
        );
    }
    
    confirmReservation(date) {
        this.presentLocalNotification(date);
        this.addReservationToCalendar(date);
        this.resetForm();
      }
    
    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: new Date(),
            showModal: false
        });
    }
    render() {

        const onChange = (event, selectedDate) => {
            console.log(selectedDate);
            if (selectedDate) {
                this.setState({ date: selectedDate })
                this.setState({ showDate: false })
            }
        };

        return (
            <Animatable.View animation="zoomIn" duration={2000}>
            <ScrollView>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Guests</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.guests}
                        onValueChange={(itemValue, itemIndex) => this.setState({ guests: itemValue })}>
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="6" value="6" />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.smoking}
                        trackColor='#512DA8'
                        onValueChange={(value) => this.setState({ smoking: value })}>
                    </Switch>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date and Time</Text>
                    {
                        this.state.showDate && (
                            <DateTimePicker
                                style={{ flex: 2, marginRight: 20 }}
                                value={this.state.date}
                                mode="date"
                                display="default"
                                onChange={onChange}
                                minimumDate={new Date(1950, 0, 1)}
                                maximumDate={new Date(2300, 10, 20)}
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36
                                    },
                                }
                                }
                            />
                        )
                    }
                    <Icon
                        name='calendar'
                        type='font-awesome'
                        size={22}
                        onPress={() => this.setState({ showDate: true })}
                    />
                </View>
                <View style={styles.formRow}>
                    <Button
                        onPress={() => this.handleReservation()}
                        title="Reserve"
                        color="#512DA8"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>

                <Modal animationType={"slide"} transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => this.toggleModal()}
                    onRequestClose={() => this.toggleModal()}>
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Your Reservation</Text>
                        <Text style={styles.modalText}>Number of Guests: {this.state.guests}</Text>
                        <Text style={styles.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>
                        <Text style={styles.modalText}>Date and Time: {this.state.date.toLocaleDateString()}</Text>
                        <Button
                            onPress={() => { this.toggleModal(); this.resetForm(); this.setState({ showDate: false }) }}
                            color="#512DA8"
                            title="Close"
                        />
                    </View>
                </Modal>
            </ScrollView>
            </Animatable.View>
        );
    }
};

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default Reservation;