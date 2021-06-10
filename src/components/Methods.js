function Methods ({ methods }) {
  return methods.map((method, index) => <option value={method} key={index}>{method}</option>);
}

export default Methods;