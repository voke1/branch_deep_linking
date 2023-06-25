import React, {Component} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {WebView} from 'react-native-webview';
// Step 5: Import branch and RegisterViewEvent
import branch, {RegisterViewEvent} from 'react-native-branch';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 64,
  },
  webView: {
    flex: 0.85,
  },
  button: {
    backgroundColor: '#cceeee',
    borderColor: '#2266aa',
    borderTopWidth: 1,
    flex: 0.15,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#2266aa',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default class Article extends Component {
  // Step 6: Add buo property
  buo = null;

  // Step 7: Add componentDidMount
  async componentDidMount() {
    this.buo = await branch.createBranchUniversalObject(
      'planet/' + this.props.route.title,
      {
        automaticallyListOnSpotlight: true, // ignored on Android
        canonicalUrl: this.props.route.url,
        title: this.props.route.title,
        contentImageUrl: this.props.route.image,
        contentIndexingMode: 'public', // for Spotlight indexing
      },
    );
    this.buo.userCompletedAction(RegisterViewEvent);
    console.log(
      'Created Branch Universal Object and logged RegisterViewEvent.',
    );
  }

  // Step 8: Add componentWillUnmount

  componentWillUnmount() {
    if (!this.buo) return;
    this.buo.release();
    this.buo = null;
  }

  render() {
    return (
      <View style={styles.container}>
        <WebView style={styles.webView} source={{uri: this.props.route.url}} />
        <TouchableHighlight
          onPress={() => this.onShare()}
          style={styles.button}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableHighlight>
      </View>
    );
  }

  async onShare() {
    // Step 9: Implement onShare
    let {channel, completed, error} = await this.buo.showShareSheet(
      {
        emailSubject: 'The Planet ' + this.props.route.title,
        messageBody: 'Read about the planet ' + this.props.route.title + '.',
        messageHeader: 'The Planet ' + this.props.route.title,
      },
      {
        feature: 'share',
        channel: 'RNApp',
      },
      {
        $desktop_url: this.props.route.url,
        $ios_deepview: 'branch_default',
      },
    );

    if (error) {
      console.error('Error sharing via Branch: ' + error);
      return;
    }

    console.log('Share to ' + channel + ' completed: ' + completed);

    // this.props.toggle();
  }
}
