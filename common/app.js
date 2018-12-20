import Base from './base.js'
import Session from './session.js'
import _ from './dom_event_fn_wrap.js'
const requestAnimFrame = _.requestAnimFrame
const cancelAnimFrame = _.cancelAnimFrame
class App extends Base {
    constructor() {
        super()
    }
    init(dom, designWidth, designHeight) {
        this.currentScene = null
        this.nextScene = null
        this.scenes = []
        this.requestAnimId = null
        this.session = Session.create(dom, this, designWidth, designHeight)
        this.updateCanvasSize(designWidth, designHeight)
        this.run = this.runLoop.bind(this)
        this.isPaused = false
        return this
    }
    listenKeyEvents() {
        this.session.domEvent.listenKeyEvents.apply(this.session.domEvent, arguments)
    }
    updateCanvasSize(width, height) {
        this.session.setResolution(width, height)
    }
    pause() {
        this.isPaused = true
    }
    resume() {
        this.isPaused = false
    }
    runLoop() {
        if (!this.isPaused) {
            this.update(this.session)
        }
        return requestAnimFrame(this.run)
    }
    presentScene(scene) {
        this.currentScene = scene
        return this
    }
    update(session) {
        this.handleOnUpdate(session)
        this.updateAction(session)
        if (this.nextScene) {
            this.nextScene.update(session)
        }
        if (this.currentScene) {
            this.currentScene.update(session)
        }
        this.handleAfterUpdate(session)
        session.clear()
        if (this.nextScene) {
            this.nextScene.render(session)
        }
        if (this.currentScene) {
            this.currentScene.render(session)
        }
        session.renderFPS()
        return this
    }
    remove() {
        cancelAnimFrame(this.requestAnimId)
        super.remove()
        this.session.remove()
        this.scenes.forEach(function(scene) {
            scene.remove()
        })
        this.currentScene =
            this.nextScene =
            this.run =
            this.session =
            this.requestAnimId =
            this.scenes = null
        this._collect()
    }
    resize() {
        this.session.resize()
        return this
    }
    _collect() {
        App.collect(this)
    }
}

const caches = []

App.create = function(dom, width, height) {
    return (caches.length ? caches.pop() : new App).init(dom, width, height)
}

App.collect = function(app) {
    caches.push(app)
}

App.clean = function() {
    caches.length = 0
}

export default App