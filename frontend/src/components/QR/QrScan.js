import React, { Component } from 'react';
import QrReader from 'react-qr-reader';
import './qr.scss';
export class QrScan extends Component {
    state = {
        result: 'No result'
    }
    handleScan = data => {
        if (data) {
            this.setState({
                result: data
            })
        }
    }
    handleError = err => {
        console.error(err)
    }
    render() {
        return (
            <div className="qrContainer">
                <QrReader
                    delay={100}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{ width: '300px' }}
                />
                <p>{this.state.result}</p>
            </div>
        )
    }
}