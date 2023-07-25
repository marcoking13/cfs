const getBrowserName =  () => {

    let browserInfo = navigator.userAgent;
    let browser;

    if (browserInfo.includes('Opera') || browserInfo.includes('Opr')) {
      browser = 'Opera';
    } else if (browserInfo.includes('Edg')) {
      browser = 'Edge';
    } else if (browserInfo.includes('Chrome')) {
      browser = 'Chrome';
    } else if (browserInfo.includes('Safari')) {
      browser = 'Safari';
    } else if (browserInfo.includes('Firefox')) {
      browser = 'Firefox'
    } else {
      browser = 'unknown'
    }

    return browser;

  }

function Init(){
  var v =  getBrowserName();
  axios.post("/admin/browser",v)
}

Init();
