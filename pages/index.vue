<script setup lang="ts">
	import { ProjectOptions, ProjectTypes } from '~/utils/projectTypes'

	const { isOutputInvalid, textareaInput, textareaOutput, optionValue } =
		useJSONParser()

	const toggleOption = (type: ProjectOptions) => {
		switch (type.trim()) {
			case 'vite':
				optionValue.value = 'VITE_'
				break
			case 'nextjs':
				optionValue.value = 'NEXT_PUBLIC_'
				break
			case 'sveltekit':
				optionValue.value = 'PUBLIC_'
				break
			default:
				optionValue.value = ''
				break
		}
	}
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
						class="w-24 text-center"
						variant="outline"
				color="primary"
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
					color="violet"
					autoresize
					v-model="textareaInput"
				/>
			</UFormGroup>

			<UFormGroup
				name="jsonResult"
				label="Resultado del parseo"
				:error="isOutputInvalid"
			>
				<UTextarea
					:placeholder="`NAME=Gonzalo ${'\n'}SUR_NAME=Omar`"
					label="Resultado del parseo"
					name="jsonResult"
					class="h-64"
					variant="outline"
					color="primary"
					:disabled="isOutputInvalid"
					autoresize
					:value="textareaOutput"
				/>
				<span class="h-4 text-xs text-red-600" v-if="isOutputInvalid"
					>El JSON ingresado es inválido.
				</span>
			</UFormGroup>
		</section>
	</main>
	<footer class="p-5 text-center">
		<p>Tuki</p>
	</footer>
</template>
