export interface GameThreatScenario {
  title: string;
  threatType: string;
  summary: string;
  howItWorks: string[];
  redFlags: string[];
}

export interface GameQuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface GameOfficialResource {
  title: string;
  url: string;
  description: string;
}

export interface GameSecurityProfile {
  slug: string;
  title: string;
  subtitle: string;
  genre: string;
  platforms: string[];
  riskBadge: string;
  riskColor: 'orange' | 'cyan' | 'violet' | 'lime' | 'red';
  colorTheme: {
    accent: string;
    border: string;
    bgGlow: string;
    heroGradient: string;
  };
  cardDescription: string;
  commonRiskTags: string[];
  svgArtwork: string;
  scamScenarios: GameThreatScenario[];
  whatNotToShare: string[];
  protectionChecklist: string[];
  paymentSafetyGuidelines: string[];
  incidentSteps: string[];
  officialResources: GameOfficialResource[];
  relatedArticleSlugs: string[];
  quiz: GameQuizQuestion[];
  lastAuditedDate: string;
  verificationStatus: string;
}

export const GAMES_DATA: Record<'en' | 'ru', GameSecurityProfile[]> = {
  en: [
    {
      slug: 'cs2-steam',
      title: 'Counter-Strike 2 & Steam',
      subtitle: 'Skin trading traps, counterfeit Steam login popups, and API key interception safeguards.',
      lastAuditedDate: 'October 2026',
      verificationStatus: 'Verified by SafeInGame Security Labs',
      genre: 'Tactical FPS & Economy',
      platforms: ['PC (Steam)'],
      riskBadge: 'High Trading & Phishing Vector',
      riskColor: 'orange',
      colorTheme: {
        accent: '#FFAD66',
        border: 'border-orange-500/40',
        bgGlow: 'rgba(255, 173, 102, 0.15)',
        heroGradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
      },
      cardDescription: 'Valve virtual items hold substantial real-world monetary value, making CS2 players prime targets for Browser-in-the-Browser phishing, fake tournament votes, and Steam API scams.',
      commonRiskTags: ['Steam API Hijacking', 'BitB Phishing Popups', 'Counterfeit Trades', 'Fake Middlemen'],
      svgArtwork: 'cs2',
      scamScenarios: [
        {
          title: 'The Steam Web API Key Trade Interception',
          threatType: 'API Interception / Automated Bot Clones',
          summary: 'Scammers secretly generate an API developer key in your Steam account, then use an automated bot to cancel your genuine trades and re-send duplicate trades to their imposter profile.',
          howItWorks: [
            'You previously entered your Steam login on an unverified tournament or case opening site.',
            'The malicious site secretly registered a developer API key under your profile settings.',
            'When you initiate a legitimate trade offer to a friend or marketplace bot, the attacker’s bot detects it within milliseconds via the API.',
            'The bot instantly cancels your outgoing trade and sends an identical trade offer to an imposter account with your friend’s avatar and name.',
            'If you approve the mobile confirmation without inspecting the trade partner registration date, your skins are transferred to the scammer.'
          ],
          redFlags: [
            'A trade offer is cancelled automatically without your explicit action.',
            'The trade partner has an identical avatar and nickname, but their Steam Level is 0 or account creation date is today.',
            'An unexpected key exists on steamcommunity.com/dev/apikey when you are not a programmer.'
          ]
        },
        {
          title: 'Fake Tournament Team Voting Links',
          threatType: 'Phishing & Fake Single Sign-On',
          summary: 'A casual acquaintance or friend asks you to vote for their competitive roster on a counterfeit Faceit or custom tournament website.',
          howItWorks: [
            'An attacker compromises a user on your friend list and sends direct messages: "Hey, can you vote for our team so we can qualify for the tournament finals?"',
            'The link opens a realistic clone of a competitive platform.',
            'Clicking "Vote" opens a counterfeit Browser-in-the-Browser Steam login window showing a fake padlock and fake address bar.',
            'Submitting credentials immediately passes your password and 2FA code to automated credential harvesting bots.'
          ],
          redFlags: [
            'Unsolicited messages from acquaintances demanding urgent votes.',
            'The popup login window cannot be dragged outside the main browser tab.',
            'A site prompts you to type username/password even though you are already logged into Steam in another tab.'
          ]
        },
        {
          title: 'Fake "Accidental Report" Admin Extortion',
          threatType: 'Social Engineering Impersonation',
          summary: 'A scammer claims they accidentally reported your account for item fraud and insists you must contact a Discord "Steam Support Moderator".',
          howItWorks: [
            'You receive messages on Steam or Discord claiming someone reported your profile by mistake and you will be banned in 2 hours.',
            'They provide a Discord tag for a fake "Valve employee" who sends forged database certificates.',
            'The fake admin demands that you transfer your valuable items to a "secure valve quarantine server" to prove innocence.',
            'In reality, Valve employees never communicate via Discord, and Steam never bans accounts based on single reports.'
          ],
          redFlags: [
            'Urgent ban threats demanding communication outside Steam’s official help portal.',
            'Anyone claiming to be Valve staff on Discord, Telegram, or Steam chat.',
            'Requests to trade items to "check" or "verify" their legitimacy.'
          ]
        }
      ],
      whatNotToShare: [
        'Steam Guard Mobile Authenticator 5-character confirmation codes.',
        'Steam Guard SMS backup recovery codes.',
        'Steam Web API keys generated under developer settings.',
        'Session cookies (steamLoginSecure) extracted from browser inspect tools.',
        'Gift card activation codes or initial wallet recharge receipts.'
      ],
      protectionChecklist: [
        'Enable Steam Mobile Authenticator via the official Steam app on iOS or Android.',
        'Check steamcommunity.com/dev/apikey regularly. If you see an authorized key and did not create it yourself, click "Revoke My Steam Web API Key".',
        'Always verify trade confirmation details on your phone: check recipient account age, trade count, and item float.',
        'Never click external tournament or team voting links sent in chat.',
        'Secure the recovery email linked to Steam with a distinct password and hardware/app 2FA.'
      ],
      paymentSafetyGuidelines: [
        'Only purchase Steam Wallet funds directly through Steam or authorized retail gift card vendors.',
        'Never buy skins from unverified third parties via direct bank transfer, cryptocurrency, or gift cards with no escrow.',
        'Be wary of websites offering 30-40% discounts on Steam balance; funds are frequently sourced from stolen credit cards.'
      ],
      incidentSteps: [
        'Step 1: Go to steamcommunity.com/dev/apikey and revoke any unauthorized API keys immediately.',
        'Step 2: Change your Steam password and click "Deauthorize all other devices" in Steam Account Security.',
        'Step 3: Secure your email account (change master password, review forwarding rules).',
        'Step 4: Create a ticket through official support at help.steampowered.com with proof of ownership (e.g. CD keys or bank transaction IDs).',
        'Step 5: Alert friends not to click links or accept trades from your profile.'
      ],
      officialResources: [
        {
          title: 'Steam Official Support Portal',
          url: 'https://help.steampowered.com',
          description: 'Official Valve portal for recovering hijacked profiles, investigating missing items, and updating credentials.'
        },
        {
          title: 'Steam Community Trading Guidelines',
          url: 'https://help.steampowered.com/en/faqs/view/3B6E-B322-2400-8D24',
          description: 'Valve’s definitive policy on item scams, trade reversals, and safe peer-to-peer exchange.'
        },
        {
          title: 'Steam Web API Key Management',
          url: 'https://steamcommunity.com/dev/apikey',
          description: 'Direct portal to inspect and revoke unauthorized developer API keys associated with your account.'
        }
      ],
      relatedArticleSlugs: ['safe-trading-in-game-items', 'how-to-spot-gaming-phishing', 'gaming-account-recovery-scams'],
      quiz: [
        {
          question: 'A friend on Steam sends a link: "Vote for my team so we qualify for the semi-finals!" What is the safest response?',
          options: [
            'Click the link and quickly sign in with your Steam password.',
            'Decline and verify with your friend through a separate channel (voice or phone) to check if their account was compromised.',
            'Type a fake password on the site to see if it lets you in.',
            'Send your Steam Guard code to the tournament organizer.'
          ],
          correctIndex: 1,
          explanation: 'Tournament team voting is one of the most common phishing lures. The friend’s account was likely already hijacked by an automated script.'
        },
        {
          question: 'What does a Steam Web API Key do if a scammer gets access to it?',
          options: [
            'It lets them automatically cancel your trades and resend cloned trades to imposter bots.',
            'It changes your Steam password automatically without notification.',
            'It buys games automatically using your credit card.',
            'It deletes your Steam games library permanently.'
          ],
          correctIndex: 0,
          explanation: 'Steam Web API keys allow programmatic monitoring of outgoing trades. Attackers use this to execute the "API Scam", cancelling trades and swapping them with lookalike bots.'
        },
        {
          question: 'A Discord user with a Valve logo profile picture claims your account was reported and will be banned in 2 hours unless you trade your inventory. What should you do?',
          options: [
            'Trade your items to a trusted friend immediately.',
            'Send your item screenshots to the Discord admin.',
            'Block and report the user; Valve staff never mediate bans or communicate through Discord.',
            'Pay the admin a verification deposit.'
          ],
          correctIndex: 2,
          explanation: 'Real game moderators and Valve employees never communicate through Discord, and never ask users to transfer items for verification.'
        }
      ]
    },
    {
      slug: 'brawl-stars',
      title: 'Brawl Stars',
      subtitle: 'Supercell ID phishing traps, fake gem generators, and account-selling scams.',
      lastAuditedDate: 'October 2026',
      verificationStatus: 'Verified by SafeInGame Security Labs',
      genre: 'Mobile Hero Shooter',
      platforms: ['iOS', 'Android'],
      riskBadge: 'High Account Takeover & Fake Currency Risk',
      riskColor: 'cyan',
      colorTheme: {
        accent: '#27D8E8',
        border: 'border-cyan-500/40',
        bgGlow: 'rgba(39, 216, 232, 0.15)',
        heroGradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
      },
      cardDescription: 'Younger players are frequently lured by YouTube/TikTok videos promising thousands of free gems, fraudulent Supercell ID verification code requests, and illicit account trading.',
      commonRiskTags: ['Fake Gem Generators', 'Supercell ID Code Theft', 'Account Trading Fraud', 'Parental Card Abuse'],
      svgArtwork: 'brawlstars',
      scamScenarios: [
        {
          title: 'The "Free 2000 Gems Generator" Portal',
          threatType: 'Credential Phishing & Survey Fraud',
          summary: 'Websites and TikTok videos claim to inject unlimited gems or free Brawl Passes into your game tag in exchange for your Supercell ID email.',
          howItWorks: [
            'A video displays animated fake counters adding 10,000 gems to an account.',
            'The site asks for your player tag and associated Supercell ID email.',
            'The scammer immediately triggers a real Supercell ID login from their device, which sends a 6-digit verification code to your email.',
            'The fake site prompts: "To complete verification and receive your gems, enter the 6-digit confirmation code we sent to your email."',
            'Once you enter the code, the scammer logs in, changes the email or phone number, and locks you out forever.'
          ],
          redFlags: [
            'Any website promising free gems, skins, or Brawl Passes outside the official game app.',
            'Requests to enter confirmation codes sent to your email by Supercell.',
            'Offers requiring you to complete "human verification" downloads.'
          ]
        },
        {
          title: 'Account Buying, Selling & "Boosting" Traps',
          threatType: 'Account-Trading Extortion & Recovery Fraud',
          summary: 'Sellers on Discord or Telegram advertise maxed-out Brawl Stars accounts for cheap prices, or offer to push your trophies for free.',
          howItWorks: [
            'A player pays $20 for an account with all Legendaries unlocked.',
            'The seller hands over temporary access. After a few days, the seller contacts Supercell Support claiming their account was hijacked and provides original purchase receipts.',
            'Supercell restores the account to the original owner, or bans the account entirely for Terms of Service violations (account sharing is prohibited).',
            'The buyer loses both their money and the account.'
          ],
          redFlags: [
            'Social media accounts offering cheap maxed Brawl Stars accounts.',
            'People offering to "push your trophies" if you give them your Supercell ID login code.',
            'Requests to pay via gift cards, crypto, or peer-to-peer transfers.'
          ]
        },
        {
          title: 'Fake Creator Code & Content Creator Giveaways',
          threatType: 'Impersonation & Rogue Links',
          summary: 'Scammers impersonate popular creators (like KairosTime or Lex) on social media, claiming you won a rare skin giveaway.',
          howItWorks: [
            'Bots leave comments under YouTube videos or message you on Telegram claiming to be the content creator.',
            'They send a link to "claim your creator giveaway code".',
            'The website asks for your Supercell ID email and verification code to deliver the prize.',
            'Your account is taken over and transferred to account-selling networks.'
          ],
          redFlags: [
            'Unverified creator channels with slightly misspelled handles.',
            'Any giveaway asking for login codes or account passwords.',
            'Requirements to pay shipping or claim fees for virtual digital items.'
          ]
        }
      ],
      whatNotToShare: [
        'The 6-digit Supercell ID verification code sent to your email address.',
        'Your Supercell ID recovery backup codes.',
        'Screenshots of your email inbox or verification codes.',
        'Parental credit card numbers, CVVs, or bank verification SMS codes.',
        'Your account login credentials with clan mates or friends.'
      ],
      protectionChecklist: [
        'Activate Supercell ID Account Protection (SMS or Authenticator verification plus 3 recovery codes) in game settings.',
        'Store the 3 Supercell ID recovery codes in a secure, non-digital location (e.g. written in a notebook).',
        'Never share Supercell ID verification codes with anyone—Supercell staff will never ask for them.',
        'Enable purchase approval/passwords on Google Play or Apple App Store to prevent unauthorized microtransactions.',
        'Never participate in account buying, selling, or sharing, which directly violates Supercell Terms of Service.'
      ],
      paymentSafetyGuidelines: [
        'Only purchase gems through the official in-game store or the verified Supercell Store (store.supercell.com).',
        'Never use third-party "cheap top-up" services; gifts funded with stolen credit cards lead to permanent negative balance bans.',
        'Parents should set up Screen Time (iOS) or Family Link (Android) to require parental approval for every in-game transaction.'
      ],
      incidentSteps: [
        'Step 1: Open Brawl Stars, tap Settings > Help & Support > Account > Recover My Account.',
        'Step 2: Use the automated support bot (Otto) and select "I lost my Supercell ID".',
        'Step 3: Provide legitimate proof of ownership: player tag, exact account name, level, clan name, and original purchase transaction receipts from Apple or Google.',
        'Step 4: If you suspect fraudulent charges on your parent’s card, inform parents immediately to contact the bank and Google/Apple support.'
      ],
      officialResources: [
        {
          title: 'Supercell Official Support Portal',
          url: 'https://support.supercell.com',
          description: 'Official guides for recovering lost Supercell ID accounts and setting up account protection.'
        },
        {
          title: 'Official Supercell Store',
          url: 'https://store.supercell.com',
          description: 'The only verified official web store for purchasing in-game gems and passes directly from Supercell.'
        },
        {
          title: 'Supercell ID Account Protection Guide',
          url: 'https://support.supercell.com/brawl-stars/en/articles/supercell-id-account-protection.html',
          description: 'Step-by-step instructions for activating SMS and authenticator-backed protection on your Supercell ID.'
        }
      ],
      relatedArticleSlugs: ['fake-giveaways-and-free-rewards', 'gaming-currency-and-payment-safety', 'social-engineering-in-online-games'],
      quiz: [
        {
          question: 'A website promises 5,000 free Gems and asks for the 6-digit code Supercell just sent to your email. What should you do?',
          options: [
            'Enter the code quickly before it expires.',
            'Never share the code. That code allows someone to log into your account and steal it.',
            'Ask your friend to try the website first.',
            'Share only the first 3 digits of the code.'
          ],
          correctIndex: 1,
          explanation: 'The 6-digit code is an authentication key that logs someone directly into your Supercell ID. Legitimate rewards never require your verification code.'
        },
        {
          question: 'Is it safe to buy a maxed-out Brawl Stars account from a Discord seller for $15?',
          options: [
            'Yes, if the seller has positive reviews.',
            'No. The original owner can reclaim the account anytime, and account selling violates the Terms of Service, causing permanent bans.',
            'Yes, if you change the nickname immediately.',
            'Yes, as long as you pay with cryptocurrency.'
          ],
          correctIndex: 1,
          explanation: 'Account selling is prohibited by Supercell. Sellers frequently reclaim accounts using original payment receipts, leaving buyers with nothing.'
        },
        {
          question: 'Where is the ONLY legitimate place to purchase Gems and Brawl Passes outside the game app?',
          options: [
            'Any Telegram bot with good discounts.',
            'The official Supercell Store at store.supercell.com.',
            'Third-party key resale websites.',
            'Discord trading servers.'
          ],
          correctIndex: 1,
          explanation: 'Supercell’s official web store (store.supercell.com) is the only authorized web storefront for direct Supercell game currency purchases.'
        }
      ]
    },
    {
      slug: 'pubg',
      title: 'PUBG & PUBG Mobile',
      subtitle: 'Third-party UC discounts, crate reward phishing, and fraudulent tournament claims.',
      lastAuditedDate: 'October 2026',
      verificationStatus: 'Verified by SafeInGame Security Labs',
      genre: 'Battle Royale',
      platforms: ['PC', 'Console', 'Mobile'],
      riskBadge: 'High Payment Fraud & Account Phishing Risk',
      riskColor: 'violet',
      colorTheme: {
        accent: '#A78BFA',
        border: 'border-violet-500/40',
        bgGlow: 'rgba(167, 139, 250, 0.15)',
        heroGradient: 'from-violet-500/20 via-purple-500/10 to-transparent',
      },
      cardDescription: 'Players seeking Unknown Cash (UC), Glacier weapon skins, and Royale Passes are targeted with counterfeit top-up pages, credential harvesters, and stolen card chargebacks.',
      commonRiskTags: ['Fake UC Generators', 'Counterfeit Top-Up Sites', 'Tournament Phishing', 'Chargeback Bans'],
      svgArtwork: 'pubg',
      scamScenarios: [
        {
          title: 'Counterfeit "Midasbuy" and UC Top-Up Sites',
          threatType: 'Payment Phishing & Fake Portals',
          summary: 'Scam websites mimic the official Midasbuy top-up interface, advertising 70% bonus UC to steal credit card credentials and social logins.',
          howItWorks: [
            'Scammers place sponsored ads on search engines for terms like "cheap pubg uc top up".',
            'The phishing site closely replicates the design of Midasbuy or Krafton storefronts.',
            'When you click to purchase, it prompts for your Facebook, Twitter, or Google login to "bind" the UC.',
            'The site captures your credentials, harvests your payment card details, and delivers zero currency.'
          ],
          redFlags: [
            'Unrealistic bonus promotions (e.g. "Buy 600 UC, Get 6000 UC Free!").',
            'Slightly misspelled URLs (e.g. midasbuy-pubg-reward.top instead of midasbuy.com).',
            'Requests for social media passwords to credit currency.'
          ]
        },
        {
          title: 'Fake Glacier M416 / Mythic Crate Redeem Sites',
          threatType: 'Phishing & Fake Code Redemptions',
          summary: 'Deceptive social media posts claim Krafton is giving away free Glacier weapon skins or Mythic outfits via a promotional redemption website.',
          howItWorks: [
            'Scammers distribute redemption codes on Instagram or YouTube with high-production mockups.',
            'The redemption page requires logging in via your linked social media account (Twitter, Facebook, Apple, or Google).',
            'Once you enter your login credentials, the scammer takes over your linked social profile and unbinds your PUBG Mobile account.'
          ],
          redFlags: [
            'Websites asking for social network login credentials to redeem in-game codes.',
            'Promotions offering ultra-rare items for free without any official announcement from @PUBGMOBILE.',
            'Domains ending in strange extensions (.xyz, .top, .club, .tk).'
          ]
        },
        {
          title: 'Competitive Scrim & Tournament Registration Fraud',
          threatType: 'Credential Phishing & Infostealers',
          summary: 'Fake tournament organizers invite teams to custom scrims but require downloading custom anti-cheat clients or registering through deceptive portals.',
          howItWorks: [
            'A competitive team receives an invitation to a prize-pool tournament via Discord.',
            'The organizer insists all players must install a custom anti-cheat utility (.zip or .exe).',
            'Executing the file launches an infostealer trojan that harvests all browser credentials, Steam sessions, and payment tokens.',
            'Alternatively, the team registration portal asks for game login credentials.'
          ],
          redFlags: [
            'Organizers requiring downloads of executable files or custom Discord bots.',
            'Prize pools that seem disproportionately large for unverified community tournaments.',
            'Direct message invitations from unverified Discord accounts.'
          ]
        }
      ],
      whatNotToShare: [
        'Passwords for social accounts linked to PUBG (Twitter, Facebook, Google, Apple ID).',
        'Two-factor authentication SMS codes or authenticator tokens.',
        'Payment card security codes (CVV) on unverified websites.',
        'Game login session credentials with third-party top-up vendors.',
        'Screen sharing during account login or verification workflows.'
      ],
      protectionChecklist: [
        'Link your PUBG Mobile account to at least two different platforms (e.g. Google Play + Twitter) with multi-factor authentication enabled on both.',
        'Verify Midasbuy URLs meticulously—only purchase through the verified domain midasbuy.com.',
        'Never install custom "anti-cheat patches" or voice software sent via direct message for community tournaments.',
        'Audit authorized apps in your Facebook and Google security settings periodically and remove unused permissions.',
        'Use virtual cards with spending limits for mobile and gaming purchases.'
      ],
      paymentSafetyGuidelines: [
        'Only purchase UC through in-game stores or the officially authorized regional partner Midasbuy.',
        'Be aware that accounts receiving UC gifts funded with stolen credit cards will face negative balance locks or permanent bans.',
        'Legitimate publishers do not require bank account details or card PINs to deliver contest prizes.'
      ],
      incidentSteps: [
        'Step 1: If your linked social account was compromised, immediately recover it through Facebook/Google/Twitter account security first.',
        'Step 2: In PUBG Mobile, go to Settings > Customer Service > Account Lost / Unlink Request.',
        'Step 3: Submit proof of ownership: player UID, registered character nickname, account creation date, and early payment transaction receipts.',
        'Step 4: If payment details were entered on a phishing site, call your bank immediately to freeze the card.'
      ],
      officialResources: [
        {
          title: 'PUBG Official Support (PC & Console)',
          url: 'https://support.pubg.com',
          description: 'Official Krafton support portal for technical troubleshooting, account issues, and reporting.'
        },
        {
          title: 'PUBG Mobile Official Customer Service',
          url: 'https://pubgmobile.com',
          description: 'Official portal and customer service links for mobile player inquiries and account recovery.'
        },
        {
          title: 'Midasbuy Authorized Top-Up Center',
          url: 'https://www.midasbuy.com',
          description: 'The officially authorized global web top-up partner for PUBG Mobile Unknown Cash (UC).'
        }
      ],
      relatedArticleSlugs: ['how-to-spot-gaming-phishing', 'gaming-currency-and-payment-safety', 'what-to-do-after-a-gaming-scam'],
      quiz: [
        {
          question: 'A website offers 6,000 UC for $10 (normally $100) and asks for your Facebook login. What should you conclude?',
          options: [
            'It is a special limited holiday flash sale.',
            'It is a phishing site designed to steal your linked Facebook credentials and take over your game account.',
            'It is safe if you change your password right after.',
            'It is legitimate because Midasbuy sometimes gives discounts.'
          ],
          correctIndex: 1,
          explanation: 'Discounts of 70-90% are impossible through legitimate channels. The site is a credential harvester aiming to steal your social media login.'
        },
        {
          question: 'What happens if a third-party seller uses a stolen credit card to top up your PUBG account with UC?',
          options: [
            'You get to keep the items and only the seller gets banned.',
            'The card owner files a chargeback, and your account receives a negative balance ban until you pay the full amount out-of-pocket.',
            'Krafton refunds the card owner and gives you bonus UC.',
            'Nothing happens if you spend the UC immediately.'
          ],
          correctIndex: 1,
          explanation: 'Publishers hold the receiving account responsible for fraudulent chargebacks. Your account will be locked with a negative balance.'
        },
        {
          question: 'What is the safest way to register for a competitive PUBG tournament?',
          options: [
            'Download and run the custom anti-cheat utility sent by the organizer on Discord.',
            'Register only through verified platforms (e.g. ESL, Faceit) and never download executable files from unverified third parties.',
            'Provide your Steam password so they can verify your account rank.',
            'Disable your antivirus software so the tournament plugin works.'
          ],
          correctIndex: 1,
          explanation: 'Never download executable files (.exe, .zip) from community Discord organizers. Phishers use fake anti-cheats as infostealer malware.'
        }
      ]
    },
    {
      slug: 'roblox',
      title: 'Roblox',
      subtitle: 'Cookie theft (.ROBLOSECURITY), fake Robux generators, rogue browser extensions, and trade scams.',
      lastAuditedDate: 'October 2026',
      verificationStatus: 'Verified by SafeInGame Security Labs',
      genre: 'Metaverse & Creation Platform',
      platforms: ['PC', 'Mobile', 'Console'],
      riskBadge: 'High Account Hijacking & Browser Extension Risk',
      riskColor: 'orange',
      colorTheme: {
        accent: '#EF4444',
        border: 'border-red-500/40',
        bgGlow: 'rgba(239, 68, 68, 0.15)',
        heroGradient: 'from-red-500/20 via-orange-500/10 to-transparent',
      },
      cardDescription: 'Roblox accounts are targeted with cookie theft (.ROBLOSECURITY), malicious Chrome browser extensions claiming to assist trading, fake Robux surveys, and beam scams.',
      commonRiskTags: ['Cookie Theft (.ROBLOSECURITY)', 'Malicious Extensions', 'Fake Robux Generators', 'Limited Item Swaps'],
      svgArtwork: 'roblox',
      scamScenarios: [
        {
          title: 'The ".ROBLOSECURITY" Cookie Beam Scam',
          threatType: 'Session Token Theft / Cookie Stealing',
          summary: 'Scammers trick players into copying and sharing a javascript code snippet or HAR archive, which exposes their master session cookie.',
          howItWorks: [
            'An attacker offers to make you a free 3D render of your avatar or trade for your limited items on Discord.',
            'They instruct you: "Open developer tools (F12) > Network > right-click and Save as HAR with Content to export your avatar texture."',
            'Or they tell you to paste a snippet starting with "javascript:" into your browser bar.',
            'The HAR file or script extracts the sensitive `.ROBLOSECURITY` cookie.',
            'With this cookie, the attacker bypasses your password, two-step verification, and logs into your account instantly on their machine.'
          ],
          redFlags: [
            'Anyone asking you to open developer tools (F12) or export a `.har` file.',
            'Instructions to bookmark or paste scripts starting with `javascript:`.',
            'Strangers offering free GFX renders of your avatar requiring internal website files.'
          ]
        },
        {
          title: 'Malicious Trading & "BTRoblox" Clone Extensions',
          threatType: 'Browser Extension Malware',
          summary: 'Fake browser extensions on the Chrome Web Store claiming to calculate trade values or notify of limited item drops steal inventory items.',
          howItWorks: [
            'Attackers publish extensions imitating reputable tools like BTRoblox or RoPro.',
            'Once installed, the rogue extension waits for you to visit a trade page.',
            'It silently modifies the trade offer payload in the background, adding your most valuable limited items to the scammer’s side without your visual notice.',
            'Some rogue extensions siphon your `.ROBLOSECURITY` cookie directly to command-and-control servers.'
          ],
          redFlags: [
            'Extensions with very few reviews, recently uploaded, or published by unknown developer names.',
            'Extensions requiring permissions to "Read and change all your data on all websites".',
            'People on Discord insisting you must install a specific extension to trade with them.'
          ]
        },
        {
          title: 'Free Robux Generators & Survey Portals',
          threatType: 'Survey Fraud & Account Phishing',
          summary: 'Flashy websites promise thousands of Robux for completing simple quizzes or entering account credentials.',
          howItWorks: [
            'Websites like "free-robux-2026.app" claim to have a glitch that injects Robux directly into accounts.',
            'Users are prompted for their username and password, or made to download suspicious mobile apps.',
            'The credentials are used to compromise the account, drain limited items, and spam the scam to all your friends.'
          ],
          redFlags: [
            'Any claim of free Robux generation (Robux can only be earned through creating games, selling assets, or buying them).',
            'Prompts asking for your account password to credit currency.',
            'Websites featuring fake live chat widgets claiming other users just received Robux.'
          ]
        }
      ],
      whatNotToShare: [
        'The `.ROBLOSECURITY` cookie value under any circumstances.',
        'HAR archive files exported from your browser network tab.',
        'Your 2-Step Verification codes or authenticator app backup codes.',
        'Your account password, even with close online friends or family.',
        'Parental PIN numbers configured in account settings.'
      ],
      protectionChecklist: [
        'Enable 2-Step Verification using an Authenticator App (Google Authenticator, Microsoft Authenticator) in Settings > Security.',
        'Enable an Account PIN (Parental Controls) to lock account settings and prevent unauthorized email or password changes.',
        'Only install browser extensions from verified, reputable developers with hundreds of thousands of established reviews.',
        'Never paste code into your browser console (F12) or export HAR files for strangers.',
        'Log out of all other sessions periodically using Settings > Security > Secure Sign Out.'
      ],
      paymentSafetyGuidelines: [
        'Purchase Robux only through the official Roblox website (roblox.com), mobile apps, or official retail gift cards.',
        'Set up monthly spending restrictions in Parental Controls to avoid accidental or unauthorized card charges.',
        'Avoid third-party Robux sellers; Roblox actively deletes accounts associated with unauthorized currency transfers.'
      ],
      incidentSteps: [
        'Step 1: If you suspect cookie theft, immediately click "Sign out of all other sessions" in Settings > Security. This invalidates your current `.ROBLOSECURITY` cookie.',
        'Step 2: Change your password immediately to force session revocation across all devices.',
        'Step 3: Contact Roblox Support at roblox.com/support under "Account Hacked or Can’t Log In".',
        'Step 4: Provide original email address, registration details, and gift card or billing receipts for verification.'
      ],
      officialResources: [
        {
          title: 'Roblox Official Support Portal',
          url: 'https://www.roblox.com/support',
          description: 'Official portal for submitting account recovery requests, reporting scams, and billing inquiries.'
        },
        {
          title: 'Roblox Account Security Guidelines',
          url: 'https://en.help.roblox.com/hc/en-us/articles/203313390',
          description: 'Official security best practices from Roblox Corporation on securing profiles and preventing takeover.'
        },
        {
          title: 'Roblox Parental Controls Guide',
          url: 'https://en.help.roblox.com/hc/en-us/articles/360000375686',
          description: 'Official documentation for setting account PINs, spending limits, and age-appropriate content filters.'
        }
      ],
      relatedArticleSlugs: ['how-to-secure-your-gaming-account', 'fake-giveaways-and-free-rewards', 'what-to-do-after-a-gaming-scam'],
      quiz: [
        {
          question: 'A Discord user offers to make a free 3D render of your avatar, but tells you to press F12, export a HAR file, and send it to them. What should you do?',
          options: [
            'Send it immediately to get the cool render.',
            'Delete your username from the file and then send it.',
            'Never send it. A HAR file contains your secret .ROBLOSECURITY cookie, which gives them full access to your account without a password.',
            'Only send it if they have a verified Discord badge.'
          ],
          correctIndex: 2,
          explanation: 'HAR archives contain sensitive session cookies like .ROBLOSECURITY. Anyone with this cookie can log in and steal your limiteds without knowing your password.'
        },
        {
          question: 'A browser extension on the Chrome Store claims to automatically find cheap limited items and accept trades for you. Is it safe to install?',
          options: [
            'Yes, all extensions on the Chrome Store are verified and completely safe.',
            'No. Malicious extensions frequently steal cookies or silently swap trade offers to steal rare items.',
            'Yes, if you disable it during gameplay.',
            'Yes, if you don’t have any Robux on your account.'
          ],
          correctIndex: 1,
          explanation: 'Malicious browser extensions are a primary vector for Roblox inventory theft. They can silently rewrite web requests and drain items.'
        },
        {
          question: 'What is the fastest way to kick out a scammer if you accidentally shared your Roblox session cookie?',
          options: [
            'Change your avatar outfit.',
            'Go to Settings > Security and click "Sign out of all other sessions", then change your password.',
            'Restart your computer.',
            'Close your browser window.'
          ],
          correctIndex: 1,
          explanation: 'Signing out of all sessions and changing your password immediately invalidates all active session cookies and locks out intruders.'
        }
      ]
    },
    {
      slug: 'minecraft',
      title: 'Minecraft',
      subtitle: 'Trojanized mods & plugins, fake migration verification, multiplayer server scams, and account phishing.',
      lastAuditedDate: 'October 2026',
      verificationStatus: 'Verified by SafeInGame Security Labs',
      genre: 'Sandbox & Multiplayer',
      platforms: ['PC (Java & Bedrock)', 'Console', 'Mobile'],
      riskBadge: 'High Malware & Credential Phishing Risk',
      riskColor: 'lime',
      colorTheme: {
        accent: '#C7F36B',
        border: 'border-lime-500/40',
        bgGlow: 'rgba(199, 243, 107, 0.15)',
        heroGradient: 'from-emerald-500/20 via-lime-500/10 to-transparent',
      },
      cardDescription: 'Players are targeted with malicious mods containing infostealers (Fractureiser malware), fake Microsoft migration portals, and multiplayer server donation scams.',
      commonRiskTags: ['Trojanized Mods & .JAR Malware', 'Fake Microsoft Verification', 'Server Rank Scams', 'Account Phishing'],
      svgArtwork: 'minecraft',
      scamScenarios: [
        {
          title: 'Trojanized Mods, Clients & .JAR Malware',
          threatType: 'Infostealer Trojan Execution',
          summary: 'Malicious files uploaded to unofficial mod repositories or shared directly on Discord contain infostealers that harvest Discord tokens, browser passwords, and Minecraft sessions.',
          howItWorks: [
            'Attackers compromise developer accounts on community mod platforms or post links to "cracked client mods" on Discord.',
            'The downloaded `.jar` file contains hidden malicious code alongside real mod functionality.',
            'When the Minecraft client loads the mod, the malware extracts browser session tokens, crypto wallet keys, and the `launcher_accounts.json` token.',
            'Your Microsoft and Minecraft accounts are compromised without triggering standard antivirus warnings.'
          ],
          redFlags: [
            'Mods sent as direct file downloads via Discord attachments or MediaFire links.',
            'Downloads claiming to be "free hacked clients" or "private paid mods for free".',
            'Mod files uploaded recently by brand-new accounts with no community history.'
          ]
        },
        {
          title: 'Fake "Verify with Microsoft" Server Bots',
          threatType: 'OAuth Token Theft / Phishing',
          summary: 'Multiplayer server Discord bots require you to "verify your Minecraft account" by clicking a link that grants attackers OAuth permissions.',
          howItWorks: [
            'You join a popular community Discord server for a Minecraft network.',
            'A verification bot prompts: "To access the server, click this link to verify your Microsoft account."',
            'The link opens a genuine Microsoft OAuth consent screen that asks for permission to access your profile data or read email.',
            'If you click "Accept", the attacker’s application receives an OAuth token that allows them to log into your Minecraft account.'
          ],
          redFlags: [
            'Discord verification bots asking you to log into Microsoft or enter security codes.',
            'OAuth permission prompts requesting access to your Xbox profile or user information.',
            'Servers that threaten to ban you if you do not verify within 5 minutes.'
          ]
        },
        {
          title: 'Multiplayer Server Rank & Donation Fraud',
          threatType: 'Payment Fraud & Unofficial Storefronts',
          summary: 'Scam servers sell expensive VIP ranks or custom items, then shut down or charge excessive recurring subscriptions.',
          howItWorks: [
            'Unverified servers advertise custom perks, claiming to be official partners.',
            'Their web stores utilize shady payment processors that enroll players into recurring billing cycles.',
            'When players complain about missing ranks, server moderators ban them from both the server and Discord.'
          ],
          redFlags: [
            'Server web stores lacking clear terms of service, company info, or refund policies.',
            'Requests to pay through non-refundable methods like gift cards or crypto.',
            'Server claims of being an "Official Minecraft Server" (Mojang does not run third-party community servers).'
          ]
        }
      ],
      whatNotToShare: [
        'Your Microsoft account password and two-step verification codes.',
        'Files from your `.minecraft` folder, especially `launcher_accounts.json` and session tokens.',
        'OAuth access permissions for unverified third-party applications.',
        'Direct login codes received from Microsoft Security via SMS or email.',
        'Parental credit card numbers on unverified private server webstores.'
      ],
      protectionChecklist: [
        'Only download mods, shaders, and resource packs from reputable platforms like Modrinth or CurseForge.',
        'Enable Microsoft Two-Step Verification using Microsoft Authenticator on account.microsoft.com.',
        'Never run `.jar` or `.exe` files sent directly in Discord chats.',
        'Regularly review authorized third-party apps in your Microsoft Account privacy settings and revoke unknown apps.',
        'Distinguish between in-game gameplay issues (griefing, stolen chests) and real cybersecurity threats (malware, phishing, credit card theft).'
      ],
      paymentSafetyGuidelines: [
        'Only purchase Minecraft and Minecoins through official platforms: minecraft.net, Microsoft Store, Xbox, PlayStation, Nintendo, or authorized retail stores.',
        'When purchasing ranks on community servers, verify that the server uses secure, recognized payment gateways (Tebex/CraftingStore with PayPal or credit card protection).',
        'Keep copies of transaction receipts for dispute resolution.'
      ],
      incidentSteps: [
        'Step 1: If you suspect malware execution, disconnect from the internet and run a thorough scan with Microsoft Defender Offline or Malwarebytes.',
        'Step 2: From a clean device, visit account.microsoft.com and change your Microsoft account password.',
        'Step 3: In Microsoft Account Security, select "Sign out everywhere" and review authorized apps under Privacy > Apps and services.',
        'Step 4: Contact official support at help.minecraft.net for account recovery assistance.'
      ],
      officialResources: [
        {
          title: 'Minecraft Official Help Center',
          url: 'https://help.minecraft.net',
          description: 'Official Mojang and Microsoft support portal for account migration, recovery, and technical help.'
        },
        {
          title: 'Microsoft Account Security Portal',
          url: 'https://account.microsoft.com/security',
          description: 'Manage two-step verification, review active sessions, and check recent login activity.'
        },
        {
          title: 'Modrinth Open Mod Repository',
          url: 'https://modrinth.com',
          description: 'Verified, scanned community mod and resource pack hosting platform with automated malware checks.'
        }
      ],
      relatedArticleSlugs: ['how-to-secure-your-gaming-account', 'social-engineering-in-online-games', 'what-to-do-after-a-gaming-scam'],
      quiz: [
        {
          question: 'A player on Discord sends you a file called "free_fps_boost_mod.jar" to test in your Minecraft. Is it safe to run?',
          options: [
            'Yes, .jar files are only textures and cannot contain viruses.',
            'No. A .jar file contains executable Java code that can run malware, steal browser passwords, and compromise your Minecraft token.',
            'Yes, if you run it in Singleplayer mode.',
            'Yes, if you have Minecraft Bedrock edition.'
          ],
          correctIndex: 1,
          explanation: '.jar files are compiled executable Java programs. Rogue mods are frequently used by attackers to deploy infostealers.'
        },
        {
          question: 'A Discord bot for a Minecraft server asks you to click a Microsoft login link to "verify your account". What is the risk?',
          options: [
            'The link could be a malicious OAuth authorization that gives attackers programmatic access to log into your account.',
            'There is no risk; all Discord bots are safe.',
            'It will automatically format your hard drive.',
            'It only checks your in-game username.'
          ],
          correctIndex: 0,
          explanation: 'Fake verification bots use Microsoft OAuth to grant malicious apps permissions to access account tokens and take over profiles.'
        },
        {
          question: 'What is the main difference between in-game "griefing" and a "cybersecurity threat" in Minecraft?',
          options: [
            'Griefing is illegal in real life, while phishing is allowed.',
            'Griefing is an in-game gameplay dispute (breaking blocks/chests), whereas cybersecurity threats involve real malware, account theft, or payment card fraud.',
            'They are identical and handled by the police.',
            'Griefing only happens in Bedrock edition.'
          ],
          correctIndex: 1,
          explanation: 'Griefing is a gameplay moderation matter resolved by server rules. Malware, phishing, and credit card theft are serious cybersecurity crimes.'
        }
      ]
    }
  ],
  ru: [
    {
      slug: 'cs2-steam',
      title: 'Counter-Strike 2 и Steam',
      subtitle: 'Защита от API-скама, фальшивых окон авторизации через Steam и перехвата трейдов скинов.',
      lastAuditedDate: 'Октябрь 2026',
      verificationStatus: 'Проверено аналитиками SafeInGame Labs',
      genre: 'Тактический шутер и экономика',
      platforms: ['ПК (Steam)'],
      riskBadge: 'Высокий риск трейдов и фишинга',
      riskColor: 'orange',
      colorTheme: {
        accent: '#FFAD66',
        border: 'border-orange-500/40',
        bgGlow: 'rgba(255, 173, 102, 0.15)',
        heroGradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
      },
      cardDescription: 'Скины в CS2 имеют реальную денежную стоимость. Игроки сталкиваются с API-скамом, поддельными турнирными платформами и фальшивыми гарантами.',
      commonRiskTags: ['API-скам в Steam', 'Фишинг в окне браузера', 'Подмена предметов в трейде', 'Фейковые гаранты'],
      svgArtwork: 'cs2',
      scamScenarios: [
        {
          title: 'Перехват обменов через Steam Web API Key',
          threatType: 'API-скам / Автоматические боты-клоны',
          summary: 'Сайт-ловушка тайно регистрирует ключ API в вашем профиле, после чего бот отменяет ваши настоящие обмены и мгновенно отправляет поддельные.',
          howItWorks: [
            'Вы авторизовались через Steam на сомнительном сайте с рулетками или фальшивым турниром.',
            'Сайт тайно выпустил ключ разработчика в вашем аккаунте Steam (на странице dev/apikey).',
            'Когда вы отправляете трейд другу или боту маркета, бот скамеров видит событие за доли секунды через API.',
            'Бот мгновенно отменяет настоящий оффер и шлет точно такой же встречный трейд от фейкового профиля с тем же аватаром и именем.',
            'Если вы подтвердите трейд на телефоне, не проверив дату регистрации профиля получателя, скины уйдут мошеннику.'
          ],
          redFlags: [
            'Трейд внезапно отменяется сам по себе без вашего участия.',
            'У партнера по обмену такой же аватар и ник, но уровень Steam 0 или профиль создан только что.',
            'На странице steamcommunity.com/dev/apikey прописан ключ, который вы лично не создавали.'
          ]
        },
        {
          title: 'Фейковые голосования за команды на турнирах',
          threatType: 'Фишинг и поддельный вход',
          summary: 'Знакомый из списка друзей просит: «Проголосуй за нашу команду на турнире, нам не хватает одного голоса!».',
          howItWorks: [
            'Мошенники взламывают аккаунт вашего знакомого и рассылают спам по всему списку друзей.',
            'Ссылка ведет на клон киберспортивной платформы (Faceit, ESL).',
            'Кнопка голосования открывает фиктивное окно авторизации (Browser-in-the-Browser) с фальшивым замочком и поддельным адресом.',
            'Введенный логин, пароль и код аутентификатора мгновенно перехватываются ботами.'
          ],
          redFlags: [
            'Неожиданные сообщения от малознакомых друзей с просьбой перейти по ссылке.',
            'Всплывающее окно входа невозможно перетащить за пределы вкладки браузера.',
            'Сайт требует вводить пароль, хотя в соседней вкладке вы уже залогинены в Steam.'
          ]
        },
        {
          title: 'Схема «Случайный репорт» и лже-модератор',
          threatType: 'Социальная инженерия и вымогательство',
          summary: 'Вам пишут, что случайно отправили репорт на ваш профиль, и требуют связаться с «модератором Valve» в Discord.',
          howItWorks: [
            'Игрок получает сообщение: «Меня обманули, и я по ошибке отправил жалобу на твой профиль. Поддержка сказала, что тебя забанят через 2 часа!».',
            'Жертве дают контакт «модератора Valve» в Discord, который показывает фальшивые сертификаты и базы данных.',
            'Лже-сотрудник требует передать скины на «временный сервер проверки», чтобы доказать невиновность.',
            'После передачи вещей мошенники сразу удаляют переписку и блокируют игрока.'
          ],
          redFlags: [
            'Требование срочно связаться с техподдержкой в Discord или Telegram.',
            'Любые люди, называющие себя сотрудниками Valve вне официального сайта.',
            'Просьбы передать предметы «на проверку» или доказать их происхождение.'
          ]
        }
      ],
      whatNotToShare: [
        '5-значные коды подтверждения из мобильного аутентификатора Steam Guard.',
        'Резервные коды восстановления Steam Guard.',
        'Ключи разработчика Steam Web API.',
        'Файлы сессии и куки (`steamLoginSecure`) из консоли браузера.',
        'Чеки первых покупок и фото физических ключей активации игр.'
      ],
      protectionChecklist: [
        'Подключите мобильный аутентификатор Steam Guard в приложении Steam на телефоне.',
        'Регулярно проверяйте страницу steamcommunity.com/dev/apikey. Если там есть ключ и вы его не создавали — нажмите «Отозвать ключ Steam Web API».',
        'Внимательно проверяйте подтверждение на смартфоне: сверяйте дату создания профиля партнера и точное состояние скина.',
        'Никогда не переходите по турнирным ссылкам из личных сообщений в чатах.',
        'Защитите привязанную к Steam почту сложным уникальным паролем и надежной двухфакторной защитой.'
      ],
      paymentSafetyGuidelines: [
        'Пополняйте баланс Steam только напрямую или через верифицированные розничные подарочные карты.',
        'Не покупайте скины прямым переводом на карту без гаранта платформы.',
        'Остерегайтесь предложений пополнить баланс с 30-40% скидкой — такой баланс часто покупается с краденых карт.'
      ],
      incidentSteps: [
        'Шаг 1: Перейдите на steamcommunity.com/dev/apikey и немедленно отзовите ключ API.',
        'Шаг 2: Смените пароль от Steam и нажмите «Выйти на всех остальных устройствах».',
        'Шаг 3: Смените пароль от привязанной электронной почты и проверьте правила переадресации.',
        'Шаг 4: Создайте обращение на официальном портале help.steampowered.com с подтверждениями владения.',
        'Шаг 5: Предупредите друзей в соцсетях, чтобы они не переходили по ссылкам от вашего имени.'
      ],
      officialResources: [
        {
          title: 'Официальная служба поддержки Steam',
          url: 'https://help.steampowered.com',
          description: 'Единственный подлинный портал Valve для восстановления доступа к учетным записям и проверки статуса тикетов.'
        },
        {
          title: 'Правила обмена предметами и защита от скама',
          url: 'https://help.steampowered.com/en/faqs/view/3B6E-B322-2400-8D24',
          description: 'Официальное руководство Valve по предотвращению мошенничества при торговле скинами.'
        },
        {
          title: 'Страница управления Steam Web API Key',
          url: 'https://steamcommunity.com/dev/apikey',
          description: 'Страница для проверки и мгновенного отзыва скомпрометированного ключа разработчика.'
        }
      ],
      relatedArticleSlugs: ['safe-trading-in-game-items', 'how-to-spot-gaming-phishing', 'gaming-account-recovery-scams'],
      quiz: [
        {
          question: 'Друг в Steam присылает ссылку: «Проголосуй за нашу команду на турнире, очень выручишь!». Что безопаснее всего сделать?',
          options: [
            'Быстро перейти и залогиниться под своим логином и паролем.',
            'Не переходить по ссылке и связаться с другом через голос или мессенджер, чтобы проверить, не взломали ли его.',
            'Ввести случайный неправильный пароль.',
            'Отправить код аутентификатора организаторам турнира.'
          ],
          correctIndex: 1,
          explanation: 'Это классическая схема фишинга. Скорее всего, профиль вашего друга уже скомпрометирован автоматическим ботом.'
        },
        {
          question: 'Что может сделать мошенник, если он сгенерировал в вашем профиле Steam Web API Key?',
          options: [
            'Перехватывать ваши обмены: отменять их и слать поддельные трейды от имени ботов-клонов.',
            'Удалить игры из вашей библиотеки навсегда.',
            'Сменить пароль без кодов подтверждения.',
            'Автоматически списывать деньги с банковской карты.'
          ],
          correctIndex: 0,
          explanation: 'Ключ API позволяет боту отслеживать исходящие трейды в реальном времени, отменять их и мгновенно пересоздавать обмен на бота-клона.'
        },
        {
          question: 'Человек в Discord с аватаркой сотрудника Valve утверждает, что ваш профиль случайно зарепортили и нужно скинуть скины на проверку. Что делать?',
          options: [
            'Быстро передать скины другу.',
            'Попросить у сотрудника удостоверение.',
            'Заблокировать и отправить жалобу: настоящие сотрудники Valve никогда не ведут диалог через Discord и не просят скины на проверку.',
            'Заплатить залог за проверку чистоты аккаунта.'
          ],
          correctIndex: 2,
          explanation: 'Сотрудники Valve никогда не используют Discord для поддержки и никогда не просят пользователей передавать скины.'
        }
      ]
    },
    {
      slug: 'brawl-stars',
      title: 'Brawl Stars',
      subtitle: 'Защита от фишинга Supercell ID, фальшивых генераторов гемов и обмана при покупке аккаунтов.',
      lastAuditedDate: 'Октябрь 2026',
      verificationStatus: 'Проверено аналитиками SafeInGame Labs',
      genre: 'Мобильный геройский шутер',
      platforms: ['iOS', 'Android'],
      riskBadge: 'Высокий риск взлома Supercell ID и фейк-доната',
      riskColor: 'cyan',
      colorTheme: {
        accent: '#27D8E8',
        border: 'border-cyan-500/40',
        bgGlow: 'rgba(39, 216, 232, 0.15)',
        heroGradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
      },
      cardDescription: 'Игроки привлекаются видеороликами о «бесплатных гемах», отдают 6-значные коды Supercell ID и теряют аккаунты на серых торговых биржах.',
      commonRiskTags: ['Фейковые гемы', 'Перехват кодов Supercell ID', 'Скам при продаже аккаунтов', 'Списания с карт родителей'],
      svgArtwork: 'brawlstars',
      scamScenarios: [
        {
          title: 'Фейковые сайты «2000 бесплатных гемов»',
          threatType: 'Фишинг кодов Supercell ID',
          summary: 'Сайты и ролики в TikTok обещают бесплатные гемы или Brawl Pass в обмен на почту от Supercell ID и одноразовый код.',
          howItWorks: [
            'В видео показывают анимацию начисления тысяч гемов на баланс.',
            'Сайт запрашивает ваш тег игрока и почту от учетной записи Supercell ID.',
            'Мошенник параллельно инициирует вход в ваш Supercell ID на своем устройстве, из-за чего на вашу почту приходит настоящий 6-значный код.',
            'Сайт просит: «Для завершения начисления гемов введите 6-значный код подтверждения из письма».',
            'Вы вводите код — мошенник входит в аккаунт, меняет почту и включает блокировку.'
          ],
          redFlags: [
            'Любые сайты, предлагающие бесплатные гемы вне самой игры.',
            'Требование ввести код подтверждения, пришедший от Supercell.',
            'Задания из разряда «пройдите опрос для получения награды».'
          ]
        },
        {
          title: 'Покупка прокачанных аккаунтов и бустинг',
          threatType: 'Мошенничество при перепродаже и бан за передачу',
          summary: 'Продавцы в Telegram продают аккаунты с легендарными бойцами за копейки или предлагают бесплатно апнуть кубки.',
          howItWorks: [
            'Покупатель переводит деньги за готовый аккаунт.',
            'Продавец отдает доступ, но через пару дней обращается в поддержку Supercell с исходными чеками и возвращает аккаунт себе.',
            'Альтернативный исход: Supercell фиксирует вход с другого континента и перманентно банит аккаунт за нарушение правил передачи данных.',
            'Покупатель остается без денег и без игры.'
          ],
          redFlags: [
            'Предложения купить фулл-аккаунт в соцсетях или мессенджерах.',
            'Предложения «прокачать кубки», если вы дадите код от Supercell ID.',
            'Оплата через подарочные карты или перевод на криптокошелек.'
          ]
        },
        {
          title: 'Фейковые раздачи от лица популярных ютуберов',
          threatType: 'Имитация контент-мейкеров',
          summary: 'Боты копируют ники и аватарки популярных стримеров (Robzi, Холдик) и пишут в комментариях о победе в конкурсе.',
          howItWorks: [
            'Фейковый аккаунт блогера пишет в комментариях: «Ты выиграл 5000 гемов! Напиши в Telegram для получения».',
            'В личке присылают ссылку на сайт «выдачи приза».',
            'Сайт крадет код от Supercell ID или требует оплатить «комиссию за активацию промокода».',
            'Никаких гемов игрок не получает, а аккаунт угоняют.'
          ],
          redFlags: [
            'Комментарии от блогеров без официальной галочки верификации.',
            'Просьбы перейти в сторонний мессенджер для забора приза.',
            'Требования назвать код или оплатить комиссию за бесплатный подарок.'
          ]
        }
      ],
      whatNotToShare: [
        '6-значный код подтверждения от Supercell ID из вашей электронной почты.',
        'Резервные коды защиты учетной записи Supercell ID.',
        'Скриншоты входящих писем от Supercell.',
        'Данные банковских карт родителей и SMS-коды из банка.',
        'Пароли и доступы к профилю даже с друзьями из клана.'
      ],
      protectionChecklist: [
        'Включите «Защиту учетной записи Supercell ID» (SMS-подтверждение и 3 резервных кода) в настройках игры.',
        'Сохраните 3 кода восстановления в надежном офлайн-месте (запишите в блокнот).',
        'Помните: сотрудники Supercell никогда не запрашивают одноразовые коды.',
        'Установите запрос пароля или биометрии при совершении покупок в Google Play и App Store.',
        'Никогда не участвуйте в купле, продаже и передаче аккаунтов.'
      ],
      paymentSafetyGuidelines: [
        'Покупайте гемы только во внутриигровом магазине или в официальном магазине Supercell Store (store.supercell.com).',
        'Не пользуйтесь сторонними сайтами пополнения — донат с краденых карт приводит к блокировке за отрицательный баланс гемов.',
        'Родителям рекомендуется настроить «Родительский контроль» (Family Link или Экранное время).'
      ],
      incidentSteps: [
        'Шаг 1: Откройте Brawl Stars > Настройки > Помощь и поддержка > Восстановить учетную запись.',
        'Шаг 2: В диалоге с ботом поддержки выберите «Утерян доступ к Supercell ID».',
        'Шаг 3: Подготовьте доказательства: точный тег игрока (#XXXX), имя профиля, уровень, название клуба и квитанции первых покупок из Google Play или Apple.',
        'Шаг 4: При подозрительных списаниях с карты срочно сообщите родителям для блокировки платежей.'
      ],
      officialResources: [
        {
          title: 'Официальная база знаний Supercell',
          url: 'https://support.supercell.com',
          description: 'Официальные инструкции по восстановлению Supercell ID и настройке безопасности учетной записи.'
        },
        {
          title: 'Официальный магазин Supercell Store',
          url: 'https://store.supercell.com',
          description: 'Единственный авторизованный веб-магазин для прямой покупки гемов и пропусков от разработчиков.'
        },
        {
          title: 'Инструкция по защите учетной записи Supercell ID',
          url: 'https://support.supercell.com/brawl-stars/en/articles/supercell-id-account-protection.html',
          description: 'Пошаговый гайд по подключению кодов восстановления и телефонной защиты профиля.'
        }
      ],
      relatedArticleSlugs: ['fake-giveaways-and-free-rewards', 'gaming-currency-and-payment-safety', 'social-engineering-in-online-games'],
      quiz: [
        {
          question: 'Сайт обещает начислить 3000 гемов и просит ввести 6-значный код, который пришел на вашу почту от Supercell. Что делать?',
          options: [
            'Быстро ввести код, пока он действует.',
            'Ни в коем случае не вводить: этот код позволит злоумышленнику войти в ваш аккаунт и украсть его.',
            'Попросить друга сначала проверить этот сайт.',
            'Ввести код задом наперед.'
          ],
          correctIndex: 1,
          explanation: 'Этот код — ключ авторизации в Supercell ID. Мошенник запустил вход с другого устройства, чтобы получить ваш профиль.'
        },
        {
          question: 'Безопасно ли купить прокачанный аккаунт Brawl Stars в Telegram за 500 рублей?',
          options: [
            'Да, если продавец скинул скриншоты отзывов.',
            'Нет: продавец вернет аккаунт через поддержку по чекам, либо Supercell навсегда забанит аккаунт за передачу данных.',
            'Да, если быстро сменить ник в игре.',
            'Да, если оплатить через Qiwi.'
          ],
          correctIndex: 1,
          explanation: 'Передача и продажа аккаунтов прямо запрещены Supercell. В большинстве случаев продавцы возвращают доступ себе после получения денег.'
        },
        {
          question: 'Где находится ЕДИНСТВЕННЫЙ официальный веб-сайт для покупки гемов вне приложения?',
          options: [
            'В любом Telegram-боте со скидками.',
            'В официальном магазине store.supercell.com.',
            'На сторонних сайтах с кейсами.',
            'В закрытых Discord-каналах.'
          ],
          correctIndex: 1,
          explanation: 'Единственный авторизованный разработчиками магазин вне приложения — это официальный Supercell Store (store.supercell.com).'
        }
      ]
    },
    {
      slug: 'pubg',
      title: 'PUBG & PUBG Mobile',
      subtitle: 'Защита от серого доната UC, фишинга скинов «Ледник» и сомнительных турнирных регистраций.',
      lastAuditedDate: 'Октябрь 2026',
      verificationStatus: 'Проверено аналитиками SafeInGame Labs',
      genre: 'Королевская битва',
      platforms: ['ПК', 'Консоли', 'Мобильные устройства'],
      riskBadge: 'Высокий риск платежного фрода и фишинга',
      riskColor: 'violet',
      colorTheme: {
        accent: '#A78BFA',
        border: 'border-violet-500/40',
        bgGlow: 'rgba(167, 139, 250, 0.15)',
        heroGradient: 'from-violet-500/20 via-purple-500/10 to-transparent',
      },
      cardDescription: 'Игроки, мечтающие об Unknown Cash (UC), скинах уровня «Ледник» и Royale Pass, попадают на сайты-клоны Midasbuy, поддельные турниры и чарджбэки.',
      commonRiskTags: ['Фейковые генераторы UC', 'Поддельные сайты Midasbuy', 'Фишинг через турниры', 'Чарджбэк-баны'],
      svgArtwork: 'pubg',
      scamScenarios: [
        {
          title: 'Поддельные сайты пополнения под видом Midasbuy',
          threatType: 'Платежный фишинг и кража профилей',
          summary: 'Сайты-клоны копируют интерфейс Midasbuy и обещают тройной бонус UC при входе через привязанные соцсети.',
          howItWorks: [
            'Мошенники настраивают рекламу в поиске на фразы «дешевый донат пабг мобайл».',
            'Сайт полностью копирует цвета и логотипы официального сервиса Midasbuy.',
            'Для пополнения сервис требует авторизоваться через Twitter, Facebook или Google.',
            'Введенные логины и пароли сохраняются мошенникам, а аккаунт отвязывается и продается.'
          ],
          redFlags: [
            'Обещания бонусов вроде «Купи 600 UC и получи 6000 в подарок».',
            'Странные доменные имена (например, midasbuy-bonus.top вместо оригинального midasbuy.com).',
            'Требование вводить пароли от соцсетей для начисления валюты.'
          ]
        },
        {
          title: 'Фейковые промокоды на скин «Ледник»',
          threatType: 'Фишинг через социальные сети',
          summary: 'Посты в соцсетях обещают промокод на бесплатный M416 «Ледник» при авторизации на специальной промо-странице.',
          howItWorks: [
            'В роликах показывают процесс активации эксклюзивных скинов по промокоду.',
            'Ссылка ведет на фальшивую страницу «Krafton Event Reward».',
            'Для активации кода сайт заставляет подтвердить профиль через привязанную социальную сеть.',
            'В ту же секунду скрипт меняет пароль от соцсети и отвязывает ваш игровой персонаж.'
          ],
          redFlags: [
            'Раздача ультра-редких скинов без официального анонса в @PUBGMOBILE.',
            'Сайты с доменами .xyz, .tk, .top, имитирующие официальные страницы.',
            'Запрос логина и пароля от соцсетей для выдачи промо-предмета.'
          ]
        },
        {
          title: 'Фальшивые турниры и вредоносные клиенты античита',
          threatType: 'Кража сессий через трояны-стилеры',
          summary: 'Организаторы фейковых пракков и турниров заставляют капитанов скачивать кастомные программы связи или «античиты».',
          howItWorks: [
            'Команду приглашают на турнир с крупным призовым фондом в Discord.',
            'Организаторы требуют скачать «специальный турнирный клиент или кодек связи».',
            'Запущенный файл оказывается стилером (Lumma, RedLine), ворующим пароли браузера и токены сессий.',
            'Команда теряет доступы к аккаунтам Steam и социальным сетям.'
          ],
          redFlags: [
            'Требование запускать исполняемые файлы (.exe, .zip), присланные в личке Discord.',
            'Несоразмерно огромный призовой фонд для любительского закрытого турнира.',
            'Отказ проводить матч через официальные платформы.'
          ]
        }
      ],
      whatNotToShare: [
        'Пароли от социальных сетей, привязанных к PUBG (Twitter, Facebook, Google, VK, Apple ID).',
        'Коды двухфакторной аутентификации из SMS и приложений.',
        'CVV-коды банковских карт на непроверенных площадках.',
        'Файлы сессий и cookies авторизации.',
        'Демонстрацию экрана во время авторизации или восстановления паролей.'
      ],
      protectionChecklist: [
        'Привяжите PUBG Mobile минимум к двум разным платформам (например, Google + Twitter) и включите на них двухфакторную защиту.',
        'Пополняйте баланс исключительно в игре или на официальном сайте midasbuy.com (всегда проверяйте адресную строку).',
        'Никогда не скачивайте исполняемые файлы (.exe) для участия в любительских турнирах.',
        'Периодически проверяйте список разрешенных приложений в настройках безопасности Google и Facebook.',
        'Используйте виртуальные банковские карты с лимитом списаний.'
      ],
      paymentSafetyGuidelines: [
        'Приобретайте UC только внутри игры или у официального авторизованного партнера Midasbuy.',
        'Помните: если продавец пополнил ваш баланс с ворованной кредитки, через пару недель ваш аккаунт получит бан за отрицательный баланс.',
        'Официальные представители никогда не просят PIN-код банковской карты для выдачи выигрыша.'
      ],
      incidentSteps: [
        'Шаг 1: Если взломана привязанная соцсеть, немедленно восстановите доступ к ней через форму безопасности Facebook/Google/Twitter.',
        'Шаг 2: В игре зайдите в Настройки > Служба поддержки > Утеря учетной записи.',
        'Шаг 3: Предоставьте данные: цифровой UID игрока, точный ник, дату регистрации и квитанции первых покупок UC.',
        'Шаг 4: При вводе данных карты на фишинговом сайте срочно заблокируйте карту через приложение банка.'
      ],
      officialResources: [
        {
          title: 'Официальная поддержка PUBG (ПК и консоли)',
          url: 'https://support.pubg.com',
          description: 'Официальный портал Krafton для решения технических вопросов и восстановления аккаунтов.'
        },
        {
          title: 'Официальный портал PUBG Mobile',
          url: 'https://pubgmobile.com',
          description: 'Официальные новости, ссылки на клиент игры и каналы службы поддержки.'
        },
        {
          title: 'Авторизованный центр пополнения Midasbuy',
          url: 'https://www.midasbuy.com',
          description: 'Официальный партнер PUBG Mobile по безопасному приобретению внутриигровой валюты UC.'
        }
      ],
      relatedArticleSlugs: ['how-to-spot-gaming-phishing', 'gaming-currency-and-payment-safety', 'what-to-do-after-a-gaming-scam'],
      quiz: [
        {
          question: 'На сайте предлагают купить 6000 UC всего за 500 рублей и просят зайти через Facebook. Что это за предложение?',
          options: [
            'Эксклюзивная праздничная акция от разработчиков.',
            'Фишинговый сайт, созданный для кражи вашего логина и пароля от Facebook и последующего угона аккаунта.',
            'Безопасное предложение, если после покупки быстро сменить пароль.',
            'Официальный филиал Midasbuy.'
          ],
          correctIndex: 1,
          explanation: 'Скидок в 80-90% на валюту не бывает. Это фишинговая ловушка для перехвата доступов к привязанным соцсетям.'
        },
        {
          question: 'Что произойдет, если сторонний продавец пополнил ваш аккаунт с украденной банковской карты?',
          options: [
            'Ничего, если успеть потратить все UC за один день.',
            'Банк оформит чарджбэк, и издатель заблокирует ваш аккаунт за отрицательный баланс до полной компенсации суммы.',
            'Разработчики начислят вам бонусные вещи.',
            'Накажут только продавца, а аккаунт не тронут.'
          ],
          correctIndex: 1,
          explanation: 'Игровые платформы возлагают ответственность на получателя платежа. При чарджбэке аккаунт замораживается с отрицательным балансом.'
        },
        {
          question: 'Организатор турнира в Discord требует запустить файл «anticheat_patch.exe». Как поступить?',
          options: [
            'Запустить файл от имени администратора.',
            'Категорически отказаться: под видом кастомных античитов злоумышленники распространяют трояны-стилеры паролей.',
            'Отключить антивирус, чтобы программа сработала быстрее.',
            'Переслать файл друзьям.'
          ],
          correctIndex: 1,
          explanation: 'Никогда не запускайте исполняемые файлы (.exe, .scr, .zip) из Discord. Это частый способ заражения стилерами.'
        }
      ]
    },
    {
      slug: 'roblox',
      title: 'Roblox',
      subtitle: 'Защита от кражи куки (.ROBLOSECURITY), фальшивых расширений браузера, бим-скама и обмана с Robux.',
      lastAuditedDate: 'Октябрь 2026',
      verificationStatus: 'Проверено аналитиками SafeInGame Labs',
      genre: 'Метаверс и платформа для творчества',
      platforms: ['ПК', 'Мобильные устройства', 'Консоли'],
      riskBadge: 'Высокий риск кражи куки и расширений',
      riskColor: 'orange',
      colorTheme: {
        accent: '#EF4444',
        border: 'border-red-500/40',
        bgGlow: 'rgba(239, 68, 68, 0.15)',
        heroGradient: 'from-red-500/20 via-orange-500/10 to-transparent',
      },
      cardDescription: 'Игроки в Roblox рискуют потерять ценные лимитки из-за кражи сессионного куки `.ROBLOSECURITY`, вредоносных плагинов Chrome и фиктивных трейд-ботов.',
      commonRiskTags: ['Кража куки (.ROBLOSECURITY)', 'Вредоносные расширения Chrome', 'Фейковые Robux-генераторы', 'Обман при обмене лимиток'],
      svgArtwork: 'roblox',
      scamScenarios: [
        {
          title: 'Бим-скам и кража куки .ROBLOSECURITY',
          threatType: 'Кража токена сессии / Beam Scam',
          summary: 'Мошенники обманом заставляют игрока экспортировать HAR-файл или запустить скрипт, содержащий главный сессионный куки аккаунта.',
          howItWorks: [
            'Вам в Discord предлагают бесплатно сделать красивый 3D-рендер вашего скина.',
            'Вам говорят: «Открой инструменты разработчика (F12) > вкладка Network > Сохранить как HAR с содержимым, чтобы передать текстуру скина».',
            'Либо просят вставить в адресную строку скрипт, начинающийся с «javascript:».',
            'В HAR-файле сохраняется секретный ключ `.ROBLOSECURITY`.',
            'С этим ключом злоумышленник заходит в ваш профиль без логина, пароля и двухфакторки.'
          ],
          redFlags: [
            'Любые просьбы открыть консоль браузера (F12) или отправить файл формата `.har`.',
            'Просьбы вставить скрипты `javascript:` в браузер.',
            'Предложения бесплатной графики или трейдов, требующие системных файлов сайта.'
          ]
        },
        {
          title: 'Вредоносные расширения для браузера (Клоны RoPro / BTRoblox)',
          threatType: 'Вредоносные расширения браузера',
          summary: 'Поддельные плагины в интернет-магазине Chrome обещают помощь в трейдах, но тайно подменяют офферы или воруют куки.',
          howItWorks: [
            'Скамеры загружают расширение с похожим названием на популярный трейдинг-плагин.',
            'После установки плагин получает доступ ко всем открываемым веб-страницам.',
            'Когда вы отправляете трейд, расширение на лету перехватывает запрос и добавляет ваши самые ценные лимитированные предметы мошеннику.',
            'Также плагин может отправить ваш `.ROBLOSECURITY` на сервер мошенников.'
          ],
          redFlags: [
            'Расширения с небольшим количеством отзывов или загруженные недавно.',
            'Запрос прав на «Чтение и изменение всех ваших данных на всех сайтах».',
            'Собеседники в Discord, настойчиво требующие установить «специальный плагин для обмена».'
          ]
        },
        {
          title: 'Генераторы бесплатных робуксов и опросники',
          threatType: 'Фишинг паролей и мошенничество с опросами',
          summary: 'Красочные сайты обещают начислить тысячи Robux за прохождение опросов или авторизацию в аккаунте.',
          howItWorks: [
            'Сайт утверждает, что нашел баг в Roblox на бесконечные робуксы.',
            'Для «зачисления» сервис требует ввести логин и пароль от аккаунта.',
            'После получения данных аккаунт угоняется, а все ценные предметы переводятся на ботов скамеров.'
          ],
          redFlags: [
            'Обещания бесплатной генерации Robux (их можно получить только через создание игр, продажу предметов или покупку).',
            'Формы запроса пароля от аккаунта для получения приза.',
            'Фейковые чаты на сайте с сообщениями ботов «Спасибо, получил 5000 робуксов».'
          ]
        }
      ],
      whatNotToShare: [
        'Значение куки `.ROBLOSECURITY` ни при каких обстоятельствах.',
        'Файлы HAR (.har), сохраненные из вкладки Network инструментов разработчика.',
        'Коды двухэтапной проверки и резервные коды аутентификатора.',
        'Пароль от аккаунта даже с близкими друзьями по игре.',
        'Родительский PIN-код безопасности из настроек профиля.'
      ],
      protectionChecklist: [
        'Включите двухэтапную проверку через приложение-аутентификатор (Google Authenticator) в Settings > Security.',
        'Установите родительский PIN-код (Account PIN), чтобы никто не мог изменить почту или пароль без его ввода.',
        'Устанавливайте расширения для браузера только от проверенных разработчиков с сотнями тысяч отзывов.',
        'Никогда не вставляйте скрипты в консоль (F12) и не пересылайте `.har` файлы посторонним.',
        'Регулярно нажимайте «Sign out of all other sessions» в разделе Settings > Security.'
      ],
      paymentSafetyGuidelines: [
        'Покупайте Robux только на официальном сайте roblox.com, в мобильных приложениях или через официальные подарочные карты.',
        'Настройте лимиты расходов в родительском контроле, чтобы избежать несанкционированных списаний.',
        'Не покупайте робуксы на серых сайтах — Roblox перманентно банит аккаунты за подозрительные переводы валюты.'
      ],
      incidentSteps: [
        'Шаг 1: При малейшем подозрении на кражу куки немедленно нажмите «Sign out of all other sessions» в Settings > Security. Это аннулирует скомпрометированный `.ROBLOSECURITY`.',
        'Шаг 2: Смените пароль от аккаунта для сброса сессий на всех устройствах.',
        'Шаг 3: Направьте запрос в официальную службу поддержки roblox.com/support в категорию «Account Hacked or Can’t Log In».',
        'Шаг 4: Предоставьте исходную привязанную почту и чеки покупок подарочных карт или подписок.'
      ],
      officialResources: [
        {
          title: 'Официальная служба поддержки Roblox',
          url: 'https://www.roblox.com/support',
          description: 'Портал подачи тикетов по восстановлению взломанных профилей и решению проблем с покупками.'
        },
        {
          title: 'Руководство по безопасности учетной записи Roblox',
          url: 'https://en.help.roblox.com/hc/en-us/articles/203313390',
          description: 'Официальные рекомендации Roblox Corporation по защите профилей от угона.'
        },
        {
          title: 'Руководство по родительскому контролю в Roblox',
          url: 'https://en.help.roblox.com/hc/en-us/articles/360000375686',
          description: 'Настройка PIN-кода, ограничений расходов и фильтров общения для детей.'
        }
      ],
      relatedArticleSlugs: ['how-to-secure-your-gaming-account', 'fake-giveaways-and-free-rewards', 'what-to-do-after-a-gaming-scam'],
      quiz: [
        {
          question: 'Вам в Discord предлагают сделать бесплатный красивый 3D-рендер вашего скина, но просят открыть F12, сохранить HAR-файл и отправить им. Что делать?',
          options: [
            'Отправить файл, ведь картинка скина бесплатная.',
            'Удалить имя из файла и отправить.',
            'Ни в коем случае не отправлять. HAR-файл содержит секретный сессионный куки .ROBLOSECURITY, который позволит мошенникам зайти в аккаунт без пароля.',
            'Отправить, если у пользователя есть значок Nitro.'
          ],
          correctIndex: 2,
          explanation: 'В HAR-файле содержится сессионный токен .ROBLOSECURITY. С ним злоумышленники мгновенно авторизуются в вашем профиле и украдут лимитки.'
        },
        {
          question: 'Расширение в Chrome обещает автоматически принимать выгодные трейды за вас. Безопасно ли его ставить?',
          options: [
            'Да, все плагины в интернет-магазине Chrome полностью безопасны.',
            'Нет: мошеннические расширения часто крадут сессионные куки или скрытно подменяют предложения обмена в момент отправки.',
            'Да, если отключить его на время игры.',
            'Да, если на балансе нет Robux.'
          ],
          correctIndex: 1,
          explanation: 'Вредоносные расширения — одна из главных причин потери инвентаря в Roblox. Они могут на лету перехватывать и менять ваши трейды.'
        },
        {
          question: 'Как быстрее всего сбросить доступ мошеннику, если вы случайно передали свой сессионный куки?',
          options: [
            'Сменить одежду на аватаре.',
            'Зайти в Settings > Security, нажать «Sign out of all other sessions» и сразу же сменить пароль.',
            'Перезагрузить компьютер.',
            'Закрыть вкладку браузера.'
          ],
          correctIndex: 1,
          explanation: 'Кнопка сброса всех сессий вместе со сменой пароля мгновенно аннулирует украденный сессионный токен на всех устройствах.'
        }
      ]
    },
    {
      slug: 'minecraft',
      title: 'Minecraft',
      subtitle: 'Защита от троянов в модах (.JAR), фейковой верификации через Microsoft, скама на серверах и кражи аккаунтов.',
      lastAuditedDate: 'Октябрь 2026',
      verificationStatus: 'Проверено аналитиками SafeInGame Labs',
      genre: 'Песочница и мультиплеер',
      platforms: ['ПК (Java и Bedrock)', 'Консоли', 'Мобильные устройства'],
      riskBadge: 'Высокий риск вредоносного софта и фишинга',
      riskColor: 'lime',
      colorTheme: {
        accent: '#C7F36B',
        border: 'border-lime-500/40',
        bgGlow: 'rgba(199, 243, 107, 0.15)',
        heroGradient: 'from-emerald-500/20 via-lime-500/10 to-transparent',
      },
      cardDescription: 'Игроки сталкиваются с троянами-стилерами в модификациях (.jar), фальшивыми ботами верификации в Discord через Microsoft OAuth и платным обманом на серверах.',
      commonRiskTags: ['Трояны в .JAR модах', 'Фейковая верификация Microsoft', 'Донатный скам на серверах', 'Фишинг аккаунтов'],
      svgArtwork: 'minecraft',
      scamScenarios: [
        {
          title: 'Вредоносные моды, клиенты и трояны в файлах .JAR',
          threatType: 'Заражение троянами-стилерами',
          summary: 'Файлы модификаций, скачанные с сомнительных сайтов или присланные в Discord, содержат скрытые вредоносные скрипты.',
          howItWorks: [
            'Хакеры взламывают аккаунты разработчиков на модовых порталах либо распространяют ссылки на «приватные читы бесплатно».',
            'Скачанный файл `.jar` содержит вредоносный код наряду с заявленными функциями мода.',
            'При запуске игры троян ворует пароли браузера, ключи криптокошельков и файл `launcher_accounts.json` с токеном входа в Minecraft.',
            'Аккаунт Microsoft угоняют без единого предупреждения стандартного антивируса.'
          ],
          redFlags: [
            'Моды, присланные напрямую в Discord или залитые на бесплатные файлообменники.',
            'Обещания «бесплатных платных чит-клиентов».',
            'Файлы модов от новых авторов без отзывов и истории в сообществе.'
          ]
        },
        {
          title: 'Фейковые боты «Верифицируйся через Microsoft» в Discord',
          threatType: 'Кража токенов доступа OAuth',
          summary: 'Боты на серверах требуют подтвердить аккаунт Minecraft через ссылку, запрашивающую небезопасные разрешения OAuth.',
          howItWorks: [
            'Вы заходите на Discord-сервер популярного игрового проекта.',
            'Бот пишет: «Для доступа к каналам подтвердите владение лицензией Minecraft через Microsoft».',
            'Ссылка ведет на настоящее окно авторизации Microsoft, где стороннему приложению запрашиваются права на доступ к профилю Xbox.',
            'Если нажать «Принять», приложение мошенников получает постоянный токен, позволяющий входить в ваш Minecraft-аккаунт.'
          ],
          redFlags: [
            'Боты в Discord, требующие войти в аккаунт Microsoft под угрозой исключения.',
            'Запрос широких прав доступа к профилю Xbox Live в окне авторизации.',
            'Угрозы блокировки за отказ пройти подтверждение за 5 минут.'
          ]
        },
        {
          title: 'Фальшивые привилегии и донат-скам на серверах',
          threatType: 'Платежное мошенничество',
          summary: 'Сомнительные сервера продают дорогие донат-привилегии, после чего закрываются или подключают скрытые автосписания.',
          howItWorks: [
            'Непроверенные сервера привлекают игроков обещаниями админок и бесконечных ресурсов.',
            'Их сайты используют неизвестные платежные шлюзы, оформляющие регулярные подписки вместо разовой оплаты.',
            'При попытке оспорить покупку игрока банят на сервере и в Discord.'
          ],
          redFlags: [
            'Магазины серверов без юридической информации, правил возврата и контактов.',
            'Требование перевести деньги напрямую на личную карту или криптокошелек.',
            'Заявления о том, что сервер является «Официальным сервером Minecraft» (Mojang не открывает сторонних серверов).'
          ]
        }
      ],
      whatNotToShare: [
        'Пароль от учетной записи Microsoft и коды двухфакторной аутентификации.',
        'Файлы из папки `.minecraft`, особенно `launcher_accounts.json`.',
        'Разрешения OAuth для непроверенных сторонних приложений.',
        'SMS-коды подтверждения безопасности от Microsoft.',
        'Данные банковских карт родителей на сомнительных сайтах доната.'
      ],
      protectionChecklist: [
        'Скачивайте моды, шейдеры и ресурс-паки только с проверенных платформ: Modrinth или CurseForge.',
        'Включите двухфакторную аутентификацию в профиле Microsoft на account.microsoft.com.',
        'Никогда не запускайте файлы `.jar` и `.exe`, полученные в личных сообщениях Discord.',
        'Регулярно проверяйте список подключенных приложений в настройках конфиденциальности Microsoft и удаляйте подозрительные.',
        'Четко разделяйте игровой гриферство (сломанные блоки) и реальные киберугрозы (вирусы, фишинг, кража карт).'
      ],
      paymentSafetyGuidelines: [
        'Покупайте саму игру Minecraft и Minecoins только в официальных магазинах: minecraft.net, Microsoft Store, Xbox, PlayStation или у авторизованных ритейлеров.',
        'При покупке доната на серверах убедитесь, что используется проверенный шлюз (Tebex/CraftingStore с защитой платежей).',
        'Сохраняйте чеки транзакций для возможности оспорить платеж в банке.'
      ],
      incidentSteps: [
        'Шаг 1: При подозрении на запуск вредоносного мода немедленно отключите ПК от интернета и выполните полное антивирусное сканирование.',
        'Шаг 2: С чистого устройства перейдите на account.microsoft.com и смените пароль от аккаунта.',
        'Шаг 3: В настройках безопасности Microsoft нажмите «Выйти на всех устройствах» и удалите неизвестные приложения в разделе «Приложения и службы».',
        'Шаг 4: При необходимости обратитесь в службу поддержки help.minecraft.net.'
      ],
      officialResources: [
        {
          title: 'Официальный центр помощи Minecraft',
          url: 'https://help.minecraft.net',
          description: 'Официальный портал Mojang и Microsoft по вопросам миграции, безопасности и восстановления учетных записей.'
        },
        {
          title: 'Центр безопасности учетной записи Microsoft',
          url: 'https://account.microsoft.com/security',
          description: 'Управление двухфакторной аутентификацией, активными сессиями и журналом входов.'
        },
        {
          title: 'Платформа проверенных модификаций Modrinth',
          url: 'https://modrinth.com',
          description: 'Открытая площадка модификаций с автоматизированной проверкой файлов на вредоносный код.'
        }
      ],
      relatedArticleSlugs: ['how-to-secure-your-gaming-account', 'social-engineering-in-online-games', 'what-to-do-after-a-gaming-scam'],
      quiz: [
        {
          question: 'Игрок в Discord присылает вам файл «free_fps_mod.jar» для ускорения Minecraft. Безопасно ли его запускать?',
          options: [
            'Да, файлы .jar содержат только картинки и текстуры.',
            'Нет: .jar содержит исполняемый код Java, который может запустить троян-стилер, украсть пароли браузера и токен аккаунта.',
            'Да, если играть только в одиночном режиме.',
            'Да, если у вас установлен антивирус на телефоне.'
          ],
          correctIndex: 1,
          explanation: 'Файлы .jar — это исполняемые Java-программы. Под видом модов часто распространяются опасные трояны-стилеры.'
        },
        {
          question: 'Бот в Discord требует нажать ссылку и войти в Microsoft, чтобы «подтвердить ник на сервере». В чем опасность?',
          options: [
            'Это может быть вредоносная OAuth-авторизация, которая предоставит злоумышленникам доступ к вашему аккаунту без пароля.',
            'Никакой опасности нет, все боты в Discord проверены.',
            'Это сотрет игру с компьютера.',
            'Бот просто сверяет никнейм.'
          ],
          correctIndex: 0,
          explanation: 'Фальшивые боты верификации выманивают разрешения OAuth, получая токены для несанкционированного входа в аккаунт.'
        },
        {
          question: 'В чем главное отличие между «гриферством» и «киберугрозой» в Minecraft?',
          options: [
            'Гриферство преследуется полицией, а вирусы разрешены.',
            'Гриферство — это игровой спор о правилах сервера (разрушение построек), тогда как киберугрозы — это реальные преступления (вирусы, угон аккаунта, кража денег).',
            'Это абсолютно одно и то же.',
            'Гриферство бывает только на телефонах.'
          ],
          correctIndex: 1,
          explanation: 'Гриферство решается модерацией конкретного сервера. Вредоносное ПО, фишинг и кража банковских карт — это реальные преступления в сфере информационной безопасности.'
        }
      ]
    }
  ]
};

export function getGameProfile(slug: string, lang: 'en' | 'ru' = 'en'): GameSecurityProfile | undefined {
  const list = GAMES_DATA[lang] || GAMES_DATA.en;
  return list.find((g) => g.slug === slug);
}

export function getAllGames(lang: 'en' | 'ru' = 'en'): GameSecurityProfile[] {
  return GAMES_DATA[lang] || GAMES_DATA.en;
}
