import type { LucideIcon } from "lucide-react"

export function Icon({
  icon: Glyph,
  className = "ic16",
}: {
  icon: LucideIcon
  className?: string
}) {
  return <Glyph className={className} aria-hidden data-icon strokeWidth={2} />
}
