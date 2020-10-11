import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackView } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-community/picker';


//* SET THIS TO YOUR LOCAL IP TO REACH EXPRESS (type ipconfig in cmd on windows) */
const localip = "10.0.0.146";
const backend_port = "3000";

class LoginPage extends React.Component { 
  constructor(props) { 
    super(props);
    this.updateUserName = this.updateUserName.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.attemptLogin = this.attemptLogin.bind(this);
    this.validatePW = this.validatePW.bind(this);
    this.sendToSignUp = this.sendToSignUp.bind(this);
    this.state = {pw: "", uname: ""}
  }
  render() { 
    //image use learned from https://reactnative.dev/docs/image.html
    //all images are just copied from google, 
    //dory: https://www.google.com/url?sa=i&url=https%3A%2F%2Fmakeameme.org%2Fmeme%2Fwho-am-i-5973f1&psig=AOvVaw0UqkaawNr09S2nzI1OstRS&ust=1602181689631000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPDWl6eOo-wCFQAAAAAdAAAAABAD
    //spongebob: https://www.google.com/url?sa=i&url=https%3A%2F%2Fnymag.com%2Fintelligencer%2F2017%2F05%2Fwhat-is-the-mocking-spongebob-capitalized-letters-chicken-meme.html&psig=AOvVaw2NbIZslD3_VvkC5NaOcdlL&ust=1602181726451000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKjdmpqOo-wCFQAAAAAdAAAAABAD
    //yeah boy: https://www.google.com/url?sa=i&url=https%3A%2F%2Fknowyourmeme.com%2Fmemes%2Fmy-longest-yeah-boy-ever&psig=AOvVaw0AEAJYYRMdV1m0NtfSJ06u&ust=1602181852377000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPj16dKOo-wCFQAAAAAdAAAAABAD
    return (
      //Learned about the basic components from here: https://reactnative.dev/docs/components-and-apis#basic-components
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.container}>
        <Image style={styles.small_image} source={require("./dory.jpg")}></Image>
        <Text style={styles.login_label}>Enter your username!</Text>
        <TextInput 
          style={styles.TextInput}
          onChangeText={text=>this.updateUserName(text)}
        ></TextInput>
        <Image style={styles.small_image} source={require("./sponge.jpg")}/>
        <Text style={styles.login_label}>wHaT's ThE pAsWoRd?</Text>
        <TextInput 
          //learned how to obscure from
          //https://stackoverflow.com/questions/29337444/how-do-you-style-a-textinput-in-react-native-for-password-input
          secureTextEntry={true}
          style={styles.TextInput}
          onChangeText={text=>this.updatePassword(text)}
        ></TextInput>
        <Button title="Login!" onPress={this.validatePW}></Button>
        <Button title="New here? Sign up!" onPress={this.sendToSignUp}></Button>
        <StatusBar style="auto"/> 
        </ScrollView>
      </View>
    )
  }

  sendToSignUp() { 
    this.props.navigation.navigate('Sign Up');
  }

  validatePW() { 
    //fetch api info from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    //password send unencrypted--bad security (stretch goal)
    var params = "username=" + this.state.uname + "&password=" + this.state.pw
    fetch("http://" + localip + ":" + backend_port + "/authUser?" + params)
      .then(response => response.text())
      .then(text => this.attemptLogin(text));
  }

  attemptLogin(text) { 
    var authSucceeded = (text != "bad_pw" && text != "user_not_found");
    if (authSucceeded) { 
      //not sure if this is how to do login stuff, but I found info on params
      //in the navigation docs: https://reactnavigation.org/docs/params
      this.props.navigation.navigate('User Page', {username: this.state.uname, team: text});
    }
    else { 
      //learned this from https://reactnative.dev/docs/alert
      Alert.alert("Unrecognized username/password combo")
    }
  }

  updatePassword(pw) { 
    this.setState({pw: pw})
  }

  updateUserName(uname) { 
    this.setState({uname: uname})
  }
}

class SignUpPage extends React.Component { 
  constructor(props) { 
    super(props);
    this.attemptUserRegister = this.attemptUserRegister.bind(this);
    this.processUserExistsResponse = this.processUserExistsResponse.bind(this);
    this.state={uname: "", pw: "", conf_pw: "", team: "Heat"}
  }

  render() { 
    return (
       //picker usage info from: https://github.com/react-native-community/react-native-picker
      <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <Text style={styles.login_label}>Username</Text>
        <TextInput style={styles.TextInput} onChangeText={text=> this.setState({uname: text})}></TextInput>
        <Text style={styles.login_label}>Password</Text>
        <TextInput secureTextEntry={true} 
                  style={styles.TextInput} 
                  onChangeText={text => this.setState({pw: text})}></TextInput>
        <Text style={styles.login_label}>Confirm Password</Text>
        <TextInput secureTextEntry={true}
                   style={styles.TextInput}
                   onChangeText={text=> this.setState({conf_pw: text})}></TextInput>
        <Text style={styles.login_label}>Who's gonna bring it home?!?</Text>
        <Picker selectedValue={this.state.team}
              onValueChange={(value) => {
                this.setState({team: value});
              }}
              style={{height: 10, width: 150}}>
          <Picker.Item label="Heat" value="Heat"/>
          <Picker.Item label="Lakers" value="Lakers"/>
        </Picker>
      </View>
      <View>
        <Button title="Sign Up" onPress={this.attemptUserRegister}></Button>
      </View>
      </ScrollView>
    )
  }

  attemptUserRegister() { 
    if (this.state.pw != this.state.conf_pw) { 
      Alert.alert('Passwords do not match!');
      return;
    }
    var params = "username=" + this.state.uname 
    console.log('Sending ' + params);
    fetch("http://" + localip + ":" + backend_port + "/authUser/checkUsername?" + params)
    .then(response => response.text())
    .then(text => this.processUserExistsResponse(text == 'user_exists'));
  }

  processUserExistsResponse(user_exists) { 
    if (user_exists) { 
      Alert.alert('This user already exists!');
    }
    else { 
      //Use similar POST format as hack-a-thing-1
      var params = "username=" + this.state.uname + "&password=" + this.state.pw + "&team=" + this.state.team
      fetch("http://" + localip + ":" + backend_port + "/authUser", 
      {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params
      }
      )
      .then(response => response.text())
      .then(text => {
        Alert.alert(text);
        this.props.navigation.navigate('Login');
      });
    }
  }
}

class UserPage extends React.Component { 
  constructor(props) { 
    super(props);
  }

  render() { 
    return (
      //Again, not sure if route params are ideal for this use: https://reactnavigation.org/docs/params
      <View style={styles.container}>
        <Image style={styles.small_image} source={require('./longestyeahboy.jpg')}></Image>
        <Text style={styles.login_label}>Welcome, {this.props.route.params.username}!</Text>
        <Text style={styles.login_label}>You think the {this.props.route.params.team} will win!</Text>
      </View>
    )
  }
}

//Basic nav info: https://reactnavigation.org/docs/hello-react-navigation/
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Sign Up" component={SignUpPage}/>
        <Stack.Screen name="Login" component={LoginPage}/>
        <Stack.Screen name="User Page" component={UserPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// using similar styling approach as default app
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextInput: { 
     height: 40, 
     width: 200, 
     borderColor: 'gray', 
     borderWidth: 1
  },
  small_image: { 
    width: 200,
    height: 200
  },
  login_label: { 
    fontSize: 20,
  }
});
