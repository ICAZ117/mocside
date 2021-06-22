
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
      url = loc.host + "/" + url;
      this.url = /https/.test(loc.protocol) ? "wss://" + url : "ws://" + url;
      this.websocket = "WebSocket" in window ? new WebSocket(this.url) : null;
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
  
    //判断websocket 是否存在
    isWebsocket() {
      if (this.websocket) {
        this.error = "";
        return true;
      } else {
        this.error = "当前浏览器不支持WebSocket";
        return false;
      }
    }
  
    //直接开始执行链接,不需要手动设置打开 & 处理消息 & 错误
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
  
    //自定义WSC连接事件：服务端与前端连接成功后触发
    onOpen(callBack) {
      if (this.isWebsocket()) {
        //判断是否传递回调函数
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
  
    // WSC消息接收事件：服务端向前端发送消息时触发
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
    }
  
    // 自定义WSC异常事件：WSC报错后触发
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
  
    // 自定义WSC关闭事件：WSC关闭后触发
    onClose() {
      if (this.isWebsocket()) {
        this.websocket.close();
      } else {
        console.error(this.error);
      }
    }
  
    //前端向服务端发送消息时触发
    onSend(data) {
      console.log("dataweb--数据已向后端发送", data, this.isWebsocket());
      if (this.isWebsocket()) {
        console.log("sendsendsend");
        this.websocket.send(data);
      } else {
        console.error(this.error);
      }
    }
  
    //WSC链接状态，只读不可修改
    readyState() {
      //1连接已打开并准备好进行通信。2连接正在关闭。 3连接已关闭或无法打开。
      if (this.isWebsocket()) {
        return this.websocket.readyState;
      } else {
        console.error(this.error);
      }
    }
  
    //获取WSC连接所传输二进制数据的类型,只读
    binaryType() {
      if (this.isWebsocket()) {
        return this.websocket.binaryType;
      } else {
        console.error(this.error);
      }
    }
  
    //获取当前实例
    get() {
      if (this.isWebsocket()) {
        return this.websocket;
      } else {
        console.error(this.error);
      }
    }
  }
