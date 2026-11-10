import type { RoadBadge } from "../lib/types"

export function MetaBadges({ badges }: { badges: RoadBadge[] }) {
  return (
    <>
      {badges.map((badge) => (
        <span key={badge.label} className={badge.tone ? `mb ${badge.tone}` : "mb"}>
          {badge.label}
        </span>
      ))}
    </>
  )
}
