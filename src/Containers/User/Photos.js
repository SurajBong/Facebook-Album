import React, { Component } from "react"

import AlbumPhotos from "../../Components/User/AlbumPhotos"
import axios from "axios"
import { connect } from "react-redux"

class Photos extends Component {
    constructor() {
        super();
        this.state = {
            photosStateArray: [],
            localeObject: JSON.parse(localStorage.getItem("authResponse"))
        }
    }

    componentDidMount() {
        if (this.props.photosArray !== undefined) {
            let arr = [...this.props.photosArray]
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
                this.setState({ photosStateArray: arr });
            });
        }
        else {
            this.props.history.goBack()
        }
    }
    toggleSlideShow = () => {
        this.props.history.push({ pathname: this.props.match.url + "/slideshow", state: { photosSlideShow: this.state.photosStateArray } })
    }
    render() {
        return (
            <div className="container-fluid mt-3">
                <div className="row">
                    {this.state.photosStateArray && this.state.photosStateArray.map((photoItem, index) => {
                        return (
                            <AlbumPhotos key={index} item={photoItem} openAlbumSlideShow={() => this.toggleSlideShow()} />
                        )
                    })}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        photosArray: state.userReducer.albumsPhotos.data,
    }
}
const mapDispatchToProps = (dispatch) => { return {} }
export default connect(mapStateToProps, mapDispatchToProps)(Photos)
