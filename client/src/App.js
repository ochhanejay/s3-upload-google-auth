import './App.css';
import * as React from 'react';
import SignIn from './components/login/login';
import { Route, Routes } from 'react-router';
import Navbar from './components/screens/appBar';
import ShowImages from './components/screens/showFiles';
import "bootstrap/dist/css/bootstrap.css";
import { gapi } from "gapi-script";
import CknContext, { authContext } from './context/context';
import UploadFile from './components/uploadFile';
const clientId = "1040864158683-jcv3gm6vdds7hqge7o7lsf1qdcl0a3mc.apps.googleusercontent.com";
function App() {
  let navShow = localStorage.getItem("navShow") == "true" ? true : false;
  const { navbarShow } = React.useContext(authContext);
  React.useEffect(() => {
    navShow = localStorage.getItem("navShow") == "true" ? true : false;
  }, [navbarShow]);

  React.useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    }
    gapi.load("client:auth2", start);

  }, [navbarShow]);

  return (

    <div className="">
      <div className={navShow == true ? "d-block" : "d-none"} >
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/appBar" element={<Navbar />} />
        <Route path="/uploadFile" element={<UploadFile />} />
        <Route path="/showFiles" element={<ShowImages />} />
        <Route path="*" element={<div>404 not found</div>} />
      </Routes>
    </div>

  );
}

export default App;
