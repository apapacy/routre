'use strict';
const { Router, Get, Status } = require('../../routre/router');


@Router('/next')
class MyRoutes {
   @Get('/t-hello')
   hello(req, res, next) {
     return 'Test hello';
   }
   @Get('/hi')
   @Status(201)
   hi(req, res, next) {
     return 'Hi';
   }
}

module.exports = MyRoutes;
