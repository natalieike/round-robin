import React, { Component} from 'react';

class FbLogin extends Component {
  constructor(props) {
    super(props);
    this.checkLoginState = this.checkLoginState.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.testAPI = this.testAPI.bind(this);
    this.statusChangeCallback = this.statusChangeCallback.bind(this);
  }

  componentDidMount() {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId      : '1596794870414703',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.11'
      });
      window.FB.AppEvents.logPageView();
      this.checkLoginState();
      window.FB.Event.subscribe('auth.statusChange', function(response) {
        if (response.authResponse) {
          this.checkLoginState();
        } else {
          console.log('---->User cancelled login or did not fully authorize.');
          this.checkLoginState();
        }
      }.bind(this));
    }.bind(this);

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.11&appId=1596794870414703';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  testAPI() {
    console.log('Welcome! Fetching your information.... ');
    window.FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      console.log(response);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }

  // This is called with the results from from FB.getLoginStatus().
  statusChangeCallback(response) {
    console.log("status callback");
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      this.testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'You are not logged in to this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'You are not logged in.';
    }
  }

  checkLoginState() {
    window.FB.getLoginStatus(function(response) {
      console.log(response);
      this.statusChangeCallback(response);
    }.bind(this));
  }

  handleClick() {
    window.FB.login(this.checkLoginState());
  }

  handleResponse = (data) => {
    console.log(data);
  }
 
  handleError = (error) => {
    console.log(error);
  }
 
  render() {
    return (
      <div>
        <div className="fb-login-button" 
          data-max-rows="1" 
          data-size="medium" 
          data-button-type="login_with" 
          data-show-faces="false" 
          data-auto-logout-link="true" 
          data-use-continue-as="true"
          onClick={this.handleClick}
          onChange={this.checkLoginState}
          onError={this.handleError}
        >
        </div>
        <div id="status"></div>
      </div>              
    );
  }
}
  
export default FbLogin;