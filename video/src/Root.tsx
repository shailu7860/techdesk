import { Composition, Sequence } from "remotion";
import "./font";
import { Agent } from "./scenes/Agent";
import { Bidding } from "./scenes/Bidding";
import { Gaming } from "./scenes/Gaming";
import { Hrms } from "./scenes/Hrms";
import { Trading } from "./scenes/Trading";
import { FPS, SCENE } from "./theme";
import { TILES, TileScene } from "./tiles";

// Hero reel: our real products, one design style each, no caption (the site's window bar labels each scene).
const HERO = [Trading, Hrms, Gaming, Bidding, Agent];

// Case study clips: the same product scenes without the caption (the page has the title), cropped to the content.
const CASES = {
  "algo-trading-platform": Trading,
  "enterprise-software": Hrms,
  "e-bidding-automation": Bidding,
  "gaming-platform": Gaming,
};

function HeroReel() {
  return (
    <>
      {HERO.map((Scene, i) => (
        <Sequence key={Scene.name} from={i * SCENE} durationInFrames={SCENE}>
          <Scene caption={false} />
        </Sequence>
      ))}
    </>
  );
}

export function Root() {
  return (
    <>
      <Composition id="Hero" component={HeroReel} durationInFrames={HERO.length * SCENE} fps={FPS} width={1080} height={940} />
      {Object.entries(CASES).map(([slug, Scene]) => (
        <Composition
          key={slug}
          id={`case-${slug}`}
          component={() => <Scene caption={false} />}
          durationInFrames={SCENE}
          fps={FPS}
          width={1080}
          height={940}
        />
      ))}
      {TILES.map((t) => (
        <Composition
          key={t.id}
          id={`tile-${t.id}`}
          component={TileScene}
          defaultProps={{ tile: t }}
          durationInFrames={SCENE}
          fps={FPS}
          width={960}
          height={720}
        />
      ))}
    </>
  );
}
