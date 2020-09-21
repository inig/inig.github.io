const gh = require('gh-pages')

gh.publish('dist', {
  add: true
}, (err) => {
  if (err) {
    console.log('error: ', err.message)
  }
})
