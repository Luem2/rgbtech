/* 
    ███████████     █████████  ███████████  ███████████ ██████████   █████████  █████   █████
    ░███    ░███  ███     ░░░  ░███    ░███░   ░███  ░  ░███  █ ░  ███     ░░░  ░███    ░███
    ░██████████  ░███          ░██████████     ░███     ░██████   ░███          ░███████████
    ░███░░░░░███ ░███    █████ ░███░░░░░███    ░███     ░███░░█   ░███          ░███░░░░░███
    ░███    ░███ ░░███  ░░███  ░███    ░███    ░███     ░███ ░   █░░███     ███ ░███    ░███
    █████   █████ ░░█████████  ███████████     █████    ██████████ ░░█████████  █████   █████
    ░░░░░   ░░░░░   ░░░░░░░░░  ░░░░░░░░░░░     ░░░░░    ░░░░░░░░░░   ░░░░░░░░░  ░░░░░   ░░░░░

                                            _..._
                                          .'     '.    ___
                                       .-|   /:.   |  |   |
                                       |  \  |:.   /.-'-./
                                       | .-'-;:__.'    =/
                                       .'=  *=|      _.='
                                      /   _.  |    ;
                                     ;-.-'|    \   |
                                    /   | \    _\  _\
                                    \__/'._;.  ==' ==\
                                             \    \   |
                                             /    /   /
                                             /-._/-._/
                                            \   `\  \
                                              `-._/._/

*/

import Server from './config/server'

async function bootstrap() {
    try {
        const server = new Server()

        server.listen()
    } catch (error) {
        console.error(error)
    }
}

bootstrap()
