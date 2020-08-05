import React, {Component} from 'react';
import './App.css';
import './drum.css';
import Display from './Components/Display';
import PadBank from './Components/PadBank';
import VolumeControl from './Components/Controls/VolumeControl';
import SoundBanks from './data/soundBank';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bankSets: SoundBanks,
            currentBankSet: SoundBanks[0],
            display: "-",
            currentsoundBanksName: "default",
            audioVolume: 0.5
        }

        this.changeVolume = this
            .changeVolume
            .bind(this);

        this.updateDisplaySoundFileName = this
            .updateDisplaySoundFileName
            .bind(this);

        this.updateSoundBankAndDisplay = this
            .updateSoundBankAndDisplay
            .bind(this);
    }

    changeCurrentSoundBankName(SoundBankName) {

        this.setState({currentsoundBanksName: SoundBankName});

    }

    // Requires testing function does three things
    changeSoundBanks(newSoundBankName) {

        const soundBank = this.retrieveSoundBankViaName(newSoundBankName);

        this.setState({currentBankSet: soundBank});

    }

    changeVolume(volume) {

        this.setState({audioVolume: volume});

    }

    retrieveSoundBankViaName(name) {

        // retrieve all sound banks
        const availableSoundBanks = this.state.bankSets;

        let selectedSoundBank;

        for (let index = 0; index < availableSoundBanks.length; index++) {

            const soundBank = availableSoundBanks[index];

            if (soundBank.soundBanksName === name) {
                console.log("true");
                selectedSoundBank = soundBank;
                break;
            }

        }

        return selectedSoundBank;

    }

    updateDisplaySoundFileName(name) {

        this.setState({display: name});

    }
    updateSoundBankAndDisplay(newSoundBankName) {

        this.changeCurrentSoundBankName(newSoundBankName);
        this.changeSoundBanks(newSoundBankName)

    }

    render() {
        return (
            <div id="drum-machine" className="App">

                <Display
                    text={this.state.display}
                    updateSoundBankAndDisplay={this.updateSoundBankAndDisplay}
                    bankSets={this.state.bankSets}/>

                <div className="bottom">

                    <div className="controls">
                        <p className="master">Master</p>
                        <VolumeControl changeVolume={this.changeVolume}/>
                    </div>

                    <PadBank
                        audioVolume={this.state.audioVolume}
                        currentsoundBanksName={this.state.currentsoundBanksName}
                        currentBankSet={this.state.currentBankSet}
                        updateDisplaySoundFileName={this.updateDisplaySoundFileName}/>

                </div>
            </div>
        );
    }
}

export default App;