function AllRequestBlock ({allRequest, setDataModal}) {
  return(
    <div className="uk-padding-small uk-padding-remove-top uk-padding-remove-bottom uk-margin-small-top request-block">
      {
        allRequest.map((req, index) =>
          <div
            key={req.link + index}
            onClick={setDataModal.bind(req)}
            className={String(req.status)[0] === '2' ? 'uk-text-success' : 'uk-text-danger'}
          >
            {req.method}: {req.link}, status: {req.status}
          </div>)
      }
    </div>
  )
}
export default AllRequestBlock;