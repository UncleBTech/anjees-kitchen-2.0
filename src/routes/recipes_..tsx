import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/recipes_/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/recipes_/"!</div>
}
