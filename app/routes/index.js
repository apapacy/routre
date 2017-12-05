'use strict';
import express from 'express';
const Routes = express.Router();

@Router('/next')
class MyRoutes extends Routes {

   @Route('/t-hello')
   static hello(req, res, next) {
     res.status(201).send('Test hello');
   }
 }

 function Route(...args) {
   return function (target, key, descriptor) {
     console.log('*************', target);
     target.get(...args, async function(...args) {
       try {
         await target[key].apply(target.get, args);
       } catch (ex) {
         console.log('** error **',ex)
       }
     });
     return descriptor
   }
 }

function Router(prefix) {
  return function(Target) {
    console.log('+++++++++++++++++++')
    Target.prefix = prefix;
  }
}

function readonly(target, key, descriptor) {
   descriptor.writable = false;
   return descriptor;
 }

export default Routes
