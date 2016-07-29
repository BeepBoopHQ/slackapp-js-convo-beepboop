'use strict'

const persist = require('beepboop-persist')

/**
 * Slapp conversation store implementation that uses the BeepBoop key/value store persist service
 *
 * Parameters:
 * - `opts` object - options
 *     - `debug` boolean
 *     - `keyPrefix` string - prefix for persist service keys, default: "convo:" [optional]
 */

module.exports = class ConvoStore {
  constructor (opts) {
    this.kv = persist(opts)
    this.keyPrefix = opts.keyPrefix || 'convo::'
  }

  /**
   * Set the next function route handler for conversation id
   *
   * Parameters:
   * - `id` string - the conversation ID
   * - `params` object
   *     - `fnKey` sting - next route function key
   *     - `state` object - arbitrary object of data to be routed with the next function call
   *     - `expiration` - expiration time in time since unix epoch (milliseconds since 00:00:00 UTC on 1 January 1970)
   * - `callback` function  - (error) => {}
   */

  set (id, params, callback) {
    if (!callback) callback = () => {}
    params.id = id
    this.kv.set(this.keyPrefix + id, params, callback)
  }

  /**
   * Get the conversation state for a conversation ID
   *
   * Parameters:
   * - `id` string - the conversation ID
   * - `callback` function  - (error, value) => {}
   */

  get (id, callback) {
    this.kv.get(this.keyPrefix + id, (err, val) => {
      if (err) {
        return callback(err)
      }

      if (!val) {
        return callback(null, null)
      }

      // Check if the value is expired. If it is expired, delete it and return
      // null. The persist key/value store doesn't support expiration of keys yet
      if (val.expire > 0 && val.expire < Date.now()) {
        this.kv.del(this.keyPrefix + id, (_err) => {
          return callback(null, null)
        })
      }

      callback(null, val)
    })
  }

  /**
   * Delete a conversation state by ID
   *
   * Parameters:
   * - `id` string - the conversation ID
   * - `callback` function  - (error) => {}
   */

  del (id, callback) {
    if (!callback) callback = () => {}
    this.kv.del(this.keyPrefix + id, callback)
  }

}
