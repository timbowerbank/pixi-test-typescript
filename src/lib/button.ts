import {Sprite, Texture} from 'pixi.js';

export class Button extends Sprite {

    origX;
    origY;

    constructor(textureRef: Texture, origX: number, origY: number) {
        super(textureRef);
        this.origX = origX;
        this.origY = origY;
    }

    returnOrigX() {
        return this.origX;
    }

    returnOrigY() {
        return this.origY;
    }


    returnHeight() {
        return this.height;
    }

}
