import {useState} from "react";

function ReqItem() {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  const changeKey = (e) => {
    const newKey = e.target.value;
    setKey(newKey);
  }

  const changeValue = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
  }

  return (
    <div className="uk-flex">
      <input className="uk-input" name="key" type="text" value={key} onChange={changeKey}/>
      <input className="uk-input" name="value" type="text" value={value} onChange={changeValue}/>
    </div>
  )
}
export default ReqItem;