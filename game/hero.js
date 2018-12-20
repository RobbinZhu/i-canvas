import Sprite from '../common/sprite.js'
import Vector from '../common/vector.js'
import handleCollision from './collision_handler.js'

class Hero extends Sprite {
    constructor() {
        super()
    }
    init() {
        super.init()
        this.applyGravity = false
        this.gravityVelocity = 2

        this.canJump = false
        this.tryToJump = false
        this.inSmallJump = false

        //小跳跳跃了多少帧
        this.smallJumpFramesNumber = 0

        //18帧//160
        this.smallJumpVelocities = [
            12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
            10, 8, 6, 6, 4, 4, 2, 0
        ]

        this.inBigJump = false

        //当前跳跃到10帧则切换成大跳
        this.bigJumpFramesThreshold = 10

        //30帧.//224
        this.bigJumpVelocities = [
            14, 14, 14, 14, 14, 14, 14, 14, 14, 14,
            12, 12, 12, 12, 12, 12, 10, 10, 8, 8,
            6, 6, 6, 6, 0, 0, 0, 0, 0, 0
        ]

        //当前跳跃的帧数，大小跳时都需要自增
        this.currentJumpFramesCount = 0

        this.canMove = true
        this.tryToMove = false

        this.touchTop = false
        this.touchLeft = false
        this.touchRight = false
        this.touchGround = false

        this.isHurt = false

        this.velocity = Vector.create(0, 0)
        this.velocityCorrection = Vector.create(0, 0)
        this.velocityPrevious = Vector.create(0, 0)
        this.positionPrevious = Vector.create(0, 0)
        this.collideLayer = null
        return this
    }
    stopJump() {
        this.inSmallJump = false
        this.inBigJump = false
        this.smallJumpFramesNumber = 0
        this.currentJumpFramesCount = 0
        return this
    }
    remove() {
        super.remove()
        this.velocity.remove()
        this.velocityCorrection.remove()
        this.velocity = null
        this.velocityCorrection = null
    }
    _collect() {

    }
}
Hero.prototype.handleCollision = handleCollision
Hero.create = function() {
    return new Hero().init()
}
export default Hero