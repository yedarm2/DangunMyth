public class S3C1 extends Scene {
  public float SCENE_DURATION =10f;
  private float animalScale = 0.25f;
  private float utilScale = 0.05f;
  private int animalY = height - 280;
  private int jumpY = 0;
  private int jumpDir = 1;
  private int garlicX = width / 2 + 315;
  private int garlicY = animalY - 15;
  private int ssugX = width / 2 + 110;
  private int ssugY = animalY - 15;
  private int utilY = height - 120;
  private int garlicInitVelY = 15;
  private int garlicInitVelX = 5;
  private int garlicCurrentVelY = garlicInitVelY;
  private float garlicRotate = 1.0f;
  private float garlicAngle = random(0.05f, 0.15f);
  private int ssugInitVelY = 18;
  private int ssugInitVelX = 3;
  private int ssugCurrentVelY = ssugInitVelY;
  private float ssugRotate = 1.0f;
  private float ssugAngle = random(0.05f, 0.15f);

  public S3C1() {
  }

  @Override public void OnEnter() {
    image.LoadImage("background", "Images/S3/C1/background");
    image.LoadImage("bear", "Images/S3/C1/bear");
    image.LoadImage("tiger", "Images/S3/C1/tiger");
    image.LoadImage("garlic", "Images/S3/C1/garlic");
    image.LoadImage("ssug", "Images/S3/C1/ssug");

    animalScale = 0.25f;
    utilScale = 0.05f;
    animalY = height - 280;
    jumpY = 0;
    jumpDir = 1;
    garlicX = width / 2 + 315;
    garlicY = animalY - 15;
    ssugX = width / 2 + 110;
    ssugY = animalY - 15;
    utilY = height - 120;
    garlicInitVelY = 15;
    garlicInitVelX = 5;
    garlicCurrentVelY = garlicInitVelY;
    garlicRotate = 1.0f;
    garlicAngle = random(0.05f, 0.15f);
    ssugInitVelY = 18;
    ssugInitVelX = 3;
    ssugCurrentVelY = ssugInitVelY;
    ssugRotate = 1.0f;
    ssugAngle = random(0.05f, 0.15f);
  }

  @Override public void OnDraw() {
    image.DrawImageScale("background", new PVector(width / 2, height / 2), new PVector(1, 1));
    image.DrawImageScale("bear", new PVector(width / 2 - 250, animalY), new PVector(animalScale, animalScale));

    // up and down animation
    if (jumpY < 0) jumpY = 0;
    if (jumpY > 15) jumpDir *= -1;
    jumpY += jumpDir;

    image.DrawImageScale("tiger", new PVector(width / 2 + 230, animalY - jumpY), new PVector(animalScale, animalScale));

    // util animation
    // garlic part
    if (garlicY < utilY) {
      garlicY -= garlicCurrentVelY;
      garlicX += garlicInitVelX;
      garlicCurrentVelY--;
      garlicRotate += garlicAngle;
    }
    image.DrawImageScale("garlic", new PVector(garlicX, garlicY), new PVector(utilScale, utilScale), garlicRotate);

    // ssug part
    if (ssugY < utilY) {
      ssugY -= ssugCurrentVelY;
      ssugX += ssugInitVelX;
      ssugCurrentVelY--;
      ssugRotate += ssugAngle;
    }
    image.DrawImageScale("ssug", new PVector(ssugX, ssugY), new PVector(utilScale, utilScale), ssugRotate);

    if (time.time - enterTime > SCENE_DURATION) {
      scene.ChangeScene(new S3C2());
    }
  }

  @Override public void OnExit() {
  }
}
