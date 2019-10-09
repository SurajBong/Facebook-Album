import React from "react"

const AlbumComponent = ({ item, openAlbum }) => {
    return (
        <div className="col-sm p-1">
            <div className="card" style={{ width: "18rem", cursor: "pointer" }} onClick={openAlbum}>
                <img src={item.urlName && item.urlName} className="card-img-top" alt={item.name} />
                <div className="card-body">
                    <p className="card-text">{item.name}</p>
                </div>
            </div>
        </div>
    )
}

export default AlbumComponent