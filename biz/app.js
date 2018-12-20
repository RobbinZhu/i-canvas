import config from './game_config.js'
import getCanvas from './main_canvas.js'
import App from '../node/app.js'

import SessionComponent from '../component/session_component.js'
import AppStateComponent from './component/app_state.js'

function createSession(config) {
    const session = SessionComponent.create(getCanvas())
    session.setResolution(config.width, config.height, config.maxWidth, config.maxHeight)
    if (config.keyboards) {
        session.domEventComponent.listenKeyEvents(config.keyboards.split('').map(function(char) {
            return char.charCodeAt(0)
        }))
    }
    return session
}

function main(config) {
    const app = App.create()
    app.addSessionSupport(createSession(config))

    if (config.state) {
        app.addStateComponent(AppStateComponent.create(app, config))
    }
    app.run()
}

main(config)