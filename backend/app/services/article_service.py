from typing import List, Optional, Tuple
from app.schemas.article import ArticleSummary, ArticleDetail

# Article registry for reliable backend API responses
ARTICLES_DATA = {
    "en": [
        {
            "slug": "how-to-secure-your-gaming-account",
            "title": "How to Secure Your Gaming Account",
            "description": "Essential safeguards including authenticator apps, unique passwords, and recovery security to protect your game profiles and library.",
            "category": "account-security",
            "category_title": "Account Security",
            "lang": "en",
            "published_date": "2026-03-01",
            "last_reviewed": "2026-03-15",
            "reading_time": "6 min read",
            "warning_signs_count": 4,
            "warning_signs": [
                "Unexpected password reset or login notification emails from game services.",
                "Prompts requesting SMS or authenticator codes while you are not logging in.",
                "Sudden disconnection from active game sessions with an 'already logged in elsewhere' error.",
                "Friend requests or messages sent from your account without your knowledge."
            ],
            "prevention_steps": [
                "Activate multi-factor authentication (MFA) using an authenticator app rather than SMS whenever available.",
                "Use a unique, high-entropy password managed through an offline or trusted password manager.",
                "Secure the recovery email linked to your gaming account with MFA and a distinct password.",
                "Store backup recovery codes securely in an encrypted or physical location."
            ],
            "recovery_steps": [
                "Immediately revoke all active authorized sessions through the platform's security portal.",
                "Change your master password and rotate all API keys or linked OAuth connections.",
                "Contact the official game publisher support through their verified domain only.",
                "Alert close friends and guildmates not to click links or accept trades from your account."
            ],
            "official_sources": [
                {"title": "CISA: Multi-Factor Authentication Guidance", "url": "https://www.cisa.gov/mfa"},
                {"title": "Steam Support: Account Security Recommendations", "url": "https://help.steampowered.com"},
                {"title": "Epic Games: Securing Your Account", "url": "https://www.epicgames.com/help"}
            ],
            "related_slugs": ["how-to-spot-gaming-phishing", "gaming-account-recovery-scams", "what-to-do-after-a-gaming-scam"]
        },
        {
            "slug": "how-to-spot-gaming-phishing",
            "title": "How to Spot Gaming Phishing",
            "description": "Learn to identify deceptive URLs, counterfeit login popups, and fake tournament registration links designed to steal credentials.",
            "category": "phishing",
            "category_title": "Phishing",
            "lang": "en",
            "published_date": "2026-03-02",
            "last_reviewed": "2026-03-16",
            "reading_time": "7 min read",
            "warning_signs_count": 5,
            "warning_signs": [
                "Slightly misspelled domain names (e.g., stlearncommunity, epidgames) or strange top-level domains.",
                "A browser-in-the-browser fake login popup window that cannot be dragged outside the browser viewport.",
                "Urgent warnings demanding immediate verification within minutes to avoid permanent account bans.",
                "Invitations from unknown players to join competitive teams or vote for teams on external links."
            ],
            "prevention_steps": [
                "Always bookmark official platform login pages and navigate directly from bookmarks.",
                "Check whether you are already logged in: genuine OAuth single sign-on buttons will not prompt for username/password if you already have an active session.",
                "Never enter steam/discord credentials on third-party voting or team management sites.",
                "Inspect SSL/TLS certificate domain details before typing credentials."
            ],
            "recovery_steps": [
                "If credentials were submitted on a phishing site, immediately change passwords from a separate clean device.",
                "Deauthorize all third-party API keys (e.g. Steam Web API key) that may have been generated.",
                "Check for unauthorized family-sharing or linked secondary accounts.",
                "Submit the malicious URL to Google Safe Browsing or Anti-Phishing Working Group (APWG)."
            ],
            "official_sources": [
                {"title": "Federal Trade Commission: How to Recognize and Avoid Phishing", "url": "https://consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams"},
                {"title": "Discord Safety Center: Identifying Scams", "url": "https://discord.com/safety"}
            ],
            "related_slugs": ["how-to-secure-your-gaming-account", "safe-trading-in-game-items", "social-engineering-in-online-games"]
        },
        {
            "slug": "safe-trading-in-game-items",
            "title": "Safe Trading of In-Game Items",
            "description": "Protocols for avoiding API interception, quick-switch swap scams, middleman impersonations, and item substitution tricks.",
            "category": "trading-and-items",
            "category_title": "Trading & Items",
            "lang": "en",
            "published_date": "2026-03-04",
            "last_reviewed": "2026-03-18",
            "reading_time": "8 min read",
            "warning_signs_count": 4,
            "warning_signs": [
                "The buyer/seller insists on communicating via external messaging apps rather than official in-game trading interfaces.",
                "Trade offers that are silently cancelled and instantly resent with identical avatar icons but empty or downgraded items (API scam).",
                "Requests to use an unverified 'community middleman' or Discord moderator to hold items temporarily.",
                "Offers vastly exceeding fair market value for ordinary items."
            ],
            "prevention_steps": [
                "Conduct trades exclusively within officially sanctioned in-game trading windows with dual confirmation stages.",
                "Verify trade partner account level, creation date, and trade registration timestamp prior to confirming.",
                "Double check trade confirmation screens on your mobile authenticator for item condition, float, and exact inventory names.",
                "Never generate an API developer key unless you are actively developing software."
            ],
            "recovery_steps": [
                "Immediately revoke any unauthorized API keys in your platform developer settings.",
                "Report the trading partner profile directly through the game platform's scam reporting form.",
                "Preserve chat transcripts and trade logs as evidence for platform support.",
                "Do not attempt to 'trade back' or pay ransom fees to scammers."
            ],
            "official_sources": [
                {"title": "Steam Support: Item Scam FAQ", "url": "https://help.steampowered.com/en/faqs/view/3B6E-B322-2400-8D24"},
                {"title": "Valve Corporation: Steam Trading Policy", "url": "https://store.steampowered.com"}
            ],
            "related_slugs": ["how-to-spot-gaming-phishing", "gaming-currency-and-payment-safety", "what-to-do-after-a-gaming-scam"]
        },
        {
            "slug": "fake-giveaways-and-free-rewards",
            "title": "Fake Giveaways and Free Rewards",
            "description": "Exposing bogus Discord Nitro promotions, fake Battle Pass codes, streamer impersonator raffles, and rogue bot invitations.",
            "category": "fake-giveaways",
            "category_title": "Fake Giveaways",
            "lang": "en",
            "published_date": "2026-03-05",
            "last_reviewed": "2026-03-19",
            "reading_time": "5 min read",
            "warning_signs_count": 4,
            "warning_signs": [
                "Direct messages from strangers, bots, or compromised friends claiming you won a raffle you never entered.",
                "Promotions claiming 'Free 3 Months Nitro' or '10,000 V-Bucks' requiring you to scan a QR code.",
                "Livestreams with disabled chat replaying old creator footage with fake QR code overlays.",
                "Requirements to pay an initial 'processing fee' or 'gas fee' to claim a free item."
            ],
            "prevention_steps": [
                "Never scan login QR codes on unfamiliar screens with your mobile game or chat apps.",
                "Disable direct messages from server members in community Discord channels.",
                "Remember the golden rule of cybersecurity: legitimate publishers do not require payment to deliver free contest prizes.",
                "Verify giveaways on the creator's verified social media handles before clicking any links."
            ],
            "recovery_steps": [
                "If you scanned a fraudulent QR code, immediately log out all active mobile/desktop sessions in user settings.",
                "Notify server administrators so they can ban the compromised account or malicious bot.",
                "Check billing settings for any unauthorized subscriptions initiated during the session.",
                "Educate your friend group so the compromise does not spread."
            ],
            "official_sources": [
                {"title": "Discord Help Center: QR Code Login Security", "url": "https://support.discord.com"},
                {"title": "US Federal Trade Commission: Prize and Sweepstakes Scams", "url": "https://consumer.ftc.gov"}
            ],
            "related_slugs": ["how-to-spot-gaming-phishing", "social-engineering-in-online-games", "gaming-currency-and-payment-safety"]
        },
        {
            "slug": "gaming-account-recovery-scams",
            "title": "Gaming Account Recovery Scams",
            "description": "How fraudulent 'account recovery specialists' and fake support tickets exploit desperate players who lost access to their accounts.",
            "category": "fake-support",
            "category_title": "Fake Support",
            "lang": "en",
            "published_date": "2026-03-07",
            "last_reviewed": "2026-03-20",
            "reading_time": "6 min read",
            "warning_signs_count": 4,
            "warning_signs": [
                "Replies on social media or forums recommending a specific 'Instagram ethical hacker' or 'Telegram recovery agent'.",
                "Claims of having 'insider connections' at Valve, Riot, Blizzard, or Epic Games.",
                "Demands for upfront recovery fees via cryptocurrency, gift cards, or wire transfers.",
                "Unsolicited messages from users claiming they accidentally reported your account and you must contact a Discord 'admin'."
            ],
            "prevention_steps": [
                "Only submit recovery tickets through official platform support portals on verified domains.",
                "Recognize that real game moderators and support agents will never communicate via personal Discord or Telegram accounts.",
                "Never send money or gift card codes to third-party recovery services.",
                "Never provide verification codes or purchase receipts to unverified individuals."
            ],
            "recovery_steps": [
                "Cease all contact with the fake recovery specialist immediately.",
                "File a genuine support ticket through the publisher's official support website.",
                "Prepare legitimate proof of ownership: original email access, early purchase transaction IDs, or physical CD keys.",
                "Report the fake specialist profile on the platform where they contacted you."
            ],
            "official_sources": [
                {"title": "Internet Crime Complaint Center (IC3): Recovery Scam Alerts", "url": "https://www.ic3.gov"},
                {"title": "Riot Games Support: Recovering Your Account", "url": "https://support.riotgames.com"}
            ],
            "related_slugs": ["how-to-secure-your-gaming-account", "what-to-do-after-a-gaming-scam", "social-engineering-in-online-games"]
        },
        {
            "slug": "gaming-currency-and-payment-safety",
            "title": "Gaming Currency and Payment Safety",
            "description": "Risks of third-party top-up sites, stolen credit card chargebacks, region-spoofing bans, and unauthorized microtransactions.",
            "category": "currency-and-payments",
            "category_title": "Currency & Payments",
            "lang": "en",
            "published_date": "2026-03-08",
            "last_reviewed": "2026-03-21",
            "reading_time": "7 min read",
            "warning_signs_count": 4,
            "warning_signs": [
                "Websites offering virtual currency at 70-80% discounts below official store prices.",
                "Sellers requesting your direct game login credentials to 'top-up via cheap regions'.",
                "Sellers delivering in-game gifts funded with stolen credit cards (leads to negative balance account bans).",
                "Requests to pay through irreversible methods like peer-to-peer crypto or prepaid gift cards."
            ],
            "prevention_steps": [
                "Purchase gaming currency exclusively through official in-game stores or authorized retail partners.",
                "Never share account credentials with third-party top-up vendors.",
                "Use virtual single-use cards or payment limits to prevent rogue subscriptions.",
                "Enable purchase authentication passwords in console/mobile storefronts to prevent accidental buys."
            ],
            "recovery_steps": [
                "If an unauthorized purchase was made, contact your card issuer to report potential card theft.",
                "If your account was banned due to a fraudulent gift chargeback, contact publisher support with your purchase history.",
                "Remove saved payment cards from accounts if you suspect credentials were compromised.",
                "Audit your payment statements monthly for recurring subscription charges."
            ],
            "official_sources": [
                {"title": "PlayStation Support: Payment and Store Safety", "url": "https://www.playstation.com/support"},
                {"title": "Xbox Support: Preventing Unauthorized Purchases", "url": "https://support.xbox.com"}
            ],
            "related_slugs": ["how-to-secure-your-gaming-account", "safe-trading-in-game-items", "what-to-do-after-a-gaming-scam"]
        },
        {
            "slug": "social-engineering-in-online-games",
            "title": "Social Engineering in Online Games",
            "description": "How manipulators build trust over weeks, exploit clan leadership hierarchies, and use emotional pressure to compromise accounts.",
            "category": "social-engineering",
            "category_title": "Social Engineering",
            "lang": "en",
            "published_date": "2026-03-10",
            "last_reviewed": "2026-03-22",
            "reading_time": "8 min read",
            "warning_signs_count": 5,
            "warning_signs": [
                "A friendly player suddenly asking to test your rare weapon or skin for 'just one competitive match'.",
                "Clan leaders demanding downloads of custom voice communication software or anti-cheat patches via direct files.",
                "Emotional guilt trips, urgent tournament emergencies, or threats of guild removal for hesitation.",
                "Requests to screen-share during login or password recovery processes.",
                "Casual probing questions regarding your childhood pets, mother's maiden name, or hometown."
            ],
            "prevention_steps": [
                "Never download executable files (.exe, .scr, .bat, .zip) sent via Discord or game chat.",
                "Treat security questions as secondary passwords: answer them with random, secure passphrases.",
                "Maintain a firm personal rule: never loan virtual items or account access to anyone, regardless of friendship duration.",
                "Verify tournament voice clients only from verified vendor domains (TeamSpeak, Discord, Mumble)."
            ],
            "recovery_steps": [
                "If you ran an untrusted executable, disconnect your computer from the internet and run a full malware scan.",
                "Check for infostealer infections using reputable antimalware solutions before logging into any accounts.",
                "Inform guild officers and common gaming friends so they are not targeted next.",
                "Block and report the manipulator across all shared platforms."
            ],
            "official_sources": [
                {"title": "NIST: Social Engineering Awareness Guidelines", "url": "https://csrc.nist.gov"},
                {"title": "SANS Security Awareness: Gaming Safety", "url": "https://www.sans.org"}
            ],
            "related_slugs": ["how-to-spot-gaming-phishing", "gaming-account-recovery-scams", "what-to-do-after-a-gaming-scam"]
        },
        {
            "slug": "what-to-do-after-a-gaming-scam",
            "title": "What to Do After a Gaming Scam",
            "description": "A calm, structured emergency response checklist for revoking sessions, gathering evidence, contacting support, and preventing secondary scams.",
            "category": "incident-response",
            "category_title": "Incident Response",
            "lang": "en",
            "published_date": "2026-03-12",
            "last_reviewed": "2026-03-24",
            "reading_time": "9 min read",
            "warning_signs_count": 4,
            "warning_signs": [
                "Secondary outreach from 'cyber recovery services' offering to hack back your items for a fee (almost always a second scam).",
                "Emails claiming you must pay an 'anti-fraud unfreeze fee' to unlock items.",
                "Blackmail threats claiming sensitive data will be released unless ransomed.",
                "Attempts to compromise your email account following an initial game account breach."
            ],
            "prevention_steps": [
                "Stay calm: panic leads to rushed decisions and secondary scams.",
                "Immediately secure your master email address first before attempting game account recovery.",
                "Revoke all active web API keys, OAuth authorizations, and device sessions.",
                "Document everything: capture unedited screenshots of chat logs, trade IDs, and transaction receipts."
            ],
            "recovery_steps": [
                "Step 1: Disconnect compromised devices from local network if malware is suspected.",
                "Step 2: Change email and gaming account passwords from an uncompromised device.",
                "Step 3: Open an official support ticket through the genuine publisher help portal.",
                "Step 4: Contact bank or card issuer if financial credentials were exposed.",
                "Step 5: Alert friends and community members to ignore messages from your handles."
            ],
            "official_sources": [
                {"title": "CISA: Identity Theft and Online Scam Response", "url": "https://www.cisa.gov"},
                {"title": "FTC: What to Do If You've Been Scammed", "url": "https://consumer.ftc.gov"}
            ],
            "related_slugs": ["how-to-secure-your-gaming-account", "gaming-account-recovery-scams", "safe-trading-in-game-items"]
        }
    ],
    "ru": [
        {
            "slug": "how-to-secure-your-gaming-account",
            "title": "Как защитить игровой аккаунт",
            "description": "Базовые и продвинутые методы защиты: приложения-аутентификаторы, надежные пароли и правильная настройка безопасности почты.",
            "category": "account-security",
            "category_title": "Безопасность аккаунта",
            "lang": "ru",
            "published_date": "2026-03-01",
            "last_reviewed": "2026-03-15",
            "reading_time": "6 мин чтения",
            "warning_signs_count": 4,
            "warning_signs": [
                "Неожиданные письма о сбросе пароля или входе с неизвестного устройства.",
                "Запросы кодов двухфакторной аутентификации, когда вы не пытаетесь войти.",
                "Внезапный разрыв игровой сессии с уведомлением 'аккаунт используется на другом устройстве'.",
                "Сообщения или заявки в друзья, отправленные от вашего имени без вашего ведома."
            ],
            "prevention_steps": [
                "Включите двухфакторную аутентификацию (2FA) через мобильное приложение-генератор кодов вместо SMS.",
                "Используйте уникальный сложный пароль, сохраненный в надежном менеджере паролей.",
                "Защитите привязанную электронную почту отдельным паролем и надежной 2FA.",
                "Сохраните резервные коды восстановления в защищенном офлайн-месте."
            ],
            "recovery_steps": [
                "Срочно завершите все активные сеансы через панель безопасности игрового сервиса.",
                "Смените пароль и отзовите все выданные API-ключи и OAuth-доступы.",
                "Обратитесь в официальную службу поддержки издателя исключительно через их верифицированный домен.",
                "Предупредите друзей и соклановцев не переходить по ссылкам от вашего имени."
            ],
            "official_sources": [
                {"title": "Рекомендации CISA по двухфакторной аутентификации", "url": "https://www.cisa.gov/mfa"},
                {"title": "Справка Steam: Рекомендации по безопасности аккаунта", "url": "https://help.steampowered.com"},
                {"title": "Epic Games: Защита вашей учетной записи", "url": "https://www.epicgames.com/help"}
            ],
            "related_slugs": ["how-to-spot-gaming-phishing", "gaming-account-recovery-scams", "what-to-do-after-a-gaming-scam"]
        },
        {
            "slug": "how-to-spot-gaming-phishing",
            "title": "Как распознать игровой фишинг",
            "description": "Разбор поддельных ссылок, фальшивых окон авторизации через Steam/Discord и фальшивых турнирных платформ.",
            "category": "phishing",
            "category_title": "Фишинг",
            "lang": "ru",
            "published_date": "2026-03-02",
            "last_reviewed": "2026-03-16",
            "reading_time": "7 мин чтения",
            "warning_signs_count": 5,
            "warning_signs": [
                "Ошибки в названии домена (например, stlearncommunity, epidgames) или подозрительные доменные зоны.",
                "Фейковое всплывающее окно авторизации, которое невозможно перетащить за пределы вкладки браузера (Browser-in-the-Browser).",
                "Искусственная срочность: требования подтвердить данные за 5 минут под угрозой вечной блокировки.",
                "Приглашения от малознакомых игроков проголосовать за турнирную команду на стороннем сайте."
            ],
            "prevention_steps": [
                "Сохраняйте официальные страницы авторизации в закладках и переходите только по ним.",
                "Проверяйте статус сессии: если вы уже авторизованы на платформе, подлинная кнопка входа через Steam/Discord не запросит логин и пароль повторно.",
                "Никогда не вводите пароли от игровых сервисов на сайтах для голосований и командных турниров.",
                "Внимательно проверяйте адресную строку и SSL-сертификат перед вводом данных."
            ],
            "recovery_steps": [
                "Если данные были введены на фишинговом ресурсе, немедленно смените пароль с безопасного устройства.",
                "Отзовите Steam Web API key и другие ключи разработчика, если злоумышленники успели их создать.",
                "Проверьте настройки Family Sharing и список привязанных устройств.",
                "Отправьте вредоносную ссылку в Google Safe Browsing для блокировки в браузерах."
            ],
            "official_sources": [
                {"title": "Федеральная торговая комиссия (FTC): Как распознать фишинг", "url": "https://consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams"},
                {"title": "Центр безопасности Discord: Защита от скама", "url": "https://discord.com/safety"}
            ],
            "related_slugs": ["how-to-secure-your-gaming-account", "safe-trading-in-game-items", "social-engineering-in-online-games"]
        },
        {
            "slug": "safe-trading-in-game-items",
            "title": "Безопасный обмен игровыми предметами",
            "description": "Защита от API-скама, подмены предметов в момент подтверждения, фальшивых гарантов и фиктивных трейд-офферов.",
            "category": "trading-and-items",
            "category_title": "Торговля и предметы",
            "lang": "ru",
            "published_date": "2026-03-04",
            "last_reviewed": "2026-03-18",
            "reading_time": "8 мин чтения",
            "warning_signs_count": 4,
            "warning_signs": [
                "Собеседник настойчиво предлагает продолжить диалог в Discord или стороннем мессенджере вместо игрового чата.",
                "Трейд внезапно отменяется и мгновенно пересоздается с тем же аватаром, но с подмененным или пустым обменом (API-скам).",
                "Предложение привлечь непроверенного 'гаранта' из группы в Discord или сообщества.",
                "Предложение цены, значительно превышающей рыночную стоимость предмета."
            ],
            "prevention_steps": [
                "Совершайте все обмены только через официальные внутриигровые интерфейсы с двухэтапным подтверждением.",
                "Тщательно сверяйте уровень профиля, дату создания и историю обменов партнера перед подтверждением.",
                "Внимательно проверяйте подтверждение на смартфоне: сверяйте состояние, паттерн и точное название скина.",
                "Не создавайте API-ключ в настройках разработчика, если вы не создаете собственное приложение."
            ],
            "recovery_steps": [
                "Немедленно аннулируйте ключ API на странице настроек разработчика платформы.",
                "Подайте жалобу на профиль мошенника через встроенный интерфейс отчетов платформы.",
                "Сохраните скриншоты переписки и историю торговли для обращения в поддержку.",
                "Не платите выкуп и не пытайтесь вступить в переговоры со скамером."
            ],
            "official_sources": [
                {"title": "Служба поддержки Steam: Вопросы и ответы о мошенничестве при обмене", "url": "https://help.steampowered.com/en/faqs/view/3B6E-B322-2400-8D24"},
                {"title": "Valve: Политика обмена предметами", "url": "https://store.steampowered.com"}
            ],
            "related_slugs": ["how-to-spot-gaming-phishing", "gaming-currency-and-payment-safety", "what-to-do-after-a-gaming-scam"]
        },
        {
            "slug": "fake-giveaways-and-free-rewards",
            "title": "Фейковые раздачи и бесплатные награды",
            "description": "Схемы с бесплатным Discord Nitro, фальшивыми промокодами на боевые пропуски, вредоносными ботами и скамом через QR-коды.",
            "category": "fake-giveaways",
            "category_title": "Фейковые раздачи",
            "lang": "ru",
            "published_date": "2026-03-05",
            "last_reviewed": "2026-03-19",
            "reading_time": "5 мин чтения",
            "warning_signs_count": 4,
            "warning_signs": [
                "Личные сообщения от ботов или взломанных друзей о победе в конкурсе, в котором вы не участвовали.",
                "Обещания '3 месяцев бесплатного Nitro' или виртуальной валюты за сканирование QR-кода приложением.",
                "Стримы с отключенным чатом, транслирующие старые записи блогеров с баннером QR-кода поверх экрана.",
                "Требование оплатить 'комиссию за активацию' или символическую плату за перевод приза."
            ],
            "prevention_steps": [
                "Никогда не сканируйте QR-коды для входа на непроверенных сайтах через мобильные приложения Discord или Steam.",
                "Отключите получение личных сообщений от участников незнакомых Discord-серверов в настройках приватности.",
                "Помните: официальные разработчики никогда не требуют денег для выдачи бесплатного приза.",
                "Проверяйте информацию о конкурсах на верифицированных страницах создателей контента."
            ],
            "recovery_steps": [
                "Если вы отсканировали вредоносный QR-код, немедленно завершите все сеансы в настройках учетной записи.",
                "Уведомите администраторов сообщества для блокировки скомпрометированного бота или аккаунта.",
                "Проверьте историю платежей на предмет несанкционированных подписок.",
                "Предупредите друзей в игровых чатах о случившемся."
            ],
            "official_sources": [
                {"title": "Центр помощи Discord: Безопасность входа по QR-коду", "url": "https://support.discord.com"},
                {"title": "FTC: Мошенничество с призами и розыгрышами", "url": "https://consumer.ftc.gov"}
            ],
            "related_slugs": ["how-to-spot-gaming-phishing", "social-engineering-in-online-games", "gaming-currency-and-payment-safety"]
        },
        {
            "slug": "gaming-account-recovery-scams",
            "title": "Мошенничество с восстановлением аккаунта",
            "description": "Как псевдо-хакеры и фальшивые агенты поддержки наживаются на игроках, потерявших доступ к своим учетным записям.",
            "category": "fake-support",
            "category_title": "Поддельная поддержка",
            "lang": "ru",
            "published_date": "2026-03-07",
            "last_reviewed": "2026-03-20",
            "reading_time": "6 мин чтения",
            "warning_signs_count": 4,
            "warning_signs": [
                "Комментарии в соцсетях с советами обратиться к конкретному 'специалисту по возврату' в Telegram или Instagram.",
                "Заверения о наличии 'личных контактов среди разработчиков Valve, Riot или Epic Games'.",
                "Требование предоплаты в криптовалюте, подарочных картах или через денежный перевод.",
                "Сообщения от игроков, утверждающих, что они 'случайно отправили репорт на ваш аккаунт' и вам нужно написать 'админу' в Discord."
            ],
            "prevention_steps": [
                "Подавайте запросы на восстановление только через официальные порталы техподдержки на подтвержденных сайтах.",
                "Помните, что реальные сотрудники платформ никогда не ведут диалог через личные аккаунты в Discord или Telegram.",
                "Никогда не отправляйте деньги или подарочные карты сторонним 'помощникам'.",
                "Не передавайте никому коды подтверждения, чеки первых покупок и личные данные."
            ],
            "recovery_steps": [
                "Немедленно прекратите общение с лже-специалистом.",
                "Создайте официальный тикет в службе поддержки на официальном сайте игры.",
                "Подготовьте подтверждения владения: доступ к исходной почте, номера ранних транзакций, фото физических ключей.",
                "Отправьте жалобу на профиль мошенника на площадке, где он с вами связался."
            ],
            "official_sources": [
                {"title": "Центр жалоб на интернет-преступления IC3: Предупреждения о Recovery Scams", "url": "https://www.ic3.gov"},
                {"title": "Поддержка Riot Games: Восстановление аккаунта", "url": "https://support.riotgames.com"}
            ],
            "related_slugs": ["how-to-secure-your-gaming-account", "what-to-do-after-a-gaming-scam", "social-engineering-in-online-games"]
        },
        {
            "slug": "gaming-currency-and-payment-safety",
            "title": "Безопасность внутриигровой валюты и платежей",
            "description": "Риски покупки доната на сторонних площадках, чарджбэки краденых карт, блокировки за смену региона и навязанные подписки.",
            "category": "currency-and-payments",
            "category_title": "Валюта и платежи",
            "lang": "ru",
            "published_date": "2026-03-08",
            "last_reviewed": "2026-03-21",
            "reading_time": "7 мин чтения",
            "warning_signs_count": 4,
            "warning_signs": [
                "Предложения покупки игровой валюты со скидками 70-80% от официального прайса.",
                "Продавцы, требующие логин и пароль от аккаунта для 'пополнения через дешевый регион'.",
                "Подарки внутри игры, купленные продавцом с украденных банковских карт (приводит к блокировке аккаунта за чарджбэк).",
                "Требование оплатить покупку невозвратными способами (прямой криптовалютный перевод, подарочные сертификаты)."
            ],
            "prevention_steps": [
                "Приобретайте валюту только во внутриигровом магазине или у официальных авторизованных дистрибьюторов.",
                "Никогда не передавайте пароли и коды доступа третьим лицам для пополнения баланса.",
                "Используйте виртуальные карты с лимитом расходов для онлайн-покупок.",
                "Установите запрос пароля перед совершением любой покупки на консолях и смартфонах."
            ],
            "recovery_steps": [
                "При обнаружении несанкционированного списания срочно обратитесь в банк для блокировки карты.",
                "Если аккаунт заблокирован из-за отзыва платежа за подарок, обратитесь в поддержку игры с подтверждением истории покупок.",
                "Удалите сохраненные банковские карты из профилей, если есть подозрение на компрометацию.",
                "Регулярно проверяйте выписки по банковским счетам на предмет скрытых подписок."
            ],
            "official_sources": [
                {"title": "Поддержка PlayStation: Безопасность платежей и магазина", "url": "https://www.playstation.com/support"},
                {"title": "Поддержка Xbox: Предотвращение несанкционированных покупок", "url": "https://support.xbox.com"}
            ],
            "related_slugs": ["how-to-secure-your-gaming-account", "safe-trading-in-game-items", "what-to-do-after-a-gaming-scam"]
        },
        {
            "slug": "social-engineering-in-online-games",
            "title": "Социальная инженерия в онлайн-играх",
            "description": "Манипуляции доверием, давление клановой субординации, фиктивные турнирные клиенты и психологические ловушки.",
            "category": "social-engineering",
            "category_title": "Социальная инженерия",
            "lang": "ru",
            "published_date": "2026-03-10",
            "last_reviewed": "2026-03-22",
            "reading_time": "8 мин чтения",
            "warning_signs_count": 5,
            "warning_signs": [
                "Игрок, с которым вы только начали общаться, просит одолжить ценный скин 'на одну катку'.",
                "Лидер клана или капитан команды требует скачать стороннюю программу связи или античит по прямой ссылке в файле.",
                "Давление на чувство вины, угрозы исключения из гильдии или призывы к срочности без времени на размышления.",
                "Просьбы включить демонстрацию экрана во время авторизации или восстановления пароля.",
                "Попытки ненавязчиво выведать девичью фамилию матери, имя первого питомца или город рождения."
            ],
            "prevention_steps": [
                "Никогда не запускайте исполняемые файлы (.exe, .scr, .bat, .zip), присланные в игровом чате или Discord.",
                "Отвечайте на секретные вопросы случайными сложными фразами, сохраняя их в менеджере паролей.",
                "Соблюдайте железное правило: никогда не передавайте виртуальные ценности и доступ к аккаунту в долг.",
                "Скачивайте программы голосовой связи только с проверенных официальных ресурсов разработчиков."
            ],
            "recovery_steps": [
                "Если вы запустили подозрительный файл, немедленно отключите ПК от интернета и выполните полное антивирусное сканирование.",
                "Проверьте систему на наличие программ-стилеров до ввода паролей на других ресурсах.",
                "Предупредите соклановцев и друзей об атаке, чтобы они не попались на ту же уловку.",
                "Заблокируйте манипулятора во всех совместных каналах связи."
            ],
            "official_sources": [
                {"title": "Руководство NIST по защите от социальной инженерии", "url": "https://csrc.nist.gov"},
                {"title": "Институт SANS: Безопасность в играх", "url": "https://www.sans.org"}
            ],
            "related_slugs": ["how-to-spot-gaming-phishing", "gaming-account-recovery-scams", "what-to-do-after-a-gaming-scam"]
        },
        {
            "slug": "what-to-do-after-a-gaming-scam",
            "title": "Что делать, если вы стали жертвой скама",
            "description": "Пошаговый план экстренных действий: отзыв сессий, сбор доказательств, обращение в поддержку и защита от вторичного мошенничества.",
            "category": "incident-response",
            "category_title": "Реагирование на инциденты",
            "lang": "ru",
            "published_date": "2026-03-12",
            "last_reviewed": "2026-03-24",
            "reading_time": "9 мин чтения",
            "warning_signs_count": 4,
            "warning_signs": [
                "Вторичные предложения от 'кибер-детективов' вернуть предметы за процент или плату (в 99% случаев это повторный обман).",
                "Письма с требованием заплатить 'комиссию за разморозку' возвращенных вещей.",
                "Шантаж и угрозы распространения личных переписок или данных.",
                "Попытки взлома основной электронной почты сразу после потери игрового профиля."
            ],
            "prevention_steps": [
                "Сохраняйте хладнокровие: паника подталкивает к необдуманным шагам и вторичным ловушкам.",
                "В первую очередь защитите основной почтовый ящик, к которому привязаны игровые сервисы.",
                "Отозовите все API-ключи, активные браузерные сеансы и разрешения сторонних приложений.",
                "Зафиксируйте улики: сделайте четкие скриншоты чатов, истории обменов и квитанций об оплате."
            ],
            "recovery_steps": [
                "Шаг 1: Изолируйте устройство от локальной сети при малейшем подозрении на вирусное заражение.",
                "Шаг 2: Смените пароли от почты и игровых платформ с чистого безопасного устройства.",
                "Шаг 3: Откройте официальное обращение в службу поддержки через верифицированный портал.",
                "Шаг 4: Свяжитесь с банком при риске утечки платежных данных.",
                "Шаг 5: Оповестите друзей и подписчиков, чтобы злоумышленники не писали им от вашего имени."
            ],
            "official_sources": [
                {"title": "CISA: Защита от кражи личных данных и онлайн-скама", "url": "https://www.cisa.gov"},
                {"title": "FTC: Действия при столкновении с мошенниками", "url": "https://consumer.ftc.gov"}
            ],
            "related_slugs": ["how-to-secure-your-gaming-account", "gaming-account-recovery-scams", "safe-trading-in-game-items"]
        }
    ]
}


class ArticleService:
    @staticmethod
    def list_articles(
        lang: str = "en",
        category: Optional[str] = None,
        query: Optional[str] = None,
        page: int = 1,
        page_size: int = 10,
    ) -> Tuple[List[ArticleSummary], int]:
        lang_key = "ru" if lang == "ru" else "en"
        articles = ARTICLES_DATA.get(lang_key, ARTICLES_DATA["en"])

        filtered = []
        q_lower = query.lower().strip() if query else None

        for item in articles:
            # Category filter
            if category and item["category"] != category:
                continue

            # Full text search filter
            if q_lower:
                match = (
                    q_lower in item["title"].lower()
                    or q_lower in item["description"].lower()
                    or any(q_lower in ws.lower() for ws in item.get("warning_signs", []))
                    or any(q_lower in ps.lower() for ps in item.get("prevention_steps", []))
                )
                if not match:
                    continue

            filtered.append(
                ArticleSummary(
                    slug=item["slug"],
                    title=item["title"],
                    description=item["description"],
                    category=item["category"],
                    category_title=item.get("category_title"),
                    lang=item["lang"],
                    published_date=item["published_date"],
                    last_reviewed=item.get("last_reviewed"),
                    reading_time=item["reading_time"],
                    warning_signs_count=item.get("warning_signs_count", 0),
                )
            )

        total = len(filtered)
        # Apply pagination
        start = (page - 1) * page_size
        end = start + page_size
        paginated = filtered[start:end]

        return paginated, total

    @staticmethod
    def get_article(slug: str, lang: str = "en") -> Optional[ArticleDetail]:
        lang_key = "ru" if lang == "ru" else "en"
        articles = ARTICLES_DATA.get(lang_key, ARTICLES_DATA["en"])

        for item in articles:
            if item["slug"] == slug:
                # Synthesize content markdown
                warning_md = "\n".join([f"- {w}" for w in item["warning_signs"]])
                prevention_md = "\n".join([f"1. {p}" for p in item["prevention_steps"]])
                recovery_md = "\n".join([f"- {r}" for r in item["recovery_steps"]])
                sources_md = "\n".join([f"- [{s['title']}]({s['url']})" for s in item["official_sources"]])

                markdown = f"""# {item['title']}

{item['description']}

## Key Warning Signs
{warning_md}

## How to Protect Yourself
{prevention_md}

## Action & Recovery Steps
{recovery_md}

## Official Sources & Documentation
{sources_md}
"""
                return ArticleDetail(
                    slug=item["slug"],
                    title=item["title"],
                    description=item["description"],
                    category=item["category"],
                    category_title=item.get("category_title"),
                    lang=item["lang"],
                    published_date=item["published_date"],
                    last_reviewed=item.get("last_reviewed"),
                    reading_time=item["reading_time"],
                    warning_signs_count=item.get("warning_signs_count", 0),
                    content_markdown=markdown,
                    warning_signs=item["warning_signs"],
                    prevention_steps=item["prevention_steps"],
                    recovery_steps=item["recovery_steps"],
                    official_sources=item["official_sources"],
                    related_slugs=item["related_slugs"],
                )
        return None
