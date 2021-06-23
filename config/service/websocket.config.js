/**
 * ** WebSocket package
 * @ url Request address type: string Default:'' Remarks:'web/msg'
 * @isInit Whether to execute automatically Type: boolean Default: false Remarks: false|true
 * @ openFn automatically executes the open callback function Type: function Default: null Note: If onOpen does not have a callBack, openFn is called by default
 * @messageFn automatically executes the message callback function Type: function Default: null Note: If onMessage does not have a callBack, messageFn is called by default
 * @errorFn Automatically execute error callback function Type: function Default: null Note: If onErrorFn does not have a callBack, errorFn is called by default
 *
 *
 * Method:
 * isWebsocket Judge whether websocket exists Return true|false Parameter: none
 * onOpen is triggered after successful connection between the server and the front end Return None Parameter: callBack(e)
 * onMessage is triggered when the server sends a message to the front end Return None Parameter: callBack(e)
 * onError Triggered after WSC reports an error. Return None Parameter: callBack(e)
 * onClose Close WSC
 * onSend is triggered when the front end sends a message to the server. Return None Parameter: data
 * readyState Get WSC link status, read only and cannot be modified
 * binaryType Get the type of binary data transmitted by the WSC connection, read-only
 * get Get the current instance Return the current instance Parameter: data
 * */
 export class WS {
  constructor({
    url = "",
    openFn = null,
    messageFn = null,
    errorFn = null,
    isInit = false
  } = {}) {
    let loc = window.location;
    url = "mocside.com:2376" + "/" + url;
    this.url = /https/.test(loc.protocol)? "wss://" + url: "ws://" + url;
    this.websocket = "WebSocket" in window? new WebSocket(this.url): null;
    console.log("something");
    console.log(this.websocket);
    this.error = "";
    this.messageFn =
      messageFn && typeof messageFn == "function"
        ? messageFn
        : e => {
            e;
          };
    this.errorFn =
      errorFn && typeof errorFn == "function"
        ? errorFn
        : e => {
            e;
          };
    this.openFn =
      openFn && typeof openFn == "function"
        ? openFn
        : e => {
            e;
          };
    if (isInit) {
      WS.init(this);
    }
  }

  //Determine whether websocket exists
  isWebsocket() {
    if (this.websocket) {
      this.error = "";
      return true;
    } else {
      this.error = "The current browser does not support WebSocket";
      return false;
    }
  }

  //Start to execute the link directly, no need to manually set to open & handle messages & errors
  static init(_this) {
    if (_this.isWebsocket()) {
      _this.websocket.onopen = e => {
        _this.openFn(e);
      };

      _this.websocket.onerror = e => {
        _this.errorFn(e);
      };
      _this.websocket.onmessage = e => {
        _this.messageFn(e);
      };
    } else {
      console.error(_this.error);
    }
  }

  //Custom WSC connection event: triggered after successful connection between the server and the front end
  onOpen(callBack) {
    console.log("open socket");
    if (this.isWebsocket()) {
      //Determine whether to pass a callback function
      if (typeof callBack == "function") {
        this.websocket.onopen = e => {
          callBack(e);
        };
      } else {
        this.websocket.onopen = e => {
          this.openFn(e);
        };
      }
    } else {
      console.error(this.error);
    }
  }

  // WSC message receiving event: triggered when the server sends a message to the front end
  onMessage(callBack) {
    if (this.isWebsocket()) {
      if (typeof callBack == "function") {
        this.websocket.onmessage = e => {
          callBack(e);
        };
      } else {
        this.websocket.onmessage = e => {
          this.messageFn(e);
        };
      }
    } else {
      console.error(this.error);
    }
    return false;
  }

  // Custom WSC exception event: triggered after WSC reports an error
  onError(callBack) {
    if (this.isWebsocket()) {
      if (typeof callBack == "function") {
        this.websocket.onerror = e => {
          callBack(e);
        };
      } else {
        this.websocket.onerror = e => {
          this.errorFn(e);
        };
      }
    } else {
      console.error(this.error);
    }
  }

  // Custom WSC close event: triggered after WSC is closed
  onClose() {
    console.log("websocket has been closed");
    if (this.isWebsocket()) {
      this.websocket.close();
    } else {
      console.error(this.error);
    }
  }

  // Triggered when the front end sends a message to the server
  onSend(data) {
    console.log("dataweb--data has been sent to the backend", data, this.isWebsocket());
    if (this.isWebsocket()) {
      console.log("sendsendsend");
      console.log(this.readyState());
      console.log(this.websocket);
      this.websocket.send(data);
    } else {
      console.error(this.error);
    }
  }

  //WSC link status, read only and cannot be modified
  readyState() {
    //1 The connection is open and ready to communicate. 2The connection is closing. 3The connection is closed or cannot be opened.
    if (this.isWebsocket()) {
      return this.websocket.readyState;
    } else {
      console.error(this.error);
    }
  }

  //Get the type of binary data transmitted by the WSC connection, read-only
  binaryType() {
    if (this.isWebsocket()) {
      return this.websocket.binaryType;
    } else {
      console.error(this.error); 
    }
  }

  //Get the current instance
  get() {
    if (this.isWebsocket()) {
      return this.websocket;
    } else {
      console.error(this.error);
    }
  }
} 
