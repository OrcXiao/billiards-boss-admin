

import protoRoot from './proto.js'
//import protobuf from 'protobufjs'


export default class CWebSocket {

    constructor(url) {

        let vm = this;
        this.open = false

        this.tak = {}
        this.socket = new WebSocket(url)
        this.socket.binaryType = 'arraybuffer';

        vm.socket.onopen = (...args) => {
            vm.open = true;
            console.log("recv webscoket open!")
        }
        vm.socket.onclose = (...args) => {
            console.error("recv webscoket close!")
        }
        vm.socket.onerror = (...args) => {
            console.error("recv webscoket error!")
        }
        vm.socket.onmessage = (...args) => {
            vm.OnMessage(...args)
        }
    }

    Test() {
        let msg = this.MsgGet("MsgNotify_GC")
        // MsgNotify_GC: {
        //     fields: {
        //       msgType: {
        //         type: "int32",
        //         id: 1
        //       },
        //       notifyMsg: {
        //         type: "string",
        //         id: 2
        //       }
        //     }
        //   }
        //数据填充
        let data =
        {
            "msgType": 12,
            "notifyMsg": "test"
        }
        let d = msg.encode(data).finish()
        console.log(d)

        //数据解析
        let msg2 = this.MsgGet("MsgNotify_GC")
        let d2 = msg2.decode(d)
        console.log(d2.msgType, d2.notifyMsg)

        let login = {
            "user": "TiYi",
            "passworld": "ai951293831"
        }
        this.SendMsg('AdminLogin_CG', login)
    }

    Close() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
        this.open = false;
    }

    OnMessage(data) {
        if (data == null || data.data == null)
            return null;
        let d = new Uint8Array(data.data)
        if (d == null)
            return null;
        let newInts = d.subarray(4, d.length + 4)
        if (newInts == null) return

        //解析消息号和长度
        let Id = (d[2] << 8) | d[3]
        let Len = (d[0] << 8) | d[1]

        let msg = this.tak[Id]
        if (msg == null) return

        let b = this.MsgGet(msg.M)
        if (b == null) return

        let d2 = b.decode(newInts)

        console.log("Recv MsgId [" + msg.M + "] " + Id + " Len " + Len, d2)
        msg.F(d2)
    }

    SendMsg(msg, data) {
        if (this.socket == null || this.open == false) {
            console.error("SendMsg webscoket Error!")
            return false;
        }
        let msgID = this.ECEnumByMsg(msg);
        let m = this.MsgGet(msg)

        if (m == null || msgID == 0) return false;
        let buffer = m.encode(data).finish()
        if (buffer == null) return false;

        //填充消息号和长度  
        var arrayBuffer = new ArrayBuffer(4 + buffer.length);
        var dataView = new DataView(arrayBuffer);
        dataView.setUint8(1, buffer.length)
        dataView.setUint8(0, buffer.length >> 8)
        dataView.setUint8(3, msgID)
        dataView.setUint8(2, msgID >> 8)
        for (var i = 0; i < buffer.length; i++) {
            dataView.setUint8(i + 4, buffer[i]);
        }

        this.socket.send(dataView)
    }

    /***************************************************************************/
    MsgGet(msg) {
        let out = protoRoot.lookup("pb." + msg)
        if (out == null) {
            console.error("can not find proto msg : " + msg)
            return null;
        }
        return out;
    }

    ECEnumByMsg(msg) {
        let e = protoRoot.nested.pb.nested.EC_Code.values
        return e["EC_" + msg]
    }

    ECEnumById(id) {
        let e = protoRoot.nested.pb.nested.EC_Code.valuesById
        let m = e[id]
        m = m.replace("EC_", "")
        return m
    }

    /********************************************************************* */
    On(msg, func) {
        let Id = this.ECEnumByMsg(msg)
        let t = { D: Id, M: msg, F: func }
        this.tak[Id] = t
    }
}


