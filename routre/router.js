'use strict';
const express = require('express');

function onMount(target, key) {
  if (!target.router) {
    target.router = express.Router()
  }
  if (!target.scheme) {
    target.scheme = {};
  }
  if (!target.scheme[key]) {
    target.scheme[key] = {};
  }

}

function Router(prefix = '/') {
  return function(Target){
    class Class extends Target {
      use(app) {
        app.use(prefix, Target.prototype.router);
      }
      constructor(prefix) {
        super();
      }
    }
    return Class;
  }
}

function Route(httpMetod, path, ...args) {
  return function(target, key, descriptor) {
    onMount(target, key);
    const router = target.router;
    const route = target[key]
    target.scheme[key].path = path;
    target.scheme[key].httpMetod = httpMetod;
    router[httpMetod](path, ...args, async function(req, res, next) {
      try {
        const response = await route(req, res, next);
        res.status(target.scheme[key].status || 200).send(response);
      } catch (ex) {
        next(ex);
      }
    });
    return descriptor;
  }
}

function Status(status) {
  return function(target, key, descriptor) {
    onMount(target, key);
    target.scheme[key].status = status;
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
