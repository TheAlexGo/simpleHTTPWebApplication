function ModalDataBlock({ title, data }) {
  if(data) {
    return(
      <div>
        <h3>{ title }</h3>
        <pre>
          { JSON.stringify(data, undefined, 2) }
        </pre>
      </div>
    )
  } else {
    return null;
  }

}

export default ModalDataBlock;