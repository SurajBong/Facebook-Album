import React from "react"

const UserProfile = props => {
    let { detail, profilePic } = props.location.state
    const goPrevious = () => {
        props.history.goBack()
    }

    return (
        <div className="container-fluid mt-3">
            <div className="card mb-3" style={{ maxWidth: "640px" }}>
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img src={profilePic && profilePic.data && profilePic.data.url}
                            className="card-img" alt={detail && detail.name}
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{detail && detail.name}</h5>
                            <p className="card-text"><h6>Email</h6>{detail && detail.email}</p>
                            <p className="card-text"><h6>Date of Birth</h6>{detail && detail.birthday}</p>
                            <p className="card-text"><h6>Home Town</h6>{detail && detail.hometown && detail.hometown.name}</p>
                            <p className="card-text"><h6>Current Location</h6>{detail && detail.location && detail.location.name}</p>
                            <button className="btn btn-primary" onClick={goPrevious}>Go back</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )
}
export default UserProfile