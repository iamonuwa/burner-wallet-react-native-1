import React, { Component } from "react";
import { Platform, View, Button, Text, StyleSheet } from "react-native";
import { WebView } from "react-native-webview-messaging/WebView";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      message: null
    };
  }

  _refWebView = webview => {
    this.webview = webview;
  };

  componentDidMount() {
    const { messagesChannel } = this.webview;

    messagesChannel.on("text", text =>
      this.setState({
        message: `Recevied text from webview: ${text}`
      })
    );

    messagesChannel.on("json", json =>
      this.setState({
        message: `Received json from webview: ${JSON.stringify(json)}`
      })
    );

    messagesChannel.on("greetingFromWebview", event =>
      this.setState({
        message: `Received "greetingFromWebview" event: ${JSON.stringify(
          event
        )}`
      })
    );
  }

  sendHelloToWebView = () => {
    this.webview.send("hello");
  };

  sendJsonToWebView = () => {
    this.webview.sendJSON({ payload: "hello" });
  };

  emitGreetingEventToWebView = () => {
    this.webview.emit("greetingFromRN", { payload: "hello" });
  };
  render() {
    return (
      // <WebView
      //   source={{ uri: "https://xdai.io" }}
      //   style={Platform.OS === "ios" ? styles.iosOnly : styles.androidOnly}
      //   onLoadProgress={e => console.warn('OnLoadProgress ',e.nativeEvent.progress)}
      //   useWebKit={true}
      //   ref={webview => {
      //     this.myWebView = webview;
      //   }}
      //   javaScriptEnabled={true}
      //   domStorageEnabled={true}
      //   startInLoadingState={true}
      //   mixedContentMode={"compatibility"}
      //   allowUniversalAccessFromFileURLs={true}
      // />
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, borderBottomWidth: 1, padding: 20 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ textAlign: "center" }}>{this.state.message}</Text>
          </View>

          <View>
            <Button
              title="Send text to WebView"
              onPress={this.sendHelloToWebView}
            />
            <Button
              title="Send json to WebView"
              onPress={this.sendJsonToWebView}
            />
            <Button
              title="Emit greeting event to WebView"
              onPress={this.emitGreetingEventToWebView}
            />
          </View>
        </View>
        <WebView
          source={{ uri: "https://xdai.io" }}
          style={{ flex: 1 }}
          ref={this._refWebView}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iosOnly: {
    marginTop: 20
  },
  androidOnly: {
    marginTop: 0
  }
});
