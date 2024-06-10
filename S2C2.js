class S2C2 extends Scene {
  constructor() {
    super();
    this.SCENE_DURATION = 6;
    this.ROTATE_INTERVAL = 0.167;
    this.rotateTick = 0;
    this.WALK_INTERVAL = 0.09;
    this.walkTick = 0;
    this.imageNumber = 1;
    this.imageMaxNumber = 3;
    this.imageNumberDelta = 1;
    this.rock_x = 1000;
    this.rock_y = 450;
    this.rock_width = 200;
    this.rock_height = 200;
    this._rock_size = 0.5;
    this._rock_rotate = 0.01;
    this.tiger_x = 20;
    this.tiger_y = 400;
    this.bear_x = -200;
    this.bear_y = 400;
    this.animation = 1;
    this.stepDuration = 0;
    this.stepSoundInterval = 0.3;
    this.stepSeconds = 0;
    this.stepID = 0;
    this.isPlayedEffect = false;
  }

  OnEnter() {
    imageManager.LoadImage("background", "Images/S2/C2/background");
    imageManager.LoadImage("rock", "Images/S2/C2/rock");
    imageManager.LoadImage("tiger_body", "Images/S2/C2/tiger_body");
    imageManager.LoadImage("tiger_face", "Images/S2/C2/tiger_face");
    imageManager.LoadImage("tiger_left", "Images/S2/C2/tiger_foot_right");
    imageManager.LoadImage("tiger_right", "Images/S2/C2/tiger_foot_left");
    imageManager.LoadImage("bear_body", "Images/S2/C2/bear_body");
    imageManager.LoadImage("bear_face", "Images/S2/C2/bear_face");
    imageManager.LoadImage("bear_left", "Images/S2/C2/bear_foot_right");
    imageManager.LoadImage("bear_right", "Images/S2/C2/bear_foot_left");
    imageManager.LoadImage("tiger1", "Images/S2/C2/tiger1");
    imageManager.LoadImage("tiger2", "Images/S2/C2/tiger2");
    imageManager.LoadImage("tiger3", "Images/S2/C2/tiger3");
    imageManager.LoadImage("bear1", "Images/S2/C2/bear1");
    imageManager.LoadImage("bear2", "Images/S2/C2/bear2");
    imageManager.LoadImage("bear3", "Images/S2/C2/bear3");

    this._rock_size = 0.5;
    this._rock_rotate = 0.01;
    this.tiger_x = 20;
    this.tiger_y = 400;
    this.bear_x = -200;
    this.bear_y = 400;
    this.animation = 1;
    this.rotateTick = 0;
    this.walkTick = 0;
    this.isPlayedEffect = false;
  }

  OnDraw() {
    if (timeManager.time - timeManager.enterTime > this.SCENE_DURATION) {
      sceneManager.ChangeScene(new S2C3());
    }
    imageManager.DrawImageScale(
      "background",
      createVector(width / 2, height / 2, 0),
      createVector(1, 1, 0)
    );

    imageManager.DrawImageScale(
      "tiger" + this.imageNumber,
      createVector(this.tiger_x, this.tiger_y + 30, 0),
      createVector(0.2, 0.2, 0)
    );
    imageManager.DrawImageScale(
      "bear" + this.imageNumber,
      createVector(this.bear_x, this.bear_y + 30, 0),
      createVector(0.2, 0.2, 0)
    );

    if (timeManager.time - timeManager.enterTime > 4.167) {
      this.rotateTick += timeManager.deltaTime;
      if (this.rotateTick > this.ROTATE_INTERVAL) {
        this.rotateTick = 0;
        this._rock_rotate *= -1;
      }
      imageManager.DrawImageScale(
        "rock",
        createVector(this.rock_x, this.rock_y, 0),
        createVector(this._rock_size, this._rock_size, 0),
        this._rock_rotate
      );

      if (this._rock_size >= 0.4) {
        this._rock_size -= 0.6 * timeManager.deltaTime;
      }
    } else {
      this.walkTick += timeManager.deltaTime;

      if (
        this.stepSeconds >= this.stepSoundInterval &&
        this.stepDuration < 4.167
      ) {
        this.stepID = floor(random(2));
        if (this.stepID === 0) {
          soundManager.PlaySound("Effects/Step_Cave2");
        } else if (this.stepID === 1) {
          soundManager.PlaySound("Effects/Step_Cave3");
        } else if (this.stepID === 2) {
          soundManager.PlaySound("Effects/Step_Cave4");
        }
        this.stepSeconds = 0;
      } else {
        this.stepDuration += timeManager.deltaTime;
        this.stepSeconds += timeManager.deltaTime;
      }

      if (this.walkTick > this.WALK_INTERVAL) {
        this.walkTick = 0;
        this.animation *= -1;
        this.imageNumber += this.imageNumberDelta;

        if (this.imageNumber === this.imageMaxNumber) {
          this.imageNumber = 1;
        }
      }

      this.tiger_x += 180 * timeManager.deltaTime;
      this.bear_x += 180 * timeManager.deltaTime;
    }

    if (
      timeManager.time - timeManager.enterTime > this.SCENE_DURATION &&
      !this.isPlayedEffect
    ) {
      soundManager.PlaySound("S2_S3_FootStuckRock");
      this.isPlayedEffect = true;
    }
  }

  OnExit() {}
}
