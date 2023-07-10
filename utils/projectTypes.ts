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

export const handleProjectTypeBackgroundColor = (t: ProjectOptions) => {
	switch (t) {
		case 'vite':
			return 'bg-yellow-500 hover:bg-yellow-600 duration-100 ease-in-out'
		case 'sveltekit':
			return 'bg-orange-500 hover:bg-orange-600 duration-100 ease-in-out'
		case 'nextjs':
			return 'bg-[#323232] hover:bg-[#222222] duration-100 ease-in-out'
		case 'general':
			return 'bg-[#f8f9fa] text-dark hover:bg-[#f2f2f2] duration-100 ease-in-out'
		default:
			return ''
	}
}
