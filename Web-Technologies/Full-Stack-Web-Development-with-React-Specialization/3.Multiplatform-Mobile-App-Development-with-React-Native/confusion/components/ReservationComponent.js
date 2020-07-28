import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Modal } from 'react-native';
import { Icon } from 'react-native-elements';

import DateTimePicker from '@react-native-community/datetimepicker';

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

    static navigationOptions = {
        title: 'Reserve Table',
    };

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    handleReservation() {
        //console.log(JSON.stringify(this.state));
        this.toggleModal();
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