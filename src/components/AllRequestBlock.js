function AllRequestBlock ({allRequest, createRequest}) {
  return allRequest.map((req, index) => <div key={index} onClick={() =>
    createRequest(req.link, req.data)}>Тестовый запрос ({req.link})</div>);
}
export default AllRequestBlock;