<script>
    import settings from "$stores/settings.svelte.js";
</script>

<section class="flex flex-col flex-1 h-full overflow-hidden">
    <p>RGB bands: {settings.rgb.join(", ")}</p>
    <div class="flex flex-row gap-2">
        <input
            type="number"
            value={settings.rgb[0]}
            min={0}
            max={10}
            step={1}
            on:input={(e) => {
                const newRgb = [...settings.rgb];
                newRgb[0] = parseInt(e.target.value);
                settings.rgb = newRgb;
            }}
        />
        <input
            type="number"
            value={settings.rgb[1]}
            min={0}
            max={10}
            step={1}
            on:input={(e) => {
                const newRgb = [...settings.rgb];
                newRgb[1] = parseInt(e.target.value);
                settings.rgb = newRgb;
            }}
        />
        <input
            type="number"
            value={settings.rgb[2]}
            min={0}
            max={10}
            step={1}
            on:input={(e) => {
                const newRgb = [...settings.rgb];
                newRgb[2] = parseInt(e.target.value);
                settings.rgb = newRgb;
            }}
        />
    </div>
    <p>Stretch: {settings.stretch.join(", ")}</p>
    <div class="flex flex-row gap-2">
        <input
            type="number"
            value={settings.stretch[0]}
            min={0}
            max={2 ** 16}
            step={1}
            on:input={(e) => {
                const newStretch = [...settings.stretch];
                newStretch[0] = parseInt(e.target.value);
                settings.stretch = newStretch;
            }}
        />
        <input
            type="number"
            value={settings.stretch[1]}
            min={0}
            max={2 ** 16}
            step={1}
            on:input={(e) => {
                const newStretch = [...settings.stretch];
                newStretch[1] = parseInt(e.target.value);
                settings.stretch = newStretch;
            }}
        />
    </div>
</section>
