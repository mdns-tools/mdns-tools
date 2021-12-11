var bonjour = require('bonjour')()

// advertise an HTTP server on port 3000
bonjour.publish({ name: 'Nuxt.JS', type: 'raspberrypi', port: 3000 })

// browse for all http services
bonjour.find({ type: 'raspberrypi' }, function (service) {
  console.log('Found an HTTP server:', service)
})