class HelperFunction {
  /**
   * Получает объект данных из fieldset
   * @param $form - нода с формой
   * @param name - название блока fieldset
   * @returns {{}|null} - массив данных, если такой fieldset с именем name есть, иначе null
   */
  static getValue ($form, name) {
    if(!$form.elements[name]) return null;
    const obj = {};
    const allReqDiv = $form.elements[name].querySelectorAll('div');
    allReqDiv.forEach(item => {
      const allInput = item.querySelectorAll('input');
      const key = allInput[0].value;
      const value = allInput[1].value;
      if(key && value) obj[key] = value;
    })
    return obj;
  }

  static getFormData(obj) {
    return Object.keys(obj).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])).join('&');
  }

  static getHeadersData(obj) {
    const headers = new Headers();
    for ( let key in obj ) {
      if(obj.hasOwnProperty(key)) headers.append(key, obj[key]);
    }
    return headers;
  }
}
export default HelperFunction;