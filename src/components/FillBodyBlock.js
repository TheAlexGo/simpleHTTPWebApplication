import {useState} from "react";
import ReqItem from "./ReqItem";

function FillBodyBlock () {
  const [bodyItems, addBodyItem] = useState([]);
  const addBodyItemFunc = () => {
    addBodyItem(
      [
        ...bodyItems,
        <ReqItem key={bodyItems.length} />
      ]
    )
  }
  return(
    <fieldset name="body">
      <legend>
        Тело запроса:
      </legend>
      { bodyItems }
      <button type="button" onClick={addBodyItemFunc}>Добавить</button>
    </fieldset>
  )
}

export default FillBodyBlock;