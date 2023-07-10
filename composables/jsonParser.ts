import { ref, computed } from 'vue'
export const useJSONParser = () => {
	const textareaInput = ref('')
	const isOutputInvalid = ref(false)
	const optionValue = ref('')
	const parseCamelCaseString = (s: string) => {
		let initialValue = s
		for (let i = 1; i < s.length; i++) {
			if (s[i] === s[i].toUpperCase()) {
				initialValue = initialValue.replace(s[i], `_${s[i]}`)
			}
		}
		return initialValue
	}
	const parseInputToEnvValues = (s: string) => {
		try {
			const parsedInput = JSON.parse(s)
			const envValues = Object.entries(parsedInput).map(([v, i]) => {
				return `${optionValue.value}${parseCamelCaseString(v).toUpperCase()}=${i}`
			})
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
		optionValue,
	}
}
