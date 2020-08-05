import React, {Component} from 'react';
import Controls from './Controls/Controls';

class Display extends Component {

    render() {
        return (
            <header id="display" className="top">
                <div className="power-buttons">
                    <h1 className="title">
                        FCC: Drum Machine</h1>
                    <button className="power-button">Off</button>
                </div>
                <div className="Drum-display">
                    <table>
                        <thead>
                            <tr>
                                <th>Previous</th>
                                <th>Next</th>
                                <th>*</th>
                                <th>Load</th>
                            </tr>
                        </thead>
                    </table>
                    <div className="categories">
                        <h2 className="logo">{this.props.text}</h2>

                        <Controls
                            updateSoundBankAndDisplay={this.props.updateSoundBankAndDisplay}
                            bankSets={this.props.bankSets}/>

                    </div>
                </div>
            </header>
        )
    }
}

export default Display;