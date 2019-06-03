'use strict'
import async from 'async'

export default function postCreatePlugin (schema) {
  schema.addPostCreate = function (f) {
    schema.postCreateListeners = schema.postCreateListeners || []
    schema.postCreateListeners.push(f)
  }
  
  schema.pre('save', function (next) {
    this._wasNew = this.isNew
    next()
  })
  
  schema.post('save', function (doc) {
    if (doc._wasNew) {
      async.parallel(
        schema.postCreateListeners.map(f => f.bind(null, doc)),
        (err) => {
          if (err) { console.error(err) }
          doc._wasNew = false
        }
      )
    }
  })
}
