export type ProjectOptions = 'vite' | 'nextjs' | 'sveltekit' | 'general'
type ProjectType = {
	name: string
	value: ProjectOptions
}
export const ProjectTypes: ProjectType[] = [
	{ name: 'General', value: 'general' },
	{ name: 'Vite', value: 'vite' },
	{ name: 'SvelteKit', value: 'sveltekit' },
	{ name: 'Next.js', value: 'nextjs' },
]

export const handleProjectTypeButtonColor = (t: ProjectOptions) => {
	switch (t) {
		case 'vite':
			return 'sky'
		case 'sveltekit':
			return 'orange'
		case 'nextjs':
			return 'indigo'
		case 'general':
			return 'primary'
		default:
			return 'primary'
	}
}
