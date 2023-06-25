import React, { Component } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { Navigator } from 'react-native-deprecated-custom-components'

// Step 1: import branch

// import ArticleList from './ArticleList'
// import Article from './Article'
import ArticleList from './ArticleList';
import Article from './Article';

export default class App extends Component {
  navigator = null;

  constructor(props){
    super(props);
    this.state ={
      toggle: false,
    }
  }

  // Step 2: Add _unsubscribeFromBranch property

  // Step 3: Add componentDidMount

  // Step 4: Add componentWillUnmount

  render() {
    return (
      <Navigator
        initialRoute={{ title: "The Planets", url: null }}
        navigationBar={
           <Navigator.NavigationBar
             routeMapper={{
                LeftButton: (route, navigator, index, navState) => {
                  if (route.url) return (
                    <Button
                      onPress={() => {navigator.pop()}}
                      title={"Back"} />
                  )

                  return <View />
                },
                RightButton: (route, navigator, index, navState) => {
                  return <View />
                },
                Title: (route, navigator, index, navState) => { return (
                  <Text
                    style={{fontSize: 23, fontWeight: 'bold'}}>
                    {route.title}
                  </Text>
                ) },
             }}
           />
         }
        renderScene={(route, navigator) => {
          // hack
          this.navigator = navigator

          {console.log('toglle', this.state.toggle)}
          if (!this.state.toggle) {
            return <ArticleList navigator={navigator} toggle={(item)=> this.setState({toggle: item})} />
          }
          return <Article route={this.state.toggle} toggle={()=> this.setState({toggle: null})} />;
        }} />
    )
  }
}
