import {useState} from "react";
import ReqItem from "./ReqItem";
import {M_ADD, M_BODY_REQUEST, M_METHODS_DATA} from "../constants/message/main";

function FillBodyBlock () {
  const [bodyItems, addBodyItem] = useState([]);
  const [selectMethod, setSelectMethod] = useState('none');
  const [bodyActive, setBodyActive] = useState(false);

  const addBodyItemFunc = () => {
    addBodyItem(
      [
        ...bodyItems,
        <ReqItem key={bodyItems.length} />
      ]
    )
  }

  const changeMethod = (e) => {
    const methodName = e.target.value;
    setSelectMethod(methodName);
    if(methodName !== 'none') {
      setBodyActive(true);
    } else {
      setBodyActive(false);
    }
  }

  const methodData = ['none', 'form-data', 'x-www-form-urlencoded'];
  const methodBlock = methodData.map((method, index) =>
    <label key={index} className="uk-margin-small-right">
      <input
        onChange={changeMethod}
        className="uk-radio"
        type="radio"
        name="test"
        checked={method === selectMethod} value={method}
      />
      {method}
    </label>);

  return(
    <fieldset name="body" className="uk-width-expand uk-margin-small-top">
      <legend>
        { M_BODY_REQUEST }:
      </legend>
      <fieldset name="methodRequest">
        <legend>
          { M_METHODS_DATA }:
        </legend>
        { methodBlock }
      </fieldset>
      { bodyActive && bodyItems }
      { bodyActive && <button
        className="uk-button uk-button-primary uk-width-expand uk-margin-small-top"
        type="button"
        onClick={addBodyItemFunc}
      >
        { M_ADD }
      </button> }
    </fieldset>
  )
}

export default FillBodyBlock;