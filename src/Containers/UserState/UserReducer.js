import * as ActionTypes from "./UserActionTypes"

const initialState = {
    userObject: {},
    profilePictureObject: {},
    albumsObject: {},
    loggedUser: {},
    albumsPhotos: {}
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_LOGGED_USER:
            return {
                ...state,
                loggedUser: { ...state.loggedUser, ...action.payload.authResponse }
            }
        case ActionTypes.GET_USER_PROFILE:
            return {
                ...state,
                userObject: { ...state.userObject, ...action.payload.res.data }
            };
        case ActionTypes.SET_PROFILE_PHOTO:
            return {
                ...state,
                profilePictureObject: { ...state.profilePictureObject, ...action.payload.resProfile.data }
            }
        case ActionTypes.SET_ALBUMS:
            let albums = action.payload.resAlbums.data
            return {
                ...state,
                albumsObject: { ...state.albumsObject, ...albums }
            }
        case ActionTypes.GET_ALBUM_PHOTOS:
            let albums_photos = action.payload.allPhotos.data
            return {
                ...state,
                albumsPhotos: { ...state.albumsPhotos, ...albums_photos }
            }
        default:
            return state
    }
}
export default userReducer