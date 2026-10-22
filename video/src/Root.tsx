import { Composition, Sequence } from "remotion";
import "./font";
import { Agent } from "./scenes/Agent";
import { Bidding } from "./scenes/Bidding";
import { Gaming } from "./scenes/Gaming";
import { Hrms } from "./scenes/Hrms";
import { Trading } from "./scenes/Trading";
import { FPS, SCENE } from "./theme";
import { TILES, TileScene } from "./tiles";

// Hero reel: our real products, one design style each. Square, so the hero column keeps a fixed height.
const HERO = [Trading, Hrms, Gaming, Bidding, Agent];

function HeroReel() {
  return (
    <>
      {HERO.map((Scene, i) => (
        <Sequence key={Scene.name} from={i * SCENE} durationInFrames={SCENE}>
          <Scene />
        </Sequence>
      ))}
    </>
  );
}

export function Root() {
  return (
    <>
      <Composition id="Hero" component={HeroReel} durationInFrames={HERO.length * SCENE} fps={FPS} width={1080} height={1080} />
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
