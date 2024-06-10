class S3C3V2_1_1 extends Scene {
  constructor() {
    super();
    this.PREFIX = "Images/S3/C3/V2/_1/_1/";
    this.SOUND_PREFIX = "Sounds/S3/C3/V2/_1/_1/narr/";

    this.centerVector;
    this.centerX;
    this.centerY;
    this.sunY = 600;
    this.cloudXDistance = 0;
    this.speed = 0.8;

    this.SCENE_DURATION = 3;
  }

  OnEnter() {
    this.centerX = width / 2;
    this.centerY = height / 2;
    this.centerVector = createVector(this.centerX, this.centerY);
    this.sunY = 600;
    this.cloudXDistance = 0;

    imageManager.LoadImage("text", this.PREFIX + "text");
    imageManager.LoadImage("cloud_left", this.PREFIX + "cloud_left");
    imageManager.LoadImage("cloud_right", this.PREFIX + "cloud_right");
    imageManager.LoadImage("cloud_middle", this.PREFIX + "cloud_middle");
    imageManager.LoadImage("lake", this.PREFIX + "lake");
    imageManager.LoadImage("mountains", this.PREFIX + "mountains");
    imageManager.LoadImage("sky", this.PREFIX + "sky");
    imageManager.LoadImage("sun", this.PREFIX + "sun");

    soundManager.PlaySound("S3/C3/V2/_1/_1/narr");
  }

  OnDraw() {
    imageManager.DrawImage("sky", this.centerVector);
    imageManager.DrawImage("sun", createVector(this.centerX, this.sunY));
    imageManager.DrawImage("mountains", this.centerVector);
    imageManager.DrawImage("lake", this.centerVector);
    imageManager.DrawImage(
      "cloud_left",
      createVector(this.centerX - this.cloudXDistance, this.centerY)
    );
    imageManager.DrawImage(
      "cloud_right",
      createVector(this.centerX + this.cloudXDistance, this.centerY)
    );
    imageManager.DrawImage(
      "cloud_middle",
      createVector(this.centerX - this.cloudXDistance, this.centerY)
    );
    imageManager.DrawImage("text", this.centerVector);

    if (this.sunY < 400) {
      sceneManager.ChangeScene(new S3C3V2_1_2());
    } else {
      this.sunY -= this.speed;
      this.cloudXDistance += this.speed;
    }
  }

  OnExit() {
    soundManager.stopNowPlaying();
  }
}
