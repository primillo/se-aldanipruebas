// Variables globales
var videoFiles = [];
var selectedVideo = null;
var players = [];

// Funciones para cambiar entre secciones
function showUploadSection() {
    document.getElementById("upload-section").style.display = "block";
    document.getElementById("content-management-section").style.display = "none";
    document.getElementById("add-player-section").style.display = "none";
}

function showContentManagementSection() {
    document.getElementById("upload-section").style.display = "none";
    document.getElementById("content-management-section").style.display = "block";
    document.getElementById("add-player-section").style.display = "none";
}

function showAddPlayerSection() {
    document.getElementById("upload-section").style.display = "none";
    document.getElementById("content-management-section").style.display = "none";
    document.getElementById("add-player-section").style.display = "block";
}

// Función para subir un video
function uploadVideo() {
    var videoFileInput = document.getElementById("video-file-input");
    var files = videoFileInput.files;

    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        videoFiles.push(file);
        addVideoItem(file);
    }

    videoFileInput.value = ""; // Limpiar el campo de selección de archivo después de subir
}

// Función para agregar un video a la sección de gestión de contenido
function addVideoItem(videoFile) {
    var videoList = document.getElementById("video-list");
    var videoItem = document.createElement("li");
    videoItem.classList.add("video-item");

    if (videoFile.type.startsWith('image/')) {
        var image = document.createElement('img');
        image.src = URL.createObjectURL(videoFile);
        image.style.maxWidth = "100%";
        image.style.maxHeight = "100%";
        videoItem.appendChild(image);
    } else if (videoFile.type.startsWith('video/')) {
        var video = document.createElement('video');
        video.src = URL.createObjectURL(videoFile);
        video.controls = true;
        video.width = 180;
        video.height = 135;
        videoItem.appendChild(video);
    }

    var videoName = document.createElement('p');
    videoName.innerText = videoFile.name;
    videoItem.appendChild(videoName);

    videoItem.onclick = function () {
        selectVideo(videoItem);
    };
    videoList.appendChild(videoItem);
}

// Función para seleccionar un video
function selectVideo(videoItem) {
    if (selectedVideo) {
        selectedVideo.classList.remove("selected");
    }
    selectedVideo = videoItem;
    selectedVideo.classList.add("selected");
}

// Función para seleccionar una resolución
function selectResolution() {
    var resolutionSelect = document.getElementById("resolution-select");
    var selectedResolution = resolutionSelect.value;

    if (selectedResolution === "custom") {
        document.getElementById("custom-resolution").style.display = "block";
    } else {
        document.getElementById("custom-resolution").style.display = "none";
    }
}

// Función para cambiar la resolución del video
function changeResolution() {
    if (selectedVideo) {
        var resolutionSelect = document.getElementById("resolution-select");
        var selectedResolution = resolutionSelect.value;

        if (selectedResolution === "custom") {
            var customWidth = document.getElementById("custom-width").value;
            var customHeight = document.getElementById("custom-height").value;
            selectedResolution = customWidth + "x" + customHeight;
        }

        var videoItem = selectedVideo.firstChild;
        var videoName = videoItem.alt || videoItem.src;
        console.log("Cambiando resolución del video '" + videoName + "' a: " + selectedResolution);

        // Cambiar la resolución del video
        if (videoItem.tagName === "IMG") {
            videoItem.style.width = customWidth + "px";
            videoItem.style.height = customHeight + "px";
        } else if (videoItem.tagName === "VIDEO") {
            videoItem.width = customWidth;
            videoItem.height = customHeight;
        }
    }
}

// ...

// Función para eliminar un video
function deleteVideo() {
    if (selectedVideo) {
        var videoName = selectedVideo.firstChild.innerText;
        var confirmDelete = confirm("¿Estás seguro de que deseas eliminar el video '" + videoName + "'?");
        if (confirmDelete) {
            selectedVideo.remove();
            selectedVideo = null;
        }
    }
}

// ...


// Función para agregar un player con licencia
function addPlayer() {
    var licenseInput = document.getElementById("license-input");
    var license = licenseInput.value.trim();

    if (license !== "") {
        players.push(license);
        console.log("Player agregado con licencia: " + license);// Función para mostrar la sección de inicio de sesión
        function showLoginSection() {
            document.getElementById("login-section").style.display = "block";
            document.getElementById("logged-in-section").style.display = "none";
        }

        // Función para mostrar la sección de contenido una vez que el usuario ha iniciado sesión
        function showLoggedInSection() {
            document.getElementById("login-section").style.display = "none";
            document.getElementById("logged-in-section").style.display = "block";
        }

        // Función para realizar el inicio de sesión
        function login() {
            var username = document.getElementById("username-input").value.trim();
            var password = document.getElementById("password-input").value.trim();

            // Aquí puedes agregar la lógica de autenticación
            // Por ahora, simplemente verificaremos si se ingresó un nombre de usuario y una contraseña
            if (username !== "" && password !== "") {
                loggedIn = true;
                showLoggedInSection();
            } else {
                alert("Nombre de usuario y/o contraseña incorrectos");
            }
        }

        // Funciones para cambiar entre secciones
        function showUploadSection() {
            document.getElementById("upload-section").style.display = "block";
            document.getElementById("content-management-section").style.display = "none";
            document.getElementById("add-player-section").style.display = "none";
        }

        function showContentManagementSection() {
            document.getElementById("upload-section").style.display = "none";
            document.getElementById("content-management-section").style.display = "block";
            document.getElementById("add-player-section").style.display = "none";
        }

        function showAddPlayerSection() {
            document.getElementById("upload-section").style.display = "none";
            document.getElementById("content-management-section").style.display = "none";
            document.getElementById("add-player-section").style.display = "block";
        }

        // Resto del código...

        // Mostrar la sección de inicio de sesión por defecto
        showLoginSection();


        // Agregar la licencia a la lista de players
        var playerList = document.getElementById("player-list");
        var playerItem = document.createElement("li");
        playerItem.classList.add("player-item");
        playerItem.innerText = license;
        playerList.appendChild(playerItem);

        // Limpiar el campo de licencia
        licenseInput.value = "";
    }
}
