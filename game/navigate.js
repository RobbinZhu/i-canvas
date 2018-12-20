import FadeTo from '../action/fade_to.js'
import Sequence from '../action/sequence.js'
import MoveBy from '../action/move_by.js'
import Delay from '../action/delay.js'
import debounce from '../common/debounce.js'
const navigate = debounce(function navigate(app, from, to, time) {
    from.isPaused = true
    from.alpha = 1
    to.alpha = 0
    app.nextScene = to

    Promise.resolve().then(function() {
        return new Promise(function(resolve, reject) {
            from.actionManager.runAction(FadeTo.create(0, time, null, function() {
                console.log('leave')
                to.isPaused = true
                resolve()
            }))
        })
    }).then(function() {
        return new Promise(function(resolve, reject) {
            to.actionManager.runAction(FadeTo.create(1, time, null, function() {
                console.log('come')
                to.isPaused = false
                app.currentScene = to
                app.nextScene = null
                resolve()
            }))
        })
    })
}, 100)

const navigate2 = debounce(function navigate(app, from, to, time) {
    from.isPaused = true
    const translate = app.session.design.width
    to.position.x = translate
    from.position.x = 0
    app.nextScene = to
    Promise.resolve().then(function() {
        return new Promise(function(resolve, reject) {
            from.actionManager.runAction(MoveBy.create(-translate, 0, time, null, function() {
                console.log('leave')
                to.isPaused = true
                resolve()
            }))
        })
    }).then(function() {
        return new Promise(function(resolve, reject) {
            to.actionManager.runAction(MoveBy.create(-translate, 0, time, null, function() {
                console.log('come')
                to.isPaused = false
                app.currentScene = to
                app.nextScene = null
                resolve()
            }))
        })
    })
}, 100)
export default navigate