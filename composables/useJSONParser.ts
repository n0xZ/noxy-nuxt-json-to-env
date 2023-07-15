import { ref, computed } from 'vue'
type OptionState = {
	name: string
	value: string
}
export const useJSONParser = () => {
	const textareaInput = ref('')
	const isOutputInvalid = ref(false)
	const optionState = ref<OptionState>({ name: 'General', value: '' })
	const parseObjectPropertyToEnv = (s: string): string => {
		return s.replace(/([A-Z])|(-)/g, (match, p1, p2) => {
			if (p1) {
				return `_${p1.toLowerCase()}`
			} else if (p2) {
				return '_'
			}
			return match
		})
	}
	const parseInputToEnvValues = (s: string) => {
		isOutputInvalid.value = false
		try {
			const parsedInput = JSON.parse(s)
			const envValues = Object.entries(parsedInput).map(
				([v, i]) =>
					`${optionState.value.value}${parseObjectPropertyToEnv(
						v
					).toUpperCase()}=${i}`
			)
			return envValues
		} catch (e) {
			isOutputInvalid.value = true
			return []
		}
	}
	const textareaOutput = computed(() =>
		textareaInput.value.length > 10
			? parseInputToEnvValues(textareaInput.value).join('\n')
			: ''
	)
	return {
		textareaInput,
		textareaOutput,
		isOutputInvalid,
		optionState,
	}
}
