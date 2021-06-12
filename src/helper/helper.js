class HelperFunction {
  /**
   * Получает объект данных из fieldset
   * @param $form - нода с формой
   * @param name - название блока fieldset
   * @returns {{}|null} - массив данных, если такой fieldset с именем name есть, иначе null
   */
  static getValue ($form, name) {
    if(!$form.elements[name]) return null;
    let obj = {};
    const allReqDiv = $form.elements[name].querySelectorAll('div');
    if(allReqDiv.length) {
      allReqDiv.forEach(item => {
        const allInput = item.querySelectorAll('input');
        const key = allInput[0].value;
        const value = allInput[1].value;
        if(key && value) obj[key] = value;
      });
    } else {
      const allReqTextarea = $form.elements[name].querySelector('textarea');
      if(allReqTextarea) obj = JSON.stringify(allReqTextarea.value);
    }
    return obj;
  }

  static getFormData(obj) {
    return Object.keys(obj).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])).join('&');
  }

  /**
   * Преобразование объекта данных в объект типа Headers
   * @param obj
   * @returns {Headers}
   */
  static setHeadersData(obj) {
    const headers = new Headers();
    for ( let key in obj ) {
      if(obj.hasOwnProperty(key)) headers.append(key, obj[key]);
    }
    return headers;
  }

  /**
   * Получение объекта данных из объектов типа Headers
   * @param data - данные
   * @returns {{}|null}
   */
  static getDataFromResp(data) {
    if(data) {
      const result = {};
      for (const pair of data.entries()) {
        result[pair[0]] = pair[1];
      }
      return result;
    } else {
      return null;
    }
  }

  /**
   * Получение объекта данных из body
   * @param data - данные тела
   * @returns {{}|null}
   */
  static getBodyData(data) {
    if(data) {
      const result = {};
      const objDataBody = data.split("&");
      objDataBody.forEach(key => {
        const pair = key.split('=');
        result[pair[0]] = pair[1];
      })
      return result;
    } else {
      return null;
    }
  }

  /**
   * Создание запроса с ссылками link и данными data
   * @param link - ссылка на ресурс
   * @param data - данные
   * @returns {Promise<{result: any, dataHeaders: {}, method, dataRespHeaders: {}, dataBody: {}, link, status: number}>}
   */
  static async createRequest (link, data) {
    const response = await fetch(link, data).catch(e => console.log(e));
    const result = await response.json();
    const dataHeaders = HelperFunction.getDataFromResp(data.headers);

    const dataRespHeaders = HelperFunction.getDataFromResp(response.headers);
    const dataBody = HelperFunction.getBodyData(data.body)
    const method = data.method;
    const status = response.status;
    return { link, result, dataHeaders, dataRespHeaders, dataBody, method, status };
  }
}
export default HelperFunction;