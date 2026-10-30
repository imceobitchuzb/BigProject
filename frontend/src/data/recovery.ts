export interface CompromiseType {
  id: string;
  label: string;
  icon: string;
  severity: 'critical' | 'high' | 'medium';
  description: string;
}

export interface DirectClickStep {
  stepNumber: number;
  title: string;
  instruction: string;
  targetButtonOrLink: string;
}

export interface PlatformRecoveryData {
  id: string;
  name: string;
  publisher: string;
  genre: string;
  badge: string;
  badgeColor: 'orange' | 'cyan' | 'violet' | 'lime' | 'red';
  icon: string;
  iconImage: string;
  officialSupportUrl: string;
  officialSupportLabel: string;
  emergencyFirstAction: string;
  whereToClickSteps: DirectClickStep[];
  ownershipProofs: {
    id: string;
    label: string;
    description: string;
    required: boolean;
  }[];
  mitigationsByCompromise: Record<string, string>;
  ticketTemplate: {
    subject: string;
    body: string;
  };
  englishTicketTemplate: {
    subject: string;
    body: string;
  };
}

export const COMPROMISE_TYPES: Record<'en' | 'ru', CompromiseType[]> = {
  en: [
    {
      id: 'password_credentials',
      label: 'Entered Login & Password on Fake Site',
      icon: '🔑',
      severity: 'critical',
      description: 'You entered your account credentials on a phishing site, fake tournament, or counterfeit login modal.',
    },
    {
      id: 'two_factor_code',
      label: 'Shared 2FA / SMS / Guard / Supercell Code',
      icon: '📲',
      severity: 'critical',
      description: 'You shared a one-time 6-digit verification code sent to your email, phone, or authenticator app.',
    },
    {
      id: 'api_key',
      label: 'Created or Shared Steam Web API Key',
      icon: '⚙️',
      severity: 'high',
      description: 'You authorized a third-party domain or generated an API key, allowing bots to monitor and intercept your trade offers.',
    },
    {
      id: 'malware_rat',
      label: 'Downloaded & Ran Suspicious File (.exe / .jar / .bat)',
      icon: '☣️',
      severity: 'critical',
      description: 'You ran an unverified cheat, infected tournament client, mod pack, or voice tool containing an infostealer.',
    },
    {
      id: 'session_cookie',
      label: 'Copied Session Cookie / Executed JS Code',
      icon: '🍪',
      severity: 'critical',
      description: 'You gave away your .ROBLOSECURITY cookie, Discord token, or ran malicious JavaScript inside your browser console (F12).',
    },
    {
      id: 'discord_qr',
      label: 'Scanned QR Code via Discord Mobile App',
      icon: '📷',
      severity: 'high',
      description: 'You scanned a verification or "Free Nitro" QR code in Discord, instantly transferring your account session to the attacker.',
    },
    {
      id: 'trade_intercept',
      label: 'Items Sent to Fake Middleman / Clone Bot',
      icon: '🔄',
      severity: 'high',
      description: 'A trade was canceled and re-sent to an imposter profile disguised as your friend or a trusted trading bot.',
    },
    {
      id: 'email_hijack',
      label: 'Attacker Changed Master Email / Access Lost',
      icon: '✉️',
      severity: 'critical',
      description: 'The scammer gained access to your registered email account, changed the recovery address, or locked you out completely.',
    },
  ],
  ru: [
    {
      id: 'password_credentials',
      label: 'Ввёл логин и пароль на поддельном сайте',
      icon: '🔑',
      severity: 'critical',
      description: 'Вы ввели данные учетной записи на фишинговом сайте, в фальшивом турнире или в поддельном окне авторизации.',
    },
    {
      id: 'two_factor_code',
      label: 'Передал код 2FA / СМС / Supercell / Steam Guard',
      icon: '📲',
      severity: 'critical',
      description: 'Вы продиктовали или отправили одноразовый 6-значный код подтверждения из почты, СМС или приложения-аутентификатора.',
    },
    {
      id: 'api_key',
      label: 'Создал или передал Steam Web API Key',
      icon: '⚙️',
      severity: 'high',
      description: 'Вы привязали аккаунт на стороннем сайте или создали ключ API, позволяющий ботам скрытно подменять ваши трейды.',
    },
    {
      id: 'malware_rat',
      label: 'Скачал и запустил подозрительный файл (.exe / .jar / .bat)',
      icon: '☣️',
      severity: 'critical',
      description: 'Вы открыли сомнительный чит, инфицированный турнирный клиент, сборку модов или архив, содержащий троян/инфостиллер.',
    },
    {
      id: 'session_cookie',
      label: 'Скопировал сессионный cookie / вставил JS в консоль',
      icon: '🍪',
      severity: 'critical',
      description: 'Вы передали cookie .ROBLOSECURITY, токен Discord или выполнили чужой скрипт в панели разработчика (F12).',
    },
    {
      id: 'discord_qr',
      label: 'Отсканировал QR-код в мобильном Discord',
      icon: '📷',
      severity: 'high',
      description: 'Вы отсканировали QR-код под предлогом "верификации на сервере" или "бесплатного Nitro", мгновенно передав сессию мошеннику.',
    },
    {
      id: 'trade_intercept',
      label: 'Предметы ушли фейковому боту / гаранту',
      icon: '🔄',
      severity: 'high',
      description: 'Оригинальный обмен был скрытно отменен, а вещи отправлены боту-клону с идентичной аватаркой и никнеймом.',
    },
    {
      id: 'email_hijack',
      label: 'Злоумышленник сменил привязанную почту',
      icon: '✉️',
      severity: 'critical',
      description: 'Мошенник получил доступ к вашей почте, сменил контактный email в игре или настроил скрытые фильтры пересылки.',
    },
  ],
};

export const RECOVERY_PLATFORMS: Record<'en' | 'ru', PlatformRecoveryData[]> = {
  ru: [
    {
      id: 'steam',
      name: 'Counter-Strike 2 & Steam',
      publisher: 'Valve Corporation',
      genre: 'PC Gaming & Инвентарь',
      badge: 'Высокая ценность предметов',
      badgeColor: 'orange',
      icon: '🎮',
      iconImage: '/images/games/cs2-steam.svg',
      officialSupportUrl: 'https://help.steampowered.com/ru/wizard/HelpWithLoginInfo',
      officialSupportLabel: 'Официальный мастер восстановления Steam Help',
      emergencyFirstAction: 'Смените пароль на привязанной почте, завершите все активные сессии в Steam Guard и немедленно проверьте раздел Steam API Key (https://steamcommunity.com/dev/apikey) — если там создан чужой домен, нажмите «Отозвать ключ».',
      whereToClickSteps: [
        {
          stepNumber: 1,
          title: 'Переход в официальный мастер Valve',
          instruction: 'Откройте официальный портал поддержки Steam по прямой ссылке выше. Никогда не ищите ссылку в поиске Google (там могут быть рекламные фишинг-сайты).',
          targetButtonOrLink: 'help.steampowered.com/ru/wizard/HelpWithLoginInfo',
        },
        {
          stepNumber: 2,
          title: 'Выбор типа проблемы со входом',
          instruction: 'В списке выберите пункт «Мой аккаунт Steam был украден или взломан, и мне нужна помощь в его восстановлении».',
          targetButtonOrLink: 'Пункт «Мой аккаунт украден или взломан»',
        },
        {
          stepNumber: 3,
          title: 'Поиск вашей учетной записи',
          instruction: 'Введите ваш логин аккаунта Steam (Account Name) или первоначальный email. Не вводите отображаемый никнейм — нужен именно системный логин.',
          targetButtonOrLink: 'Поле ввода «Имя аккаунта или адрес эл. почты»',
        },
        {
          stepNumber: 4,
          title: 'Обход измененных данных мошенником',
          instruction: 'Когда Steam покажет замаскированную чужую почту или номер мошенника, нажмите внизу кнопку: «У меня больше нет доступа к этому номеру телефона» и затем «У меня больше нет доступа к этой эл. почте».',
          targetButtonOrLink: 'Кнопка «У меня больше нет доступа к этим данным»',
        },
        {
          stepNumber: 5,
          title: 'Заполнение официальной формы подтверждения владения',
          instruction: 'Откроется закрытая форма обращения. Укажите новый безопасный email, первый зарегистрированный email, первые и последние 4 цифры карты и прикрепите чеки покупок.',
          targetButtonOrLink: 'Форма «Свяжитесь со службой поддержки Steam»',
        },
      ],
      ownershipProofs: [
        {
          id: 'card_receipt',
          label: 'Банковская карта первой покупки',
          description: 'Имя владельца, первые 4 и последние 4 цифры номера карты, тип карты (Visa/Mastercard/МИР). Полный номер карты передавать НЕЛЬЗЯ.',
          required: true,
        },
        {
          id: 'initial_email',
          label: 'Самый первый адрес электронной почты',
          description: 'Точный email, на который изначально регистрировался аккаунт Steam много лет назад.',
          required: true,
        },
        {
          id: 'cd_key',
          label: 'Цифровой или коробочный ключ активации (CD-Key)',
          description: 'Ключ от любой игры, активированной на аккаунте (фото наклейки на диске с написанным от руки номером тикета ускоряет возврат в 2 раза).',
          required: false,
        },
        {
          id: 'wallet_code',
          label: 'Код пополнения кошелька Steam Wallet',
          description: 'Чек или квитанция подарочной карты/чека терминала оплаты.',
          required: false,
        },
        {
          id: 'paypal_invoice',
          label: 'Номер счета PayPal / Инвойс магазина',
          description: '16-18 значный идентификатор транзакции (Invoice ID / Transaction ID) из выписки.',
          required: false,
        },
      ],
      mitigationsByCompromise: {
        password_credentials: 'Срочно перейдите в Steam Client -> Настройки -> Безопасность -> «Управление Steam Guard» -> Нажмите «Выйти со всех устройств». Это заставит злоумышленника потерять активную сессию.',
        two_factor_code: 'Если мошенник успел перепривязать мобильный аутентификатор, немедленно используйте код экстренного восстановления R-Code (R#####), выданный вам при первоначальной активации Steam Guard.',
        api_key: 'КРИТИЧНО: Перейдите на https://steamcommunity.com/dev/apikey. Если в поле "Имя домена" указан сайт, немедленно нажмите кнопку "Отозвать мой ключ Steam Web API". Затем смените пароль и Trade URL в инвентаре.',
        malware_rat: 'Отключите компьютер от интернета (выдерните Ethernet-кабель или выключите Wi-Fi). НЕ вводите пароли на этом ПК. Запустите полную проверку антивирусом с автономного носителя (Windows Defender Offline / Malwarebytes).',
        trade_intercept: 'Вещи, ушедшие через подмену трейда, Valve не восстанавливает из-за политики защиты экономики, но блокировка API-ключа и сброс сессий защитит оставшиеся скины в инвентаре.',
        email_hijack: 'Зайдите в настройки почты через телефон (с мобильного интернета), проверьте раздел «Фильтры и пересылка» — удалите правила пересылки писем на чужие ящики и включите 2-этапную аутентификацию.',
      },
      ticketTemplate: {
        subject: 'Взлом учетной записи Steam и несанкционированная смена данных: [ВАШ_ЛОГИН]',
        body: `Здравствуйте, служба поддержки Steam!

Моя учетная запись Steam была скомпрометирована в результате фишинговой атаки [ДАТА_ИНЦИДЕНТА]. Злоумышленник изменил привязанный адрес электронной почты и номер телефона.

Данные для подтверждения права собственности:
1. Системное имя аккаунта (Account Login Name): [ВАШ_ЛОГИН]
2. Исходный адрес электронной почты при регистрации: [ПЕРВАЯ_ПОЧТА]
3. Новый безопасный контактный email: [НОВАЯ_БЕЗОПАСНАЯ_ПОЧТА]
4. Платежные данные первой покупки:
   - Тип карты: [VISA/MASTERCARD/МИР]
   - Имя держателя: [ИМЯ НА КАРТЕ]
   - Первые 4 и последние 4 цифры карты: [1234] **** [5678]
5. Номера транзакций / Активированные CD-ключи:
   - [ПРИМЕР: Ключ игры / Номер чека из квитанции]

Скриншоты оригинальных чеков о покупке из банковской выписки и подтверждения покупок из истории почты прикреплены к данному обращению.

Прошу аннулировать несанкционированные изменения, вернуть аккаунт на указанный новый контактный email и деавторизовать все сторонние сессии.

С уважением,
[ВАШЕ_ИМЯ]`,
      },
      englishTicketTemplate: {
        subject: 'Hijacked Steam Account Ownership Verification: [YOUR_LOGIN]',
        body: `Hello Steam Support Team,

My Steam account was compromised following a phishing incident on [INCIDENT_DATE]. The unauthorized party has changed my associated contact email and mobile authenticator.

I am providing the following proof of original ownership:
1. Account Login Name: [YOUR_LOGIN]
2. Original registration email address: [FIRST_EMAIL]
3. Safe contact email address for recovery: [NEW_SAFE_EMAIL]
4. Payment information for initial purchases:
   - Card Type: [VISA / MasterCard]
   - Cardholder Name: [NAME ON CARD]
   - First 4 and Last 4 digits: [1234] **** [5678]
   - Billing Address: [CITY, COUNTRY]
5. Game CD-Keys / Steam Wallet codes activated on the account:
   - [INSERT CD-KEY OR TRANSACTION ID HERE]

I have attached authentic purchase invoices and bank statement records confirming my ownership. Please deauthorize all active unauthorized sessions and restore my account to the provided safe email.

Thank you for your assistance,
[YOUR_NAME]`,
      },
    },
    {
      id: 'brawl-stars',
      name: 'Brawl Stars & Supercell ID',
      publisher: 'Supercell Oy',
      genre: 'Mobile MOBA & Battle Royale',
      badge: 'Высокий риск фишинга 6-значных кодов',
      badgeColor: 'violet',
      icon: '⭐',
      iconImage: '/images/games/brawl-stars.svg',
      officialSupportUrl: 'https://support.supercell.com/brawl-stars/ru/articles/contact-form.html',
      officialSupportLabel: 'Официальный центр поддержки Supercell Support',
      emergencyFirstAction: 'Ни в коем случае не передавайте никому 6-значный код Supercell ID. Откройте игру, зайдите в Настройки -> Supercell ID -> шестеренка -> нажмите «Выйти на всех устройствах».',
      whereToClickSteps: [
        {
          stepNumber: 1,
          title: 'Вход в поддержку прямо внутри игры',
          instruction: 'Если у вас есть доступ к игре на телефоне (даже с нового аккаунта), откройте Brawl Stars -> Нажмите значок шестеренки (Настройки) в правом верхнем углу.',
          targetButtonOrLink: 'Кнопка «Настройки» в меню Brawl Stars',
        },
        {
          stepNumber: 2,
          title: 'Переход в раздел помощи',
          instruction: 'В левом нижнем углу окна настроек нажмите синюю кнопку «Помощь и поддержка» (Help and Support).',
          targetButtonOrLink: 'Кнопка «Помощь и поддержка»',
        },
        {
          stepNumber: 3,
          title: 'Вызов автоматизированного чата',
          instruction: 'В правом верхнем углу экрана поддержки нажмите на иконку синего диалогового облака (Чат с поддержкой).',
          targetButtonOrLink: 'Синяя иконка диалога (Чат с Otto)',
        },
        {
          stepNumber: 4,
          title: 'Выбор ветки восстановления профиля',
          instruction: 'В меню диалога выберите пункт «Учетная запись» (Account) -> затем «Потеря учетной записи» (Lost Account) -> «Восстановить учетную запись».',
          targetButtonOrLink: 'Пункты «Учетная запись» -> «Потерян доступ»',
        },
        {
          stepNumber: 5,
          title: 'Предоставление игровых метрик боту Otto',
          instruction: 'Бот запросит ваш точный игровой тег игрока (#XXXXXXX), точное имя бойца, уровень трофеев и название клана (клуба), в котором вы состояли.',
          targetButtonOrLink: 'Поля ответов на вопросы бота Otto',
        },
      ],
      ownershipProofs: [
        {
          id: 'player_tag',
          label: 'Точный тег игрока (#PlayerTag)',
          description: 'Уникальный идентификатор профиля, начинающийся с решетки (например, #2PPGY8R9). Можно узнать у друзей по клубу.',
          required: true,
        },
        {
          id: 'first_receipt',
          label: 'Первая квитанция Google Play или Apple App Store',
          description: 'Номер заказа GPA.XXXX-XXXX-XXXX-XXXXX для Android или квитанция Apple с номером заказа Document No.',
          required: true,
        },
        {
          id: 'devices_list',
          label: 'Точные модели устройств, с которых играли',
          description: 'Модели телефонов и планшетов (например: iPhone 13, Xiaomi Redmi Note 11), на которых запускалась игра.',
          required: true,
        },
        {
          id: 'past_names',
          label: 'История смены никнеймов',
          description: 'Предыдущие имена вашего персонажа, если вы меняли их за кристаллы.',
          required: false,
        },
        {
          id: 'club_name',
          label: 'Название и статус в последнем клубе',
          description: 'Название клуба, в котором состоял аккаунт на момент кражи, и ваше звание (Участник, Ветеран, Вице-президент).',
          required: false,
        },
      ],
      mitigationsByCompromise: {
        password_credentials: 'Если мошенники получили пароль от почты, к которой привязан Supercell ID, немедленно смените пароль от почты и активируйте опцию «Защита учетной записи Supercell ID» (SMS-коды восстановления).',
        two_factor_code: 'Код Supercell ID действует только 15 минут. Если мошенник вошел в ваш профиль, немедленно пишите в поддержку через встроенный чат в игре — аккаунт будет временно заблокирован для безопасности.',
        session_cookie: 'Нажмите в настройках Supercell ID шестеренку и выберите «Выйти из Supercell ID на всех устройствах».',
        email_hijack: 'Подготовьте квитанцию первого доната (GPA-номер). Без чека первого платежа Supercell не меняет почту на украденных аккаунтах.',
      },
      ticketTemplate: {
        subject: 'Восстановление взломанного профиля Supercell ID / Brawl Stars: [ВАШ_ТЕГ]',
        body: `Здравствуйте, служба поддержки Supercell!

Мой игровой профиль в Brawl Stars был украден злоумышленниками [ДАТА_ИНЦИДЕНТА]. Мошенники получили несанкционированный доступ к коду подтверждения Supercell ID.

Подтверждающие данные учетной записи:
1. Тег игрока (Player Tag): #[ВАШ_ТЕГ]
2. Имя профиля в игре: [НИКНЕЙМ]
3. Количество трофеев (примерно): [КОЛИЧЕСТВО]
4. Название клуба: [НАЗВАНИЕ_КЛУБА]
5. Модели устройств, с которых я играл: [МОДЕЛИ ТЕЛЕФОНОВ]
6. Номер квитанции первой покупки:
   - Google Play GPA: [GPA.XXXX-XXXX-XXXX-XXXXX] / Apple Invoice: [НОМЕР]
7. Новый безопасный email для привязки Supercell ID: [НОВЫЙ_EMAIL]

Квитанция из магазина приложений с датой и суммой прикреплена к данному обращению. Прошу заблокировать сессии мошенника и перепривязать профиль на мой новый безопасный адрес.

Спасибо!`,
      },
      englishTicketTemplate: {
        subject: 'Compromised Supercell ID Recovery Request: #[YOUR_TAG]',
        body: `Dear Supercell Support Team,

My Brawl Stars account associated with Supercell ID was compromised on [INCIDENT_DATE] due to an unauthorized verification code interception.

Here are my account verification details:
1. Player Tag: #[YOUR_TAG]
2. In-Game Name: [IN_GAME_NAME]
3. Approximate Trophy Count: [TROPHIES]
4. Club Name: [CLUB_NAME]
5. Devices used to access the account: [DEVICE_MODELS, e.g. iPhone 13, Samsung Galaxy S22]
6. First purchase transaction receipt:
   - Order Number: [GPA.XXXX-XXXX-XXXX-XXXXX / Apple Order ID]
7. Safe new email address for Supercell ID re-binding: [NEW_EMAIL]

I have attached the original digital purchase receipt from Google Play / Apple App Store. Please revoke unauthorized access and help me transfer the account to my secure email.

Best regards,
[YOUR_NAME]`,
      },
    },
    {
      id: 'roblox',
      name: 'Roblox',
      publisher: 'Roblox Corporation',
      genre: 'Платформа и песочница',
      badge: 'Кража куки .ROBLOSECURITY',
      badgeColor: 'red',
      icon: '🟥',
      iconImage: '/images/games/roblox.svg',
      officialSupportUrl: 'https://www.roblox.com/support',
      officialSupportLabel: 'Официальная форма Roblox Support',
      emergencyFirstAction: 'Смените пароль в учетной записи Roblox прямо сейчас. Смена пароля автоматически ИНВАЛИДИРУЕТ (делает бесполезным) украденный файл cookie .ROBLOSECURITY и отключает все чужие сессии!',
      whereToClickSteps: [
        {
          stepNumber: 1,
          title: 'Открытие страницы официальной поддержки',
          instruction: 'Перейдите по официальной прямой ссылке roblox.com/support в защищенном окне браузера.',
          targetButtonOrLink: 'roblox.com/support',
        },
        {
          stepNumber: 2,
          title: 'Указание контактных данных',
          instruction: 'В блоке «Контактная информация» введите адрес электронной почты, который был привязан к вашему аккаунту Roblox ПЕРВОНАЧАЛЬНО (до взлома).',
          targetButtonOrLink: 'Поля «Имя пользователя» и «Адрес эл. почты»',
        },
        {
          stepNumber: 3,
          title: 'Выбор устройства и категории проблемы',
          instruction: 'В выпадающем списке «Устройство» выберите ваш ПК или телефон. В поле «Тип справочной категории» выберите «Account Hacked or Can\'t Log in» (Аккаунт взломан или не удается войти).',
          targetButtonOrLink: 'Категория: «Account Hacked or Can\'t Log in»',
        },
        {
          stepNumber: 4,
          title: 'Указание подкатегории',
          instruction: 'В появившейся второй строке подкатегории выберите пункт «Account Hacked» (Аккаунт взломан).',
          targetButtonOrLink: 'Подкатегория: «Account Hacked»',
        },
        {
          stepNumber: 5,
          title: 'Вставка подробного описания инцидента',
          instruction: 'Вставьте сгенерированный текст обращения ниже. Обязательно укажите, что пароль или почта были изменены без вашего согласия, и прикрепите чеки покупки Robux.',
          targetButtonOrLink: 'Поле ввода «Описание проблемы» -> Кнопка «Отправить»',
        },
      ],
      ownershipProofs: [
        {
          id: 'initial_roblox_email',
          label: 'Оригинальный адрес электронной почты',
          description: 'Адрес, с которого производилась первичная верификация учетной записи (с пометкой Verified Email).',
          required: true,
        },
        {
          id: 'robux_receipt',
          label: 'Квитанция покупки Robux или Premium',
          description: 'Электронный чек от Roblox, Google Play, Apple или PayPal с номером транзакции.',
          required: true,
        },
        {
          id: 'gift_card_pin',
          label: 'PIN-код использованной карты Roblox Gift Card',
          description: 'Код активации подарочной карты, если вы пополняли счет карточкой.',
          required: false,
        },
        {
          id: 'creation_date',
          label: 'Примерная дата создания учетной записи',
          description: 'Месяц и год регистрации персонажа.',
          required: false,
        },
      ],
      mitigationsByCompromise: {
        password_credentials: 'Срочно включите аппаратную 2-шаговую аутентификацию (Authenticator App) в Settings -> Security.',
        session_cookie: 'ГЛАВНОЕ ПРАВИЛО ROBLOX: При смене пароля в настройках Roblox моментально сбрасывается ключ безопасности .ROBLOSECURITY. Хакер теряет доступ через 1 секунду.',
        malware_rat: 'Удалите все подозрительные расширения из Google Chrome / Edge (chrome://extensions). 90% краж в Roblox происходят через вредоносные расширения для "трейдинга" или "улучшения скинов"!',
        trade_intercept: 'Если у вас украли Limited-предметы, сообщите об этом в службу поддержки в течение 30 дней. У Roblox действует политика "One-time item recovery" (разовое восстановление утраченных предметов).',
      },
      ticketTemplate: {
        subject: 'Взлом учетной записи Roblox и кража предметов: [ВАШ_ЮЗЕРНЕЙМ]',
        body: `Здравствуйте, служба поддержки Roblox!

Моя учетная запись [ВАШ_ЮЗЕРНЕЙМ] была взломана [ДАТА_ИНЦИДЕНТА] через компрометацию данных авторизации. Злоумышленник изменил привязанный email и настройки безопасности.

Данные владельца аккаунта:
1. Имя пользователя: [ВАШ_ЮЗЕРНЕЙМ]
2. Исходный подтвержденный email адрес: [ОРИГИНАЛЬНАЯ_ПОЧТА]
3. Новый защищенный контактный email: [НОВЫЙ_EMAIL]
4. Номер квитанции покупки Robux / Премиума: [НОМЕР ТРАНЗАКЦИИ / ORDER ID]
5. Использованный метод оплаты: [PAYPAL / GOOGLE / КАРТА]

Прошу восстановить доступ к учетной записи, вернуть привязку к исходному адресу электронной почты и проверить возможность отката мошеннических передач инвентаря.

Спасибо за помощь!`,
      },
      englishTicketTemplate: {
        subject: 'Compromised Roblox Account Recovery Request: [YOUR_USERNAME]',
        body: `Hello Roblox Customer Support,

My Roblox account [YOUR_USERNAME] was compromised on [INCIDENT_DATE] due to an unauthorized session hijack. The unauthorized user has changed the contact email and credentials.

Here is my verification of ownership:
1. Roblox Username: [YOUR_USERNAME]
2. Original verified billing/contact email: [ORIGINAL_EMAIL]
3. Safe email for account restoration: [NEW_SAFE_EMAIL]
4. Order ID / Transaction Number for Robux or Premium purchase: [ORDER_ID]
5. Payment method used: [PayPal / Credit Card / Apple]

I have attached proof of purchase invoices confirming that I am the genuine creator of this account. Please revert unauthorized changes, revoke all active sessions, and assist with account recovery.

Thank you,
[YOUR_NAME]`,
      },
    },
    {
      id: 'minecraft',
      name: 'Minecraft & Microsoft Account',
      publisher: 'Mojang Studios / Microsoft',
      genre: 'Sandbox & Survival',
      badge: 'Атаки через OAuth и .JAR моды',
      badgeColor: 'lime',
      icon: '⛏️',
      iconImage: '/images/games/minecraft.svg',
      officialSupportUrl: 'https://account.live.com/acsr',
      officialSupportLabel: 'Официальная форма восстановления Microsoft ACSR',
      emergencyFirstAction: 'Проверьте выданные разрешения OAuth на странице https://account.live.com/consent/Manage — если вы подтверждали сторонний бот в Discord под видом «верификации», немедленно нажмите «Отозвать разрешения».',
      whereToClickSteps: [
        {
          stepNumber: 1,
          title: 'Вход в автоматизированную форму Microsoft ACSR',
          instruction: 'Перейдите на страницу account.live.com/acsr (Automated Customer Service Recovery). Это официальная система восстановления Microsoft при утрате пароля и 2FA.',
          targetButtonOrLink: 'account.live.com/acsr',
        },
        {
          stepNumber: 2,
          title: 'Ввод скомпрометированного аккаунта и нового email',
          instruction: 'В первой строке укажите email учетной записи Microsoft (к которой привязан Minecraft). Во второй строке укажите безопасный резервный email, к которому у вас есть доступ прямо сейчас.',
          targetButtonOrLink: 'Поля «Учетная запись» и «Контактный адрес»',
        },
        {
          stepNumber: 3,
          title: 'Указание персональных данных профиля',
          instruction: 'Введите ваше имя, фамилию, дату рождения и страну, которые вы указывали при регистрации учетной записи Microsoft.',
          targetButtonOrLink: 'Форма личных данных',
        },
        {
          stepNumber: 4,
          title: 'Указание старых паролей',
          instruction: 'Введите предыдущие пароли, которые вы помните. Чем больше реальных старых паролей указано, тем выше автоматический балл доверия алгоритма.',
          targetButtonOrLink: 'Поле «Другие пароли, которые вы использовали»',
        },
        {
          stepNumber: 5,
          title: 'Указание данных Minecraft / Xbox',
          instruction: 'В блоке сервисов выберите Xbox / Minecraft, укажите ваш Gamertag и прикрепите номер транзакции покупки лицензии Minecraft (TransID из чека Mojang/Microsoft).',
          targetButtonOrLink: 'Раздел «Сведения об Xbox и покупках»',
        },
      ],
      ownershipProofs: [
        {
          id: 'mojang_trans_id',
          label: 'Transaction ID покупки Minecraft',
          description: 'Квитанция покупки от Mojang или Microsoft Store с номером транзакции.',
          required: true,
        },
        {
          id: 'old_passwords',
          label: 'Предыдущие пароли от учетной записи Microsoft',
          description: 'Пароли, действовавшие на учетной записи до момента смены мошенником.',
          required: true,
        },
        {
          id: 'xbox_gamertag',
          label: 'Xbox Gamertag и никнейм Minecraft',
          description: 'Точный отображаемый никнейм в игре и тег учетной записи Xbox.',
          required: true,
        },
        {
          id: 'billing_card',
          label: 'Последние 4 цифры карты оплаты в Microsoft Store',
          description: 'Данные карты, с которой приобретался Game Pass или лицензия.',
          required: false,
        },
      ],
      mitigationsByCompromise: {
        password_credentials: 'Если мошенники получили пароль, но 2FA остался у вас — немедленно перейдите на account.microsoft.com/security и нажмите «Выйти из системы везде».',
        malware_rat: 'Если вы скачали подозрительный мод .JAR для Hypixel / Fabric / Forge: мошенники скопировали ваш session token. Завершите процесс Java, смените пароль учетной записи Microsoft (это инвалидирует старый session token) и удалите подозрительный .JAR файл.',
        two_factor_code: 'Если включена функция Microsoft Passwordless, проверьте приложение Microsoft Authenticator на телефоне и отключите незнакомые устройства.',
        email_hijack: 'Подайте заявку через account.live.com/acsr с нового безопасного устройства.',
      },
      ticketTemplate: {
        subject: 'Восстановление доступа к учетной записи Microsoft и лицензии Minecraft: [ВАШ_GAMERTAG]',
        body: `Здравствуйте, служба поддержки Microsoft и Mojang!

Моя учетная запись Microsoft, содержащая лицензию Minecraft Java/Bedrock Edition, подверглась несанкционированному доступу [ДАТА_ИНЦИДЕНТА].

Данные для идентификации профиля:
1. Minecraft Nickname / Xbox Gamertag: [ВАШ_GAMERTAG]
2. Исходный адрес учетной записи Microsoft: [СТАРЫЙ_EMAIL]
3. Новый контактный адрес для связи: [НОВЫЙ_EMAIL]
4. Номер квитанции покупки лицензии (Transaction ID): [TRANSACTION_ID]
5. Дата приобретения игры: [ПРИМЕРНАЯ_ДАТА]
6. Использованная платежная карта (последние 4 цифры): [1234]

Форма подтверждения личности ACSR отправлена. Прошу помочь восстановить доступ и деавторизовать сторонние токены.

С уважением,
[ВАШЕ_ИМЯ]`,
      },
      englishTicketTemplate: {
        subject: 'Compromised Microsoft Account & Minecraft License Recovery: [YOUR_GAMERTAG]',
        body: `Hello Microsoft & Mojang Support Team,

My Microsoft account associated with my Minecraft license was compromised following an unauthorized session/token hijack on [INCIDENT_DATE].

Ownership Verification Details:
1. Minecraft In-Game Name / Xbox Gamertag: [YOUR_GAMERTAG]
2. Original registered Microsoft email: [ORIGINAL_EMAIL]
3. Safe alternate email for resolution: [NEW_SAFE_EMAIL]
4. Minecraft purchase Transaction ID / Order Number: [TRANSACTION_ID]
5. Approximate date of purchase: [DATE]
6. Last 4 digits of billing credit card: [LAST_4_DIGITS]

I have submitted an ACSR verification request. Please invalidate unauthorized OAuth tokens and help restore my access.

Thank you,
[YOUR_NAME]`,
      },
    },
    {
      id: 'discord',
      name: 'Discord',
      publisher: 'Discord Inc.',
      genre: 'Голосовые чаты и игровые сообщества',
      badge: 'QR-скам и захват токенов',
      badgeColor: 'violet',
      icon: '💬',
      iconImage: '/images/games/discord.svg',
      officialSupportUrl: 'https://support.discord.com/hc/requests/new?ticket_form_id=360000029792',
      officialSupportLabel: 'Официальная форма тикета Discord Hacked Account',
      emergencyFirstAction: 'НЕМЕДЛЕННО смените пароль в Discord на телефоне или ПК. Смена пароля в Discord моментально СБРАСЫВАЕТ ваш авторизационный Token и деавторизует мошенников на всех платформах!',
      whereToClickSteps: [
        {
          stepNumber: 1,
          title: 'Переход в официальную форму тикетов Discord',
          instruction: 'Откройте официальную форму подачи жалобы на взломанный аккаунт по прямой ссылке support.discord.com.',
          targetButtonOrLink: 'support.discord.com/hc/requests/new',
        },
        {
          stepNumber: 2,
          title: 'Выбор типа проблемы',
          instruction: 'В выпадающем списке «Чем мы можем помочь?» выберите пункт «Hacked Account» (Взломанный аккаунт).',
          targetButtonOrLink: 'Пункт «Hacked Account»',
        },
        {
          stepNumber: 3,
          title: 'Указание адреса скомпрометированной почты',
          instruction: 'Введите адрес электронной почты, который был привязан к аккаунту Discord ДО того, как мошенники сменили его.',
          targetButtonOrLink: 'Поле «Email address of your Discord account»',
        },
        {
          stepNumber: 4,
          title: 'Указание данных о Nitro и серверах',
          instruction: 'Укажите, была ли у вас активная подписка Discord Nitro, и являлись ли вы владельцем серверов с участниками.',
          targetButtonOrLink: 'Чекбоксы «Do you have Nitro» / «Server Ownership»',
        },
        {
          stepNumber: 5,
          title: 'Отправка описания инцидента',
          instruction: 'Вставьте подготовленный шаблон обращения и прикрепите подтверждение платежей Nitro из выписки банка.',
          targetButtonOrLink: 'Кнопка «Submit» (Отправить)',
        },
      ],
      ownershipProofs: [
        {
          id: 'discord_initial_email',
          label: 'Оригинальный email регистрации',
          description: 'Почтовый ящик, на который регистрировался профиль.',
          required: true,
        },
        {
          id: 'nitro_invoice',
          label: 'Инвойс оплаты Discord Nitro',
          description: 'Номер чека от Discord или выписка банка/Google Play/Apple с оплатой подписки.',
          required: false,
        },
        {
          id: 'discord_phone',
          label: 'Номер телефона, привязанный к аккаунту',
          description: 'Номер мобильного телефона с кодом страны, подтверждавшийся по СМС.',
          required: false,
        },
        {
          id: 'account_id',
          label: '18-значный Discord User ID',
          description: 'Уникальный числовой ID профиля (можно скопировать в режиме разработчика).',
          required: false,
        },
      ],
      mitigationsByCompromise: {
        discord_qr: 'Если вы отсканировали QR-код камерой приложения Discord — злоумышленник уже в вашем профиле! Срочно откройте Настройки пользователя -> Устройства (Devices) -> нажмите «Выйти со всех известных устройств», а затем смените пароль.',
        session_cookie: 'При краже токена Discord злоумышленник обходит 2FA. Единственный способ убить украденный токен — СМЕНИТЬ ПАРОЛЬ или включить/выключить 2FA в настройках.',
        malware_rat: 'Если на ПК был запущен стиллер, мошенники могут рассылать спам по всем вашим серверам и контактам. Предупредите друзей в других мессенджерах!',
      },
      ticketTemplate: {
        subject: 'Взлом учетной записи Discord и несанкционированная смена почты: [ВАШ_ДИСКОРД_ТЕГ]',
        body: `Здравствуйте, служба поддержки Discord!

Моя учетная запись Discord была скомпрометирована [ДАТА_ИНЦИДЕНТА] через фишинговую атаку / несанкционированный перехват сессии. Мошенник изменил контактный адрес электронной почты.

Данные для подтверждения владения:
1. Никнейм / Discord Tag: [ВАШ_ДИСКОРД_ТЕГ]
2. Исходный привязанный email: [ОРИГИНАЛЬНЫЙ_EMAIL]
3. Новый контактный email: [НОВЫЙ_EMAIL]
4. Номер квитанции подписки Nitro: [НОМЕР ИНВОЙСА / ОПЛАТЫ]
5. Дата инцидента: [ДАТА]

Прошу аннулировать изменения мошенника, деавторизовать активные токены и вернуть привязку аккаунта к моему исходному адресу электронной почты.

С уважением,
[ВАШЕ_ИМЯ]`,
      },
      englishTicketTemplate: {
        subject: 'Compromised Discord Account Recovery: [YOUR_DISCORD_TAG]',
        body: `Hello Discord Trust & Safety Team,

My Discord account was compromised on [INCIDENT_DATE] due to an unauthorized session/QR intercept. The unauthorized party has changed my associated email address.

Account Verification Details:
1. Discord Username / Tag: [YOUR_DISCORD_TAG]
2. Original registered email: [ORIGINAL_EMAIL]
3. Secure alternate contact email: [NEW_SAFE_EMAIL]
4. Discord Nitro Billing Invoice / Transaction ID: [INVOICE_ID]
5. Phone number previously linked: [PHONE_NUMBER]

Please terminate all active session tokens, freeze unauthorized activity, and help me restore access to my original email.

Best regards,
[YOUR_NAME]`,
      },
    },
    {
      id: 'epic-games',
      name: 'Epic Games (Fortnite)',
      publisher: 'Epic Games Inc.',
      genre: 'Battle Royale & Store',
      badge: 'Атаки на V-Bucks и скины',
      badgeColor: 'cyan',
      icon: '🛡️',
      iconImage: '/images/games/epic-games.svg',
      officialSupportUrl: 'https://www.epicgames.com/help/contact-us',
      officialSupportLabel: 'Официальный контактный центр Epic Games Support',
      emergencyFirstAction: 'Зайдите на https://www.epicgames.com/account/password и смените пароль. В разделе «Приложения и учетные записи» (Apps and Accounts) отключите все подозрительные сторонние сервисы и привязки.',
      whereToClickSteps: [
        {
          stepNumber: 1,
          title: 'Вход на портал помощи Epic Games',
          instruction: 'Перейдите на страницу epicgames.com/help/contact-us в защищенной вкладке.',
          targetButtonOrLink: 'epicgames.com/help/contact-us',
        },
        {
          stepNumber: 2,
          title: 'Выбор опции восстановления без входа',
          instruction: 'Если вы не можете войти в аккаунт, нажмите синюю ссылку «Не удается войти в учетную запись» (Unable to log in to your account).',
          targetButtonOrLink: 'Кнопка «Не удается войти»',
        },
        {
          stepNumber: 3,
          title: 'Выбор подкатегории проблемы',
          instruction: 'Выберите пункт «Я считаю, что моя учетная запись скомпрометирована» (I believe my account has been compromised).',
          targetButtonOrLink: 'Пункт «Учетная запись скомпрометирована»',
        },
        {
          stepNumber: 4,
          title: 'Указание первоначальных данных',
          instruction: 'Укажите изначальный адрес электронной почты, отображаемое имя Epic Games и прикрепите квитанцию с кодом заказа AXXXXXXXXX.',
          targetButtonOrLink: 'Форма обращения в техподдержку',
        },
      ],
      ownershipProofs: [
        {
          id: 'epic_order_id',
          label: 'Номер заказа Epic Games (Order ID)',
          description: 'Номер чека, начинающийся с буквы "A" (например, A123456789), из квитанции на почте.',
          required: true,
        },
        {
          id: 'epic_initial_email',
          label: 'Первоначальный email создания учетной записи',
          description: 'Почтовый ящик, на который первоначально регистрировался аккаунт Epic Games.',
          required: true,
        },
        {
          id: 'connected_accounts',
          label: 'Привязанные учетные записи консолей',
          description: 'Идентификаторы привязанных аккаунтов PlayStation Network, Xbox Live, Nintendo Switch.',
          required: false,
        },
      ],
      mitigationsByCompromise: {
        password_credentials: 'Срочно смените пароль и включите двухфакторную аутентификацию через мобильное приложение-аутентификатор (Authenticator App), а не через СМС.',
        two_factor_code: 'Если мошенники включили свой 2FA, подтвердите владение через номер первого чека покупки Fortnite в магазине Epic Games Store.',
        email_hijack: 'Подайте официальный запрос через форму без авторизации, указав оригинальный Order ID первой покупки.',
      },
      ticketTemplate: {
        subject: 'Взлом учетной записи Epic Games: [ВАШЕ_ОТОБРАЖАЕМОЕ_ИМЯ]',
        body: `Здравствуйте, служба поддержки Epic Games!

Моя учетная запись Epic Games была скомпрометирована [ДАТА_ИНЦИДЕНТА]. Злоумышленник изменил адрес электронной почты.

Данные для подтверждения права собственности:
1. Отображаемое имя (Display Name): [ВАШЕ_ОТОБРАЖАЕМОЕ_ИМЯ]
2. Исходный email регистрации: [ОРИГИНАЛЬНЫЙ_EMAIL]
3. Новый контактный email: [НОВЫЙ_EMAIL]
4. Номер заказа первой покупки в Epic Games Store: [ORDER ID, НАЧИНАЕТСЯ С БУКВЫ A]
5. Дата создания учетной записи: [ПРИМЕРНАЯ_ДАТА]
6. Привязанные учетные записи: [PSN / XBOX / NINTENDO]

Копия официального инвойса прикреплена к тикету. Прошу вернуть привязку аккаунта на безопасный email.

Спасибо,
[ВАШЕ_ИМЯ]`,
      },
      englishTicketTemplate: {
        subject: 'Compromised Epic Games Account Recovery: [YOUR_DISPLAY_NAME]',
        body: `Hello Epic Games Player Support,

My Epic Games account was compromised on [INCIDENT_DATE] and the linked email address was unauthorizedly modified.

Proof of Account Ownership:
1. Epic Display Name: [YOUR_DISPLAY_NAME]
2. Original account registration email: [ORIGINAL_EMAIL]
3. Safe new email for recovery: [NEW_SAFE_EMAIL]
4. First Purchase Invoice / Invoice ID (Starts with 'A'): [INVOICE_ID]
5. Connected external platforms: [PSN / Xbox / Nintendo / Steam]

Attached is my authentic purchase receipt. Please help restore my account and secure it with the provided new email address.

Thank you,
[YOUR_NAME]`,
      },
    },
    {
      id: 'pubg',
      name: 'PUBG Mobile & KRAFTON ID',
      publisher: 'KRAFTON / Level Infinite',
      genre: 'Battle Royale',
      badge: 'Фишинг UC и доната',
      badgeColor: 'orange',
      icon: '🪖',
      iconImage: '/images/games/pubg.svg',
      officialSupportUrl: 'https://support.pubg.com/',
      officialSupportLabel: 'Официальный портал KRAFTON Player Support',
      emergencyFirstAction: 'Проверьте привязанные соцсети в PUBG Mobile (Настройки -> Основные). Если мошенник привязал вторую соцсеть (например, Twitter или Facebook), немедленно подайте заявку на отвязку сторонней социальной сети внутри игры.',
      whereToClickSteps: [
        {
          stepNumber: 1,
          title: 'Вход в поддержку из лобби игры',
          instruction: 'В главном лобби PUBG Mobile нажмите значок стрелки в правом нижнем углу и выберите «Служба поддержки» (Customer Service).',
          targetButtonOrLink: 'Стрелка в лобби -> «Служба поддержки»',
        },
        {
          stepNumber: 2,
          title: 'Переход в раздел восстановления',
          instruction: 'В правом верхнем углу нажмите на значок диалога и выберите тему «Account & Login» -> «Account Stolen / Lost».',
          targetButtonOrLink: 'Раздел «Account Stolen / Lost»',
        },
        {
          stepNumber: 3,
          title: 'Заполнение формы отвязки мошеннической соцсети',
          instruction: 'Система предложит пройти верификацию: укажите ваш цифровой UID, дату регистрации и последние 3 чека покупки UC.',
          targetButtonOrLink: 'Форма верификации владельца PUBG Mobile',
        },
      ],
      ownershipProofs: [
        {
          id: 'pubg_uid',
          label: 'Цифровой идентификатор игрока (UID)',
          description: '9-11 значный числовой номер вашего профиля (например: 5123456789).',
          required: true,
        },
        {
          id: 'pubg_uc_receipt',
          label: 'Квитанция покупки UC',
          description: 'Чек Google Play, Apple App Store или Midasbuy с номером транзакции.',
          required: true,
        },
        {
          id: 'pubg_device',
          label: 'Модель смартфона / планшета',
          description: 'Устройство, на котором вы чаще всего играли последние 6 месяцев.',
          required: true,
        },
      ],
      mitigationsByCompromise: {
        password_credentials: 'Если ввели данные на фейковом сайте "Бесплатный Royale Pass" — немедленно смените пароль от аккаунта Google/Apple/Twitter, через который вы входите в игру.',
        trade_intercept: 'Никогда не передавайте аккаунт для "пополнения UC через дешевый регион" — в 99% случаев мошенники привязывают свой номер телефона и шантажируют выкупом.',
      },
      ticketTemplate: {
        subject: 'Восстановление взломанного аккаунта PUBG Mobile: UID [ВАШ_UID]',
        body: `Здравствуйте, служба поддержки KRAFTON / PUBG Mobile!

Мой аккаунт в PUBG Mobile был взломан [ДАТА_ИНЦИДЕНТА]. Мошенники получили доступ и привязали чужую социальную сеть.

Данные для верификации:
1. Цифровой идентификатор игрока (UID): [ВАШ_UID]
2. Игровой никнейм: [ВАШ_НИКНЕЙМ]
3. Модель устройства: [МОДЕЛЬ СМАРТФОНА]
4. Номер квитанции покупки UC (Midasbuy / Google / Apple): [НОМЕР ТРАНЗАКЦИИ]
5. Приблизительная дата создания аккаунта: [ДАТА]

Квитанция об оплате прикреплена. Прошу отвязать сторонние аккаунты мошенника и вернуть доступ законному владельцу.

Спасибо!`,
      },
      englishTicketTemplate: {
        subject: 'Hacked PUBG Mobile Account Recovery Request: UID [YOUR_UID]',
        body: `Dear PUBG Mobile / KRAFTON Support,

My PUBG Mobile account was hijacked on [INCIDENT_DATE] and an unauthorized third-party social account was linked without my consent.

Ownership Verification Details:
1. Player UID: [YOUR_UID]
2. In-Game Name: [IN_GAME_NAME]
3. Primary Device Model: [DEVICE_MODEL]
4. UC Purchase Receipt / Order ID (Google Play / Apple / Midasbuy): [ORDER_ID]
5. Approximate Account Registration Date: [DATE]

I have attached authentic payment receipts confirming ownership. Please unlink unauthorized social bindings and assist in restoring full access.

Sincerely,
[YOUR_NAME]`,
      },
    },
    {
      id: 'genshin',
      name: 'Genshin Impact & HoYoverse',
      publisher: 'HoYoverse (COGNOSPHERE)',
      genre: 'Action RPG & Gacha',
      badge: 'Атаки на UID и донатные чеки',
      badgeColor: 'violet',
      icon: '✨',
      iconImage: '/images/games/genshin.svg',
      officialSupportUrl: 'https://account.hoyoverse.com/',
      officialSupportLabel: 'Официальный портал HoYoverse Account',
      emergencyFirstAction: 'Зайдите на https://account.hoyoverse.com/#/account/safety -> Устройства входа (Login Devices) -> немедленно удалите все незнакомые устройства! Это заставит злоумышленника вылететь из игры.',
      whereToClickSteps: [
        {
          stepNumber: 1,
          title: 'Отправка официального запроса на форму восстановления',
          instruction: 'Отправьте письмо на официальный почтовый адрес поддержки: support_os@hoyoverse.com. В теме письма напишите строго: «Account Recovery Form».',
          targetButtonOrLink: 'Email на: support_os@hoyoverse.com',
        },
        {
          stepNumber: 2,
          title: 'Получение ссылки на форму HoYoverse Issue Application',
          instruction: 'В ответном автоматическом письме в течение нескольких минут придет персональная ссылка на форму «HoYoverse Issue Application Form».',
          targetButtonOrLink: 'Персональная ссылка из письма поддержки',
        },
        {
          stepNumber: 3,
          title: 'Заполнение формы верификации',
          instruction: 'Укажите ваш UID, сервер (Europe / America / Asia), исходный способ регистрации и характеристики первого ПК/телефона, на котором создавался профиль.',
          targetButtonOrLink: 'Поля формы HoYoverse Issue Application Form',
        },
        {
          stepNumber: 4,
          title: 'Прикрепление чека самого первого доната',
          instruction: 'Прикрепите квитанцию САМОЙ ПЕРВОЙ покупки в игре (Благословение полой луны или Кристаллы). Для HoYoverse первый чек — решающее доказательство.',
          targetButtonOrLink: 'Поле загрузки первого чека',
        },
      ],
      ownershipProofs: [
        {
          id: 'genshin_uid',
          label: 'Игровой UID (9 цифр)',
          description: 'Уникальный номер в правом нижнем углу экрана игры (например, 701234567).',
          required: true,
        },
        {
          id: 'first_topup',
          label: 'Чек САМОГО ПЕРВОГО доната',
          description: 'Квитанция первой покупки в игре (дата, точная сумма, валюта и номер заказа).',
          required: true,
        },
        {
          id: 'registration_device',
          label: 'Точные характеристики первого устройства',
          description: 'Модель процессора, видеокарты и материнской платы ПК или точная модель смартфона при регистрации.',
          required: true,
        },
        {
          id: 'registration_date',
          label: 'Точная дата регистрации аккаунта',
          description: 'День, когда вы впервые зашли в Тейват (можно вспомнить по дате получения Эмбер).',
          required: false,
        },
      ],
      mitigationsByCompromise: {
        password_credentials: 'Срочно смените пароль на https://account.hoyoverse.com/ и включите двухфакторную верификацию.',
        malware_rat: 'Если скачивали моды на скины (3D Migoto) или читы — смените пароль и обязательно проверьте компьютер на инфостиллеры.',
      },
      ticketTemplate: {
        subject: 'Account Recovery Form: Genshin Impact UID [ВАШ_UID]',
        body: `Здравствуйте, служба поддержки HoYoverse!

Мой аккаунт Genshin Impact был украден [ДАТА_ИНЦИДЕНТА]. Мошенник сменил привязанную электронную почту.

Данные для верификации владельца:
1. Игровой UID: [ВАШ_UID]
2. Игровой сервер: [EUROPE / AMERICA / ASIA]
3. Исходный адрес электронной почты: [ПЕРВОНАЧАЛЬНЫЙ_EMAIL]
4. Новый безопасный адрес для привязки: [НОВЫЙ_EMAIL]
5. Дата первого входа в игру: [ДАТА РЕГИСТРАЦИИ]
6. Характеристики первого устройства: [МОДЕЛЬ ПК / ТЕЛЕФОНА]
7. Дата и номер квитанции первой покупки: [НОМЕР ТРАНЗАКЦИИ И ДАТА]

Квитанция первой транзакции прикреплена к письму. Прошу предоставить ссылку на форму восстановления учетной записи.

С уважением,
[ВАШЕ_ИМЯ]`,
      },
      englishTicketTemplate: {
        subject: 'Account Recovery Form: Genshin Impact UID [YOUR_UID]',
        body: `Dear HoYoverse Support Team,

My Genshin Impact account was compromised on [INCIDENT_DATE] and the linked email address was unauthorizedly changed.

Account Ownership Verification Details:
1. In-Game UID: [YOUR_UID]
2. Server: [Europe / America / Asia / TW, HK, MO]
3. Original registration email: [ORIGINAL_EMAIL]
4. New safe email for account restoration: [NEW_SAFE_EMAIL]
5. Exact Account Registration Date: [DATE]
6. First Login Device Specs: [CPU, GPU, RAM or Exact Phone Model]
7. First Purchase Order Number and Date: [ORDER_NUMBER_AND_DATE]

Attached is the authentic receipt of my first in-game purchase. Please provide the HoYoverse Issue Application Form link to help me regain access.

Thank you for your assistance,
[YOUR_NAME]`,
      },
    },
  ],
  en: [
    {
      id: 'steam',
      name: 'Counter-Strike 2 & Steam',
      publisher: 'Valve Corporation',
      genre: 'PC Gaming & Economy',
      badge: 'High Asset Value',
      badgeColor: 'orange',
      icon: '🎮',
      iconImage: '/images/games/cs2-steam.svg',
      officialSupportUrl: 'https://help.steampowered.com/en/wizard/HelpWithLoginInfo',
      officialSupportLabel: 'Official Steam Support Account Wizard',
      emergencyFirstAction: 'Change your master email password immediately, deauthorize all active Steam Guard sessions, and check the Steam API Key page (https://steamcommunity.com/dev/apikey) — if an unauthorized domain is registered, click "Revoke My Steam Web API Key".',
      whereToClickSteps: [
        {
          stepNumber: 1,
          title: 'Navigate to Official Valve Wizard',
          instruction: 'Open the verified Steam Support URL provided above. Never search Google for support links to avoid sponsored phishing clones.',
          targetButtonOrLink: 'help.steampowered.com/en/wizard/HelpWithLoginInfo',
        },
        {
          stepNumber: 2,
          title: 'Select Account Theft Issue',
          instruction: 'Choose the option: "My Steam Account was stolen and I need help recovering it".',
          targetButtonOrLink: 'Option "My Steam Account was stolen"',
        },
        {
          stepNumber: 3,
          title: 'Locate Your Account',
          instruction: 'Enter your system Steam Account Login Name or the original registration email. Do not enter your public display nickname.',
          targetButtonOrLink: 'Field "Account name or email address"',
        },
        {
          stepNumber: 4,
          title: 'Bypass Attacker Alterations',
          instruction: 'When Steam prompts to send a code to the attacker’s masked email or phone, click: "I no longer have access to this phone number" followed by "I no longer have access to this email address".',
          targetButtonOrLink: 'Button "I no longer have access to these"',
        },
        {
          stepNumber: 5,
          title: 'Submit Verified Ownership Ticket',
          instruction: 'A secure form will appear. Provide your safe new contact email, original account details, first payment card info, and digital receipts.',
          targetButtonOrLink: 'Form "Contact Steam Support"',
        },
      ],
      ownershipProofs: [
        {
          id: 'card_receipt',
          label: 'First Purchase Credit Card',
          description: 'Cardholder name, first 4 and last 4 digits of the card used for initial purchases, and card type (Visa/Mastercard). Never provide the full number or CVV.',
          required: true,
        },
        {
          id: 'initial_email',
          label: 'Original Registration Email Address',
          description: 'The exact email address used when creating the Steam account.',
          required: true,
        },
        {
          id: 'cd_key',
          label: 'Physical or Digital Game Activation Key (CD-Key)',
          description: 'A product code activated on the account (handwritten ticket code on a physical CD case speeds up recovery significantly).',
          required: false,
        },
        {
          id: 'wallet_code',
          label: 'Steam Wallet Card Code',
          description: 'A physical Steam Wallet gift card code or receipt.',
          required: false,
        },
        {
          id: 'paypal_invoice',
          label: 'PayPal Invoice / Transaction ID',
          description: 'A 16-18 digit payment identifier from your payment history.',
          required: false,
        },
      ],
      mitigationsByCompromise: {
        password_credentials: 'In the Steam Client, go to Settings -> Security -> Manage Steam Guard -> click "Deauthorize all other devices" immediately.',
        two_factor_code: 'If the attacker added their own mobile authenticator, use the Emergency Recovery Code (R-Code, R#####) generated when you first set up Steam Guard.',
        api_key: 'CRITICAL: Open https://steamcommunity.com/dev/apikey. If an unauthorized domain name appears, click "Revoke My Steam Web API Key". Then reset your password and create a new Trade URL.',
        malware_rat: 'Disconnect your PC from the internet immediately. Run Windows Defender Offline or a rescue USB scanner. Do not log in from this machine until thoroughly cleaned.',
        trade_intercept: 'Valve does not restore traded items to protect marketplace stability, but revoking API keys and resetting credentials prevents further asset loss.',
        email_hijack: 'Access your email account from a secure mobile device, inspect forwarding rules and filters to remove unauthorized redirection, and activate hardware 2FA.',
      },
      ticketTemplate: {
        subject: 'Hijacked Steam Account Ownership Verification: [YOUR_LOGIN]',
        body: `Hello Steam Support Team,

My Steam account was compromised following a phishing incident on [INCIDENT_DATE]. The unauthorized party has changed my associated contact email and mobile authenticator.

I am providing the following proof of original ownership:
1. Account Login Name: [YOUR_LOGIN]
2. Original registration email address: [FIRST_EMAIL]
3. Safe contact email address for recovery: [NEW_SAFE_EMAIL]
4. Payment information for initial purchases:
   - Card Type: [VISA / MasterCard]
   - Cardholder Name: [NAME ON CARD]
   - First 4 and Last 4 digits: [1234] **** [5678]
   - Billing Address: [CITY, COUNTRY]
5. Game CD-Keys / Steam Wallet codes activated on the account:
   - [INSERT CD-KEY OR TRANSACTION ID HERE]

I have attached authentic purchase invoices and bank statement records confirming my ownership. Please deauthorize all active unauthorized sessions and restore my account to the provided safe email.

Thank you for your assistance,
[YOUR_NAME]`,
      },
      englishTicketTemplate: {
        subject: 'Hijacked Steam Account Ownership Verification: [YOUR_LOGIN]',
        body: `Hello Steam Support Team,

My Steam account was compromised following a phishing incident on [INCIDENT_DATE]. The unauthorized party has changed my associated contact email and mobile authenticator.

I am providing the following proof of original ownership:
1. Account Login Name: [YOUR_LOGIN]
2. Original registration email address: [FIRST_EMAIL]
3. Safe contact email address for recovery: [NEW_SAFE_EMAIL]
4. Payment information for initial purchases:
   - Card Type: [VISA / MasterCard]
   - Cardholder Name: [NAME ON CARD]
   - First 4 and Last 4 digits: [1234] **** [5678]
   - Billing Address: [CITY, COUNTRY]
5. Game CD-Keys / Steam Wallet codes activated on the account:
   - [INSERT CD-KEY OR TRANSACTION ID HERE]

I have attached authentic purchase invoices and bank statement records confirming my ownership. Please deauthorize all active unauthorized sessions and restore my account to the provided safe email.

Thank you for your assistance,
[YOUR_NAME]`,
      },
    },
    {
      id: 'brawl-stars',
      name: 'Brawl Stars & Supercell ID',
      publisher: 'Supercell Oy',
      genre: 'Mobile MOBA',
      badge: 'High 6-Digit Phishing Risk',
      badgeColor: 'violet',
      icon: '⭐',
      iconImage: '/images/games/brawl-stars.svg',
      officialSupportUrl: 'https://support.supercell.com/brawl-stars/en/articles/contact-form.html',
      officialSupportLabel: 'Official Supercell Support Portal',
      emergencyFirstAction: 'Never disclose 6-digit Supercell ID verification codes. Open Brawl Stars -> Settings -> Supercell ID -> Gear icon -> tap "Log out on all devices" immediately.',
      whereToClickSteps: [
        {
          stepNumber: 1,
          title: 'Access In-Game Support',
          instruction: 'Open Brawl Stars on your mobile device (even using a guest or alternate profile). Tap the Gear icon (Settings) in the top right corner.',
          targetButtonOrLink: 'Brawl Stars Settings icon',
        },
        {
          stepNumber: 2,
          title: 'Open Help & Support',
          instruction: 'In the bottom left corner of the settings window, tap the blue "Help and Support" button.',
          targetButtonOrLink: 'Button "Help and Support"',
        },
        {
          stepNumber: 3,
          title: 'Trigger Automated Support Bot (Otto)',
          instruction: 'Tap the blue chat bubble icon in the top right corner to start an automated support conversation with Otto.',
          targetButtonOrLink: 'Blue Chat Bubble icon',
        },
        {
          stepNumber: 4,
          title: 'Select Lost Account Pathway',
          instruction: 'Choose "Account Queries" -> "Lost Account" -> "Recover My Account".',
          targetButtonOrLink: 'Options "Account" -> "Lost Account"',
        },
        {
          stepNumber: 5,
          title: 'Provide Metrics to Bot Otto',
          instruction: 'Otto will request your exact Player Tag (#XXXXXXX), accurate in-game name, trophy level, and club name.',
          targetButtonOrLink: 'Bot query response fields',
        },
      ],
      ownershipProofs: [
        {
          id: 'player_tag',
          label: 'Exact Player Tag (#PlayerTag)',
          description: 'Unique alphanumeric identifier beginning with a hash sign (e.g. #2PPGY8R9).',
          required: true,
        },
        {
          id: 'first_receipt',
          label: 'Initial Google Play / Apple App Store Receipt',
          description: 'Order number GPA.XXXX-XXXX-XXXX-XXXXX (Android) or Apple digital invoice document number.',
          required: true,
        },
        {
          id: 'devices_list',
          label: 'Exact Mobile Device Models',
          description: 'Models of phones and tablets (e.g. iPhone 13, Samsung Galaxy S22) used to play the game.',
          required: true,
        },
        {
          id: 'past_names',
          label: 'Previous In-Game Names',
          description: 'Historical aliases if you previously changed your name using gems.',
          required: false,
        },
      ],
      mitigationsByCompromise: {
        password_credentials: 'Change your email account password immediately and enable Supercell ID Account Protection (SMS recovery codes).',
        two_factor_code: 'Supercell ID codes expire within 15 minutes. Contact support immediately so the team can temporarily lock the profile to prevent unauthorized changes.',
        session_cookie: 'Tap the gear icon in Supercell ID settings and select "Log out on all devices".',
        email_hijack: 'Locate your earliest Google Play GPA receipt. Supercell requires this proof before changing email bindings.',
      },
      ticketTemplate: {
        subject: 'Compromised Supercell ID Recovery Request: #[YOUR_TAG]',
        body: `Dear Supercell Support Team,

My Brawl Stars account associated with Supercell ID was compromised on [INCIDENT_DATE] due to an unauthorized verification code interception.

Here are my account verification details:
1. Player Tag: #[YOUR_TAG]
2. In-Game Name: [IN_GAME_NAME]
3. Approximate Trophy Count: [TROPHIES]
4. Club Name: [CLUB_NAME]
5. Devices used to access the account: [DEVICE_MODELS, e.g. iPhone 13, Samsung Galaxy S22]
6. First purchase transaction receipt:
   - Order Number: [GPA.XXXX-XXXX-XXXX-XXXXX / Apple Order ID]
7. Safe new email address for Supercell ID re-binding: [NEW_EMAIL]

I have attached the original digital purchase receipt from Google Play / Apple App Store. Please revoke unauthorized access and help me transfer the account to my secure email.

Best regards,
[YOUR_NAME]`,
      },
      englishTicketTemplate: {
        subject: 'Compromised Supercell ID Recovery Request: #[YOUR_TAG]',
        body: `Dear Supercell Support Team,

My Brawl Stars account associated with Supercell ID was compromised on [INCIDENT_DATE] due to an unauthorized verification code interception.

Here are my account verification details:
1. Player Tag: #[YOUR_TAG]
2. In-Game Name: [IN_GAME_NAME]
3. Approximate Trophy Count: [TROPHIES]
4. Club Name: [CLUB_NAME]
5. Devices used to access the account: [DEVICE_MODELS, e.g. iPhone 13, Samsung Galaxy S22]
6. First purchase transaction receipt:
   - Order Number: [GPA.XXXX-XXXX-XXXX-XXXXX / Apple Order ID]
7. Safe new email address for Supercell ID re-binding: [NEW_EMAIL]

I have attached the original digital purchase receipt from Google Play / Apple App Store. Please revoke unauthorized access and help me transfer the account to my secure email.

Best regards,
[YOUR_NAME]`,
      },
    },
    {
      id: 'roblox',
      name: 'Roblox',
      publisher: 'Roblox Corporation',
      genre: 'Platform & Sandbox',
      badge: '.ROBLOSECURITY Cookie Hijacking',
      badgeColor: 'red',
      icon: '🟥',
      iconImage: '/images/games/roblox.svg',
      officialSupportUrl: 'https://www.roblox.com/support',
      officialSupportLabel: 'Official Roblox Support Form',
      emergencyFirstAction: 'Change your Roblox account password right now! Changing your password instantly INVALIDATES your .ROBLOSECURITY cookie, disconnecting the intruder across all devices.',
      whereToClickSteps: [
        {
          stepNumber: 1,
          title: 'Navigate to Official Roblox Support',
          instruction: 'Go to roblox.com/support in a secure browser window.',
          targetButtonOrLink: 'roblox.com/support',
        },
        {
          stepNumber: 2,
          title: 'Provide Contact Information',
          instruction: 'Enter your Roblox username and the ORIGINAL email address that was linked before the account was compromised.',
          targetButtonOrLink: 'Fields "Username" and "Email Address"',
        },
        {
          stepNumber: 3,
          title: 'Select Device and Issue Category',
          instruction: 'Select your gaming device and choose the category "Account Hacked or Can\'t Log in".',
          targetButtonOrLink: 'Category: "Account Hacked or Can\'t Log in"',
        },
        {
          stepNumber: 4,
          title: 'Select Subcategory',
          instruction: 'In the secondary dropdown, pick "Account Hacked".',
          targetButtonOrLink: 'Subcategory: "Account Hacked"',
        },
        {
          stepNumber: 5,
          title: 'Submit Detailed Recovery Ticket',
          instruction: 'Paste the generated support ticket template below and attach any Robux or Premium billing invoices.',
          targetButtonOrLink: 'Field "Description of issue" -> Submit',
        },
      ],
      ownershipProofs: [
        {
          id: 'initial_roblox_email',
          label: 'Original Verified Email Address',
          description: 'The email originally confirmed when setting up the Roblox account.',
          required: true,
        },
        {
          id: 'robux_receipt',
          label: 'Robux or Premium Purchase Invoice',
          description: 'Digital invoice from Roblox, PayPal, Google Play, or Apple with an Order ID.',
          required: true,
        },
        {
          id: 'gift_card_pin',
          label: 'Roblox Gift Card PIN',
          description: 'Redemption PIN from a physical or digital gift card.',
          required: false,
        },
      ],
      mitigationsByCompromise: {
        password_credentials: 'Enable authenticator app 2-step verification in Settings -> Security.',
        session_cookie: 'Changing your password immediately invalidates the stolen .ROBLOSECURITY token.',
        malware_rat: 'Remove suspicious Chrome/Edge browser extensions (chrome://extensions). Most Roblox cookie thefts originate from rogue trading extensions.',
        trade_intercept: 'Submit a ticket within 30 days. Roblox maintains a one-time item recovery rollback policy for verified victims.',
      },
      ticketTemplate: {
        subject: 'Compromised Roblox Account Recovery Request: [YOUR_USERNAME]',
        body: `Hello Roblox Customer Support,

My Roblox account [YOUR_USERNAME] was compromised on [INCIDENT_DATE] due to an unauthorized session hijack. The unauthorized user has changed the contact email and credentials.

Here is my verification of ownership:
1. Roblox Username: [YOUR_USERNAME]
2. Original verified billing/contact email: [ORIGINAL_EMAIL]
3. Safe email for account restoration: [NEW_SAFE_EMAIL]
4. Order ID / Transaction Number for Robux or Premium purchase: [ORDER_ID]
5. Payment method used: [PayPal / Credit Card / Apple]

I have attached proof of purchase invoices confirming that I am the genuine creator of this account. Please revert unauthorized changes, revoke all active sessions, and assist with account recovery.

Thank you,
[YOUR_NAME]`,
      },
      englishTicketTemplate: {
        subject: 'Compromised Roblox Account Recovery Request: [YOUR_USERNAME]',
        body: `Hello Roblox Customer Support,

My Roblox account [YOUR_USERNAME] was compromised on [INCIDENT_DATE] due to an unauthorized session hijack. The unauthorized user has changed the contact email and credentials.

Here is my verification of ownership:
1. Roblox Username: [YOUR_USERNAME]
2. Original verified billing/contact email: [ORIGINAL_EMAIL]
3. Safe email for account restoration: [NEW_SAFE_EMAIL]
4. Order ID / Transaction Number for Robux or Premium purchase: [ORDER_ID]
5. Payment method used: [PayPal / Credit Card / Apple]

I have attached proof of purchase invoices confirming that I am the genuine creator of this account. Please revert unauthorized changes, revoke all active sessions, and assist with account recovery.

Thank you,
[YOUR_NAME]`,
      },
    },
    {
      id: 'minecraft',
      name: 'Minecraft & Microsoft Account',
      publisher: 'Mojang Studios / Microsoft',
      genre: 'Sandbox & Survival',
      badge: 'OAuth & JAR Infostealers',
      badgeColor: 'lime',
      icon: '⛏️',
      iconImage: '/images/games/minecraft.svg',
      officialSupportUrl: 'https://account.live.com/acsr',
      officialSupportLabel: 'Official Microsoft ACSR Automated Form',
      emergencyFirstAction: 'Inspect granted OAuth permissions at https://account.live.com/consent/Manage — if you verified via a rogue Discord bot, click "Revoke Permissions" immediately.',
      whereToClickSteps: [
        {
          stepNumber: 1,
          title: 'Access Microsoft ACSR Recovery',
          instruction: 'Navigate to account.live.com/acsr (Automated Customer Service Recovery). This is Microsoft\'s official recovery portal for accounts with lost credentials.',
          targetButtonOrLink: 'account.live.com/acsr',
        },
        {
          stepNumber: 2,
          title: 'Provide Account & Contact Email',
          instruction: 'In the first box, enter your Microsoft email. In the second box, provide a secure alternate email address you currently control.',
          targetButtonOrLink: 'Account & Contact Email fields',
        },
        {
          stepNumber: 3,
          title: 'Input Personal Profile Details',
          instruction: 'Enter the exact first name, last name, date of birth, and country used during account registration.',
          targetButtonOrLink: 'Profile Data fields',
        },
        {
          stepNumber: 4,
          title: 'Submit Historical Passwords',
          instruction: 'Enter previous passwords you used on the account. Providing accurate old passwords significantly raises the automated trust score.',
          targetButtonOrLink: 'Historical passwords field',
        },
        {
          stepNumber: 5,
          title: 'Supply Minecraft & Xbox Billing Data',
          instruction: 'Select Xbox/Minecraft, enter your Gamertag, and supply the Minecraft license purchase Transaction ID from your receipt.',
          targetButtonOrLink: 'Xbox / Minecraft billing section',
        },
      ],
      ownershipProofs: [
        {
          id: 'mojang_trans_id',
          label: 'Minecraft Purchase Transaction ID',
          description: 'Official digital invoice from Mojang or Microsoft Store with a transaction identifier.',
          required: true,
        },
        {
          id: 'old_passwords',
          label: 'Previous Microsoft Account Passwords',
          description: 'Passwords used on the account before the unauthorized change.',
          required: true,
        },
        {
          id: 'xbox_gamertag',
          label: 'Xbox Gamertag & In-Game Name',
          description: 'Your exact Minecraft Java/Bedrock username and Xbox Gamertag.',
          required: true,
        },
      ],
      mitigationsByCompromise: {
        password_credentials: 'Go to account.microsoft.com/security and click "Sign out everywhere".',
        malware_rat: 'If you ran an infected .JAR mod: terminate Java processes, change your Microsoft password immediately (this invalidates the stolen session token), and purge the mod file.',
        two_factor_code: 'Check the Microsoft Authenticator app on your phone and remove unknown registered devices.',
      },
      ticketTemplate: {
        subject: 'Compromised Microsoft Account & Minecraft License Recovery: [YOUR_GAMERTAG]',
        body: `Hello Microsoft & Mojang Support Team,

My Microsoft account associated with my Minecraft license was compromised following an unauthorized session/token hijack on [INCIDENT_DATE].

Ownership Verification Details:
1. Minecraft In-Game Name / Xbox Gamertag: [YOUR_GAMERTAG]
2. Original registered Microsoft email: [ORIGINAL_EMAIL]
3. Safe alternate email for resolution: [NEW_SAFE_EMAIL]
4. Minecraft purchase Transaction ID / Order Number: [TRANSACTION_ID]
5. Approximate date of purchase: [DATE]
6. Last 4 digits of billing credit card: [LAST_4_DIGITS]

I have submitted an ACSR verification request. Please invalidate unauthorized OAuth tokens and help restore my access.

Thank you,
[YOUR_NAME]`,
      },
      englishTicketTemplate: {
        subject: 'Compromised Microsoft Account & Minecraft License Recovery: [YOUR_GAMERTAG]',
        body: `Hello Microsoft & Mojang Support Team,

My Microsoft account associated with my Minecraft license was compromised following an unauthorized session/token hijack on [INCIDENT_DATE].

Ownership Verification Details:
1. Minecraft In-Game Name / Xbox Gamertag: [YOUR_GAMERTAG]
2. Original registered Microsoft email: [ORIGINAL_EMAIL]
3. Safe alternate email for resolution: [NEW_SAFE_EMAIL]
4. Minecraft purchase Transaction ID / Order Number: [TRANSACTION_ID]
5. Approximate date of purchase: [DATE]
6. Last 4 digits of billing credit card: [LAST_4_DIGITS]

I have submitted an ACSR verification request. Please invalidate unauthorized OAuth tokens and help restore my access.

Thank you,
[YOUR_NAME]`,
      },
    },
    {
      id: 'discord',
      name: 'Discord',
      publisher: 'Discord Inc.',
      genre: 'Voice Chat & Communities',
      badge: 'QR Scams & Token Grabbers',
      badgeColor: 'violet',
      icon: '💬',
      iconImage: '/images/games/discord.svg',
      officialSupportUrl: 'https://support.discord.com/hc/requests/new?ticket_form_id=360000029792',
      officialSupportLabel: 'Official Discord Hacked Account Ticket Form',
      emergencyFirstAction: 'Change your Discord password IMMEDIATELY from your desktop or phone. Changing your password resets your user token and disconnects the intruder from all active sessions.',
      whereToClickSteps: [
        {
          stepNumber: 1,
          title: 'Navigate to Discord Hacked Account Form',
          instruction: 'Open the verified Discord support URL at support.discord.com.',
          targetButtonOrLink: 'support.discord.com/hc/requests/new',
        },
        {
          stepNumber: 2,
          title: 'Select Hacked Account Category',
          instruction: 'Under "What can we help you with?", select "Hacked Account".',
          targetButtonOrLink: 'Option "Hacked Account"',
        },
        {
          stepNumber: 3,
          title: 'Input Original Email Address',
          instruction: 'Provide the email address linked to your Discord account prior to the unauthorized change.',
          targetButtonOrLink: 'Field "Email address of your Discord account"',
        },
        {
          stepNumber: 4,
          title: 'Submit Ticket with Nitro Proof',
          instruction: 'Indicate whether you had active Nitro or server ownership, and attach digital invoices.',
          targetButtonOrLink: 'Button "Submit"',
        },
      ],
      ownershipProofs: [
        {
          id: 'discord_initial_email',
          label: 'Original Registration Email',
          description: 'The email address originally verified on the Discord account.',
          required: true,
        },
        {
          id: 'nitro_invoice',
          label: 'Discord Nitro Payment Receipt',
          description: 'Invoice number from Discord or bank statement showing subscription billing.',
          required: false,
        },
      ],
      mitigationsByCompromise: {
        discord_qr: 'If you scanned a QR code in Discord mobile: open User Settings -> Devices -> tap "Log Out All Known Devices", then change your password immediately.',
        session_cookie: 'Changing your password or toggling 2FA resets your authorization token.',
        malware_rat: 'Warn your contacts through external messengers that your account may be sending automated spam.',
      },
      ticketTemplate: {
        subject: 'Compromised Discord Account Recovery: [YOUR_DISCORD_TAG]',
        body: `Hello Discord Trust & Safety Team,

My Discord account was compromised on [INCIDENT_DATE] due to an unauthorized session/QR intercept. The unauthorized party has changed my associated email address.

Account Verification Details:
1. Discord Username / Tag: [YOUR_DISCORD_TAG]
2. Original registered email: [ORIGINAL_EMAIL]
3. Secure alternate contact email: [NEW_SAFE_EMAIL]
4. Discord Nitro Billing Invoice / Transaction ID: [INVOICE_ID]
5. Phone number previously linked: [PHONE_NUMBER]

Please terminate all active session tokens, freeze unauthorized activity, and help me restore access to my original email.

Best regards,
[YOUR_NAME]`,
      },
      englishTicketTemplate: {
        subject: 'Compromised Discord Account Recovery: [YOUR_DISCORD_TAG]',
        body: `Hello Discord Trust & Safety Team,

My Discord account was compromised on [INCIDENT_DATE] due to an unauthorized session/QR intercept. The unauthorized party has changed my associated email address.

Account Verification Details:
1. Discord Username / Tag: [YOUR_DISCORD_TAG]
2. Original registered email: [ORIGINAL_EMAIL]
3. Secure alternate contact email: [NEW_SAFE_EMAIL]
4. Discord Nitro Billing Invoice / Transaction ID: [INVOICE_ID]
5. Phone number previously linked: [PHONE_NUMBER]

Please terminate all active session tokens, freeze unauthorized activity, and help me restore access to my original email.

Best regards,
[YOUR_NAME]`,
      },
    },
    {
      id: 'epic-games',
      name: 'Epic Games (Fortnite)',
      publisher: 'Epic Games Inc.',
      genre: 'Battle Royale & Store',
      badge: 'V-Bucks & Account Theft',
      badgeColor: 'cyan',
      icon: '🛡️',
      iconImage: '/images/games/epic-games.svg',
      officialSupportUrl: 'https://www.epicgames.com/help/contact-us',
      officialSupportLabel: 'Official Epic Games Support Center',
      emergencyFirstAction: 'Change your password at https://www.epicgames.com/account/password. Under Apps and Accounts, disconnect any unrecognized external accounts.',
      whereToClickSteps: [
        {
          stepNumber: 1,
          title: 'Navigate to Epic Support Portal',
          instruction: 'Go to epicgames.com/help/contact-us.',
          targetButtonOrLink: 'epicgames.com/help/contact-us',
        },
        {
          stepNumber: 2,
          title: 'Select Unable to Log In',
          instruction: 'Click the blue link "Unable to log in to your account".',
          targetButtonOrLink: 'Link "Unable to log in"',
        },
        {
          stepNumber: 3,
          title: 'Choose Compromised Option',
          instruction: 'Select "I believe my account has been compromised".',
          targetButtonOrLink: 'Option "Account has been compromised"',
        },
        {
          stepNumber: 4,
          title: 'Submit Initial Billing Records',
          instruction: 'Enter your original registration email, display name, and attach an order invoice starting with the letter A.',
          targetButtonOrLink: 'Epic Games Ticket Form',
        },
      ],
      ownershipProofs: [
        {
          id: 'epic_order_id',
          label: 'Epic Games Order ID (Starts with A)',
          description: 'Invoice number beginning with letter A (e.g. A123456789) from your email receipt.',
          required: true,
        },
        {
          id: 'epic_initial_email',
          label: 'Original Registration Email',
          description: 'The email address initially used to register the Epic Games account.',
          required: true,
        },
      ],
      mitigationsByCompromise: {
        password_credentials: 'Change password and activate authenticator app 2FA.',
        two_factor_code: 'If attacker enabled their own 2FA, verify ownership using your initial Fortnite order invoice ID.',
      },
      ticketTemplate: {
        subject: 'Compromised Epic Games Account Recovery: [YOUR_DISPLAY_NAME]',
        body: `Hello Epic Games Player Support,

My Epic Games account was compromised on [INCIDENT_DATE] and the linked email address was unauthorizedly modified.

Proof of Account Ownership:
1. Epic Display Name: [YOUR_DISPLAY_NAME]
2. Original account registration email: [ORIGINAL_EMAIL]
3. Safe new email for recovery: [NEW_SAFE_EMAIL]
4. First Purchase Invoice / Invoice ID (Starts with 'A'): [INVOICE_ID]
5. Connected external platforms: [PSN / Xbox / Nintendo / Steam]

Attached is my authentic purchase receipt. Please help restore my account and secure it with the provided new email address.

Thank you,
[YOUR_NAME]`,
      },
      englishTicketTemplate: {
        subject: 'Compromised Epic Games Account Recovery: [YOUR_DISPLAY_NAME]',
        body: `Hello Epic Games Player Support,

My Epic Games account was compromised on [INCIDENT_DATE] and the linked email address was unauthorizedly modified.

Proof of Account Ownership:
1. Epic Display Name: [YOUR_DISPLAY_NAME]
2. Original account registration email: [ORIGINAL_EMAIL]
3. Safe new email for recovery: [NEW_SAFE_EMAIL]
4. First Purchase Invoice / Invoice ID (Starts with 'A'): [INVOICE_ID]
5. Connected external platforms: [PSN / Xbox / Nintendo / Steam]

Attached is my authentic purchase receipt. Please help restore my account and secure it with the provided new email address.

Thank you,
[YOUR_NAME]`,
      },
    },
    {
      id: 'pubg',
      name: 'PUBG Mobile & KRAFTON ID',
      publisher: 'KRAFTON / Level Infinite',
      genre: 'Battle Royale',
      badge: 'UC & Account Phishing',
      badgeColor: 'orange',
      icon: '🪖',
      iconImage: '/images/games/pubg.svg',
      officialSupportUrl: 'https://support.pubg.com/',
      officialSupportLabel: 'Official KRAFTON Player Support Portal',
      emergencyFirstAction: 'Open PUBG Mobile -> Settings -> Basic -> Social Bindings. If an intruder added an unauthorized secondary social link, submit an unbinding request through in-game customer service.',
      whereToClickSteps: [
        {
          stepNumber: 1,
          title: 'Access In-Game Customer Service',
          instruction: 'In the PUBG Mobile lobby, tap the bottom right arrow icon and choose "Customer Service".',
          targetButtonOrLink: 'Arrow icon -> "Customer Service"',
        },
        {
          stepNumber: 2,
          title: 'Select Stolen Account Topic',
          instruction: 'Tap the top-right chat icon and choose "Account & Login" -> "Account Stolen / Lost".',
          targetButtonOrLink: 'Section "Account Stolen / Lost"',
        },
        {
          stepNumber: 3,
          title: 'Submit Player UID and Top-Up Records',
          instruction: 'Enter your 9-11 digit player UID, registration timeframe, and attach your latest UC purchase receipts.',
          targetButtonOrLink: 'PUBG Mobile Verification Form',
        },
      ],
      ownershipProofs: [
        {
          id: 'pubg_uid',
          label: 'Numeric Player UID',
          description: 'Unique 9-11 digit account number (e.g. 5123456789).',
          required: true,
        },
        {
          id: 'pubg_uc_receipt',
          label: 'UC Purchase Receipt',
          description: 'Digital receipt from Google Play, Apple App Store, or Midasbuy.',
          required: true,
        },
      ],
      mitigationsByCompromise: {
        password_credentials: 'Change password on linked social accounts (Google, Apple, Twitter).',
        trade_intercept: 'Never give account credentials for regional UC top-up schemes.',
      },
      ticketTemplate: {
        subject: 'Hacked PUBG Mobile Account Recovery Request: UID [YOUR_UID]',
        body: `Dear PUBG Mobile / KRAFTON Support,

My PUBG Mobile account was hijacked on [INCIDENT_DATE] and an unauthorized third-party social account was linked without my consent.

Ownership Verification Details:
1. Player UID: [YOUR_UID]
2. In-Game Name: [IN_GAME_NAME]
3. Primary Device Model: [DEVICE_MODEL]
4. UC Purchase Receipt / Order ID (Google Play / Apple / Midasbuy): [ORDER_ID]
5. Approximate Account Registration Date: [DATE]

I have attached authentic payment receipts confirming ownership. Please unlink unauthorized social bindings and assist in restoring full access.

Sincerely,
[YOUR_NAME]`,
      },
      englishTicketTemplate: {
        subject: 'Hacked PUBG Mobile Account Recovery Request: UID [YOUR_UID]',
        body: `Dear PUBG Mobile / KRAFTON Support,

My PUBG Mobile account was hijacked on [INCIDENT_DATE] and an unauthorized third-party social account was linked without my consent.

Ownership Verification Details:
1. Player UID: [YOUR_UID]
2. In-Game Name: [IN_GAME_NAME]
3. Primary Device Model: [DEVICE_MODEL]
4. UC Purchase Receipt / Order ID (Google Play / Apple / Midasbuy): [ORDER_ID]
5. Approximate Account Registration Date: [DATE]

I have attached authentic payment receipts confirming ownership. Please unlink unauthorized social bindings and assist in restoring full access.

Sincerely,
[YOUR_NAME]`,
      },
    },
    {
      id: 'genshin',
      name: 'Genshin Impact & HoYoverse',
      publisher: 'HoYoverse (COGNOSPHERE)',
      genre: 'Action RPG & Gacha',
      badge: 'UID & Top-Up Receipt Theft',
      badgeColor: 'violet',
      icon: '✨',
      iconImage: '/images/games/genshin.svg',
      officialSupportUrl: 'https://account.hoyoverse.com/',
      officialSupportLabel: 'Official HoYoverse Account Portal',
      emergencyFirstAction: 'Open https://account.hoyoverse.com/#/account/safety -> Login Devices -> delete all unrecognized devices immediately to disconnect unauthorized sessions.',
      whereToClickSteps: [
        {
          stepNumber: 1,
          title: 'Email HoYoverse Support',
          instruction: 'Send an email to support_os@hoyoverse.com with the exact subject line: "Account Recovery Form".',
          targetButtonOrLink: 'Email to support_os@hoyoverse.com',
        },
        {
          stepNumber: 2,
          title: 'Receive Issue Application Link',
          instruction: 'Within minutes, HoYoverse will reply with a unique link to the "HoYoverse Issue Application Form".',
          targetButtonOrLink: 'Application Form link from email',
        },
        {
          stepNumber: 3,
          title: 'Complete Device & UID Metrics',
          instruction: 'Enter your 9-digit UID, server, registration date, and specs of the first PC/phone used to register.',
          targetButtonOrLink: 'HoYoverse Application Form fields',
        },
        {
          stepNumber: 4,
          title: 'Upload Earliest Purchase Receipt',
          instruction: 'Attach the digital receipt of your VERY FIRST in-game purchase (Blessing of the Welkin Moon or Genesis Crystals).',
          targetButtonOrLink: 'First Purchase Receipt upload',
        },
      ],
      ownershipProofs: [
        {
          id: 'genshin_uid',
          label: '9-Digit In-Game UID',
          description: 'Unique UID number displayed in the bottom right corner of the screen.',
          required: true,
        },
        {
          id: 'first_topup',
          label: 'Earliest In-Game Top-Up Receipt',
          description: 'Receipt for the first purchase made on the account with date, currency, and transaction ID.',
          required: true,
        },
        {
          id: 'registration_device',
          label: 'Registration Device Hardware Specs',
          description: 'Exact CPU, GPU, and RAM of PC or exact smartphone model upon initial registration.',
          required: true,
        },
      ],
      mitigationsByCompromise: {
        password_credentials: 'Change password on https://account.hoyoverse.com/ and enable 2FA.',
        malware_rat: 'If you installed third-party skin mods or trainers, clean your PC and reset credentials immediately.',
      },
      ticketTemplate: {
        subject: 'Account Recovery Form: Genshin Impact UID [YOUR_UID]',
        body: `Dear HoYoverse Support Team,

My Genshin Impact account was compromised on [INCIDENT_DATE] and the linked email address was unauthorizedly changed.

Account Ownership Verification Details:
1. In-Game UID: [YOUR_UID]
2. Server: [Europe / America / Asia / TW, HK, MO]
3. Original registration email: [ORIGINAL_EMAIL]
4. New safe email for account restoration: [NEW_SAFE_EMAIL]
5. Exact Account Registration Date: [DATE]
6. First Login Device Specs: [CPU, GPU, RAM or Exact Phone Model]
7. First Purchase Order Number and Date: [ORDER_NUMBER_AND_DATE]

Attached is the authentic receipt of my first in-game purchase. Please provide the HoYoverse Issue Application Form link to help me regain access.

Thank you for your assistance,
[YOUR_NAME]`,
      },
      englishTicketTemplate: {
        subject: 'Account Recovery Form: Genshin Impact UID [YOUR_UID]',
        body: `Dear HoYoverse Support Team,

My Genshin Impact account was compromised on [INCIDENT_DATE] and the linked email address was unauthorizedly changed.

Account Ownership Verification Details:
1. In-Game UID: [YOUR_UID]
2. Server: [Europe / America / Asia / TW, HK, MO]
3. Original registration email: [ORIGINAL_EMAIL]
4. New safe email for account restoration: [NEW_SAFE_EMAIL]
5. Exact Account Registration Date: [DATE]
6. First Login Device Specs: [CPU, GPU, RAM or Exact Phone Model]
7. First Purchase Order Number and Date: [ORDER_NUMBER_AND_DATE]

Attached is the authentic receipt of my first in-game purchase. Please provide the HoYoverse Issue Application Form link to help me regain access.

Thank you for your assistance,
[YOUR_NAME]`,
      },
    },
  ],
};
