import React, { Component} from 'react';

class FbLogin extends Component {
  constructor(props) {
      super(props);
      this.Fb = props.fb;
  }
  
  componentDidMount () {
    this.Fb.getLoginStatus(function(response) {
      console.log(response);
      if (response.status === 'connected') {
        console.log('Logged in.');
      }
      else {
        this.Fb.login();
      }
    });
  }

  handleResponse = (data) => {
    console.log(data);
  }
 
  handleError = (error) => {
    this.setState({ error });
  }
 
  render() {
    return (
      <div className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="true">
      </div>              
    );
  }
}
  
export default FbLogin;