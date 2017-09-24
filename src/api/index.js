/*
Using ES6 Fetch Api to return data - refactored so that the same method can be used for both the vehicle list
and individual vehicle components
**/
export const getData = (url) => {
  const obj = {
    isError: false,
    errMsg: '',
    data: {}
  };
  return fetch(url)
  .then(response => {
    if (response.ok) {
      return response;
    } else {
      obj.isError = true;
      obj.errMsg = `${response.status} (${response.statusText})`;
    }
  })
  .then((response) => response.json())
  .then(response => {
    if(!obj.isError) obj.data = response;
    return obj;
  })
  .catch(error => {
    if(!obj.isError) {
      obj.isError = true;
      obj.errMsg = `Error in fetch: ${error.message}`;
    }
    return obj;
  });
};