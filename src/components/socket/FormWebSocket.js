import Methods from "../request/Methods";
import {M_SEND} from "../../constants/message/main";

function FormWebSocket ({ createLink }) {
  const methods = ['SOCKET'];
  const sendForm = async (e) => {
    e.preventDefault();
    const $form = e.target;
    const url = $form.url.value;

    createLink(url);
  }

  return(
    <form onSubmit={sendForm}>
      <div className="uk-flex">
        <select className="uk-select uk-width-auto" name="method" id="method">
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
    </form>
  )
}

export default FormWebSocket;