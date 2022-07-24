import { TIMEOUT_SECONDS } from "./config";

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };

  /**
   * Makes AJAX call to Forkify API
   * @param {string} url 
   * @param {Object} [uploadData  = undefined]
   * @returns Returns a parsed JSON object from the Forkify API
   */
export const AJAX = async function(url, uploadData = undefined) {
  try {
  const fetchPro = uploadData ? fetch(url, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/JSON'
        },
        body: JSON.stringify(uploadData),
      }) 
      : fetch(url) ;
      
        const res = await Promise.race([fetchPro, timeout(TIMEOUT_SECONDS)]) ;
        const data = await res.json();

        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        return data;
    } catch (err) {
        throw err;
    }
}
