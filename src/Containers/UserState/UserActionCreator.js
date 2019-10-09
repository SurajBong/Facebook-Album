import * as ActionTypes from "./UserActionTypes"

import axios from "axios"

export function updatedUserState(type, payload) {
    return {
        type: type,
        payload: payload
    }
}


export const setLoggedInUser = (authResponse) => {
    return dispatch => dispatch(updatedUserState(ActionTypes.SET_LOGGED_USER, { authResponse }))
}
export const getUserProfile = (authResponse) => {
    const url = `https://graph.facebook.com/${authResponse.userID}?fields=age_range,hometown,photos,name,email,first_name,last_name,birthday,location&access_token=${authResponse.accessToken}`
    return dispatch => {
        axios.get(url).then(res => {
            dispatch(updatedUserState(ActionTypes.GET_USER_PROFILE, { res }))
        }).catch(error => {
            alert(error.message)
        })
    }
}

export const getUserProfilePicture = (authres) => {
    const url = `https://graph.facebook.com/${authres.userID}/picture?redirect=false&access_token=${authres.accessToken}`;
    return dispatch => {
        axios.get(url).then(resProfile => {
            dispatch(updatedUserState(ActionTypes.SET_PROFILE_PHOTO, { resProfile }))
        }).catch(error => {
            alert(error.message)
        })
    }
}

export const getUserAlbums = (authres) => {
    const url = `https://graph.facebook.com/${authres.userID}/albums?redirect=false&access_token=${authres.accessToken}`;
    return dispatch => {
        axios.get(url).then(resAlbums => {
            dispatch(updatedUserState(ActionTypes.SET_ALBUMS, { resAlbums }))
        }).catch(error => {
            alert(error.message)
        })
    }
}

export const getAlbumPhotos = (albumId, authres) => {
    const url = `https://graph.facebook.com/${albumId}/photos?redirect=false&access_token=${authres.accessToken}`;
    
    return dispatch => {
        axios.get(url).then(allPhotos => {
            dispatch(updatedUserState(ActionTypes.GET_ALBUM_PHOTOS, { allPhotos }))
        }).catch(error => {
            alert(error.message)
        })
    }
}

