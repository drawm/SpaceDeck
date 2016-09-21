# Space Deck

*Space Deck* is spaceship deck simulator where you play the role of a crew member.

**Pilot** the ship.  
Man the **weapons**.  
Power the **shield**.  
Manage the **engineering**.   
Watch the **radar**.  
Or be the **captain** and tell your friends what to do.

You can do it all!


## Developpement

### Guideline
* Almost all time should go toward the game, not the tooling.
* Less dependencies is usually better than more.
* Less config is usually better than more.
* Please, KISS.
* Keep it SOLID.
* Do not commit broken build.


### Prerequisite
* Node
* Npm
* Typescript
* Electron

### Install
```bash
git clone https://github.com/drawm/SpaceDeck
cd SpaceDeck
npm install
. setup.sh
```

### Client 
```bash
npm run client
```

### Server  
```bash
npm run start
```


## Roadmap

- [ ] v0.03 (2016-09-?)
    - Add a readme
    - Add a roadmap
    - Experiment with a game engine / rendering pipeline for canvas/webgl
        - Phaser
        - Pixie
        - Babylon
- [x] v0.02 (2016-09-20)
    - Work on tooling
        - Typescript + typings
        - Webpack
    - Better seperation of client and server
    - Experiment with dataflow lib for the client
        - ~~Redux~~
        - MobX
- [x] v0.01 (2016-09-18)
    - Basic setup
    - Barebone server with connections and dummy values
    - Barebone client with server's dummy value
    
    
