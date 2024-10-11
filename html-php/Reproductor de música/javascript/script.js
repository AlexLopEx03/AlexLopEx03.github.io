window.onload = function() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audioElement = document.getElementById('audio-player');
    const canvas = document.getElementById('audio-visualizer');
    const canvasContext = canvas.getContext('2d');

    const audioSource = audioContext.createMediaElementSource(audioElement);
    const analyser = audioContext.createAnalyser();

    audioSource.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    function draw() {
        requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);

        canvasContext.fillStyle = 'rgba(0, 0, 0, 0.15)';
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] * 2.5;

            const red = Math.sin(i * 0.05 + barHeight * 0.02) * 128 + 128;
            const green = Math.sin(i * 0.03 + barHeight * 0.04) * 128 + 128;
            const blue = Math.sin(i * 0.07 + barHeight * 0.03) * 128 + 128;

            canvasContext.shadowBlur = 15;
            canvasContext.shadowColor = `rgba(${red}, ${green}, ${blue}, 1)`;

            canvasContext.fillStyle = `rgba(${red}, ${green}, ${blue}, 0.7)`;
            canvasContext.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

            x += barWidth + 1;
        }
    }
    audioElement.onplay = () => {
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
        draw();
    };
};
