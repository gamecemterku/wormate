(function () {
  const style = document.createElement('style');
  style.textContent = `
    #custom-ui {
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(0,0,0,0.7);
      color: white;
      padding: 10px;
      border-radius: 10px;
      z-index: 9999;
      font-family: sans-serif;
    }
    #custom-ui input[type=range] {
      width: 100%;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement('div');
  container.id = 'custom-ui';
  container.innerHTML = `
    <div>
      <label>Zoom: <span id="zoom-value">1</span>x</label>
      <input type="range" id="zoom-slider" min="0.1" max="10" step="0.1" value="1">
    </div>
    <hr>
    <div>
      <label>Custom Skin (Upload):</label>
      <input type="file" id="skin-upload" accept="application/json">
    </div>
    <hr>
    <div>
      <label>Server List:</label>
      <select id="server-select">
        <option value="wss://wormate.io">Default</option>
        <option value="wss://eu.wormate.io">Europe (EU)</option>
        <option value="wss://us.wormate.io">USA (US)</option>
        <option value="wss://asia.wormate.io">Asia</option>
      </select>
    </div>
  `;
  document.body.appendChild(container);

  // Zoom functionality
  const zoomSlider = document.getElementById('zoom-slider');
  const zoomValue = document.getElementById('zoom-value');
  zoomSlider.addEventListener('input', () => {
    zoomValue.textContent = zoomSlider.value;
    document.body.style.transform = `scale(${zoomSlider.value})`;
    document.body.style.transformOrigin = "0 0";
  });

  // Skin upload logic
  const skinUpload = document.getElementById('skin-upload');
  skinUpload.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const skinData = JSON.parse(e.target.result);
        alert("Skin Loaded: " + skinData.name);
        // Implement the skin change logic here, like adding texture to the game
      };
      reader.readAsText(file);
    }
  });

  // Server selection logic
  const serverSelect = document.getElementById('server-select');
  serverSelect.addEventListener('change', function () {
    const selectedServer = this.value;
    if (selectedServer) {
      alert(`Selected Server: ${selectedServer}`);
      // Logic to change WebSocket connection here (this might require modifying the game's WebSocket logic)
    }
  });

})();
