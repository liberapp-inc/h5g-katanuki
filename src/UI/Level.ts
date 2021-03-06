class Level extends UICompornent{

    static I:Level = null;   // singleton instance

    score:number = 0;

    bestScore:number = 0;
    text:eui.Label = null;
    textBest:eui.Label = null;
    textColor : number = 0x00FF3B;

    constructor(x : number, y : number, width : number, height : number, color : number) {
        super(x,y,width,height);

        this.textColor = color;

        Level.I = this;
        this.score = GameScene.stageLevel;
        this.text = Util.myText(0, 0, "LEVEL : 0", 100, 0.5, this.textColor, true);
        this.compornent.addChild( this.text );

        this.bestScore = Util.loadLocalStrage("Level.I.bestScore",Level.I.bestScore);
        this.textBest = Util.myText(0, 50, "BEST : " + this.bestScore.toString(), 100, 0.5, this.textColor, true);
        this.compornent.addChild( this.textBest );
        
    }
    
    addDestroyMethod() {
        this.compornent.removeChild( this.text );
        this.text = null;
        this.compornent.removeChild( this.textBest );
        this.textBest = null;
    }

    updateContent() {
        this.text.text = "LEVEL : " + GameScene.stageLevel.toFixed();
        if( this.bestScore < GameScene.stageLevel ){
            this.bestScore = GameScene.stageLevel;
            this.textBest.text = "BEST : " + this.bestScore.toFixed();
            Util.saveLocalStrage("Level.I.bestScore",GameScene.stageLevel);
        }
    }

    addScore(){
        this.score += 1;
        
    }


}