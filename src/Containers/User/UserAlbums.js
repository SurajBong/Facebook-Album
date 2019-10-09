import * as userActions from "../UserState/UserActionCreator"

import AlbumComponent from "../../Components/User/UserAlbum"
import React from "react"
import axios from "axios"
import { connect } from "react-redux"

class UserAlbums extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            albumArray: [],
            localeObject: JSON.parse(localStorage.getItem("authResponse"))
        }
    }
    componentDidMount() {
        if (this.props.albumsArray !== undefined) {
            let arr = [...(this.props.albumsArray && this.props.albumsArray)]
            let { localeObject } = this.state
            Promise.all(
                arr.map(item => {
                    const url = `https://graph.facebook.com/${item.id}/picture?redirect=false&access_token=${localeObject.authResponse.accessToken}`;
                    axios.get(url).then(res => {
                        item.urlName = res.data.data.url
                    }).catch(error => {
                        // alert(error.message)
                    })
                    return item
                }
                )
            ).then(arr => {
                this.setState({ albumArray: arr });
            });
        }
        else {
            this.props.history.goBack()
        }
    }

    toggleAlbumContainer = (id) => {
        this.props.getAllPhotos(id, this.state.localeObject.authResponse)
        this.props.history.push({ pathname: `${this.props.match.path}/${id}` })
    }
    render() {
        return (
            <div className="container-fluid mt-3">
                <div className="row">
                    {this.state.albumArray && this.state.albumArray.map((albumItem, index) => {
                        return (
                            <AlbumComponent key={index} item={albumItem} openAlbum={() => this.toggleAlbumContainer(albumItem.id)} />
                        )
                    })}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        albumsArray: state.userReducer.albumsObject.data
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllPhotos: (albumId, auth) => dispatch(userActions.getAlbumPhotos(albumId, auth))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserAlbums)