### 具体调用方法

App 是小程序的实例，在每个 Page 里都能通过执行 getApp 函数获取到它。我们可以把 Event 类的实例挂载在 App 中，方便每个 Page 去调用。

```javascript
// app.js

const Event = require('./libs/event')

App({
    event: new Event(),
    ...
})
```

订单列表页在 onLoad 生命周期中订阅 “afterPaySuccess” 事件。

```javascript
//order_list.js

var app = getApp()

Page({
    onLoad: function(){
        app.event.on('afterPaySuccess',this.afterPaySuccess, this)
    },
    afterPaySuccess: function(orderId) {
        // do sth
    },
})
```

在订单详情页支付成功的回调中，发布 “afterPaySuccess” 事件,同时带上订单 id 参数。

```javascript
//order_detail.js

var app = getApp()

Page({
    raisePayment: function() {
        app.event.emit('afterPaySuccess', orderId)
    },
})
```

所有 Page 的 onUnload 生命周期，必须注销掉之前订阅的事件。注销方法 off 的调用姿势有三种，不过还是建议注销当前 Page 所订阅的事件，而不是注销所有的。

```javascript
var app = getApp()

Page({
    onUnload: function(){
        // remove all
        app.event.off()
        // remove all callbacks
        app.event.off('afterPaySuccess')
        // remove specific callbacks
        app.event.off('afterPaySuccess', this.afterPaySuccess)
    }
})
```
