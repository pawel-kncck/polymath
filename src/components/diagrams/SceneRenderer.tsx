import { CANVAS } from './constants';
import { FourWayIntersectionScene } from './scenes/FourWayIntersectionScene';
import { RoundaboutScene } from './scenes/RoundaboutScene';
import { StraightRoadScene } from './scenes/StraightRoadScene';
import { TJunctionScene } from './scenes/TJunctionScene';
import type { Scene } from './types';

interface SceneRendererProps {
  scene: Scene;
  /** Rendered SVG size in CSS pixels. Default 320. */
  size?: number;
  /** Accessible label for the diagram (aria-label on the SVG). */
  ariaLabel?: string;
  className?: string;
}

/**
 * Entry point for rendering any Scene. Wraps the scene in a fixed 400x400
 * viewBox and dispatches to the concrete scene component.
 */
export function SceneRenderer({
  scene,
  size = 320,
  ariaLabel,
  className,
}: SceneRendererProps) {
  return (
    <figure className={className}>
      <svg
        viewBox={`0 0 ${CANVAS.size} ${CANVAS.size}`}
        width={size}
        height={size}
        role="img"
        aria-label={ariaLabel ?? scene.caption ?? 'Schemat drogowy'}
        style={{ display: 'block' }}
      >
        <SceneBody scene={scene} />
      </svg>
      {scene.caption && (
        <figcaption
          style={{ textAlign: 'center', fontSize: 13, marginTop: 6, color: '#475569' }}
        >
          {scene.caption}
        </figcaption>
      )}
    </figure>
  );
}

function SceneBody({ scene }: { scene: Scene }) {
  switch (scene.kind) {
    case 'straight':
      return <StraightRoadScene scene={scene} />;
    case 'intersection-4way':
      return <FourWayIntersectionScene scene={scene} />;
    case 'intersection-t':
      return <TJunctionScene scene={scene} />;
    case 'roundabout':
      return <RoundaboutScene scene={scene} />;
  }
}
