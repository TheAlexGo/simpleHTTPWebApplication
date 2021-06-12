import {useRef, useState} from "react";
import FormWebSocket from "./FormWebSocket";
import AllRequestBlock from "../AllRequestBlock";
import Popup from "../popup/Popup";

function SocketWork({ allLink, setAllLink, dataModal, setDataModal }) {
  const [webSocketData, setWebSocketData] = useState([]);
  const [socket, setSocket] = useState(null);
  const refWsResultBlock = useRef(null);

  function setDataModalFunc () {
    setDataModal(this);
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      UIkit.modal('#modal-socket').show()
    }, 0);
  }

  const createLink = async (link) => {
    const ws = new WebSocket(link)

    ws.onopen = (e) => {
      const div = document.createElement('div');
      div.textContent = "Соединение установлено.";
      refWsResultBlock.current.appendChild(div);
    };

    ws.onclose = (event) => {
      const div = document.createElement('div');
      if (event.wasClean) {
        div.textContent = "Соединение закрыто чисто.";
      } else {
        div.textContent = "Обрыв соединения.";
      }
      div.textContent += `Код: ${event.code}, причина: ${event.reason}.`;
      refWsResultBlock.current.appendChild(div);
    };

    ws.onmessage = (event) => {
      const div = document.createElement('div');
      div.textContent = `Получены данные: ${event.data}.`;
      refWsResultBlock.current.appendChild(div);
    };

    ws.onerror = (error) => {
      const div = document.createElement('div');
      div.textContent = `Ошибка: ${error.message}.`;
      refWsResultBlock.current.appendChild(div);
    };

    const newRequests = allLink.slice();
    newRequests.unshift({ link });
    setAllLink(newRequests);
    setSocket(ws);
  }

  return(
    <div>
      <FormWebSocket createLink={createLink} />
      <div className="uk-flex">
        <div className="uk-width-expand">
          <h3 className="uk-text-center">Соединение по WebSocket</h3>
          <pre ref={refWsResultBlock} />
        </div>
        <div className="uk-width-expand">
          <h3 className="uk-text-center">Прошлые запросы</h3>
          <AllRequestBlock allRequest={allLink} setDataModal={setDataModalFunc}/>
          <Popup dataPopup={dataModal} createRequest={createLink} id={"modal-socket"} />
        </div>
      </div>
    </div>
  )
}

export default SocketWork;