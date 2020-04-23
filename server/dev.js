const _debug = require('debug')
const koaWebpack = require('koa-webpack')
const MFS = require('memory-fs')
const webpack = require('webpack')

const { resolve } = require('../build/config')
const clientConfig = require('../build/react.client.babel')
const serverConfig = require('../build/react.server.babel')

const debug = _debug('ycombinator:server:dev')

exports.default = (after) => {
  let _resolve, clientManifest, bundle, fs

  const readyPromise = new Promise(resolve => {
    _resolve = resolve
  })

  const ready = (...args) => {
    _resolve()
    after(...args)
  }

  const clientCompiler = webpack(clientConfig)

  const webpackMiddlewarePromise = koaWebpack({
    compiler: clientCompiler,
    devMiddleware: {
      stats: {
        colors: true,
      },
    },
  })

  clientCompiler.plugin('done', stats => {
    stats = stats.toJson()
    stats.errors.forEach(debug)
    stats.warnings.forEach(debug)

    if (stats.errors.length) return

    webpackMiddlewarePromise.then(webpackMiddleware => {
      fs = webpackMiddleware.devMiddleware.fileSystem

      clientManifest = JSON.parse(
        fs.readFileSync(resolve('dist/react-ssr-client-manifest.json'))
      )

      if (bundle) {
        ready({ bundle, clientManifest, fs })
      }
    })
  })

  const mfs = new MFS()
  const serverCompiler = webpack(serverConfig)
  serverCompiler.outputFileSystem = mfs

  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
    if (stats.errors.length) return

    bundle = JSON.parse(
      mfs.readFileSync(resolve('dist/react-ssr-server-bundle.json')),
    )

    if (clientManifest) {
      ready({ bundle, clientManifest, fs })
    }
  })

  return { readyPromise, webpackMiddlewarePromise }
}
