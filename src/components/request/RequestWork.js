import {useEffect, useState} from "react";
import FormRequest from "./FormRequest";
import AllRequestBlock from "../AllRequestBlock";
import Popup from "../popup/Popup";
import HelperFunction from "../../helper/helper";

function RequestWork({ allRequest, setAllRequest, dataModal, setDataModal }) {
  const [resultReq, setResultReq] = useState(null);

  function setDataModalFunc () {
    setDataModal(this);
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      UIkit.modal('#modal-request').show()
    }, 0);
  }

  const createRequest = async (link, data) => {
    const { result, dataHeaders, dataRespHeaders, dataBody, method, status } =
      await HelperFunction.createRequest(link, data);

    const newRequests = allRequest.slice();
    newRequests.unshift({ link, result, dataHeaders, dataRespHeaders, dataBody, method, status });
    setAllRequest(newRequests);
    setResultReq(JSON.stringify(result, undefined, 2));
  }


  return(
    <div>
      <FormRequest createRequest={createRequest}/>
      <div className="uk-flex">
        <div className="uk-width-expand">
          <h3 className="uk-text-center">Результат</h3>
          <pre className="uk-padding-small uk-padding-remove-top uk-padding-remove-bottom uk-margin-small-top request-block">
            { resultReq }
          </pre>
        </div>
        <div className="uk-width-expand">
          <h3 className="uk-text-center">Прошлые запросы</h3>
          <AllRequestBlock allRequest={allRequest} setDataModal={setDataModalFunc}/>
          <Popup dataPopup={dataModal} createRequest={createRequest} id={"modal-request"}/>
        </div>
      </div>
    </div>
  )
}

export default RequestWork;