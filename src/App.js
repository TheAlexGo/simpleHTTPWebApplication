import './App.css';
import Methods from "./components/Methods";
import HelperFunction from "./helper/helper";
import {useState} from "react";
import FillBodyBlock from "./components/FillBodyBlock";
import FillHeaderBlock from "./components/FillHeaderBlock";


function App() {
  const [activeBody, setActiveBody] = useState(false);
  const [resultReq, setResultReq] = useState(null);

  const methods = [
    'GET', 'POST', 'PUT', 'DELETE'
  ];

  const sendForm = async (e) => {
    e.preventDefault();
    const $form = e.target;

    const header = HelperFunction.getValue($form, 'header');
    const body = HelperFunction.getValue($form, 'body');

    const url = $form.url.value;
    const data = {
      method: $form.method.value,
      header: header,
      body: body && JSON.stringify(body)
    }

    console.log(data)
    const response = await fetch(url, data)
    setResultReq(JSON.stringify(await response.json()));
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
    <div className="App">
      <form onSubmit={sendForm}>
        <select name="method" id="method" onChange={changeHandler}>
          <Methods methods={methods}/>
        </select>
        <input name="url" type="text" placeholder="Введите URL" id="url"/>
        <button type="submit">Send</button>
        <FillHeaderBlock />
        { activeBody && <FillBodyBlock /> }
      </form>
      <div id="resultReq">
        { resultReq }
      </div>
    </div>
  );
}

export default App;
