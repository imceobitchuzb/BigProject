import json
from sqlalchemy.orm import Session
from app.models.threat import Threat

SEED_THREATS = [
    {
        "slug": "cs2-steam-api-key-hijack",
        "title_en": "Counter-Strike 2 Steam Web API Key Hijacking",
        "title_ru": "Counter-Strike 2: Перехват и подмена трейдов через Steam Web API Key",
        "game": "cs2",
        "attack_vector": "mitm",
        "severity": "CRITICAL",
        "description_en": "Attackers trick users into logging into a fake tournament or skin pricing site via phishing. The site creates an unauthorized Steam Web API Key on the user's account. When the user later sends a legitimate skin trade, a scammer bot instantly cancels it and creates a duplicate trade to a fake account with the same avatar and name.",
        "description_ru": "Злоумышленники заманивают на фишинговый сайт турнира или оценки скинов. Сайт скрытно регистрирует Steam Web API Key. В дальнейшем бот перехватывает ваши трейды: отменяет оригинальный обмен и мгновенно создает дубликат на фейковый аккаунт с тем же ником и аватаркой.",
        "indicators": [
            "Unexpected active Steam Web API key on steamcommunity.com/dev/apikey",
            "Trade offer suddenly cancelled and re-created within 2 seconds",
            "Trader account Steam Level 0 with private profile despite familiar friend name",
            "Urgent request to trade items to a 'friend' or 'storage' account for verification"
        ],
        "prevention_en": "Check steamcommunity.com/dev/apikey immediately and revoke any key you did not create. Deauthorize all devices in Steam Guard settings. Never enter Steam credentials on external tournament sites.",
        "prevention_ru": "Проверьте steamcommunity.com/dev/apikey и немедленно отзовите ключ. В настройках Steam Guard деавторизуйте все устройства и смените пароль.",
        "status": "ACTIVE",
    },
    {
        "slug": "cs2-fake-tournament-vote",
        "title_en": "CS2 Fake Team / Tournament Vote Phishing",
        "title_ru": "CS2: Фейковое голосование за команду на турнире",
        "game": "cs2",
        "attack_vector": "phishing",
        "severity": "HIGH",
        "description_en": "A steam friend or random gamer messages: 'Hey, our 5th player dropped out / vote for my team in this amateur tournament!'. The link leads to a forged tournament portal displaying a fake Steam OpenID popup that steals login credentials and Steam Guard codes.",
        "description_ru": "Друг из Steam или незнакомец пишет: 'Проголосуй за мою команду на турнире, не хватает одного голоса!'. Ссылка ведет на поддельный турнирный портал с фальшивым всплывающим окном авторизации Steam.",
        "indicators": [
            "The Steam login window cannot be dragged outside the browser tab (HTML fake window)",
            "Browser address bar inside popup is not https://steamcommunity.com",
            "Friend suddenly writes in a strange tone or broken language",
            "Site asks for Steam Guard mobile authenticator code immediately"
        ],
        "prevention_en": "Real Steam OpenID popups are real browser windows. If you are already logged in to Steam in your browser, the official OpenID page will only show a 'Sign In' button without asking for password or 2FA.",
        "prevention_ru": "Официальный Steam OpenID открывается в отдельном окне ОС. Если вы уже вошли в Steam в браузере, настоящая авторизация не просит пароль и код, а только кнопку 'Войти'.",
        "status": "ACTIVE",
    },
    {
        "slug": "roblox-roblosecurity-cookie-theft",
        "title_en": "Roblox .ROBLOSECURITY Session Cookie Stealing",
        "title_ru": "Roblox: Кража сессионного куки .ROBLOSECURITY через код и скрипты",
        "game": "roblox",
        "attack_vector": "token_stealer",
        "severity": "CRITICAL",
        "description_en": "Scammers tell young players to drag a 'bookmarklet' or paste a script into browser DevTools (Inspect Element -> Console or Network tab) claiming it gives free Robux, custom clothing, or renders a 3D avatar. The script extracts the .ROBLOSECURITY cookie and transmits it to the attacker, bypassing 2FA completely.",
        "description_ru": "Мошенники убеждают скопировать код в консоль браузера (DevTools) или сохранить закладку, обещая бесплатные Robux или рендер скина. Скрипт мгновенно отправляет сессионную куку .ROBLOSECURITY злоумышленнику, обходя двухфакторную аутентификацию.",
        "indicators": [
            "Instructions asking to open 'Inspect' (F12) or Network tab",
            "Instructions asking to copy a 'cURL' or '.HAR' file from network inspector",
            "Promises of instant 10,000+ Robux generation or dupe glitches",
            "Immediate unauthorized account logout or changed password"
        ],
        "prevention_en": "Never paste code into browser DevTools console. Never export or send .HAR files or cURL requests to anyone. If exposed, click 'Log Out of All Other Sessions' in Roblox Security settings immediately.",
        "prevention_ru": "Никогда не вставляйте скрипты в консоль браузера (F12) и не пересылайте файлы .HAR. При подозрении немедленно нажмите 'Выйти со всех других устройств' в настройках безопасности Roblox.",
        "status": "ACTIVE",
    },
    {
        "slug": "roblox-fake-robux-generators",
        "title_en": "Roblox Fake Robux Generator & Verification Portals",
        "title_ru": "Roblox: Фейковые генераторы Robux с псевдо-проверкой человека",
        "game": "roblox",
        "attack_vector": "phishing",
        "severity": "HIGH",
        "description_en": "Websites advertised in YouTube shorts, TikTok or Discord promising free Robux. They show a simulated progress bar, then prompt for Roblox username, password, or claim the user must complete 'human verification' by downloading malware or subscribing to paid SMS traps.",
        "description_ru": "Сайты из TikTok и YouTube, обещающие бесплатные Robux. После анимации 'начисления' требуют логин, пароль или 'пройти проверку на человека' скачиванием вредоносных приложений.",
        "indicators": [
            "Domain not ending in official roblox.com",
            "Promises of 'Free 10,000 Robux instantly'",
            "Locker asking to download mobile apps or send SMS for verification",
            "Requests for password or 2FA code"
        ],
        "prevention_en": "Robux can only be purchased from official stores or earned via Roblox Developer Exchange and official Experiences. No website can generate free Robux.",
        "prevention_ru": "Robux невозможно сгенерировать бесплатно. Любой сайт, обещающий бесплатную валюту — фишинг или мошенничество.",
        "status": "ACTIVE",
    },
    {
        "slug": "minecraft-malicious-jar-infostealer",
        "title_en": "Minecraft Malicious Mod / Client Trojan Infostealers",
        "title_ru": "Minecraft: Вредоносные моды и чит-клиенты с инфостилерами (.jar RAT)",
        "game": "minecraft",
        "attack_vector": "malware",
        "severity": "CRITICAL",
        "description_en": "Trojans embedded inside Minecraft mods (.jar files) distributed via Discord, mediafire, or fake CurseForge clones. Once launched with Forge/Fabric, the payload steals Minecraft Microsoft access tokens, browser saved passwords, and Discord tokens, sending them to an attacker webhook.",
        "description_ru": "Трояны, внедренные в моды (.jar файлы) и распространяемые через Discord или клоны сайтов модов. При запуске игры мод извлекает токены Microsoft/Minecraft, пароли из браузеров и Discord токены.",
        "indicators": [
            "Mod received as a direct download link from a Discord user",
            "File extension .jar or .exe from untrusted sources",
            "Minecraft launcher suddenly logs out and says 'invalid session'",
            "Unauthorized logins to Microsoft account from foreign locations"
        ],
        "prevention_en": "Download mods exclusively from trusted repositories: Modrinth or official CurseForge. Use tools like Modcheck or antivirus to inspect suspicious JAR files.",
        "prevention_ru": "Скачивайте моды только с проверенных платформ: Modrinth или официального CurseForge. Включите беспарольный вход и Microsoft Authenticator.",
        "status": "ACTIVE",
    },
    {
        "slug": "minecraft-hypixel-fake-discord-verification",
        "title_en": "Minecraft Fake Hypixel Discord Verification OAuth Scam",
        "title_ru": "Minecraft: Фейковая верификация на сервере Hypixel через OAuth",
        "game": "minecraft",
        "attack_vector": "token_stealer",
        "severity": "HIGH",
        "description_en": "Scammers invite players to a fake competitive Minecraft or Bedwars Discord server. To 'verify', a bot directs the user to a fake Microsoft OAuth screen asking for permissions to manage Xbox Live profiles. Granting permission gives scammers full access to the Minecraft account.",
        "description_ru": "Игрока приглашают на турнирный Discord-сервер и для 'верификации' просят авторизоваться через Microsoft OAuth. Мошенническое приложение запрашивает права на управление профилем Xbox/Minecraft.",
        "indicators": [
            "Bot prompts you to click an OAuth link requesting 'Sign in to Xbox Live' permission",
            "Prompt asks for Microsoft one-time email code",
            "Account email or gamertag changed within minutes of verification"
        ],
        "prevention_en": "Legitimate server verification (e.g. Hypixel) is done by linking your account in-game on hypixel.net or typing your Discord tag in the lobby, never through Microsoft OAuth permissions.",
        "prevention_ru": "Настоящая верификация Hypixel происходит внутри игры командой в лобби, а не передачей OAuth-прав сторонним ботам.",
        "status": "ACTIVE",
    },
    {
        "slug": "brawl-stars-supercell-id-code-theft",
        "title_en": "Brawl Stars Supercell ID Login Code Interception",
        "title_ru": "Brawl Stars: Перехват 6-значного кода подтверждения Supercell ID",
        "game": "brawl-stars",
        "attack_vector": "social_eng",
        "severity": "CRITICAL",
        "description_en": "Scammers offer to buy an account, gift a Brawl Pass, or 'boost' trophies. They ask for the player's email to log in, triggering an official Supercell ID verification email. They then ask the player: 'Send me the 6-digit code so I can send the gems'. Entering the code hands over the entire Supercell ID.",
        "description_ru": "Злоумышленники обещают купить аккаунт, подарить Brawl Pass или прокачать кубки. Они запрашивают email, вызывают отправку кода от Supercell, а затем просят жертву назвать 6 цифр из письма.",
        "indicators": [
            "Stranger asks for your email address and then asks for the 6-digit verification code",
            "Email from Supercell clearly says: 'Your login code is XXXXXX. Do not share it with anyone'",
            "Promises of free Brawl Pass Plus or rank boosting"
        ],
        "prevention_en": "Supercell ID login codes are strictly for YOUR device only. Supercell staff and real gifters will NEVER need your email login code.",
        "prevention_ru": "Коды Supercell ID предназначены исключительно для входа на вашем устройстве. Никто не может начислить гемы через ваш код подтверждения.",
        "status": "ACTIVE",
    },
    {
        "slug": "brawl-stars-fake-gems-generators",
        "title_en": "Brawl Stars Free Gems APK & Phishing Web Portals",
        "title_ru": "Brawl Stars: Фальшивые APK с бесплатными гемами и приватные чит-серверы",
        "game": "brawl-stars",
        "attack_vector": "malware",
        "severity": "HIGH",
        "description_en": "Promotions on YouTube and Telegram linking to modified APKs claiming to be 'Brawl Stars Mod with Infinite Gems'. The APK contains spyware, SMS stealers, or prompts the user to enter their Supercell ID credentials on a phishing page.",
        "description_ru": "Ссылки в Telegram и YouTube на модифицированные APK 'Brawl Stars бесконечные гемы'. Внутри APK спрятан троян для перехвата SMS или фишинговая форма ввода Supercell ID.",
        "indicators": [
            "Download offered as raw .apk file outside Google Play or App Store",
            "App requests unnecessary permissions: Read SMS, Accessibility Services",
            "Account credentials requested before launching game"
        ],
        "prevention_en": "Only install Brawl Stars from official app stores (Google Play, Apple App Store). Modified APKs violate Supercell ToS and lead to permanent account bans or data theft.",
        "prevention_ru": "Устанавливайте игру исключительно из Google Play или App Store. Сторонние APK приводят к краже данных и бану.",
        "status": "ACTIVE",
    },
    {
        "slug": "pubg-fake-uc-recharge-portals",
        "title_en": "PUBG Mobile Fake UC Recharge & Midasbuy Impersonation",
        "title_ru": "PUBG Mobile: Поддельные сайты пополнения UC и клоны Midasbuy",
        "game": "pubg",
        "attack_vector": "phishing",
        "severity": "HIGH",
        "description_en": "Phishing sites imitating Midasbuy or official PUBG Mobile recharge portals offering '80% discount on Unknown Cash (UC)'. Victims enter Twitter, Facebook, or Google credentials used to log into PUBG, allowing scammers to steal the account and link their own phone numbers.",
        "description_ru": "Сайты-клоны официального платежного сервиса Midasbuy с 'скидкой 80% на UC'. При попытке оплаты сайт просит войти через Facebook, Twitter или Google и перехватывает доступ к аккаунту.",
        "indicators": [
            "URL is not the verified midasbuy.com or official pubgmobile.com",
            "Prices are unrealistically low (e.g. 8100 UC for $5)",
            "Prompts for social media login passwords rather than player ID"
        ],
        "prevention_en": "Official Midasbuy only requires your numeric Player ID to send UC. It will NEVER ask for your social media password to deliver currency.",
        "prevention_ru": "Настоящий Midasbuy для начисления UC запрашивает только цифровой ID игрока. Он никогда не требует логин и пароль от соцсетей.",
        "status": "ACTIVE",
    },
    {
        "slug": "pubg-malicious-cheat-rat",
        "title_en": "PUBG Mobile / PC Malicious Cheat & ESP Trojan RATs",
        "title_ru": "PUBG: Трояны под видом бесплатных читов, ESP и макросов",
        "game": "pubg",
        "attack_vector": "malware",
        "severity": "CRITICAL",
        "description_en": "Free cheat packages, recoil scripts, and radar hacks advertised in gaming forums and YouTube descriptions. The executable disables Windows Defender and drops remote access trojans (AsyncRAT, RedLine, Lumma) that harvest Discord tokens, crypto wallets, and game logins.",
        "description_ru": "Читы, макросы и радары, распространяемые через YouTube и Telegram. Программа просит отключить антивирус и скрытно устанавливает стилер или троян удаленного доступа.",
        "indicators": [
            "Archive protected with a password (to prevent antivirus inspection)",
            "Instructions explicitly demanding: 'Disable Windows Defender and real-time protection'",
            "Files with double extensions like 'cheat_v2.exe' or obfuscated scripts"
        ],
        "prevention_en": "Never download game hacks or disable your antivirus. Over 90% of free public game cheats contain embedded info-stealers or ransomware.",
        "prevention_ru": "Никогда не отключайте защиту Windows Defender. Подавляющее большинство 'бесплатных читов' содержат инфостилеры.",
        "status": "ACTIVE",
    },
    {
        "slug": "discord-nitro-qr-code-token-grabber",
        "title_en": "Discord Free Nitro QR Code & Login Scams",
        "title_ru": "Discord: Кража токена через фальшивый QR-код на бесплатный Nitro",
        "game": "discord",
        "attack_vector": "token_stealer",
        "severity": "CRITICAL",
        "description_en": "Compromised friend accounts send messages claiming: 'Discord is giving away 3 months of Nitro! Scan this QR code in your mobile app to claim'. Scanning the QR code logs the attacker's computer into your Discord account, bypassing passwords and 2FA.",
        "description_ru": "Со взломанного аккаунта друга приходит сообщение: 'Discord раздает Nitro на 3 месяца! Отсканируй QR-код в мобильном приложении'. Сканирование этого QR-кода авторизует устройство мошенника в вашем аккаунте.",
        "indicators": [
            "QR code claimed to 'claim a gift' instead of log in",
            "Discord mobile app warning: 'Are you trying to log in on a computer?'",
            "Message sent to all mutual servers and DMs simultaneously"
        ],
        "prevention_en": "The Discord mobile QR scanner is ONLY for logging into your own desktop client. Never scan a QR code sent by someone else or presented on an external webpage.",
        "prevention_ru": "Сканер QR-кодов в мобильном Discord предназначен ИСКЛЮЧИТЕЛЬНО для входа на вашем ПК. Никогда не сканируйте чужие QR-коды для 'получения подарка'.",
        "status": "ACTIVE",
    },
    {
        "slug": "discord-accidental-ban-report-steam",
        "title_en": "Discord 'Accidentally Reported Your Steam Account' Scam",
        "title_ru": "Discord: 'Я случайно отправил репорт на твой Steam-аккаунт'",
        "game": "cs2",
        "attack_vector": "social_eng",
        "severity": "HIGH",
        "description_en": "A stranger or friend on Discord contacts you with a screenshot of an alleged fraud report against your Steam account, claiming: 'I mistakenly reported you for duping items, contact this Steam moderator on Discord or your account will be permanently deleted!'. The fake moderator demands your credentials and trade history.",
        "description_ru": "В Discord пишет пользователь со скриншотом: 'Я случайно отправил жалобу на твой Steam за мошенничество, напиши агенту поддержки в Discord, иначе тебя забанят!'. 'Агент' требует назвать код из SMS или перевести скины.",
        "indicators": [
            "Alleged Steam/Valve employee communicating through Discord direct messages",
            "Forged support ticket image with official logos and fake case number",
            "Urgent countdown: 'You have 4 hours to verify or your account is terminated'",
            "Demands to purchase gift cards or trade items to a 'verification bot'"
        ],
        "prevention_en": "Valve/Steam staff NEVER communicate via Discord, chat, or third-party apps. Official Steam support only communicates through official tickets at help.steampowered.com.",
        "prevention_ru": "Сотрудники Valve и Steam НИКОГДА не связываются через Discord или чаты. Поддержка отвечает только через официальный тикет на help.steampowered.com.",
        "status": "ACTIVE",
    }
]


def seed_threats(db: Session):
    """Populate threat intelligence database if empty."""
    count = db.query(Threat).count()
    if count == 0:
        for item in SEED_THREATS:
            threat = Threat(
                slug=item["slug"],
                title_en=item["title_en"],
                title_ru=item["title_ru"],
                game=item["game"],
                attack_vector=item["attack_vector"],
                severity=item["severity"],
                description_en=item["description_en"],
                description_ru=item["description_ru"],
                indicators_json=json.dumps(item["indicators"]),
                prevention_en=item["prevention_en"],
                prevention_ru=item["prevention_ru"],
                status=item["status"],
            )
            db.add(threat)
        db.commit()
