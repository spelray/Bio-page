document.addEventListener('DOMContentLoaded', function() {
  // Get references to DOM elements
  var terminalContainer = document.getElementById('terminal');
  var terminalText = document.getElementById('terminal-text');
  var videoBackground = document.getElementById('myVideo');
  var audioBackground = document.getElementById('myAudio');
  var blurredBox = document.getElementById('blurred-box');
  var closeButton = document.getElementById('close-button');

  // Initial terminal text content
  var terminalTextContent = [
      "User: Viperr",
      "Your IP: Loading...",
      "System: Loading...", // System information placeholder
      "Bio Loaded Successfully",
      "Click To Continue",
  ];
  var currentIndex = 0;

  // Pause background video and audio
  videoBackground.pause();
  audioBackground.pause();

  // Function to type out terminal text
  function typeWriter() {
      var line = currentIndex === 0 ? getAsciiArt() : terminalTextContent[currentIndex - 1];
      var i = 0;

      function typeChar() {
          if (i < line.length) {
              terminalText.textContent += line.charAt(i);
              i++;
              setTimeout(typeChar, 15);
          } else {
              terminalText.textContent += "\n";
              currentIndex++;
              if (currentIndex < terminalTextContent.length + 1) {
                  typeWriter();
              } else {
                  addEventListeners(); // Add event listeners when typing is done
              }
          }
      }

      typeChar();
  }

  // Handle key press event or touch event
  function handleInput() {
      // Hide terminal, play background video and audio, and show blurred box
      terminalContainer.style.display = 'none';
      videoBackground.play();
      audioBackground.play();
      blurredBox.style.display = 'block';
      removeEventListeners(); // Remove event listeners after handling input
  }

  // Add event listeners for both key press and touch events
  function addEventListeners() {
      document.addEventListener('keydown', handleKeyPress);
      terminalContainer.addEventListener('click', handleInput); // For touch support
  }

  // Remove event listeners
  function removeEventListeners() {
      document.removeEventListener('keydown', handleKeyPress);
      terminalContainer.removeEventListener('click', handleInput); // For touch support
  }

  // Handle key press event
  function handleKeyPress(event) {
      if (event.key === 'Enter') {
          handleInput();
      }
  }

  // Handle close button click event
  closeButton.addEventListener('click', function() {
      handleInput();
  });

  // Fetch IP address using API
  fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
          var ipAddress = data.ip;
          terminalTextContent[1] = "Your IP: " + ipAddress;
          typeWriter();
      })
      .catch(error => {
          console.error('Error fetching IP address:', error);
          terminalTextContent[1] = "IP: Unable to fetch IP address";
          typeWriter();
      });

  // Extract system information from user agent
  var userAgent = navigator.userAgent;
  var systemInfo;
  
  // Function to get the operating system name based on user agent
  function getOperatingSystem() {
      if (userAgent.match(/Windows/)) {
          // Windows OS detected
          return getWindowsVersion();
      } else if (userAgent.match(/Macintosh/)) {
          // macOS detected
          return getMacOSVersion();
      } else if (userAgent.match(/Linux/)) {
          // Linux OS detected
          return "Linux";
      } else if (userAgent.match(/Android/)) {
          // Android OS detected
          return getAndroidVersion();
      } else if (userAgent.match(/iPhone|iPad|iPod/)) {
          // iOS detected
          return getiOSVersion();
      } else {
          // Default to "Unknown" if system information cannot be determined
          return "Unknown";
      }
  }
  
  // Function to map Windows version numbers to their corresponding releases
  function getWindowsVersion() {
      var version = userAgent.match(/Windows NT ([\d.]+)/);
      if (version) {
          version = version[1];
          switch (version) {
              case "5.1":
                  return "Windows XP";
              case "6.0":
                  return "Windows Vista";
              case "6.1":
                  return "Windows 7";
              case "6.2":
                  return "Windows 8";
              case "6.3":
                  return "Windows 8.1";
              case "10.0":
                  return "Windows 10";
              case "10.0":
                  return "Windows 11";
              default:
                  return "Windows";
          }
      } else {
          return "Windows";
      }
  }
  
  // Function to get the macOS version
  function getMacOSVersion() {
      var version = userAgent.match(/Mac OS X ([\d_]+)/);
      if (version) {
          // Replace underscores with dots for macOS version
          version = version[1].replace(/_/g, '.');
          return "macOS " + version;
      } else {
          return "macOS";
      }
  }
  
  // Function to get the Android version
  function getAndroidVersion() {
      var version = userAgent.match(/Android ([\d.]+)/);
      if (version) {
          return "Android " + version[1];
      } else {
          return "Android";
      }
  }
  
  // Function to get the iOS version
  function getiOSVersion() {
      var version = userAgent.match(/OS ([\d_]+)/);
      if (version) {
          // Replace underscores with dots for iOS version
          version = version[1].replace(/_/g, '.');
          return "iOS " + version;
      } else {
          return "iOS";
      }
  }
  
  // Get the operating system information
  var operatingSystem = getOperatingSystem();
  terminalTextContent[2] = "System: " + operatingSystem;

  // Center the terminal window on the screen
  function centerTerminal() {
      var terminalWidth = terminalContainer.offsetWidth;
      var terminalHeight = terminalContainer.offsetHeight;
      var centerX = (window.innerWidth - terminalWidth) / 2;
      var centerY = (window.innerHeight - terminalHeight) / 2;

      terminalContainer.style.position = 'absolute';
      terminalContainer.style.left = centerX + 'px';
      terminalContainer.style.top = centerY + 'px';
  }

  // Center the terminal initially and on window resize
  centerTerminal();
  window.addEventListener('resize', centerTerminal);

  // Center the ASCII art within the terminal window
  terminalText.style.textAlign = 'center';

  // Function to generate ASCII art
  function getAsciiArt() {
      return `
███████╗ ███████╗ 
██╔═══██╗██╔═══██╗
███████╔╝███████╔╝
██╔═══██╗██╔═══██╗
██║   ██║██║   ██║
╚═╝   ╚═╝╚═╝   ╚═╝
    `;
  }

  // Get the audio element
  var audio = document.getElementById("myAudio");

  // Set the maximum volume level (between 0 and 1)
  var maxVolume = 0.1; // Adjust this value as needed

  // Function to limit the volume
  function limitVolume(volume) {
      if (volume > maxVolume) {
          audio.volume = maxVolume; // Set volume to the maximum allowed
      } else {
          audio.volume = volume; // Set volume to the provided value
      }
  }

  // Example usage:
  // Set volume to 0.7 (will be limited to maxVolume)
  limitVolume(0.1);

  function positionBlurredBox() {
      var blurredBox = document.getElementById('blurred-box');
      if (!blurredBox) return;
      var h = window.innerHeight;
      blurredBox.style.left = '50%';

      if (h < 600) {
          blurredBox.style.top = '40px';
          blurredBox.style.transform = 'translateX(-50%)';
      }
      else if (h < 690) {
        blurredBox.style.top = '30px';
        blurredBox.style.transform = 'translateX(-50%)';}
      else if (h < 740) {
          blurredBox.style.top = '70px';
          blurredBox.style.transform = 'translateX(-50%)';   
      } else if (h < 840) {
          blurredBox.style.top = '120px';
          blurredBox.style.transform = 'translateX(-50%)';
      } else {
          blurredBox.style.top = '50%';
          blurredBox.style.transform = 'translate(-50%, -50%)';
      }
  }

  window.addEventListener('resize', positionBlurredBox);
  positionBlurredBox();
});

document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('myAudio');
    const bar = document.getElementById('audio-progress-bar');
    const dot = document.getElementById('audio-progress-dot');
  
    function updateProgress() {
      if (!audio.duration) return;
      const percent = audio.currentTime / audio.duration;
      dot.style.left = (percent * bar.offsetWidth) + 'px';
      requestAnimationFrame(updateProgress);
    }
  
    audio.addEventListener('play', updateProgress);
    audio.addEventListener('seeked', updateProgress);
    audio.addEventListener('timeupdate', updateProgress);
  
    // Клик по полоске для перемотки
    bar.addEventListener('click', function(e) {
      const rect = bar.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percent = x / bar.offsetWidth;
      audio.currentTime = percent * audio.duration;
    });
  });

document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('myAudio');
    const bar = document.getElementById('audio-progress-bar');
    const dot = document.getElementById('audio-progress-dot');
  
    function updateProgress() {
      if (!audio.duration) return;
      const percent = audio.currentTime / audio.duration;
      dot.style.left = (percent * bar.offsetWidth) + 'px';
      requestAnimationFrame(updateProgress);
    }
  
    audio.addEventListener('play', updateProgress);
    audio.addEventListener('seeked', updateProgress);
    audio.addEventListener('timeupdate', updateProgress);
  
    // Перемотка по клику на прогресс-бар
    bar.addEventListener('click', function(e) {
      const rect = bar.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percent = x / bar.offsetWidth;
      audio.currentTime = percent * audio.duration;
    });
  });

document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('myAudio');
    const bar = document.getElementById('audio-progress-bar');
    const dot = document.getElementById('audio-progress-dot');

    let isDragging = false;

    function updateProgress() {
        if (!audio.duration) return;
        const percent = audio.currentTime / audio.duration;
        dot.style.left = (percent * bar.offsetWidth) + 'px';
        if (!isDragging) {
            requestAnimationFrame(updateProgress);
        }
    }

    audio.addEventListener('play', updateProgress);
    audio.addEventListener('seeked', updateProgress);
    audio.addEventListener('timeupdate', updateProgress);

    // Клик по полоске для перемотки
    bar.addEventListener('click', function(e) {
        const rect = bar.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percent = x / bar.offsetWidth;
        audio.currentTime = percent * audio.duration;
    });

    // Перетаскивание маркера
    dot.addEventListener('mousedown', function(e) {
        isDragging = true;
        document.body.style.userSelect = 'none';

        function onMouseMove(eMove) {
            const rect = bar.getBoundingClientRect();
            let x = eMove.clientX - rect.left;
            x = Math.max(0, Math.min(x, bar.offsetWidth));
            const percent = x / bar.offsetWidth;
            dot.style.left = (percent * bar.offsetWidth) + 'px';
        }

        function onMouseUp(eUp) {
            const rect = bar.getBoundingClientRect();
            let x = eUp.clientX - rect.left;
            x = Math.max(0, Math.min(x, bar.offsetWidth));
            const percent = x / bar.offsetWidth;
            audio.currentTime = percent * audio.duration;
            isDragging = false;
            document.body.style.userSelect = '';
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            requestAnimationFrame(updateProgress);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    // Touch events для мобильных
    dot.addEventListener('touchstart', function(e) {
        isDragging = true;
        document.body.style.userSelect = 'none';

        function onTouchMove(eMove) {
            const touch = eMove.touches[0];
            const rect = bar.getBoundingClientRect();
            let x = touch.clientX - rect.left;
            x = Math.max(0, Math.min(x, bar.offsetWidth));
            const percent = x / bar.offsetWidth;
            dot.style.left = (percent * bar.offsetWidth) + 'px';
        }

        function onTouchEnd(eEnd) {
            const rect = bar.getBoundingClientRect();
            let x = (eEnd.changedTouches[0].clientX - rect.left);
            x = Math.max(0, Math.min(x, bar.offsetWidth));
            const percent = x / bar.offsetWidth;
            audio.currentTime = percent * audio.duration;
            isDragging = false;
            document.body.style.userSelect = '';
            document.removeEventListener('touchmove', onTouchMove);
            document.removeEventListener('touchend', onTouchEnd);
            requestAnimationFrame(updateProgress);
        }

        document.addEventListener('touchmove', onTouchMove);
        document.addEventListener('touchend', onTouchEnd);
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('myAudio');
    const progress = document.getElementById('audio-progress');
  
    if (audio && progress) {
      // Обновление прогресс-бара при проигрывании
      audio.addEventListener('timeupdate', function() {
        progress.value = (audio.currentTime / audio.duration) * 100 || 0;
      });
  
      // Перемотка по прогресс-бару
      progress.addEventListener('input', function() {
        audio.currentTime = (progress.value / 100) * audio.duration;
      });
    }
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('myAudio');
    const progress = document.getElementById('audio-progress');
  
    function setProgressBarColor() {
      if (!audio.duration) return;
      const percent = (audio.currentTime / audio.duration) * 100;
      progress.style.setProperty('--progress', percent + '%');
    }
  
    if (audio && progress) {
      audio.addEventListener('timeupdate', setProgressBarColor);
      progress.addEventListener('input', setProgressBarColor);
      setProgressBarColor();
    }
  });

document.addEventListener('DOMContentLoaded', function() {
  const audio = document.getElementById('myAudio');
  const progress = document.getElementById('audio-progress');
  const currentTimeElem = document.getElementById('audio-current-time');
  const totalTimeElem = document.getElementById('audio-total-time');

  function formatTime(sec) {
    if (isNaN(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  function updateTimes() {
    if (audio && currentTimeElem && totalTimeElem) {
      currentTimeElem.textContent = formatTime(audio.currentTime);
      totalTimeElem.textContent = formatTime(audio.duration);
    }
  }

  if (audio) {
    audio.addEventListener('timeupdate', updateTimes);
    audio.addEventListener('loadedmetadata', updateTimes);
    audio.addEventListener('durationchange', updateTimes);
  }
  updateTimes();
});

document.addEventListener('DOMContentLoaded', function() {
  const audio = document.getElementById('myAudio');
  const playPauseBtn = document.getElementById('audio-playpause');
  const playPauseIcon = document.getElementById('audio-playpause-icon');
  const video = document.getElementById('myVideo'); // Получаем видео

  if (audio && playPauseBtn && playPauseIcon && video) {
    playPauseBtn.addEventListener('click', function() {
      if (audio.paused) {
        audio.play();
        video.play(); // Запустить видео вместе с аудио
      } else {
        audio.pause();
        video.pause(); // Остановить видео вместе с аудио
      }
    });

    audio.addEventListener('play', function() {
      playPauseIcon.classList.remove('fa-play');
      playPauseIcon.classList.add('fa-pause');
      video.play(); // Синхронизировать запуск видео
    });

    audio.addEventListener('pause', function() {
      playPauseIcon.classList.remove('fa-pause');
      playPauseIcon.classList.add('fa-play');
      video.pause(); // Синхронизировать паузу видео
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const audio = document.getElementById('myAudio');
  const progress = document.getElementById('audio-progress');
  const video = document.getElementById('myVideo');

  if (audio && progress && video) {
    // Обновление прогресс-бара при проигрывании
    audio.addEventListener('timeupdate', function() {
      progress.value = (audio.currentTime / audio.duration) * 100 || 0;
    });

    // Перемотка по прогресс-бару
    progress.addEventListener('input', function() {
      const newTime = (progress.value / 100) * audio.duration;
      audio.currentTime = newTime;
      video.currentTime = Math.min(newTime, video.duration || newTime);
    });
  }
});

