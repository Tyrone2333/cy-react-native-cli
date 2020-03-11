import React, {Component} from 'react'
import {Share, Button,TimePickerAndroid} from 'react-native'

export default class ShareExample extends Component {
    async onShare() {
        try {
            const {action, hour, minute} = await TimePickerAndroid.open({
                hour: 14,
                minute: 0,
                is24Hour: false, // Will display '2 PM'
            });
            if (action !== TimePickerAndroid.dismissedAction) {
                // Selected hour (0-23), minute (0-59)
            }
        } catch ({code, message}) {
            console.warn('Cannot open time picker', message);
        }

        return
        try {
            const result = await Share.share({
                message:
                    'React Native | A framework for building native apps using React',
                title: ' React',
            })

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message)
        }
    }

    render() {
        return (
            <Button onPress={this.onShare} title={'1111'}>
                Share
            </Button>
        )
    }
}
