import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$locale/destinations/promo')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/destinations/promo"!</div>
}
