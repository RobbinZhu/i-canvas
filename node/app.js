import PubsubComponent from '../component/pubsub_component.js'
import HookComponent from '../component/hook_component.js'
import _ from '../common/dom_event_fn_wrap.js'
const requestAnimFrame = _.requestAnimFrame
const cancelAnimFrame = _.cancelAnimFrame

class App {
    constructor() {}

    init() {
        this.scenes = []
        this.resumeScenes = []
        this.currentScene = null
        this.nextScene = null

        this.pubsubComponent = PubsubComponent.create(this)
        this.hookComponent = HookComponent.create(this)
        this.stateComponent = null
        this.requestAnimId = null
        this.session = null
        this.run = this.runLoop.bind(this)
        this.isPaused = false
        return this
    }
    addStateComponent(component) {
        this.stateComponent = component
    }
    addSessionSupport(session) {
        this.session = session
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
        this.render(this.session)
        this.requestAnimId = requestAnimFrame(this.run)
    }
    getScene(name) {
        for (let i = 0; i < this.scenes.length; i++) {
            if (this.scenes[i].name === name) {
                return this.scenes[i]
            }
        }
    }
    _showScene(scene) {
        if (this.scenes.indexOf(scene) < 0) {
            this.scenes.push(scene)
        }
        this.currentScene = scene
        this.nextScene = null
    }
    pushScene(fn) {
        if (typeof fn == 'function') {
            fn(this)
        } else {
            this._showScene(fn)
        }
    }
    /*
    replaceScene(scene) {
        this.resumeScenes.forEach(function(scene) {
            scene.remove()
        })
        this.resumeScenes.length = 0
        if (this.currentScene) {
            this.currentScene.remove()
            this.scenes.pop()
        }
        this.scenes.push(scene)
        this.currentScene = scene
        this.nextScene = null
    }
    back() {
        if (!this.scenes.length) {
            return
        }
        this.nextScene = null
        this.currentScene = this.scenes.pop()
        this.resumeScenes.push(this.currentScene)
    }
    forward() {
        if (!this.resumeScenes.length) {
            return
        }
        this.currentScene = this.resumeScenes.pop()
        this.scenes.push(this.currentScene)
        this.nextScene = null
    }
    */
    update(session) {
        this.hookComponent.handleOnUpdate(session)
        this.updateChildren(session, this.cameraComponent)
        this.hookComponent.handleAfterUpdate(session)
        this.stateComponent && this.stateComponent.update(session)
        return this
    }
    updateChildren(session) {
        if (this.currentScene) {
            this.currentScene.update(session)
        }
        if (this.nextScene) {
            this.nextScene.update(session)
        }
    }
    render(session) {
        session.clear()
        if (this.currentScene) {
            this.currentScene.render(session)
        }
        if (this.nextScene) {
            this.nextScene.render(session)
        }
        session.renderFPS()
        return this
    }
    remove() {
        cancelAnimFrame(this.requestAnimId)
        this.scenes.forEach(function(scene) {
            scene.remove()
        })
        this.resumeScenes.forEach(function(scene) {
            scene.remove()
        })
        this.hookComponent.remove()
        this.pubsubComponent.remove()
        this.session && this.session.remove()
        this.requestAnimId =
            this.hookComponent =
            this.pubsubComponent =
            this.currentScene =
            this.scenes =
            this.resumeScenes =
            this.nextScene =
            this.session =
            this.run = null
        App.collect(this)
    }
}

const caches = []

App.create = function() {
    return (caches.length ? caches.pop() : new App).init()
}

App.collect = function(app) {
    caches.push(app)
}

App.clean = function() {
    caches.length = 0
}

export default App