<script setup lang="ts">
	import { useSeoMeta } from '#imports'
	import { useJSONParser } from '~/composables/useJSONParser'
	import { ProjectOptions, ProjectTypes } from '~/utils/projectTypes'

	useSeoMeta({
		title: 'Noxy JSON Parser',
		description:
			'Copiá tu JSON y recibí tus variables de entorno para tus proyectos de Vite, NextJS y SvelteKit',
	})

	const { isOutputInvalid, textareaInput, textareaOutput, optionState } =
		useJSONParser()
	const $toast = useToast()
	const toggleOption = (type: ProjectOptions) => {
		switch (type.trim()) {
			case 'vite':
				optionState.value = { name: 'Vite', value: 'VITE_' }
				break
			case 'nextjs':
				optionState.value = { value: 'NEXT_PUBLIC_', name: 'NextJs' }
				break
			case 'sveltekit':
				optionState.value = { value: 'PUBLIC_', name: 'SvelteKit' }
				break
			default:
				optionState.value = { name: 'General', value: '' }
				break
		}
	}
	const addToClipboard = () => {
		const outputWithLinebreak = textareaOutput.value.replaceAll('\n', '\r\n')
		navigator.clipboard.writeText(outputWithLinebreak)
		$toast.add({
			title: 'Variables agregadas al clipboard!',
		})
	}
	const hasUserInsertedContent = computed(() => textareaInput.value.length > 10)
</script>

<template>
	<main class="h-screen grid place-items-center">
		<section class="container mx-auto max-w-xl space-y-3 p-2">
			<aside class="flex flex-col items-center space-y-2">
				<h2 class="text-center font-bold">
					Elige el proyecto donde vas a utilizar tus variables de entorno
				</h2>
				<div class="grid xl:grid-cols-4 grid-cols-2 place-items-center gap-2">
					<UButton
						v-for="{ name, value } in ProjectTypes"
						@click="toggleOption(value)"
						:key="value"
						variant="soft"
						color="emerald"
					>
						{{ name }}
					</UButton>
				</div>
			</aside>
			<UFormGroup name="jsonContent" label="JSON a parsear">
				<UTextarea
					placeholder="{ 'name' :'gonzalo', 'surName':'omar'}"
					name="jsonContent"
					class="h-64"
					color="sky"
					autoresize
					v-model="textareaInput"
				/>
			</UFormGroup>

			<UFormGroup
				name="jsonResult"
				:label="`Resultado del parseo para: ${optionState.name}`"
				:error="isOutputInvalid"
			>
				<UTextarea
					:placeholder="`NAME=Gonzalo ${'\n'}SUR_NAME=Omar`"
					name="jsonResult"
					class="h-64"
					variant="outline"
					color="emerald"
					disabled
					autoresize
					:value="textareaOutput"
				/>
				<span class="h-4 text-xs text-red-600" v-if="isOutputInvalid"
					>El JSON ingresado es inválido.
				</span>
			</UFormGroup>
			<UButton
				@click="addToClipboard"
				variant="soft"
				color="emerald"
				block
				v-if="hasUserInsertedContent && !isOutputInvalid"
				>Añadir al clipboard</UButton
			>
		</section>
	</main>
	<footer
		className="text-center p-8 border-t-2 border-[#1b1b1b] mt-6 text-[#4a4a4a] self-center"
	>
		© 2023, n0xZ. Powered by <span class="text-emerald-500">Nuxt </span> +
		<span class="text-sky-500">Netlify</span> 💚💙
	</footer>
</template>
