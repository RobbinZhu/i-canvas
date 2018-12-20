import App from '../common/app.js'
import Scene from '../common/scene.js'
import Sprite from '../common/sprite.js'
import Texture from '../common/texture.js'
import ImageLoader from '../common/image_loader.js'
import Camera from '../common/camera.js'
import resolution from './resolution.js'
import TileMapPlatform from '../tiled/tiled_platform.js'

import tileMap from './tilemap_sample.js'
import hero from './hero_biz.js'
import _ from './touch_control.js'
import mainScene from './main_scene.js'
import getCanvas from './main_canvas.js'
import introScene from './intro_scene.js'
import FadeTo from '../action/fade_to.js'
import navigate from './navigate.js'
const app = App.create(getCanvas(), resolution.width, resolution.height)
app.listenKeyEvents('AD J'.split('').map(function(char) {
    return char.charCodeAt(0)
}))
window.onresize = function() {
        app.resize()
        app.pub('win-resize')
    }
    /*
    ImageLoader.load('/head_focus.png').then(function(image) {
        hero.setTexture(Texture.create(image), true)
    })*/

const camera = window.camera = Camera.create(resolution.width, resolution.height)

camera.position.update(resolution.width >> 1, resolution.height >> 1)
app.on('resolution-change', function(width, height) {
    this.updateCanvasSize(width, height)
    camera.width = width
    camera.height = height
})

mainScene.setCamera(camera)

const background = Sprite.create('background')
background.width = resolution.width
background.height = resolution.height
background.anchor.update(0, 0)
background.color = '#000'
background.notUseCamera = true
background.on('resolution-change', function(width, height) {
    this.width = width
    this.height = height
})
mainScene.addChild(background)
    /*
    const hero = Hero.create('hero')
    hero.anchor.update(0, 0)
    hero.position.update(300, 300)
    hero.width = hero.height = 100
    hero.onUpdate.push(function() {
        this.rotation.add(0.01)
    })*/
mainScene.addChild(hero)

const tile = TileMapPlatform.create(tileMap)
hero.collideLayer = tile.getCollideLayer()

mainScene.addChild(tile)
mainScene.sortChildren()

app.presentScene(introScene)

app.pub('win-resize')

app
    .on('leave/intro', function leave() {
        this.off('leave/intro', leave)
        navigate(this, introScene, mainScene, 300)
    })
    .on('leave/main', function leave() {
        this.off('leave/main', leave)
        navigate(this, mainScene, introScene, 300)
    })
app.run()
console.log('new version 2018.10.20.17.50')