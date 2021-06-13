import './App.css';
import RequestWork from "./components/request/RequestWork";
import SocketWork from "./components/socket/SocketWork";
import {useState} from "react";


function App() {
  const [allRequest, setAllRequest] = useState([]);
  const [allLink, setAllLink] = useState([]);
  const [dataModal, setDataModal] = useState(null);

  window.onload = () => {
    if(localStorage.allRequest) {
      setAllRequest(JSON.parse(localStorage.allRequest));
    }

    if(localStorage.allLink) {
      setAllLink(JSON.parse(localStorage.allLink));
    }
  }

  window.onunload = () => {
    localStorage.allRequest = JSON.stringify(allRequest);
    localStorage.allLink = JSON.stringify(allLink);
  }

  return (
    <div className="uk-margin-small-left uk-margin-small-right uk-margin-small-top">
      <RequestWork allRequest={allRequest} setAllRequest={setAllRequest} dataModal={dataModal} setDataModal={setDataModal} />
      <SocketWork allLink={allLink} setAllLink={setAllLink} dataModal={dataModal} setDataModal={setDataModal} />
    </div>
  );
}

export default App;
