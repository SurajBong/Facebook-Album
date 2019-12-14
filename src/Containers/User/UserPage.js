import * as userActions from "../../Containers/UserState/UserActionCreator";

import React from "react";
import { connect } from "react-redux";

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localeObject: JSON.parse(localStorage.getItem("authResponse"))
    };
  }
  componentDidMount() {
    let { localeObject } = this.state;
    if (Object.keys(localeObject).length !== 0) {
      this.props.getUserDetails(localeObject.authResponse);
    } else {
      this.props.history.push("/");
    }
  }

  async showUserDetails() {
    await this.props.getUserProfilePicture(
      this.state.localeObject.authResponse
    );
    this.props.history.push({
      pathname: this.props.match.path + "/profile",
      state: {
        detail: this.props.userProp,
        profilePic: this.props.profilePicture
      }
    });
  }
  async navigateToAlbums() {
    await this.props.getUserAlbums(this.state.localeObject.authResponse);
    this.props.history.push({ pathname: this.props.match.path + "/albums" });
  }
  render() {
    return (
      <div className="container-fluid mt-3">
        <div className="jumbotron ">
          <h1 className="display-4">
            Hello, {this.props.userProp && this.props.userProp.name}!
          </h1>
          <hr className="my-4" />
          <button
            className="btn btn-primary btn-lg"
            onClick={this.showUserDetails.bind(this)}
          >
            View Profile Details
          </button>
          <button
            className="btn btn-warning btn-lg ml-1"
            onClick={this.navigateToAlbums.bind(this)}
          >
            View Albums
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    userProp: state.userReducer.userObject,
    profilePicture: state.userReducer.profilePictureObject
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getUserDetails: authObject =>
      dispatch(userActions.getUserProfile(authObject)),
    getUserProfilePicture: pictureObject =>
      dispatch(userActions.getUserProfilePicture(pictureObject)),
    getUserAlbums: albumObject =>
      dispatch(userActions.getUserAlbums(albumObject))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
