export default class Event {
  /**
   * on 方法把订阅者所想要订阅的事件及相应的回调函数记录在 Event 对象的 _cbs 属性中
   */
  on(event, fn, ctx) {
    if (typeof fn != "function") {
      console.warn('fn must be a function')
      return
    }

    this._stores = this._stores || {};
    (this._stores[event] = this._stores[event] || []).push({
      cb: fn,
      ctx: ctx
    })
  }
  /**
   * emit 方法接受一个事件名称参数，在 Event 对象的 _cbs 属性中取出对应的数组，并逐个执行里面的回调函数
   */
  emit(event) {
    this._stores = this._stores || {}
    var store = this._stores[event],
      args;

    if (store) {
      store = store.slice(0)
      args = [].slice.call(arguments, 1)
      for (var i = 0, len = store.length; i < len; i++) {
        store[i].cb.apply(store[i].ctx, args)
      }
    }
  }

  /**
   * off 方法接受事件名称和当初注册的回调函数作参数，在 Event 对象的 _cbs 属性中删除对应的回调函数。
   */
  off(event, fn) {
    this._stores = this._stores || {}

    // all
    if (!arguments.length) {
      this._stores = {}
      return
    }

    // specific event
    var store = this._stores[event]
    if (!stores) return

    // remove all handlers
    if (arguments.length === 1) {
      delete this._stores[event]
      return
    }

    // remove specific handler
    var cb
    for (var i = 0, len = store.length; i < len; i++) {
      cb = store[i].cb
      if (cd === fn) {
        store.splice(i, 1)
        break
      }
    }
    return
  }
}