// follow tutorial here: https://waelyasmina.net/articles/pixi-js-tutorial-for-complete-beginners/
// typescript + Vite setup here: https://mrlinxed.com/blog/pixijs-setup-with-vite-and-typescript
import {Application, Assets, Sprite, Graphics, Text, Container } from 'pixi.js';
import { Button } from './lib/button';
import manifest from './manifest.json';


(async()=>{

    // ****************************
    // *** INITIALIZING THE APP ***
    // ****************************
    const app = new Application();
    await app.init({ 
        resizeTo: window,
        backgroundAlpha: 0.5,
        backgroundColor: 0xffea00
    });
    // add the app's canvas to the document's body
    document.body.appendChild(app.canvas);
    
    // remove additional scrolling
    app.canvas.style.position = 'absolute';

    // setup dev tools CHROME EXTENSION
    globalThis.__PIXI_APP__ = app;


    // *************************
    // *** LOADING MANIFESTS ***
    // *************************

    // load from a manifest file
    await Assets.init({manifest: manifest});

    const gameScreen = await Assets.loadBundle('game_screen');
    // const titleScreen = await Assets.loadBundle('title-screen');

    const bubbleSprite = Sprite.from(gameScreen.bubble_bomb);
    app.stage.addChild(bubbleSprite);

    // **********************
    // *** DRAWING SHAPES ***
    // **********************
    const rectangle = new Graphics();
    rectangle.rect(200, 200, 200, 180)
    .fill({
        // Sets the color
        color: 0xffea00,
        // Sets the opacity
        alpha: 0.5
    })
    .stroke({
        // Sets the thickness of the stroke
        width: 8,
        color: 0x00ff00
    });
    app.stage.addChild(rectangle);

    // ********************
    // *** WRITING TEXT ***
    // ********************
    const text = new Text({
        text: 'Hello Pixi'
      });
      
    app.stage.addChild(text);



    // *************************
    // *** IMAGES / TEXTURES ***
    // *************************

    // Step 1 - note that this is in the /public folder, so everything is relative to public
    const texture = await Assets.load('images/game-screen/sample.png');
    // Step 2
    const sprite = Sprite.from(texture);
    
    // Or
    //  const sprite2 = new Sprite(texture);
    // Step 3
    app.stage.addChild(sprite);

    // change the width and height
    sprite.scale.set(1, 1);

    // or could use the following:
    // Sets the width to 0.5 of its original width
    // sprite.scale.x = 0.5;
    // Doubles the height of the sprite
    // sprite.scale.y = 2;

    // set the position
    sprite.x = 400;
    sprite.y = 100;

    // Or
    // text.position.x = 1500;
    // text.position.y = 100;

    // Or
    // text.position.set(1300, 520);

    // seeting the pivot point - ANCHOR is only available for Sprite class
    // sprite.anchor.x = 0.5;
    // sprite.anchor.y = 0.5;

    //Or
    sprite.anchor.set(0.5, 0.5);


    // ********************************
    // *** INTERACTING WITH OBJECTS ***
    // ********************************

    // So as I mentioned earlier, Pixi.js' interaction system is focused solely on pointer events. 
    // If you want to handle keyboard events or other types of events, you'll need to use the 
    // classic addEventListener() method provided by JavaScript.
    sprite.on('pointerdown', moveSprite);    // could also use addEventListener
    // sprite.addEventListener("pointerdown", moveSprite);
    sprite.eventMode = 'static'; // need this to handle interaction
    sprite.cursor = 'pointer';

    function moveSprite() {
        sprite.position.x -= 10;
        sprite.position.y += 10;
    }

    

    // ************************
    // *** USING THE TICKER ***
    // ************************

    // const circle = new Graphics();
    // To achieve this, we'll call the add() method from the app.ticker property. 
    // This method allows us to register a callback function that defines what actions 
    // to perform on each frame update. In our case, we'll use it to continuously create 
    // and add white circles (representing snow) to the canvas.
    // app.ticker.add(
    //     () => {
    //         circle.circle(
    //             Math.random() * app.screen.width,
    //             Math.random() * app.screen.height,
    //             5
    //             )
    //             .fill({
    //                 color: 0xffffff
    //             });
    //         app.stage.addChild(circle);
    //     }
    // );


    // ******************
    // *** CONTAINERS ***
    // ******************

    // To group two or more components within a Container, we first need to create 
    // the Container and then add it to the stage using the addChild() method.
    const square = new Graphics();
    square.rect(200, 200, 200, 180)
    .fill({
        // Sets the color
        color: 0xffea00,
        // Sets the opacity
        alpha: 0.5
    })
    .stroke({
        // Sets the thickness of the stroke
        width: 8,
        color: 0x00ff00
    });

    const shapesContainer = new Container();
    app.stage.addChild(shapesContainer);
    shapesContainer.addChild(square); // add something to the container in the parentheses
    shapesContainer.x = app.screen.width / 2;
    shapesContainer.y = app.screen.height / 2;

    // get the global position of square
    const squareX = square.getGlobalPosition().x;
    const squareY = square.getGlobalPosition().y;
    console.log(`Global positions of square are: X:${squareX} and Y:${squareY}`);


    // *************
    // *** FONTS ***
    // *************

    const ludicrousFont = await Assets.load('fonts/Ludicrous-subset.woff2'); // maybe use .ttf files as probably better supported

    const ludiText= new Text({
        text: 'My Ludicrous Headline',
        style: {
            fill: '#323232',
            fontFamily: ludicrousFont.family,
            fontSize: 72
        }
    });

    app.stage.addChild(ludiText);

    ludiText.x = (app.screen.width - ludiText.width) / 2;
    ludiText.y = (app.screen.height - ludiText.height) / 2;


    // ********************
    // *** SPRITESHEETS ***
    // ********************



    // load the spritesheet
    const gameSpritesheet = await Assets.load('sprites/cvc-assets.json');
    const buttonMark = new Sprite(gameSpritesheet.textures['button-mark.png']);
    buttonMark.y += 50;

    app.stage.addChild(buttonMark);

    // ***************
    // *** CLASSES ***
    // ***************


    // extending the Sprite class - see /lib/button.js
    const buttonUndo = new Button(gameSpritesheet.textures['button-undo.png'], 500, 0);
    buttonUndo.x = 500;
    console.log(`Height of button is: ${buttonUndo.returnHeight()}`);
    console.log(`OrigX of button is: ${buttonUndo.returnOrigX()}`);
    app.stage.addChild(buttonUndo);
    
    
})();



