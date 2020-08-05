import React, {Component} from 'react';


class Controls extends Component {

    onChange(event) {
        const soundSetName = event.target.value;
        this
            .props
            .updateSoundBankAndDisplay(soundSetName);
    }

    makeSoundOptions() {
        
        /**
         * Retrieve the name of every bank set
         * Create and option tag with that value
        */

        const bankSets = this.props.bankSets;

        const soundSetChoices = bankSets.map((drumObj, i, padBankArr) => {

            return (
                <option key={i} value={padBankArr[i].soundBanksName}>{padBankArr[i].soundBanksName}</option>
            );
        });

        return soundSetChoices;

    }
    render() {

        return (

            <select
                name="soundset"
                onChange={this
                .onChange
                .bind(this)}>
                {this.makeSoundOptions()}

            </select>

        )
    }
}

export default Controls;