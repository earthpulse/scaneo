import loadImages from "./image/loadImages";
import { dataProgressStore } from "$stores/Data/progressMonitoring";
import { imagesStore } from "$stores/image";
import { setReloadingMessage, hideReloadingMessage } from "$lib/utils/utils"
export let comunicating = false;

export const wsocket = () => {
    const ws = new WebSocket("ws://localhost:8000/ws");
    hideReloadingMessage();
    
    ws.addEventListener("open", () => {
        setReloadingMessage()
        ws.send("refresh_db")
    });
    
    ws.addEventListener("message",async (event) => {
        try {
			await loadImages();
			dataProgressStore.markImagesAsLoaded();

			const imageCount = imagesStore.retrieve().length;
			if (imageCount === 0) throw new Error();

		} catch (error) {
			console.log(error);
		}
    });
    
    ws.addEventListener("error", (error) => {
        console.error("WebSocket error:", error);
        hideReloadingMessage()

    });
    
    ws.addEventListener("close", () => {
        ws.close();
        hideReloadingMessage()    
    });
    
    // Cerrar la conexión cuando la página se cierra o recarga
    window.addEventListener("beforeunload", () => {
        ws.close(1000, "Closing connection");
        hideReloadingMessage()
    });
}