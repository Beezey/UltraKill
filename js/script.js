        let loadingInterval;
        let isFinished = false;
        let isAlertActive = false;
        let isVerified = false;
        let currentMenuIndex = -1;
        let currentSecurityIndex = 0;
        let menuItems = []; // Cache pour les éléments du menu

        const progress = document.getElementById('progress');
        const video = document.getElementById('bg-video');
        const bgMusic = document.getElementById('bg-music');
        const vhsSound = document.getElementById('vhs-sound');
        const selectSound = document.getElementById('select-sound');
        const pressSound = document.getElementById('press-sound');
        const checkSound = document.getElementById('check-sound');
        const terminalHum = document.getElementById('terminal-hum');
        const alarmSound = document.getElementById('alarm-sound');
        const screenCrackOverlay = document.getElementById('screen-crack-overlay');
        const extraSound = document.getElementById('extra-sound');
        const alarmSound2 = document.getElementById('alarm-sound-2');

        const statusMsg = document.getElementById('status-msg');
        const loadingScreen = document.getElementById('loading-screen');
        const mainContent = document.getElementById('main-content');
        const terminalOutput = document.getElementById('terminal-output');
        const progressContainer = document.getElementById('progress-container');
        const volumeSlider = document.getElementById('volume-slider');
        const errorTerminal = document.getElementById('error-terminal');
        const errorOutput = document.getElementById('error-output');
        const passwordPrompt = document.getElementById('password-prompt');
        const passwordInput = document.getElementById('password-input');
        const verifiedPanel = document.getElementById('verified-panel');
        const inspectBtn = document.getElementById('inspect-btn');
        const settingsBtn = document.getElementById('settings-btn');
        const inspectStatus = document.getElementById('inspect-status');
        const securityCloseBtn = document.getElementById('security-close');
        const redAlertOverlay = document.getElementById('red-alert');
        const successLogoInline = document.getElementById('success-logo-inline');
        const greenAlertOverlay = document.getElementById('green-alert');
        const warningLogo = document.getElementById('warning-logo');
        const successLogo = document.getElementById('success-logo');
        const blackOut = document.getElementById('black-out');

        const errorMsgs = [
            "ERROR: UNAUTHORIZED DEBUG ATTEMPT \t [CRITICAL]",
            "SYSTEM_BREACH_DETECTED \n >>> TRACING_IP...",
            "V1_KERNEL_PANIC: MEMORY_CORRUPTION \t 0xDEADBEEF",
            "UNSAFE_ACCESS_VIOLATION \t [ PROTECTED ]",
            "CRITICAL_FAILURE: BLOOD_PUMP_OFFLINE \n !!! REBOOT_REQUIRED !!!",
            "PROTOCOL_REJECTED \t user_status: MALICIOUS",
            "MALICIOUS_USER_IDENTIFIED \t \u2588\u2588\u2588\u2588\u2588\u2588",
            "TERMINAL_ENCRYPTION_ACTIVE \n ERR_CODE: 0x666",
            "BLOOD_FUEL_RATIO: 0.0% \t mankind_status: <DEAD>",
            "HELL_IS_FULL \n entry_denied",
            "MACHINE_ID: V1 \t status: VIOLATION",
            "DEBUGGER_ATTACHED_DETECTION \t [ FAILED ]"
        ];

        const steps = [
            "CONNECTING TO CYBER GRIND...",
            "LOADING ASSETS...",
            "CALIBRATING SENSORS...",
            "BOOTING OS...",
            "READY."
        ];

        const ukPhrases = [
            "CECI EST MON PORTFOLIO"
        ];
        let currentPhraseIndex = 0;

        const commands = [
            "> [SYSTEM] :: BOOT_LOADER_V1.0.2",
            "> #INCLUDE < [aoe. s o ] FROM \"dUPR212212GAHq\"",
            "> #INCLUDE { permutation . transmutation . exhalation }",
            "> void* below = => contents(o, {} ) above(s);",
            "> \t [ O/N ] partial_apply(below, transmutation);",
            "",
            "> sudo run system_check.sh",
            "> status: MANKIND IS <DEAD> \t efficiency: 0%",
            "> status: BLOOD IS <FUEL> \t efficiency: 100%",
            "> INITIALIZING INTERFACE...",
        ];

        function startErrorScrolling(outputElement) {
            outputElement.style.display = 'block';
            setInterval(() => {
                // Réduction du nombre de lignes injectées par cycle
                for (let i = 0; i < 3; i++) {
                    const line = document.createElement('div');
                    line.className = 'glitch';
                    line.style.marginBottom = '2px';
                    line.innerHTML = "> " + errorMsgs[Math.floor(Math.random() * errorMsgs.length)];
                    outputElement.appendChild(line);
                }
                
                // Limite le nombre total d'éléments animés en mémoire
                while (outputElement.children.length > 40) {
                    outputElement.removeChild(outputElement.children[0]);
                }
            }, 60); // Fréquence réduite (60ms au lieu de 20ms)
        }

        function spawnAlert() {
            extraSound.currentTime = 0;
            extraSound.play().catch(() => {});
            
            const alert = document.createElement('div');
            alert.className = 'error-terminal';
            alert.style.zIndex = (7001 + document.querySelectorAll('.error-terminal').length).toString();
            
            // Tailles aléatoires pour un effet de chaos accru
            const w = Math.floor(Math.random() * 500) + 400; // Entre 400px et 900px
            const h = Math.floor(Math.random() * 400) + 300; // Entre 300px et 700px
            alert.style.width = w + 'px';
            alert.style.height = h + 'px';

            const x = Math.floor(Math.random() * (window.innerWidth - w));
            const y = Math.floor(Math.random() * (window.innerHeight - h));
            alert.style.left = Math.max(0, x) + 'px';
            alert.style.top = Math.max(0, y) + 'px';
            alert.style.display = 'flex';

            alert.innerHTML = `
                <div class="error-terminal-header">
                    <span class="security-title">SECURITY.EXE // SYSTEM_PROTECTION</span>
                    <button type="button" class="security-close-btn" aria-label="Fermer"></button>
                </div>
                <div class="error-content-spawn">
                    <div class="error-output-instance"></div>
                </div>
            `;
            
            document.body.appendChild(alert);
            startErrorScrolling(alert.querySelector('.error-output-instance'));
        }

        function openSecurityPrompt() {

            const x = Math.floor(Math.random() * (window.innerWidth - 800));
            const y = Math.floor(Math.random() * (window.innerHeight - 600));
            errorTerminal.style.left = Math.max(0, x) + 'px';
            errorTerminal.style.top = Math.max(0, y) + 'px';

            errorTerminal.classList.remove('success-state');
            errorTerminal.classList.remove('closing-state');
            errorTerminal.classList.remove('verified-ready');
            errorTerminal.classList.remove('inspect-mode');
            errorTerminal.style.display = 'flex';
            if (passwordPrompt) passwordPrompt.style.display = isVerified ? 'none' : 'block';
            errorOutput.style.display = 'none';
            errorOutput.innerHTML = '';
            if (successLogoInline) successLogoInline.style.display = 'none';
            if (inspectStatus) inspectStatus.textContent = 'Mode inspection actif';
            if (verifiedPanel && isVerified) {
                errorTerminal.classList.add('success-state');
                errorTerminal.classList.add('verified-ready');
                currentSecurityIndex = 0;
                setTimeout(() => {
                    if (inspectBtn) inspectBtn.focus();
                }, 100);
            }
            passwordInput.value = '';
            if (!isVerified) passwordInput.focus();
        }

        function closeSecurityPopup() {
            if (errorTerminal.style.display !== 'flex') return;
            errorTerminal.classList.remove('closing-state');
            void errorTerminal.offsetWidth;
            errorTerminal.classList.add('closing-state');

            setTimeout(() => {
                errorTerminal.classList.remove('closing-state');
                errorTerminal.style.display = 'none';
            }, 450);
        }

        function triggerSuccessTerminal() {
            const passwordPrompt = document.getElementById('password-prompt');
            isVerified = true;
            if (passwordPrompt) passwordPrompt.style.display = 'none';
            errorOutput.style.display = 'none';
            errorTerminal.classList.remove('success-state');
            errorTerminal.classList.remove('closing-state');
            errorTerminal.classList.remove('verified-ready');
            errorTerminal.classList.remove('inspect-mode');
            void errorTerminal.offsetWidth;
            errorTerminal.classList.add('success-state');
            checkSound.currentTime = 0;
            checkSound.play().catch(e => console.error("ERREUR CHECK (Check.mp3):", e));
            if (successLogoInline) {
                successLogoInline.style.display = 'block';
            }

            setTimeout(() => {
                if (successLogoInline) successLogoInline.style.display = 'none';
                errorTerminal.classList.add('verified-ready');
                currentSecurityIndex = 0;
                setTimeout(() => {
                    if (inspectBtn) inspectBtn.focus();
                }, 100);
            }, 720);
        }

        if (securityCloseBtn) {
            securityCloseBtn.addEventListener('click', () => {
                pressSound.currentTime = 0;
                pressSound.play().catch(() => {});
                closeSecurityPopup();
            });
        }

        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                pressSound.currentTime = 0;
                pressSound.play().catch(() => {});
                closeSecurityPopup();
                setTimeout(() => volumeSlider.focus(), 120);
            });
        }

        if (inspectBtn) {
            inspectBtn.addEventListener('click', () => {
                pressSound.currentTime = 0;
                pressSound.play().catch(() => {});
                errorTerminal.classList.add('inspect-mode');
                if (inspectStatus) inspectStatus.textContent = 'Inspection deverrouillee';
                closeSecurityPopup();
                setTimeout(() => {
                    debugger;
                }, 160);
            });
        }

        // Ajout du son de survol pour les boutons de sécurité
        [inspectBtn, settingsBtn].forEach((btn, index) => {
            btn.addEventListener('mouseenter', () => {
                currentSecurityIndex = index;
                extraSound.currentTime = 0;
                extraSound.play().catch(() => {});
            });
        });

        function submitSecurityPassword() {
            const passwordPrompt = document.getElementById('password-prompt');
            if (errorTerminal.style.display !== 'flex' || !passwordPrompt || passwordPrompt.style.display === 'none') {
                return false;
            }

            const password = passwordInput.value.trim().toUpperCase();
            passwordInput.value = "";

            if (password === "V1") {
                triggerSuccessTerminal();
                return true;
            }

            triggerErrorTerminal();
            return true;
        }

        function triggerErrorTerminal() {
            isAlertActive = true;
            
            // Activation du filtre rouge clignotant
            if (redAlertOverlay) redAlertOverlay.style.display = 'block';

            // Activation du logo Attention
            if (warningLogo) warningLogo.style.display = 'block';

            // Activation de l'effet écran cassé
            if (screenCrackOverlay) {
                screenCrackOverlay.style.display = 'block';
                screenCrackOverlay.classList.add('screen-crack-active'); // Ajoute la classe d'animation
            }
            
            // Grise les boutons du menu et ajoute un cadenas
            menuItems.forEach(item => {
                item.classList.add('menu-item-locked');
            });

            // Arrête la musique de fond calme
            bgMusic.pause();

            // Lance les deux alarmes en boucle
            alarmSound.play().catch(e => console.error("ERREUR ALARME:", e));
            alarmSound2.play().catch(e => console.error("ERREUR ALARME 2:", e));

            openSecurityPrompt();
            if (passwordPrompt) passwordPrompt.style.display = 'none';
            startErrorScrolling(errorOutput);

            let count = 0;
            const spawnInterval = setInterval(() => {
                spawnAlert();
                count++;
                if (count >= 8) clearInterval(spawnInterval);
            }, 100); // Flood de popups plus rapide et intense

            // SÉQUENCE DE CRASH FINAL : Écran noir et reload
            setTimeout(() => {
                if (blackOut) blackOut.style.display = 'block';
                
                // On coupe tous les sons d'un coup
                alarmSound.pause();
                alarmSound2.pause();
                terminalHum.pause();

                // Relance la page après 2 secondes de noir
                setTimeout(() => {
                    location.reload();
                }, 800);
            }, 4000); // Le chaos dure 3 secondes avant le crash
        }

        passwordInput.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter') return;
            e.preventDefault();
            e.stopPropagation();
            submitSecurityPassword();
        });

        function typeTerminal(index = 0) {
            if (isFinished || index >= commands.length) {
                // Une fois les commandes finies, on lance la barre de chargement
                setTimeout(startLoadingBar, 500);
                return;
            }
            
            let charIndex = 0;
            const currentLine = document.createElement('div');
            terminalOutput.appendChild(currentLine);

            function typeChar() {
                if (!isFinished && charIndex < commands[index].length) {
                    let rawText = commands[index].substring(0, charIndex + 1);
                    currentLine.innerHTML = rawText.replace(/DEAD/g, '<span class="glitch" style="color: #ff0000;">DEAD</span>')
                                                   .replace(/BLOOD/g, '<span class="glitch" style="color: #ff0000;">BLOOD</span>')
                                                   .replace(/VIOLENCE/g, '<span class="glitch" style="color: #ff0000;">VIOLENCE</span>');
                                                   

                    charIndex++;
                    setTimeout(typeChar, 5); // Vitesse de frappe ultra rapide
                } else {
                    setTimeout(() => typeTerminal(index + 1), 30); // Délai entre lignes réduit
                }
            }
            typeChar();
        }

        function typeMainTitle() {
            const textToType = ukPhrases[currentPhraseIndex];
            const titleElement = document.getElementById('main-title-text');
            
            // Déclenche l'effet de glitch visuel
            titleElement.classList.add('glitch-active');
            setTimeout(() => titleElement.classList.remove('glitch-active'), 300);

            titleElement.innerHTML = "> ";
            let charIndex = 0;

            function typeChar() {
                if (charIndex < textToType.length) {
                    let rawText = textToType.substring(0, charIndex + 1);
                    titleElement.innerHTML = "> " + rawText.replace(/DEAD/g, '<span class="glitch" style="color: #ff0000;">DEAD</span>')
                                                           .replace(/BLOOD/g, '<span class="glitch" style="color: #ff0000;">BLOOD</span>')
                                                           .replace(/MON/g, '<span style="color: #ff0000;">MON</span>')
                                                           .replace(/NOW/g, '<span style="color: #ff0000;">NOW</span>')
                                                           .replace(/STEEL/g, '<span style="color: #00ffff;">STEEL</span>')
                                                           .replace(/HELL/g, '<span style="color: #ff0000;">HELL</span>');

                    charIndex++;
                    setTimeout(typeChar, 25); // Écriture du titre beaucoup plus rapide
                } else {
                    // Attendre 3 secondes une fois la phrase écrite, puis effacer
                    setTimeout(eraseMainTitle, 3000);
                }
            }
            typeChar();
        }

        function eraseMainTitle() {
            const titleElement = document.getElementById('main-title-text');
            
            function eraseChar() {
                let plainText = titleElement.textContent;
                if (plainText.length > 2) { // On garde le "> "
                    let newPlainText = plainText.slice(0, -1);
                    let rawText = newPlainText.substring(2);
                    titleElement.innerHTML = "> " + rawText.replace(/DEAD/g, '<span class="glitch" style="color: #ff0000;">DEAD</span>')
                                                           .replace(/BLOOD/g, '<span class="glitch" style="color: #ff0000;">BLOOD</span>')
                                                           .replace(/MON/g, '<span style="color: #ff0000;">MON</span>')
                                                           .replace(/NOW/g, '<span style="color: #ff0000;">NOW</span>')
                                                           .replace(/STEEL/g, '<span style="color: #00ffff;">STEEL</span>')
                                                           .replace(/HELL/g, '<span style="color: #ff0000;">HELL</span>');

                    setTimeout(eraseChar, 15); // Effacement très rapide
                } else {
                    // Choisir une phrase aléatoire différente de la précédente
                    let nextIndex;
                    do {
                        nextIndex = Math.floor(Math.random() * ukPhrases.length);
                    } while (nextIndex === currentPhraseIndex && ukPhrases.length > 1);
                    
                    currentPhraseIndex = nextIndex;
                    setTimeout(typeMainTitle, 500);
                }
            }
            eraseChar();
        }

        function showMenu() {
            // On met en cache les éléments une seule fois pour éviter le lag
            menuItems = document.querySelectorAll('.menu-item');
            
            menuItems.forEach((item, index) => {
                // Synchronise la sélection avec la souris
                item.addEventListener('mouseenter', () => {
                    if (isFinished) updateMenuSelection(index);
                });

                item.addEventListener('click', (e) => {
                    const href = item.getAttribute('href');

                    if (href === "#") {
                        e.preventDefault();
                        pressSound.currentTime = 0;
                        pressSound.play().catch(e => {});
                    } else {
                        e.preventDefault();
                        pressSound.currentTime = 0;
                        pressSound.play().catch(e => {});
                        
                        // On retire les classes d'allumage et on met les classes d'extinction
                        mainContent.className = 'crt-power-off';
                        video.className = 'crt-video-off';

                        setTimeout(() => { document.body.classList.add('hide-crt-overlay'); }, 950);

                        // On attend la fin de l'animation pour changer de page (1000ms)
                        setTimeout(() => {
                            window.location.href = href;
                        }, 1000);
                    }
                });

                setTimeout(() => {
                    item.style.opacity = "1";
                    item.style.transform = "translateY(0)";
                    item.style.pointerEvents = "auto";
                }, index * 200); // Apparition en cascade deux fois plus rapide
            });
        }

        function updateMenuSelection(index) {
            if (index === currentMenuIndex) return;

            // On retire la classe de l'ancien index s'il existe
            if (currentMenuIndex !== -1 && menuItems[currentMenuIndex]) {
                menuItems[currentMenuIndex].classList.remove('selected');
            }

            currentMenuIndex = index;
            // On ajoute la classe au nouvel index
            if (menuItems[currentMenuIndex]) {
                menuItems[currentMenuIndex].classList.add('selected');
            }

            // Joue le son de sélection
            selectSound.currentTime = 0;
            selectSound.play().catch(e => {});
        }

        function startLoadingBar() {
            progressContainer.style.display = 'block';
            statusMsg.style.display = 'block';
            
            let width = 0;
            let stepIndex = 0;

            loadingInterval = setInterval(() => {
                if (isFinished || width >= 100) {
                    clearInterval(loadingInterval);
                    setTimeout(() => {
                        if (!isFinished) finalizeLoading();
                    }, 800);
                } else {
                    width += Math.random() * 15;
                    if (width > 100) width = 100;
                    progress.style.width = width + '%';
                    
                    if (stepIndex < steps.length && width > (stepIndex * 20)) {
                        statusMsg.innerText = steps[stepIndex];
                        stepIndex++;
                    }
                }
            }, 50);
        }

        function finalizeLoading() {
            if (isFinished) return;
            isFinished = true;
            
            if (loadingInterval) clearInterval(loadingInterval);
            
            document.getElementById('boot-screen').style.display = 'none';
            
            loadingScreen.style.display = 'none';
            mainContent.style.display = 'block';

            // Double requestAnimationFrame pour garantir que le navigateur détecte le changement de display
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    mainContent.classList.add('crt-power-on');
                    video.classList.add('crt-video-on');
                });
            });

            video.play().catch(e => {});

            // Lancement de la musique et du bourdonnement (200%) en simultané
            bgMusic.play().catch(e => console.error("ERREUR MUSIQUE (TheFireIsGone.mp3):", e));
            terminalHum.play().catch(e => console.error("ERREUR BOURDONNEMENT (VHSSFX.mp3):", e));
            
            vhsSound.pause(); // Arrête le son de la cassette si elle n'est pas finie
            
            typeMainTitle();
            showMenu();
        }

        // Gestion du volume
        let savedVolume = null;
        try {
            // Le localStorage peut échouer sur le protocole file:// dans certains navigateurs
            savedVolume = localStorage.getItem('uk_volume');
        } catch (e) {
            console.warn("Accès au localStorage bloqué par le navigateur sur file://");
        }

        if (savedVolume !== null) {
            volumeSlider.value = savedVolume;
            bgMusic.volume = parseFloat(savedVolume);
            selectSound.volume = parseFloat(savedVolume);
            pressSound.volume = parseFloat(savedVolume);
            checkSound.volume = parseFloat(savedVolume);
            alarmSound.volume = parseFloat(savedVolume);
            alarmSound2.volume = parseFloat(savedVolume);
            extraSound.volume = parseFloat(savedVolume);
            terminalHum.volume = parseFloat(savedVolume) * 0.5;
        } else {
            bgMusic.volume = 1.0;
            selectSound.volume = 1.0;
            pressSound.volume = 1.0;
            checkSound.volume = 1.0;
            alarmSound.volume = 1.0;
            alarmSound2.volume = 1.0;
            extraSound.volume = 1.0;
            terminalHum.volume = 0.5;
        }

        volumeSlider.addEventListener('input', () => {
            const val = volumeSlider.value;
            bgMusic.volume = val;
            selectSound.volume = val;
            pressSound.volume = val;
            checkSound.volume = val;
            alarmSound.volume = val;
            alarmSound2.volume = val;
            extraSound.volume = val;
            terminalHum.volume = val * 0.5;
            try {
                localStorage.setItem('uk_volume', val);
            } catch (e) {
                // On ignore l'erreur si le stockage est bloqué
            }
        });

        // Gestion du démarrage après interaction utilisateur
        function startBootSequence() {
            const bootScreen = document.getElementById('boot-screen');
            if (!bootScreen || bootScreen.style.display === 'none') return;
            // Lance le son d'initialisation
            vhsSound.play().catch(e => console.error("ERREUR VHS (VHS.mp3):", e));
            
            // On "prime" les sons pour autoriser leur démarrage automatique plus tard
            const primeAudio = (audio) => {
                if (!audio) return;
                audio.play().then(() => {
                    audio.pause();
                    audio.currentTime = 0;
                }).catch(e => console.warn(`Audio priming failed for ${audio.id}:`, e));
            };
            primeAudio(bgMusic);
            primeAudio(terminalHum);
            primeAudio(selectSound);
            primeAudio(pressSound);
            primeAudio(checkSound);
            primeAudio(alarmSound2);
            primeAudio(alarmSound);
            primeAudio(extraSound);

            // Cache le texte pour laisser l'écran noir
            document.querySelector('.boot-prompt').style.display = 'none';
            
            // Petit délai de noir total avant l'apparition subite du terminal (500ms)
            setTimeout(() => {
                bootScreen.style.display = 'none';
                typeTerminal();
            }, 500);
        }

        document.getElementById('boot-screen').addEventListener('click', startBootSequence);

        // Gestion du Skip via la touche Entrée
        window.addEventListener('keydown', (e) => {
            const bootScreen = document.getElementById('boot-screen');
            const isBootVisible = bootScreen && bootScreen.style.display !== 'none';
            if (isBootVisible && (e.key === ' ' || e.code === 'Space' || e.key === 'Spacebar')) {
                e.preventDefault();
                startBootSequence();
                return;
            }

            // Interception de F12, Ctrl+Shift+I/J/C (Inspecteur) et Ctrl+U (Code Source)
            const isInspectKey = e.key === 'F12' || 
                                 (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c' || e.key === 'K' || e.key === 'k')) || 
                                 (e.ctrlKey && (e.key === 'U' || e.key === 'u')) ||
                                 (e.metaKey && e.altKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c'));

            if (isInspectKey) {
                e.preventDefault();
                e.stopPropagation();
                if (isAlertActive) return;
                openSecurityPrompt();
                return;
            }

            const passwordPrompt = document.getElementById('password-prompt');
            if (errorTerminal.style.display === 'flex' && passwordPrompt && passwordPrompt.style.display !== 'none') {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    submitSecurityPassword();
                }
                return;
            }

            // Navigation spécifique à SECURITY.EXE (Mode vérifié)
            if (errorTerminal.style.display === 'flex' && errorTerminal.classList.contains('verified-ready')) {
                const secItems = [inspectBtn, settingsBtn];
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    currentSecurityIndex = (currentSecurityIndex + 1) % secItems.length;
                    secItems[currentSecurityIndex].focus();
                    extraSound.currentTime = 0;
                    extraSound.play().catch(() => {});
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    currentSecurityIndex = (currentSecurityIndex - 1 + secItems.length) % secItems.length;
                    secItems[currentSecurityIndex].focus();
                    extraSound.currentTime = 0;
                    extraSound.play().catch(() => {});
                }
                return;
            }

            if (!isFinished) {
                if (e.key === 'Enter') finalizeLoading();
                return;
            }

            // Navigation Menu
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                let next = (currentMenuIndex + 1) % menuItems.length;
                updateMenuSelection(next);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                let prev = (currentMenuIndex - 1 + menuItems.length) % menuItems.length;
                updateMenuSelection(prev);
            } else if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (currentMenuIndex !== -1) {
                    menuItems[currentMenuIndex].click();
                }
            }
        });

        // Interception du clic droit pour simuler la sécurité
        window.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            if (isAlertActive) return;
            if (errorTerminal.style.display === 'flex') return;
            openSecurityPrompt();
        });
