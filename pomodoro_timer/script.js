class PomodoroTimer {
    constructor() {
        this.defaultDurations = {
            work: 25 * 60,
            shortBreak: 5 * 60,
            longBreak: 15 * 60,
        };

        this.workDuration = this.defaultDurations.work;
        this.shortBreakDuration = this.defaultDurations.shortBreak;
        this.longBreakDuration = this.defaultDurations.longBreak;

        this.timeLeft = this.workDuration;
        this.isActive = false;
        this.isBreak = false;
        this.sessions = 0;
        this.interval = null;

        this.initElements();
        this.bindEvents();
        this.updateDisplay();
    }

    initElements() {
        this.timerContainer = document.getElementById('timerContainer');
        this.modeIndicator = document.getElementById('modeIndicator');
        this.modeText = document.getElementById('modeText');
        this.sessionCount = document.getElementById('sessionCount');
        this.timeDisplay = document.getElementById('timeDisplay');
        this.progressBar = document.getElementById('progressBar');
        this.playPauseBtn = document.getElementById('playPauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.skipBtn = document.getElementById('skipBtn');
    }

    bindEvents() {
        this.playPauseBtn.addEventListener('click', () => this.toggleTimer());
        this.resetBtn.addEventListener('click', () => this.resetTimer());
        this.skipBtn.addEventListener('click', () => this.skipSession());
    }

    toggleTimer() {
        this.isActive = !this.isActive;

        if (this.isActive) {
            this.playPauseBtn.innerHTML = '⏸';
            this.playPauseBtn.title = 'Pause';
            this.startTimer();
        } else {
            this.playPauseBtn.innerHTML = '▶';
            this.playPauseBtn.title = 'Start';
            this.pauseTimer();
        }
    }

    startTimer() {
        this.interval = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();

            if (this.timeLeft <= 0) {
                this.completeSession();
            }
        }, 1000);
    }

    pauseTimer() {
        clearInterval(this.interval);
    }

    resetTimer() {
        this.isActive = false;
        this.isBreak = false;
        this.timeLeft = this.workDuration;
        this.sessions = 0;

        clearInterval(this.interval);
        this.playPauseBtn.innerHTML = '▶';
        this.playPauseBtn.title = 'Start';

        this.updateDisplay();
        this.updateMode();
    }

    skipSession() {
        this.isActive = false;
        clearInterval(this.interval);
        this.playPauseBtn.innerHTML = '▶';
        this.playPauseBtn.title = 'Start';

        if (!this.isBreak) {
            this.sessions++;
            this.startBreak();
        } else {
            this.startWork();
        }
    }

    completeSession() {
        this.isActive = false;
        clearInterval(this.interval);
        this.playPauseBtn.innerHTML = '▶';
        this.playPauseBtn.title = 'Start';

        this.timerContainer.classList.add('completed');
        setTimeout(() => this.timerContainer.classList.remove('completed'), 1500);

        if (!this.isBreak) {
            this.sessions++;
            this.startBreak();
        } else {
            this.startWork();
        }
    }

    startBreak() {
        this.isBreak = true;
        this.timeLeft = (this.sessions % 4 === 0) ? this.longBreakDuration : this.shortBreakDuration;
        this.updateDisplay();
        this.updateMode();
    }

    startWork() {
        this.isBreak = false;
        this.timeLeft = this.workDuration;
        this.updateDisplay();
        this.updateMode();
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        const totalTime = this.isBreak
            ? (this.sessions % 4 === 0 ? this.longBreakDuration : this.shortBreakDuration)
            : this.workDuration;

        const progress = ((totalTime - this.timeLeft) / totalTime) * 100;
        const circumference = 2 * Math.PI * 45;
        const offset = circumference - (progress / 100) * circumference;
        this.progressBar.style.strokeDashoffset = offset;

        this.sessionCount.textContent = this.sessions + 1;
    }

    updateMode() {
        if (this.isBreak) {
            const isLong = this.sessions % 4 === 0 && this.sessions > 0;
            const label = isLong ? 'Long Break' : 'Short Break';
            this.modeIndicator.className = 'mode-indicator break';
            this.modeIndicator.innerHTML = `<span>☕</span><span>${label}</span>`;
            this.progressBar.className = 'progress-bar break';
        } else {
            this.modeIndicator.className = 'mode-indicator work';
            this.modeIndicator.innerHTML = `<span>🍅</span><span>Focus Time</span>`;
            this.progressBar.className = 'progress-bar work';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
});
