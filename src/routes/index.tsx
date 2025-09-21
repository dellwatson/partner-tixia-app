import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
	component: () => null, // Content is handled by __root.tsx
});
