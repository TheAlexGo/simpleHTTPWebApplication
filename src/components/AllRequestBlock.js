function AllRequestBlock ({allRequest, setDataModal}) {
  return allRequest.map((req, index) =>
    <div key={req.link + index} onClick={setDataModal.bind(req)}>Тестовый запрос ({req.link})</div>);
}
export default AllRequestBlock;