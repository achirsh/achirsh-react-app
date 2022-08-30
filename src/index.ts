async function load() {
    const page = await import('./about')

    page.render()
}

load()