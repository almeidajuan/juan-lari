// DOM Elements
const storiesContainer = document.querySelector('.stories-container');
const dots = document.querySelectorAll('.dot');
const totalStories = document.querySelectorAll('.story').length;

// Music Player Elements
const audioPlayer = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const progressBar = document.querySelector('.progress-bar');
const progressFill = document.querySelector('.progress-fill');
const progressHandle = document.querySelector('.progress-handle');
const currentTimeSpan = document.querySelector('.current-time');
const durationTimeSpan = document.querySelector('.duration-time');
const volumeSlider = document.querySelector('.volume-slider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const counterYears = document.getElementById('counterYears');
const counterMonths = document.getElementById('counterMonths');
const counterDays = document.getElementById('counterDays');
const counterHours = document.getElementById('counterHours');
const counterMinutes = document.getElementById('counterMinutes');
const counterSeconds = document.getElementById('counterSeconds');
const expandMessageBtn = document.getElementById('expandMessageBtn');
const specialMessageCard = document.querySelector('.special-message-card');
const hoursTogetherValue = document.getElementById('hoursTogetherValue');
const hoursTogetherCopies = document.querySelectorAll('[data-hours-copy]');
const hoursTogetherStory = document.querySelector('.story-4');
const timelineLightbox = document.getElementById('timelineLightbox');
const timelineLightboxImage = document.getElementById('timelineLightboxImage');
const timelineLightboxCaption = document.getElementById('timelineLightboxCaption');
const timelineLightboxClose = document.querySelector('.timeline-lightbox-close');
const finalDaysTogether = document.getElementById('finalDaysTogether');

const relationshipStartDate = new Date(2023, 7, 8, 0, 0, 0);

// State
let currentIndex = 0;
let startX = 0;
let endX = 0;
let isAnimating = false;
let isPlaying = false;
let hoursAnimationTimeout = null;
let lastSwipeNavigationTime = 0;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    initializeMusicPlayer();
    updateRelationshipCounter();
    updateFinalDaysTogether();
    setInterval(updateRelationshipCounter, 1000);
    updateStories();
});

// Event Listeners
function initializeEventListeners() {
    // Touch events for swipe
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchend', handleTouchEnd, false);

    // Mouse events for desktop testing
    document.addEventListener('mousedown', handleMouseDown, false);
    document.addEventListener('mouseup', handleMouseUp, false);

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard);

    // Story-style side tap/click navigation disabled by request.
    // document.addEventListener('click', handleStorySideClick);

    // Dots click
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToStory(index));
    });

    if (expandMessageBtn && specialMessageCard) {
        expandMessageBtn.addEventListener('click', toggleSpecialMessage);
    }

    // Nav Arrows
    const prevArrow = document.getElementById('prevArrow');
    const nextArrow = document.getElementById('nextArrow');

    if (prevArrow) prevArrow.addEventListener('click', previousStory);
    if (nextArrow) nextArrow.addEventListener('click', nextStory);

    initializeTimelineLightbox();
}

// Music Player Initialization
function initializeMusicPlayer() {
    // Play/Pause button
    playBtn.addEventListener('click', togglePlay);

    // Progress bar is visual only; only play/pause should control the music.
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('loadedmetadata', updateDuration);
    audioPlayer.addEventListener('ended', handleSongEnd);

    // Volume
    volumeSlider.addEventListener('input', (e) => {
        audioPlayer.volume = e.target.value / 100;
    });

    // Previous/Next buttons are decorative only and intentionally have no action.
}

// Music Player Functions
function togglePlay() {
    if (audioPlayer.paused) {
        audioPlayer.play()
            .then(() => {
                playBtn.classList.add('playing');
                playBtn.innerHTML = '<span>⏸</span>';
                isPlaying = true;
            })
            .catch(() => {
                playBtn.classList.remove('playing');
                playBtn.innerHTML = '<span>▶</span>';
                isPlaying = false;
            });
    } else {
        audioPlayer.pause();
        playBtn.classList.remove('playing');
        playBtn.innerHTML = '<span>▶</span>';
        isPlaying = false;
    }
}

function handleProgressClick(e) {
    const rect = progressBar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    audioPlayer.currentTime = percentage * audioPlayer.duration;
}

function updateProgress() {
    if (audioPlayer.duration) {
        const percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressFill.style.width = percentage + '%';
        progressHandle.style.left = percentage + '%';
        currentTimeSpan.textContent = formatTime(audioPlayer.currentTime);
    }
}

function updateFinalDaysTogether() {
    if (!finalDaysTogether) return;

    const today = new Date();
    const start = new Date(relationshipStartDate.getFullYear(), relationshipStartDate.getMonth(), relationshipStartDate.getDate());
    const currentDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const dayCount = Math.floor((currentDay - start) / 86400000);

    finalDaysTogether.textContent = dayCount.toLocaleString('pt-BR');
}

function updateRelationshipCounter() {
    const now = new Date();

    let years = now.getFullYear() - relationshipStartDate.getFullYear();
    let months = now.getMonth() - relationshipStartDate.getMonth();
    let days = now.getDate() - relationshipStartDate.getDate();
    let hours = now.getHours() - relationshipStartDate.getHours();
    let minutes = now.getMinutes() - relationshipStartDate.getMinutes();
    let seconds = now.getSeconds() - relationshipStartDate.getSeconds();

    if (seconds < 0) {
        seconds += 60;
        minutes -= 1;
    }

    if (minutes < 0) {
        minutes += 60;
        hours -= 1;
    }

    if (hours < 0) {
        hours += 24;
        days -= 1;
    }

    if (days < 0) {
        const previousMonthDays = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        days += previousMonthDays;
        months -= 1;
    }

    if (months < 0) {
        months += 12;
        years -= 1;
    }

    counterYears.textContent = years;
    counterMonths.textContent = months;
    counterDays.textContent = days;
    counterHours.textContent = hours;
    counterMinutes.textContent = minutes;
    counterSeconds.textContent = seconds;

    updateHoursTogether();
}

function updateHoursTogether() {
    const now = new Date();
    const diffMs = now.getTime() - relationshipStartDate.getTime();
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));

    const formattedHours = totalHours.toLocaleString('pt-BR');

    if (hoursTogetherValue) {
        hoursTogetherValue.textContent = formattedHours;
    }

    hoursTogetherCopies.forEach((copy) => {
        copy.textContent = formattedHours;
    });
}

function restartHoursTogetherAnimation() {
    if (!hoursTogetherStory) return;

    if (hoursAnimationTimeout) {
        clearTimeout(hoursAnimationTimeout);
    }

    hoursTogetherStory.classList.remove('hours-animate', 'hours-complete');
    void hoursTogetherStory.offsetWidth;
    hoursTogetherStory.classList.add('hours-animate');

    hoursAnimationTimeout = setTimeout(() => {
        hoursTogetherStory.classList.add('hours-complete');
    }, 5600);
}

function initializeTimelineLightbox() {
    if (!timelineLightbox || !timelineLightboxImage) return;

    const timelinePhotos = document.querySelectorAll('.timeline-photo');

    timelinePhotos.forEach((photo) => {
        photo.classList.add('is-clickable');
        photo.setAttribute('role', 'button');
        photo.setAttribute('tabindex', '0');
        photo.setAttribute('aria-label', 'Ampliar imagem da linha do tempo');

        photo.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            openTimelineLightbox(photo);
        });

        photo.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openTimelineLightbox(photo);
            }
        });
    });

    timelineLightbox.addEventListener('click', (event) => {
        if (event.target === timelineLightbox || event.target === timelineLightboxImage) {
            closeTimelineLightbox();
        }
    });

    if (timelineLightboxClose) {
        timelineLightboxClose.addEventListener('click', closeTimelineLightbox);
    }
}

function openTimelineLightbox(photo) {
    const image = photo.querySelector('img');
    if (!image || !timelineLightbox || !timelineLightboxImage) return;

    const caption = photo.closest('.timeline-item')?.querySelector('.timeline-caption')?.textContent?.trim() || 'Nosso momento';

    timelineLightboxImage.src = image.currentSrc || image.src;
    timelineLightboxImage.alt = image.alt || caption;

    if (timelineLightboxCaption) {
        timelineLightboxCaption.textContent = caption;
    }

    timelineLightbox.classList.add('active');
    timelineLightbox.setAttribute('aria-hidden', 'false');
}

function closeTimelineLightbox() {
    if (!timelineLightbox || !timelineLightboxImage) return;

    timelineLightbox.classList.remove('active');
    timelineLightbox.setAttribute('aria-hidden', 'true');

    setTimeout(() => {
        if (!timelineLightbox.classList.contains('active')) {
            timelineLightboxImage.removeAttribute('src');
        }
    }, 240);
}

function toggleSpecialMessage() {
    const lyricsWindow = document.getElementById('specialMessageFull');
    const wasExpanded = specialMessageCard.classList.contains('expanded');

    if (wasExpanded && lyricsWindow) {
        lyricsWindow.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        lyricsWindow.scrollTop = 0;
    }

    const isExpanded = specialMessageCard.classList.toggle('expanded');
    expandMessageBtn.textContent = isExpanded ? 'Ocultar letra' : 'Mostrar letra';
    expandMessageBtn.setAttribute('aria-expanded', String(isExpanded));

    if (!isExpanded && lyricsWindow) {
        requestAnimationFrame(() => {
            lyricsWindow.scrollTo({ top: 0, left: 0, behavior: 'auto' });
            lyricsWindow.scrollTop = 0;
        });
    }
}

function updateDuration() {
    durationTimeSpan.textContent = formatTime(audioPlayer.duration);
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function handleSongEnd() {
    playBtn.classList.remove('playing');
    playBtn.innerHTML = '<span>▶</span>';
    isPlaying = false;
    audioPlayer.currentTime = 0;
}

// Touch Handlers (Swipe desativado temporariamente)
function handleTouchStart(e) {
    // startX = e.touches[0].clientX;
}

function handleTouchEnd(e) {
    // endX = e.changedTouches[0].clientX;
    // handleSwipe();
}

// Mouse Handlers (Swipe desativado temporariamente)
function handleMouseDown(e) {
    // startX = e.clientX;
}

function handleMouseUp(e) {
    // endX = e.clientX;
    // handleSwipe();
}

function handleStorySideClick(e) {
    if (!e.target.closest('.stories-wrapper')) return;

    const isInteractiveElement = e.target.closest('button, input, audio, .player-controls, .progress-container, .progress-bar, .volume-container, .song-actions, .spotify-topbar, .expand-message-btn, .timeline-scroll, .timeline-lightbox');
    if (isInteractiveElement) return;

    if (Date.now() - lastSwipeNavigationTime < 280) return;

    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    const clickX = e.clientX;

    if (clickX < viewportWidth / 2) {
        previousStory();
    } else {
        nextStory();
    }
}

// Keyboard Navigation
function handleKeyboard(e) {
    if (timelineLightbox?.classList.contains('active') && e.key === 'Escape') {
        closeTimelineLightbox();
        return;
    }

    if (timelineLightbox?.classList.contains('active')) {
        return;
    }

    if (e.key === 'ArrowLeft') {
        previousStory();
    } else if (e.key === 'ArrowRight') {
        nextStory();
    } else if (e.key === ' ') {
        e.preventDefault();
        if (currentIndex === 0) {
            togglePlay();
        }
    }
}

// Swipe Logic
function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance to trigger swipe
    const difference = startX - endX;

    if (Math.abs(difference) > swipeThreshold) {
        lastSwipeNavigationTime = Date.now();

        if (difference > 0) {
            // Swipe left = next story
            nextStory();
        } else {
            // Swipe right = previous story
            previousStory();
        }
    }
}

// Navigation Functions
function nextStory() {
    if (currentIndex < totalStories - 1) {
        currentIndex++;
        updateStories();
    }
}

function previousStory() {
    if (currentIndex > 0) {
        currentIndex--;
        updateStories();
    }
}

function goToStory(index) {
    if (index >= 0 && index < totalStories && index !== currentIndex) {
        currentIndex = index;
        updateStories();
    }
}

// Update Display
function updateStories() {
    closeTimelineLightbox();
    isAnimating = true;

    // Update carousel position
    const translateValue = -currentIndex * 100;
    storiesContainer.style.transform = `translateX(${translateValue}%)`;

    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentIndex) {
            dot.classList.add('active');
        }
    });

    if (currentIndex === 3) {
        updateHoursTogether();
        restartHoursTogetherAnimation();
    } else if (hoursTogetherStory) {
        if (hoursAnimationTimeout) {
            clearTimeout(hoursAnimationTimeout);
        }
        hoursTogetherStory.classList.remove('hours-animate', 'hours-complete');
    }

    if (currentIndex === 4) {
        const timelineScroll = document.querySelector('.timeline-scroll');
        if (timelineScroll) {
            timelineScroll.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        }
    }

    // Re-enable interactions after animation
    setTimeout(() => {
        isAnimating = false;
    }, 500);
}

// Optional: Prevent scrolling on body (common pattern for fullscreen stories)
document.body.style.overflow = 'hidden';
document.body.style.position = 'fixed';
document.body.style.width = '100%';
