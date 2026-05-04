
        // JavaScript logic for the stopwatch
        let startTime = 0;
        let elapsedTime = 0;
        let timerInterval = null;
        let isRunning = false;
        let laps = [];

        const display = document.getElementById('display');
        const startBtn = document.getElementById('startBtn');
        const resetBtn = document.getElementById('resetBtn');
        const lapBtn = document.getElementById('lapBtn');
        const lapsContainer = document.getElementById('lapsContainer');
        const lapsList = document.getElementById('lapsList');

        function formatTime(milliseconds) {
            const totalSeconds = Math.floor(milliseconds / 1000);
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            const ms = Math.floor((milliseconds % 1000) / 10);

            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(ms).padStart(2, '0')}`;
        }

        function updateDisplay() {
            const currentTime = Date.now() - startTime + elapsedTime;
            display.textContent = formatTime(currentTime);
        }

        function start() {
            if (isRunning) {
                pause();
            } else {
                startTime = Date.now();
                timerInterval = setInterval(updateDisplay, 10);
                isRunning = true;
                startBtn.textContent = 'Pause';
                lapBtn.disabled = false;
            }
        }

        function pause() {
            clearInterval(timerInterval);
            elapsedTime += Date.now() - startTime;
            isRunning = false;
            startBtn.textContent = 'Resume';
        }

        function reset() {
            clearInterval(timerInterval);
            startTime = 0;
            elapsedTime = 0;
            isRunning = false;
            laps = [];
            display.textContent = '00:00:00.00';
            startBtn.textContent = 'Start';
            lapBtn.disabled = true;
            lapsContainer.style.display = 'none';
            lapsList.innerHTML = '';
        }

        function recordLap() {
            const currentTime = Date.now() - startTime + elapsedTime;
            laps.push(currentTime);
            updateLapsList();
        }

        function updateLapsList() {
            lapsList.innerHTML = '';
            laps.forEach((lapTime, index) => {
                const lapDiv = document.createElement('div');
                lapDiv.className = 'lap-item';
                lapDiv.innerHTML = `
                    <span class="lap-number">Lap ${index + 1}</span>
                    <span class="lap-time">${formatTime(lapTime)}</span>
                `;
                lapsList.appendChild(lapDiv);
            });
            lapsContainer.style.display = laps.length > 0 ? 'block' : 'none';
        }

        startBtn.addEventListener('click', start);
        resetBtn.addEventListener('click', reset);
        lapBtn.addEventListener('click', recordLap);