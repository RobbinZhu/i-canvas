import Scene from '../common/scene.js'
import Sprite from '../common/sprite.js'
import Resolution from './resolution.js'
import Pubsub from '../common/pubsub.js'
import debounce from '../common/debounce.js'
const introScene = Scene.create('intro')
const intro = Sprite.create('intro-text')
intro.color = 'red'
intro.width = 300
intro.height = 200

intro.position.update(Resolution.width * 0.5, Resolution.height * 0.5)
introScene.addChild(intro)

intro.on('resolution-change', function(width, height) {
    this.position.update(width * 0.5, height * 0.5)
})
introScene.supportTouch()

const navigate = debounce(function() {
    Pubsub.pub('leave/intro')
}, 300)

introScene.touchdown = function(events) {
    for (let i = 0, j = events.length; i < j; i++) {
        const event = events[i]
        if (event) {
            const x = event.x
            const y = event.y

            if (intro.frame.contains(x, y)) {
                navigate()
            }
        }
    }
}
export default introScene