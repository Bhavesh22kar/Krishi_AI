// Image upload + preview
window.addEventListener("DOMContentLoaded", () => {
document.getElementById("imageInput").addEventListener("change", function(event) {
    let file = event.target.files[0];
    let img = document.getElementById("preview");

    img.src = window.URL.createObjectURL(file);

    img.onload = () => {
        predict(img);
    };
});
});

function uploadImage() {
    document.getElementById("imageInput").click();
}

// 🔊 TOP PE ADD KARO
let sound = new Audio("ding.mp3");

// 🤖 MODEL LINK (replace karo)
const URL = "https://teachablemachine.withgoogle.com/models/KfNfOfL_0/";

let model, maxPredictions;

// Load model
async function loadModel() {

    // 👇 YAHI ADD KARNA HAI


    model = await tmImage.load(URL + "model.json", URL + "metadata.json");
async function loadModel() {

    let output = document.getElementById("output");

    output.innerHTML = "⏳ Loading AI Model...";

    model = await tmImage.load(URL + "model.json", URL + "metadata.json");

    output.innerHTML = `
    ✅ Model Loaded! <br><br>
    <button onclick="uploadImage()" style="
        padding:10px;
        border-radius:20px;
        border:none;
        background:white;
        color:green;
        cursor:pointer;
    ">
    📁 Upload Leaf Image
    </button>
    `;
}
}

window.onload = function () {
    loadModel();
};

// // Image upload + preview
// window.addEventListener("DOMContentLoaded", () => {
// document.getElementById("imageInput").addEventListener("change", function(event) {
//     let file = event.target.files[0];
//     let img = document.getElementById("preview");

//     img.src = window.URL.createObjectURL(file);

//     img.onload = () => {
//         predict(img);
//     };
// });
// });

// 🌿 Disease Solutions Database
const diseaseDB = {

"Tomato___Late_blight": {
    solution: "Spray Mancozeb fungicide",
    fertilizer: "Use balanced NPK fertilizer"
},

"Rice___Blast": {
    solution: "Spray Tricyclazole",
    fertilizer: "Avoid excess nitrogen"
},

"Potato___Early_blight": {
    solution: "Apply copper fungicide",
    fertilizer: "Use potassium fertilizer"
},

"Maize___Leaf_blight": {
    solution: "Spray Mancozeb",
    fertilizer: "Use nitrogen fertilizer"
},

"Wheat___Rust": {
    solution: "Spray Propiconazole",
    fertilizer: "Avoid excess nitrogen"
},

"Onion___Purple_blotch": {
    solution: "Spray Mancozeb",
    fertilizer: "Use balanced fertilizer"
},

"Soybean___Rust": {
    solution: "Use Hexaconazole",
    fertilizer: "Use phosphorus fertilizer"
},

"Brinjal___Leaf_spot": {
    solution: "Remove infected leaves + fungicide",
    fertilizer: "Use organic compost"
},

"Cotton___Leaf_curl": {
    solution: "Control whiteflies",
    fertilizer: "Balanced fertilizer"
},

"Sugarcane___Red_rot": {
    solution: "Remove infected plants",
    fertilizer: "Use potassium fertilizer"
}
};
// Prediction
async function predict(img) {

    let spinner = document.getElementById("spinner");
    let output = document.getElementById("output");

    // ⏳ Spinner show
    spinner.style.display = "block";
    output.innerHTML = "";

    if (!model) {
        output.innerHTML = "⚠️ Model not loaded yet...";
        spinner.style.display = "none";
        return;
    }

    const prediction = await model.predict(img);

    // ⏳ Spinner hide
    spinner.style.display = "none";

    let best = prediction[0];

    for (let i = 0; i < prediction.length; i++) {
        if (prediction[i].probability > best.probability) {
            best = prediction[i];
        }
    }

    let className = best.className.trim();

    let parts = className.split("___");

    let crop = parts[0];
    let disease = parts[1];

    let solutionData = diseaseDB[className]|| {
        solution: "💊 इलाज: Neem oil spray हर 5 दिन में करें",
        fertilizer: "🌱 खाद: Nitrogen-rich fertilizer इस्तेमाल करें",
    };

let speechText = "";

if (currentLang === "hi") {

    output.innerHTML =
    `🌾 फसल: ${crop} <br>
     🦠 बीमारी: ${disease} <br>
     📊 भरोसा: ${(best.probability * 100).toFixed(2)}% <br><br>
     💊 इलाज: ${solutionData.solution} <br>
     🌱 खाद: ${solutionData.fertilizer}`;

    speechText = `यह ${crop} फसल में ${disease} बीमारी है। 
    इलाज: ${solutionData.solution}. 
    खाद: ${solutionData.fertilizer}`;

} else if (currentLang === "mr") {

    output.innerHTML =
    `🌾 पिक: ${crop} <br>
     🦠 रोग: ${disease} <br>
     📊 खात्री: ${(best.probability * 100).toFixed(2)}% <br><br>
     💊 उपाय: ${solutionData.solution} <br>
     🌱 खत: ${solutionData.fertilizer}`;

    speechText = `हे ${crop} पिकामध्ये ${disease} रोग आहे. 
    उपाय: ${solutionData.solution}. 
    खत: ${solutionData.fertilizer}`;

} else {

    output.innerHTML =
    `🌾 Crop: ${crop} <br>
     🦠 Disease: ${disease} <br>
     📊 Confidence: ${(best.probability * 100).toFixed(2)}% <br><br>
     💊 Treatment: ${solutionData.solution} <br>
     🌱 Fertilizer: ${solutionData.fertilizer}`;

    speechText = `This is ${disease} disease in ${crop} crop. 
    Treatment: ${solutionData.solution}. 
    Fertilizer: ${solutionData.fertilizer}`;
}

// 🔊 Speak
speak(speechText);
speakHindi(speechText);

    // ✨ Animation
    output.style.animation = "none";
    output.offsetHeight; // reflow
    output.style.animation = "fadeIn 0.5s ease";

    // 🔊 Sound play
    sound.currentTime = 0;
    sound.play().catch(() => {
    console.log("Sound blocked by browser");
});

console.log("Detected:", best.className);

}

// 🌦️ Weather API (REAL)
async function getWeather() {
    let city = "Nagpur";
    let apiKey = "f1959db3d492915d76d90078a2cfec0e";

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        let res = await fetch(url);
        let data = await res.json();

        console.log(data); // debug

        if (data.cod == 200) {
            document.getElementById("output").innerHTML =
            `🌦️ Temperature: ${data.main.temp}°C <br>
             🌡️ Feels Like: ${data.main.feels_like}°C <br>
             ☁️ Weather: ${data.weather[0].description}`;
        } else {
            document.getElementById("output").innerHTML =
            `⚠️ Error: ${data.message}`;
        }

    } catch (error) {
        document.getElementById("output").innerHTML =
        "⚠️ Network Error";
    }
}
// 💰 Price Prediction (Smart Logic)
function getPrice() {
    let price = 2000 + Math.floor(Math.random() * 500);

    document.getElementById("output").innerHTML =
    `💰 Current Price: ₹${price} <br> 📈 Prediction: Price may increase soon`;
}

// 💧 Irrigation
function getIrrigation() {
    document.getElementById("output").innerHTML =
    "💧 Soil Moisture Low → Irrigate Today";
}

// 🗣️ Voice Assistant
function startVoice() {
    let recognition = new webkitSpeechRecognition();
    recognition.lang = "hi-IN";
    recognition.start();

    recognition.onresult = function(event) {
        let text = event.results[0][0].transcript;

        let response = "समझ नहीं आया";

        if (text.includes("मौसम")) {
            response = "आज मौसम साफ है";
        } else if (text.includes("पानी")) {
            response = "आज सिंचाई कर सकते हैं";
        }

        document.getElementById("output").innerHTML =
        `🗣️ आपने कहा: ${text} <br> 🤖 जवाब: ${response}`;
    }
}


speechSynthesis.onvoiceschanged = () => {
    speechSynthesis.getVoices();
};


let currentLang = "hi";

document.getElementById("languageSelect").addEventListener("change", function() {
    currentLang = this.value;
});

function speak(text) {

    let voices = speechSynthesis.getVoices();

    let selectedVoice;

    if (currentLang === "hi") {
        selectedVoice = voices.find(v => v.lang === "hi-IN");
    } 
    else if (currentLang === "mr") {
        selectedVoice = voices.find(v => v.lang === "mr-IN");
    } 
    else {
        selectedVoice = voices.find(v => v.lang === "en-US");
    }

    let speech = new SpeechSynthesisUtterance(text);

    if (selectedVoice) {
        speech.voice = selectedVoice;
    }

    speech.lang = currentLang === "hi" ? "hi-IN" :
                  currentLang === "mr" ? "mr-IN" : "en-US";

    speech.rate = 1;

    window.speechSynthesis.speak(speech);
}