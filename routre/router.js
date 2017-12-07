'use strict';
const express = require('express');

function preDecorate(target, key) {
  const prototype = target.constructor.prototype;
  Object.defineProperty(target, 'router0', {value: '0++'});
  console.log('456456', target.router0)
  if (!prototype.router) {
    prototype.router = express.Router()
  }
  if (!prototype.scheme) {
    prototype.scheme = {};
  }
  if (!prototype.scheme[key]) {
    prototype.scheme[key] = {};
  }
}

function isClass(Class) {
   return typeof Class === 'function' && Class.prototype.constructor === Class;
}

/**
  * In class decoretor Target.prototype === target in method decoretor
  * Target = target.constructor
  * Target.prototype = target = target.constructor.prototype = Instance
  * Target is function
  * Target.prototype is Object
  * target is object
  */
function Router(prefix = '/') {
  return function(Target){
    if (!isClass(Target)) {
      throw new Error('`@Router` may be used with class only');
    }
    Target.prototype.use = function(app) {
      app.use(prefix, this.router);
    }
    console.log('-----------', Target.prototype);
    return Target;
  }
}

function Route(httpMetod, path, ...args) {
  return function(target, key, descriptor) {
    const prototype = target.constructor.prototype;
    preDecorate(target, key);
    const router = prototype.router;
    const route = target[key]
    prototype.scheme[key].path = path;
    prototype.scheme[key].httpMetod = httpMetod;
    router[httpMetod](path, ...args, async function(req, res, next) {
      try {
        const response = await route(req, res, next);
        res.status(prototype.scheme[key].status || 200).send(response);
      } catch (ex) {
        next(ex);
      }
    });
    return descriptor;
  }
}

function Status(status) {
  return function(target, key, descriptor) {
    const prototype = target.constructor.prototype;
    preDecorate(target, key);
    prototype.scheme[key].status = status;
    return descriptor;
  }
}

function Get(...args) {
  return Route('get', ...args);
}

function Post(...args) {
  return Route('post', ...args);
}

function Put(...args) {
  return Route('put', ...args);
}

function Patch(...args) {
  return Route('patch', ...args);
}

function Delete(...args) {
  return Route('delete', ...args);
}

module.exports = {
  Router,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Status,
};
