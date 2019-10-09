import React from 'react';

class Home extends React.Component {
  state = {
    isLoggedIn: false
  }
  componentDidMount() {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: "1012124255796024",
        cookie: true,
        xfbml: true,
        version: 'v4.0'
      });
      window.FB.Event.subscribe('auth.authResponseChange', (response) => {
        this.checkLoginState()
      });
      window.FB.Event.subscribe('auth.login', () => { });
    }
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

  }

  checkLoginState() {
    window.FB.getLoginStatus((response) => {
      localStorage.setItem("authResponse", JSON.stringify(response))
      this.statusChangeCallback();
    });
  }
  statusChangeCallback = () => {
    let locale = JSON.parse(localStorage.getItem("authResponse"))
    if (locale.status === "connected") {
      this.props.history.push({ pathname: "/facebook-albums", state: { detail: locale } })
    } else {
      this.props.history.push("/")
    }
  }
  render() {
    return (
      <div className="container-fluid mt-3">
        <div className="card">
          <div className="card-header">
            Welcome to Facebook Albums
        </div>
          <div className="card-body">
            <div className="fb-login-button" data-width="" data-size="large" data-button-type="login_with" data-auto-logout-link="false" data-use-continue-as="false" onClick={this.checkLoginState.bind(this)} />
          </div>
        </div>
      </div>
    )
  }
}


export default Home