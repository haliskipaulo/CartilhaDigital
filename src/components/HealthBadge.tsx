type Props = { label?: string }
export default function HealthBadge({label='OK'}:Props){
  return (
    <div role="status" aria-label="build-status">
      <span>{label}</span>
    </div>
  )
}

