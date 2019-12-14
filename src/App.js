import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { BrowserRouter, Route } from "react-router-dom";

import Home from "./Containers/Main/Home";
import Nav from "./Components/Nav/Nav";
import Photos from "./Containers/User/Photos";
import PhotosCarousel from "./Components/User/PhotosCarousel";
import React from "react";
import UserAlbums from "./Containers/User/UserAlbums";
import UserPage from "./Containers/User/UserPage";
import UserProfile from "./Components/User/UserProfile";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="main-content">
        <Route path="/" exact component={Home} />
        <Route path="/facebook-albums" exact component={UserPage} />
        <Route path="/facebook-albums/profile" component={UserProfile} />
        <Route path="/facebook-albums/albums" exact component={UserAlbums} />
        <Route
          path="/facebook-albums/albums/:albumId"
          exact
          component={Photos}
        />
        <Route
          path="/facebook-albums/albums/:albumId/slideshow"
          component={PhotosCarousel}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
