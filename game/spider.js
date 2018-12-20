import Sprite from '../common/sprite.js'
import Vector from '../common/vector.js'
import handleCollision from './collision_handler.js'

class Monster extends Sprite {
    constructor() {
        super()
    }
    init(name) {
        super.init(name)

        this.applyGravity = true
        this.gravityVelocity = 2
        this.touchTop = false
        this.touchLeft = false
        this.touchRight = false
        this.touchGround = false

        this.isHurt = false
        this.status = 0
        this.velocity = Vector.create(0, 0)
        this.velocityCorrection = Vector.create(0, 0)
        return this
    }
    _collect() {
        this.velocity.remove()
        this.velocityCorrection.remove()
        this.velocity = this.velocityCorrection = null
        Monster.collect(this)
    }
}

Monster.handleCollision = handleCollision

const cache = []
Monster.collect = function(monster) {
    cache.push(monster)
}

Monster.create = function(name) {
    return (cache.length ? cache.pop() : new Enemy).init(name)
}
export default Monster