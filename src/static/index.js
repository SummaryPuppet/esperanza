let blobs = []
let stream;
let rec;
let recordUrl = "/llm-tools";
let audioResponseHandler;
let recording = false;

const $recordBtn = document.getElementById('record-button')
const $response = document.getElementById('response')

$recordBtn.addEventListener('click', async () => {
    if (recording) {
        rec.stop()
        $recordBtn.textContent = "Comenzar grabación";
        recording = false;
        return
    }

    try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        rec = new MediaRecorder(stream);
        rec.ondataavailable = (e) => {
            blobs.push(e.data);
        }
        rec.onstop = doPreview

        rec.start();
        $recordBtn.textContent = "Grabando...";
        recording = true;
    } catch (error) {
        console.error("Error al iniciar la grabación:", error);
    }
})

function doPreview() {
    if (!blobs.length) {
        console.log("No hay blobios!");
    } else {
        console.log("Tenemos blobios!");
        const blob = new Blob(blobs);

        let fd = new FormData();
        fd.append("file", blob, "audioFile.wav");

        fetch(recordUrl, {
            method: "POST",
            body: fd,
        })
            .then((response) => response.json())
            .then(async (data) => {
                console.log("Respuesta del servidor:", data);
                $response.textContent = data.response;
                if (audioResponseHandler) {
                    audioResponseHandler(data);
                }
                // Limpiar blobs después de enviar
                blobs = [];

                let audioFile = data.outputPath
                console.log("Archivo de audio guardado en:", audioFile);
                await waitForFile("/static/output.wav")
                let audio = new Audio()
                audio.setAttribute("src", "static/output.wav");
                audio.play()
            })
            .catch(err => {
                console.log("Oops: Ocurrió un error", err);
            });
    }
}

// Verifica repetidamente si el archivo está listo
async function waitForFile(url, maxRetries = 10, delay = 300) {
    for (let i = 0; i < maxRetries; i++) {
        const res = await fetch(url, { method: "HEAD" });
        if (res.ok) return true;
        await new Promise((r) => setTimeout(r, delay));
    }
    throw new Error("Archivo no disponible después de varios intentos");
}
