// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ['@nuxthq/ui'],

	app: { head: { htmlAttrs: { class: 'dark' } } },
	ui: { notifications: { position: 'top-0 right-0' } },
})
