import Sprite from '../common/sprite.js'
import scene from './main_scene.js'
import { btnLeft, btnRight, btnJump, btnFire } from './touch_press.js'
import Resolution from './resolution.js'
import debounce from '../common/debounce.js'
import Pubsub from '../common/pubsub.js'
const btnWidth = 250
const btnHeight = 200

const left = Sprite.create()
left.notUseCamera = true
left.width = btnWidth
left.height = btnHeight
left.anchor.update(0, 1)
left.updateZIndex(10)
left.alpha = 0.85
left.position.update(0, Resolution.height)
left.onUpdate.push(function(session) {
    this.color = btnLeft.pressed ? '#938477' : '#e4e2e1'
})

const right = Sprite.create()
right.notUseCamera = true
right.width = btnWidth
right.height = btnHeight
right.updateZIndex(10)
right.anchor.update(0, 1)
right.alpha = 0.85
right.position.update(btnWidth, Resolution.height)
right.onUpdate.push(function(session) {
    this.color = btnRight.pressed ? '#938477' : '#e4e2e1'
})

const jump = Sprite.create()
jump.notUseCamera = true
jump.width = btnWidth
jump.height = btnHeight
jump.anchor.update(1, 1)
jump.updateZIndex(10)
jump.alpha = 0.85
jump.position.update(Resolution.width - btnWidth, Resolution.height)
jump.onUpdate.push(function(session) {
    this.color = btnJump.pressed ? '#938477' : '#e4e2e1'
})

const fire = Sprite.create()
fire.notUseCamera = true
fire.width = btnWidth
fire.height = btnHeight
fire.anchor.update(1, 1)
fire.updateZIndex(10)
fire.alpha = 0.85
fire.position.update(Resolution.width, Resolution.height)

const navigate = debounce(function() {
    Pubsub.pub('leave/main')
}, 300)

fire.onUpdate.push(function(session) {
    this.color = btnFire.pressed ? '#938477' : '#e4e2e1'
    if (btnFire.pressed) {
        navigate()
    }
})
scene.on('resolution-change', function(width, height) {
    left.position.update(0, height)
    right.position.update(btnWidth, height)
    jump.position.update(width - btnWidth, height)
    fire.position.update(width, height)
})
scene.addChild(left)
scene.addChild(right)
scene.addChild(jump)
scene.addChild(fire)

scene.supportTouch()
scene.touchdown = function(events, session, camera) {
    btnLeft.pressed = btnRight.pressed = btnJump.pressed = btnFire.pressed = false
    for (let i = 0, j = events.length; i < j; i++) {
        const event = events[i]
        if (event) {
            const x = event.x
            const y = event.y

            if (left.frame.contains(x, y)) {
                btnLeft.pressed = true
            }
            if (right.frame.contains(x, y)) {
                btnRight.pressed = true
            }
            if (jump.frame.contains(x, y)) {
                btnJump.pressed = true
            }
            if (fire.frame.contains(x, y)) {
                btnFire.pressed = true
            }
        }
    }
}
scene.supportKeyboard()
scene.keydown = function(keys) {
    btnLeft.pressed = btnLeft.pressed || !!keys[65] //A
    btnRight.pressed = btnRight.pressed || !!keys[68] //D
    btnJump.pressed = btnJump.pressed || !!keys[32] //spacce
    btnFire.pressed = btnFire.pressed || !!keys[74] //J
}
export default null