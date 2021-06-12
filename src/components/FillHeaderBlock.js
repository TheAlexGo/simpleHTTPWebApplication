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
    <fieldset name="header" className="uk-width-expand uk-margin-small-top">
      <legend>
        Заголовок запроса:
      </legend>
      { headerItems }
      <button
        className="uk-button uk-button-primary uk-width-expand uk-margin-small-top"
        type="button"
        onClick={addHeaderItemFunc}
      >
        Добавить
      </button>
    </fieldset>
  )
}
export default FillHeaderBlock;