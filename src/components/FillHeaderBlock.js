import ReqItem from "./ReqItem";
import {useState} from "react";

function FillHeaderBlock() {
  const [headerItems, addHeaderItem] = useState([]);
  const addHeaderItemFunc = () => {
    addHeaderItem(
      [
        ...headerItems,
        <ReqItem key={headerItems.length} />
      ]
    )
  }
  return(
    <fieldset name="header">
      <legend>
        Заголовок запроса:
      </legend>
      { headerItems }
      <button type="button" onClick={addHeaderItemFunc}>Добавить</button>
    </fieldset>
  )
}
export default FillHeaderBlock;