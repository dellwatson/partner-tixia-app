import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$locale/destinations/country')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/destinations/country"!</div>
}
