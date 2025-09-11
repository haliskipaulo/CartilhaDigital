import { render, screen } from '@testing-library/react'
import HealthBadge from '../HealthBadge'

test('renders with default label', () => {
  render(<HealthBadge />)
  expect(screen.getByRole('status', { name: 'build-status' })).toHaveTextContent('OK')
})

