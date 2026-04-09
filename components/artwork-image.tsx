import type { ArtworkAspect, ArtworkSpec } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ArtworkImageProps {
  artwork: ArtworkSpec;
  className?: string;
  decorative?: boolean;
  label?: string;
  mediaAspect?: ArtworkAspect;
}

const aspectClasses = {
  portrait: "aspect-[4/5]",
  square: "aspect-square",
  landscape: "aspect-[3/2]",
};

const canvasDimensions: Record<ArtworkAspect, { width: number; height: number }> = {
  portrait: { width: 120, height: 150 },
  square: { width: 120, height: 120 },
  landscape: { width: 150, height: 100 },
};

const containedArtworkClasses: Record<ArtworkAspect, string> = {
  portrait: "aspect-[4/5] h-full max-h-full w-auto max-w-full",
  square: "aspect-square w-[82%] max-w-full",
  landscape: "aspect-[3/2] w-full max-w-full",
};

function renderVariant(spec: ArtworkSpec, width: number, height: number) {
  const { tone, accent, mark } = spec;
  const x = (value: number) => width * value;
  const y = (value: number) => height * value;

  switch (spec.variant) {
    case "field":
      return (
        <>
          <rect x={x(0.1)} y={y(0.09)} width={x(0.8)} height={y(0.8)} fill={tone} opacity="0.72" />
          <rect x={x(0.22)} y={y(0.22)} width={x(0.56)} height={y(0.56)} fill={mark} opacity="0.16" />
          <path
            d={`M${x(0.25)} ${y(0.68)}h${x(0.5)}`}
            stroke={accent}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path d={`M${x(0.33)} ${y(0.3)}h${x(0.34)}`} stroke={accent} strokeWidth="1" opacity="0.55" />
        </>
      );
    case "grid":
      return (
        <>
          <rect x={x(0.12)} y={y(0.12)} width={x(0.76)} height={y(0.76)} fill={tone} opacity="0.54" />
          <rect
            x={x(0.2)}
            y={y(0.2)}
            width={x(0.6)}
            height={y(0.6)}
            fill="none"
            stroke={accent}
            strokeWidth="1.2"
          />
          <path
            d={[
              `M${x(0.2)} ${y(0.4)}h${x(0.6)}`,
              `M${x(0.2)} ${y(0.6)}h${x(0.6)}`,
              `M${x(0.4)} ${y(0.2)}v${y(0.6)}`,
              `M${x(0.6)} ${y(0.2)}v${y(0.6)}`,
            ].join(" ")}
            stroke={mark}
            strokeWidth="1"
            opacity="0.72"
          />
        </>
      );
    case "line":
      return (
        <>
          <rect x={x(0.14)} y={y(0.13)} width={x(0.72)} height={y(0.72)} fill={tone} opacity="0.2" />
          <path
            d={[
              `M${x(0.22)} ${y(0.74)}c${x(0.08)}-${y(0.18)} ${x(0.13)}-${y(0.42)} ${x(0.2)}-${y(0.58)}`,
              `M${x(0.44)} ${y(0.8)}c${x(0.08)}-${y(0.22)} ${x(0.15)}-${y(0.4)} ${x(0.28)}-${y(0.62)}`,
              `M${x(0.32)} ${y(0.42)}c${x(0.12)} ${y(0.03)} ${x(0.22)} ${y(0.01)} ${x(0.35)}-${y(0.08)}`,
            ].join(" ")}
            stroke={accent}
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          <path d={`M${x(0.18)} ${y(0.84)}h${x(0.64)}`} stroke={mark} strokeWidth="1" opacity="0.6" />
        </>
      );
    case "wash":
      return (
        <>
          <ellipse cx={x(0.45)} cy={y(0.33)} rx={x(0.28)} ry={y(0.18)} fill={tone} opacity="0.48" />
          <ellipse cx={x(0.62)} cy={y(0.56)} rx={x(0.22)} ry={y(0.24)} fill={mark} opacity="0.18" />
          <ellipse cx={x(0.37)} cy={y(0.62)} rx={x(0.15)} ry={y(0.12)} fill={tone} opacity="0.7" />
          <path
            d={`M${x(0.16)} ${y(0.78)}c${x(0.14)}-${y(0.04)} ${x(0.42)}-${y(0.06)} ${x(0.6)}-${y(0.01)}`}
            stroke={accent}
            strokeWidth="1.2"
            fill="none"
          />
        </>
      );
    case "arch":
      return (
        <>
          <path
            d={`M${x(0.25)} ${y(0.84)}V${y(0.42)}c0-${y(0.17)} ${x(0.12)}-${y(0.27)} ${x(0.25)}-${y(0.27)}s${x(0.25)} ${y(0.1)} ${x(0.25)} ${y(0.27)}v${y(0.42)}`}
            fill={tone}
            opacity="0.74"
          />
          <path
            d={`M${x(0.32)} ${y(0.82)}V${y(0.46)}c0-${y(0.13)} ${x(0.08)}-${y(0.2)} ${x(0.18)}-${y(0.2)}s${x(0.18)} ${y(0.07)} ${x(0.18)} ${y(0.2)}v${y(0.36)}`}
            fill="none"
            stroke={accent}
            strokeWidth="1.2"
          />
          <path d={`M${x(0.2)} ${y(0.84)}h${x(0.6)}`} stroke={mark} strokeWidth="1" opacity="0.7" />
        </>
      );
    case "dots":
      return (
        <>
          <rect x={x(0.14)} y={y(0.14)} width={x(0.72)} height={y(0.72)} fill={tone} opacity="0.2" />
          {Array.from({ length: 5 }).map((_, row) =>
            Array.from({ length: 4 }).map((__, col) => (
              <circle
                key={`${row}-${col}`}
                cx={x(0.28 + col * 0.13)}
                cy={y(0.28 + row * 0.13)}
                r={Math.min(width, height) * 0.03}
                fill={row % 2 === 0 ? mark : accent}
                opacity={0.3 + col * 0.08}
              />
            )),
          )}
          <path d={`M${x(0.24)} ${y(0.84)}h${x(0.46)}`} stroke={accent} strokeWidth="1" opacity="0.55" />
        </>
      );
    case "portrait":
      return (
        <>
          <ellipse cx={x(0.5)} cy={y(0.28)} rx={x(0.2)} ry={y(0.18)} fill={tone} opacity="0.64" />
          <path
            d={`M${x(0.3)} ${y(0.28)}c0-${y(0.11)} ${x(0.08)}-${y(0.17)} ${x(0.2)}-${y(0.17)}s${x(0.2)} ${y(0.07)} ${x(0.2)} ${y(0.17)}-${x(0.08)} ${y(0.19)}-${x(0.2)} ${y(0.19)}S${x(0.3)} ${y(0.39)} ${x(0.3)} ${y(0.28)}Z`}
            fill="none"
            stroke={accent}
            strokeWidth="1.4"
          />
          <path
            d={`M${x(0.22)} ${y(0.84)}c${x(0.03)}-${y(0.13)} ${x(0.15)}-${y(0.23)} ${x(0.28)}-${y(0.23)}s${x(0.25)} ${y(0.09)} ${x(0.28)} ${y(0.23)}`}
            fill={mark}
            opacity="0.3"
          />
          <path
            d={`M${x(0.38)} ${y(0.28)}c${x(0.03)} ${y(0.04)} ${x(0.08)} ${y(0.06)} ${x(0.12)} ${y(0.06)}s${x(0.09)}-${y(0.02)} ${x(0.12)}-${y(0.06)}`}
            stroke={mark}
            strokeWidth="1.1"
            fill="none"
          />
        </>
      );
  }
}

export function ArtworkImage({
  artwork,
  className,
  decorative = true,
  label,
  mediaAspect,
}: ArtworkImageProps) {
  const canvas = canvasDimensions[artwork.aspect];
  const displayAspect = mediaAspect ?? artwork.aspect;

  return (
    <div className={cn("relative overflow-hidden bg-transparent", aspectClasses[displayAspect], className)}>
      <div className="flex h-full w-full items-center justify-center">
        <div className={cn("relative max-h-full max-w-full", containedArtworkClasses[artwork.aspect])}>
          <svg
            viewBox={`0 0 ${canvas.width} ${canvas.height}`}
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 h-full w-full"
            role={decorative ? undefined : "img"}
            aria-hidden={decorative}
            aria-label={decorative ? undefined : label}
          >
            <rect x="0" y="0" width={canvas.width} height={canvas.height} fill={artwork.base} />
            {renderVariant(artwork, canvas.width, canvas.height)}
          </svg>
        </div>
      </div>
    </div>
  );
}
