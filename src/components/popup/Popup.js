import ModalPortal from "./ModalPortal";
import HelperFunction from "../../helper/helper";
import ModalDataBlock from "./ModalDataBlock";

function Popup({dataPopup, createRequest, id}) {
  if(!dataPopup) return null;
  const { link, result, dataHeaders, dataBody, dataRespHeaders, method, status } = dataPopup;
  const data = {
    headers: dataHeaders && HelperFunction.setHeadersData(dataHeaders),
    body: dataBody && HelperFunction.getFormData(dataBody),
    method: method
  }

  const modalDataBlocks = [
    {
      title: "Method",
      data: method
    },
    {
      title: "Status",
      data: status
    },
    {
      title: "Headers",
      data: dataHeaders
    },
    {
      title: "Response headers",
      data: dataRespHeaders
    },
    {
      title: "Body",
      data: dataBody
    },
    {
      title: "Response result",
      data: result
    }
  ]

  const repeatRequest = () => {
    // eslint-disable-next-line no-undef
    UIkit.modal(`#${id}`).hide();
    setTimeout(() => createRequest(link, data), 500);
  }

  return(
    <ModalPortal id={id} >
      <div className="uk-modal-dialog uk-modal-body">
        <h2 className="uk-modal-title uk-text-break">{ link }</h2>
        { modalDataBlocks.map(block => <ModalDataBlock title={block.title} data={block.data} key={block.title} />) }

        <div className="uk-text-right">
          <button className="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
          <button className="uk-button uk-button-primary uk-modal-close" type="button"
                  onClick={repeatRequest}>Repeat</button>
        </div>
      </div>
    </ModalPortal>
  )
}
export default Popup;