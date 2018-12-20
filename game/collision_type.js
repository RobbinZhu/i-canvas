const Beings = {
    categoryBits: 1,
    maskBits: 0,
    type: 1
}

const Stones = {
    categoryBits: 2,
    maskBits: 0,
    type: 2
}

const Things = {
    categoryBits: 4,
    maskBits: 0,
    type: 4
}

function addCollision(a, b) {
    a.maskBits |= b.categoryBits
}

//Beings和Things以及Stones碰撞
addCollision(Beings, Things)
addCollision(Beings, Stones)

//Stones和Beings以及Things以及其他Stones碰撞
addCollision(Stones, Beings)
addCollision(Stones, Things)
addCollision(Stones, Stones)

//Things和Beings以及Stones碰撞
addCollision(Things, Beings)
addCollision(Things, Stones)

function checkCollision(a, b) {
    const collide =
        (a.maskBits & b.categoryBits) != 0 &&
        (a.categoryBits & b.maskBits) != 0
    console.log(collide)
    return collide
}
checkCollision(Beings, Things)
checkCollision(Beings, Beings)
checkCollision(Beings, Stones)
checkCollision(Things, Stones)
/*
export default {
    Beings,
    Stones,
    Things
}*/