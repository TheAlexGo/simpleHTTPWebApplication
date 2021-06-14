import {useRef, useState} from "react";
import FormWebSocket from "./FormWebSocket";
import AllRequestBlock from "../AllRequestBlock";
import Popup from "../popup/Popup";
import HelperFunction from "../../helper/helper";

function SocketWork({ allLink, setAllLink, dataModal, setDataModal }) {
  const [socket, setSocket] = useState(null);
  // const [error, setError] = useState(null);
  const refWsResultBlock = useRef(null);

  function setDataModalFunc () {
    setDataModal(this);
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      UIkit.modal('#modal-socket').show()
    }, 0);
  }


  const createLink = async (link) => {
    if(socket) socket.close();
    const ws = HelperFunction.createLinkWS(link, refWsResultBlock);
    let status;
    if(ws !== 0) {
      setSocket(ws);
      status = 200;
    } else {
      status = 500;
    }

    const newRequests = allLink.slice();
    newRequests.unshift({ link, method: "SOCKET", status });
    setAllLink(newRequests);
  }

  return(
    <div>
      <FormWebSocket createLink={createLink} />
      <div className="uk-flex">
        <div className="uk-width-expand">
          <h3 className="uk-text-center">Соединение по WebSocket</h3>
          <pre ref={refWsResultBlock} className="request-block" />
        </div>
        <div className="uk-width-expand">
          <h3 className="uk-text-center">Прошлые соединения</h3>
          <AllRequestBlock allRequest={allLink} setDataModal={setDataModalFunc}/>
          <Popup dataPopup={dataModal} createRequest={createLink} id={"modal-socket"} />
        </div>
      </div>
    </div>
  )
}

export default SocketWork;