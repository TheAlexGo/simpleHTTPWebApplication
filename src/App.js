import './App.css';
import Methods from "./components/Methods";
import HelperFunction from "./helper/helper";
import {useState} from "react";
import FillBodyBlock from "./components/FillBodyBlock";
import FillHeaderBlock from "./components/FillHeaderBlock";
import {M_SEND} from "./constants/message/main";
import AllRequestBlock from "./components/AllRequestBlock";


function App() {
  const [activeBody, setActiveBody] = useState(false);
  const [resultReq, setResultReq] = useState(null);
  const [allRequest, setAllRequest] = useState([]);

  const methods = ['GET', 'POST', 'PUT', 'DELETE'];

  const createRequest = async (link, data) => {
    const response = await fetch(link, data);
    setResultReq(JSON.stringify(await response.json()));

    const newRequests = allRequest.slice();
    newRequests.unshift({link, data});
    setAllRequest(newRequests);
    return 1;
  }

  const sendForm = async (e) => {
    e.preventDefault();
    const $form = e.target;

    const methodRequest = $form.methodRequest?.querySelector('input:checked').value;
    const header = HelperFunction.getValue($form, 'header');

    switch (methodRequest) {
      case 'form-data':
        header['Content-Type'] = 'multipart/form-data';
        break;
      case 'x-www-form-urlencoded':
        header['Content-Type'] = 'application/x-www-form-urlencoded';
        break;
      default:
        header['Content-Type'] = null;
        break;
    }

    const body = HelperFunction.getValue($form, 'body');

    const url = $form.url.value;
    const data = {
      headers: header && HelperFunction.getHeadersData(header),
      body: body && HelperFunction.getFormData(body),
      method: $form.method.value
    }
    await createRequest(url, data);
  }

  const changeHandler = (e) => {
    const method = e.target.value;
    if(method === 'POST' || method === 'PUT') {
      setActiveBody(true);
    } else {
      setActiveBody(false);
    }
  }


  return (
    <div className="uk-margin-small-left uk-margin-small-right uk-margin-small-top">
      <form onSubmit={sendForm}>
        <div className="uk-flex">
          <select className="uk-select uk-width-auto" name="method" id="method" onChange={changeHandler}>
            <Methods methods={methods}/>
          </select>
          <input className="uk-input uk-width-expand" name="url" type="text" placeholder="Введите URL" id="url"/>
          <button
            className="uk-width-auto uk-padding-small uk-padding-remove-vertical uk-button uk-button-primary"
            type="submit"
          >
            { M_SEND }
          </button>
        </div>
        <div className="uk-flex">
          <FillHeaderBlock />
          { activeBody && <FillBodyBlock /> }
        </div>
      </form>
      <div className="uk-flex">
        <div className="uk-width-expand">
          <h3 className="uk-text-center">Результат</h3>
          <pre>
            { resultReq }
          </pre>
        </div>
        <div className="uk-width-expand">
          <h3 className="uk-text-center">Прошлые запросы</h3>
          <AllRequestBlock allRequest={allRequest} createRequest={createRequest}/>
        </div>
      </div>
    </div>
  );
}

export default App;
