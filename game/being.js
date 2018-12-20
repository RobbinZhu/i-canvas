import Sprite from '../../common/sprite.js'
import CollisionType from './collision_type.js'
class Being extends Sprite {
    init() {
        super.init()
        this.categoryBits = CollisionType.Beings.categoryBits
        this.maskBits = CollisionType.Beings.maskBits
        return this
    }
    _collect() {
        Being.collect(this)
    }
    canCollideTo(to) {
        return (this.maskBits & to.categoryBits) && (this.categoryBits & to.maskBits)
    }
    collideTo(to) {
        if (this.canCollideTo(to)) {
            this.handleCollisionTo(to)
        }
    }
    handleCollisionTo() {
        console.log('you need to implement handleCollisionTo function by yourself')
    }
}

const caches = []

Being.create = function() {
    return (caches.length ? caches.pop() : new Being).init()
}

Being.collect = function(being) {
    caches.push(being)
}

export default Being