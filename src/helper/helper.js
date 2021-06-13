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
    const dataHeaders = HelperFunction.getDataFromResp(data.headers);
    const dataBody = HelperFunction.getBodyData(data.body);
    const method = data.method;
    let result, status, dataRespHeaders;
    try {
      const response = await fetch(link, data);
      result = await response.json();
      dataRespHeaders = HelperFunction.getDataFromResp(response.headers);
      status = response.status;
    } catch (e) {
      dataRespHeaders = {
        headers: null
      }
      const protocol = link.split('://')[0];
      if(protocol !== 'http' && protocol !== 'https') status = `Invalid protocol: ${protocol}`;
      else status = `getaddrinfo ENOTFOUND  ${link}`;
      result = {
        status: status,
        message: 'Could not send request'
      };
    }
    return { link, result, dataHeaders, dataBody, method, dataRespHeaders, status };
  }

  /**
   * Создание соединения с link по протоколу WebSocket
   * @param link - ссылка
   * @param refWsResultBlock - ref к информационному блоку
   * @returns {WebSocket | number}
   */
  static createLinkWS (link, refWsResultBlock, setError) {
    const protocol = link.split('://')[0];
    if(protocol !== 'ws' && protocol !== 'wss') {
      const div = document.createElement('div');
      div.textContent = `Невозможно соединиться с данным ресурсом. Неверный протокол: ${protocol}.`;
      refWsResultBlock.current.appendChild(div);
      return 0;
    }

    const ws = new WebSocket(link);

    ws.onopen = (e) => {
      const div = document.createElement('div');
      div.textContent = "Соединение установлено.";
      refWsResultBlock.current.appendChild(div);
    };

    ws.onclose = (event) => {
      const div = document.createElement('div');
      if (event.wasClean) {
        div.textContent = "Соединение закрыто чисто. ";
      } else {
        div.textContent = "Обрыв соединения. ";
      }
      div.textContent += `Код: ${event.code}, причина: ${event.reason}.`;
      refWsResultBlock.current.appendChild(div);
    };

    ws.onmessage = (event) => {
      const div = document.createElement('div');
      div.textContent = `Получены данные: ${event.data}.`;
      refWsResultBlock.current.appendChild(div);
    };

    ws.onerror = (error) => {
      const div = document.createElement('div');
      div.textContent = `Ошибка.`;
      refWsResultBlock.current.appendChild(div);
    };

    return ws;
  }
}
export default HelperFunction;