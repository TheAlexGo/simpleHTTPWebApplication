import Methods from "../Methods";
import {M_SEND} from "../../constants/message/main";
import FillHeaderBlock from "../FillHeaderBlock";
import FillBodyBlock from "../FillBodyBlock";
import HelperFunction from "../../helper/helper";
import {useState} from "react";

function FormRequest ({ createRequest }) {
  const methods = ['GET', 'POST', 'PUT', 'DELETE'];
  const [activeBody, setActiveBody] = useState(false);

  const sendForm = async (e) => {
    e.preventDefault();
    const $form = e.target;

    const methodRequest = $form.methodRequest?.querySelector('input:checked').value;
    const header = HelperFunction.getValue($form, 'header');
    const body = HelperFunction.getValue($form, 'body');

    if(!header['content-type']) {
      switch (methodRequest) {
        case 'form-data':
          header['Content-Type'] = 'multipart/form-data';
          break;
        case 'x-www-form-urlencoded':
          header['Content-Type'] = 'application/x-www-form-urlencoded';
          break;
        case 'raw':
          header['Content-Type'] = 'application/json';
          break;
        default:
          break;
      }
    }

    const url = $form.url.value;
    const data = {
      headers: header && HelperFunction.setHeadersData(header),
      body: body && (methodRequest === 'raw' ? body : HelperFunction.getFormData(body)),
      method: $form.method.value
    }
    await createRequest(url, data);
  }

  const changeHandler = (e) => {
    const method = e.target.value;
    if(method === 'POST' || method === 'PUT' || method === 'DELETE') {
      setActiveBody(true);
    } else {
      setActiveBody(false);
    }
  }
  return(
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
  )
}

export default FormRequest;