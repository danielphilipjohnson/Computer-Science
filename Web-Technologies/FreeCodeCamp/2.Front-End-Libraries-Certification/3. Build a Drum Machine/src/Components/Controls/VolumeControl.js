import React, {Component} from 'react';

class VolumeControl extends Component {

    onChange(event) {

        this
            .props
            .changeVolume(event.target.value / 100)

    }

    render() {

        return (
            <div className="slidecontainer">
                <input
                    type="range"
                    min="1"
                    max="100"
                    className="slider"
                    id="volume"
                    onChange={this
                    .onChange
                    .bind(this)}/>
            </div>
        )
    }
}

export default VolumeControl;