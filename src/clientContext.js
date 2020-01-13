/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "(getClientContext)" }]*/

const getClientContext = async () => {
  console.info("Getting model inputs from ASRouterTargeting.jsm");
  const asRouterTargetingGetters = await browser.privileged.messagingSystem.getASRouterTargetingGetters(
    [
      "isDefaultBrowser",
      "addonsInfo",
      "totalBookmarksCount",
      "usesFirefoxSync",
      "isFxAEnabled",
      "sync",
      "locale",
      "profileAgeCreated",
    ],
  );
  console.log({ asRouterTargetingGetters });

  console.info(
    "Getting model inputs from addonsMetadata web extension experiment API",
  );
  /*
  https://github.com/motin/fetch-amo-addons-metadata
  cat addons.json | jq -c '.[] | select( .average_daily_users > 10000  )' > popular-addons.json
  cat popular-addons.json  | jq -c 'select( .categories.firefox | contains(["privacy-security"]) ) ' | jq '.guid' > popular-addons-privacy-security.guids.txt
  cat popular-addons.json  | jq -c 'select( .categories.firefox | contains(["privacy-security"]) ) ' | jq '.name["en-US"]' > popular-addons-privacy-security.names_en_us.txt
   */
  const popularPrivacySecurityAddonGuids = [
    "uBlock0@raymondhill.net",
    "{d10d0bf8-f5b5-c8b4-a8b2-2b9879e08c5d}",
    "touch-vpn@anchorfree.com",
    "browsec@browsec.com",
    "firefox@ghostery.com",
    "adblockultimate@adblockultimate.net",
    "jid1-NIfFY2CA8fy1tg@jetpack",
    "client@anonymox.net",
    "https-everywhere@eff.org",
    "lite-vpn4.1@gmail.com",
    "support@lastpass.com",
    "jid1-MnnxcxisBPnSXQ@jetpack",
    "{73a6fe31-595d-460b-a920-fcc0f8843232}",
    "hotspot-shield@anchorfree.com",
    "{98e5888b-e5f3-4321-a647-28bc617deda2}",
    "@setupvpncom",
    "{20fc2e06-e3e4-4b2b-812b-ab431220cada}",
    "foxyproxy@eric.h.jung",
    "adguardadblocker@adguard.com",
    "InternetProtection@360safe.com",
    "@contain-facebook",
    "jid1-q4sG8pYhq8KGHs@jetpack",
    "jid1-BoFifL9Vbdl2zQ@jetpack",
    "@windscribeff",
    "{a6c4a591-f1b2-4f03-b3ff-767e5bedf4e7}",
    "firefox-webext@zenmate.com",
    "{6b938c0c-fc53-4f27-805f-619778631082}",
    "fvdmedia@gmail.com",
    "@contain-google",
    "jid1-n8wH2cBfc2QaUj@jetpack",
    "neaturl@hugsmile.eu",
    "{07046613-1993-4b66-9dd1-9dd1ce581cb7}",
    "keepasshttp-connector@addons.brandt.tech",
    "{33c93ccc-ceed-47d2-9645-805ea58c8a07}",
    "idsafe@norton.com",
    "{4d5b7a5e-5232-9e45-97f4-f8e1ca2626e5}",
    "xd4rker@gmail.com",
    "{9AA46F4F-4DC7-4c06-97AF-6665170634FE}",
    "jid1-AQqSMBYb0a8ADg@jetpack",
    "{2e53b2d2-1bdf-446a-8f9d-9be4173886fe}",
    "{c7c3483c-0e96-45f4-8772-f84462cdc047}",
    "{802a552e-13d1-4683-a40a-1e5325fba4bb}",
    "bloodyvikings@ffs.bplaced.net",
    "develop@quick-amz.com",
    "addon@ytunblocker.com",
    "upload-blocker@clear-code.com",
    "trackmenot@mrl.nyu.edu",
    "2341n4m3@gmail.com",
    "shpassword@shpassword.fr",
    "{4cc4a13b-94a6-7568-370d-5f9de54a9c7f}",
    "dont-track-me-google@robwu.nl",
    "jid1-Y3WfE7td45aWDw@jetpack",
    "donottrackplus@abine.com",
    "{381f21b1-95bf-4042-bc5c-3a40b2a03f10}",
    "{6BB5760D-F97E-421B-AF5B-8457A90C3CED}",
    "jid1-w4wG5nJhx4LJZr@jetpack",
    "clear-flash-cookies@cpeterso.com",
    "{802a5f9b-f6a9-4b02-9700-b30390c3279b}",
    "{ced9def2-2d86-4a1b-a9eb-29e2f3c9eb48}",
    "qwantcomforfirefox@jetpack",
    "nordvpnproxy@nordvpn.com",
    "{446900e4-71c2-419f-a6a7-df9c091e268b}",
    "@testpilot-containers",
    "vpn@hide-my-ip.org",
    "{585280b0-ee78-428a-92c5-3fb3c0b85460}",
    "jid1-5Fs7iTLscUaZBgwr@jetpack",
    "CookieAutoDelete@kennydo.com",
    "firefox-addon@expressvpn.com",
    "{61a36b8b-6c7c-4dbc-ba7a-2b58d74eedd2}",
    "{2b10c1c8-a11f-4bad-fe9c-1c11e82cac42}",
    "{75afe46a-7a50-4c6b-b866-c43a1075b071}",
    "enquiry@purevpn.com",
    "jid1-ZAdIEUB7XOzOJw@jetpack",
    "switchyomega@feliscatus.addons.mozilla.org",
    "uMatrix@raymondhill.net",
    "{d634138d-c276-4fc8-924b-40a0ea21d284}",
    "woop-NoopscooPsnSXQ@jetpack",
    "public.proartex@gmail.com",
    "{6d85dea2-0fb4-4de3-9f8c-264bce9a2296}",
    "jid1-dwtFBkQjb3SIQp@jetpack",
    "{74b0af75-8791-44e2-95a6-7f0ab94143ec}",
    "cos@comodo.com",
    "addon@shoppingguru.info",
    "formhistory@yahoo.com",
    "{3004c9c0-ac9c-4ae2-9ac8-c59948bdd021}",
    "1centext_ff@1c.ru",
    "jid1-dwtGBwQjx3SUQc@jetpack",
    "@searchencrypt",
    "{c37bac34-849a-4d28-be41-549b2c76c64e}",
    "{60f82f00-9ad5-4de5-b31c-b16a47c51558}",
    "2.0@disconnect.me",
    "rf-firefox@siber.com",
    "jid1-KKzOGWgsW3Ao4Q@jetpack",
    "belgiumeid@eid.belgium.be",
    "e67f8350-7edf-11e3-baa7-0800200c9a66@fri-gate.org",
    "CanvasBlocker@kkapsner.de",
    "webextension@metamask.io",
    "divanproger@gmail.com",
    "{75493B06-1504-4976-9A55-B6FE240FF0BF}",
    "{4121db26-aeba-4014-b6fe-1db322d7c585}",
    "{60B7679C-BED9-11E5-998D-8526BB8E7F8B}",
    "@webrtc-leak-shield",
    "{de22fd49-c9ab-4359-b722-b3febdc3a0b0}",
    "{54e2eb33-18eb-46ad-a4e4-1329c29f6e17}",
    "{dd3d7613-0246-469d-bc65-2a3cc1668adc}",
    "{c3c10168-4186-445c-9c5b-63f12b8e2c87}",
    "{a0d7ccb3-214d-498b-b4aa-0e8fda9a7bf7}",
    "{732216ec-0dab-43bb-ac85-4b5e1977599d}",
    "{242af0bb-db11-4734-b7a0-61cb8a9b20fb}",
    "{531906d3-e22f-4a6c-a102-8057b88a1a63}",
    "{4c98c9c7-fc13-4622-b08a-a18923469c1c}",
    "jid1-PBNne26X1Kn6hQ@jetpack",
    "{ce9f4b1f-24b8-4e9a-9051-b9e472b1b2f2}",
    "keefox@chris.tomlinson",
    "keepassxc-browser@keepassxc.org",
    "{0ac04bdb-d698-452f-8048-bcef1a3f4b0d}",
    "@canvas-shadow",
    "jid1-FkPKYIvh3ElkQO@jetpack",
    "{850be3a2-ca5f-47ad-838c-fe39b006e0da}",
    "{bee8b1f2-823a-424c-959c-f8f76c8b2306}",
    "jid1-P34HaABBBpOerQ@jetpack",
    "{74145f27-f039-47ce-a470-a662b129930a}",
    "cors-everywhere@spenibus",
    "{fcf60470-b210-4c17-969e-9ae01491071e}",
    "{48748554-4c01-49e8-94af-79662bf34d50}",
    "browser@tunnelbear.com",
    "bestproxyswitcher@bestproxyswitcher.com",
    "jid0-XWJxt5VvCXkKzQK99PhZqAn7Xbg@jetpack",
    "{3e4d2037-d300-4e95-859d-3cba866f46d3}",
    "{d3e01ff2-9a3a-4007-8f6e-7acd9a5de263}",
    "contact@web-security.com",
    "firefox@browser-security.de",
    "cookie-manager@robwu.nl",
    "{af881826-e0f9-4b97-898a-a416dc473545}",
    "{b3e677f4-1150-4387-8629-da738260a48e}",
    "{41f9e51d-35e4-4b29-af66-422ff81c8b41}",
    "{e58d3966-3d76-4cd9-8552-1582fbc800c1}",
    "trafficlight@bitdefender.com",
    "{ed102056-8b4f-43a9-99cd-6d1b25abe87e}",
    "{4bf7c817-a8ab-4d98-b84d-65f79f05415d}",
    "info.asia@securebrain.co.jp",
    "{0fde9597-0508-47ff-ad8a-793fa059c4e7}",
    "stealthyextension@gmail.com",
    "forget-me-not@lusito.info",
    "{a138007c-5ff6-4d10-83d9-0afaf0efbe5e}",
    "adnauseam@rednoise.org",
    "jid0-YQz0l1jthOIz179ehuitYAOdBEs@jetpack",
    "{246C9D65-51E6-4B0C-9CCF-B081B7BF9242}",
    "{ecb80162-dfbd-4d91-a8da-17b35ba4707a}",
    "passwordmanager@avira.com",
    "ich@maltegoetz.de",
    "foxyproxy-basic@eric.h.jung",
    "jid0-3GUEt1r69sQNSrca5p8kx9Ezc3U@jetpack",
    "jid0-oEwF5ZcskGhjFv4Kk4lYc@jetpack",
    "authenticator@mymindstorm",
    "{fa247c57-77ac-41cd-b942-332051e15ced}",
    "{48df221a-8316-4d17-9191-7fc5ea5f14c0}",
    "KeeperFFStoreExtension@KeeperSecurityInc",
    "nortonsafeweb@symantec.com",
    "smart-referer@meh.paranoid.pk",
    "info@browser-privacy.com",
    "jid1-HdwPLukcGQeOSh@jetpack",
    "jid1-CKHySAadH4nL6Q@jetpack",
    "{5657c026-efc3-4860-b43b-16e4eaa8a9aa}",
    "{b21882eb-3211-44dc-964b-e6f35b33061f}",
    "{c607c8df-14a7-4f28-894f-29e8722976af}",
    "jid1-AWt6ex5aPvWtTg@jetpack",
    "{479f0278-2c34-4365-b9f0-1d328d0f0a40}",
    "jid0-GjwrPchS3Ugt7xydvqVK4DQk8Ls@jetpack",
    "mail@quick-buttons.de",
  ];
  const listOfInstalledAddons = await browser.privileged.addonsMetadata.getListOfInstalledAddons();
  const listOfInstalledThemes = await browser.privileged.addonsMetadata.getListOfInstalledThemes();
  const listOfSelfInstalledEnabledAddons = listOfInstalledAddons.filter(
    addon =>
      !addon.isSystem && !addon.userDisabled && addon.id !== browser.runtime.id,
  );
  const listOfSelfInstalledEnabledPopularPrivacySecurityAddons = listOfSelfInstalledEnabledAddons.filter(
    addon => popularPrivacySecurityAddonGuids.includes(addon.id),
  );
  const listOfSelfInstalledEnabledThemes = listOfInstalledThemes.filter(
    theme =>
      !theme.blocklisted &&
      !theme.userDisabled &&
      ![
        // List of themes shipped with firefox
        // Based on directory listing in mozilla-central/browser/themes/addons
        "firefox-compact-light@mozilla.org",
        "firefox-compact-dark@mozilla.org",
      ].includes(theme.id),
  );
  console.log({
    listOfInstalledAddons,
    listOfSelfInstalledEnabledAddons,
    listOfSelfInstalledEnabledPopularPrivacySecurityAddons,
    listOfInstalledThemes,
    listOfSelfInstalledEnabledThemes,
  });

  console.info(
    "Merging with model inputs from clientContext web extension experiment API",
  );

  safe_total_uri_count = await browser.privileged.clientContext.getTotalUriCount();
  if (safe_total_uri_count === undefined) {
    safe_total_uri_count = 0;
  }

  return {
    has_firefox_as_default_browser: asRouterTargetingGetters.isDefaultBrowser,
    active_ticks: await browser.privileged.clientContext.getActiveTicks(),
    total_uri_count: safe_total_uri_count,
    about_preferences_non_default_value_count: await browser.privileged.clientContext.getAboutPreferencesNonDefaultValueCount(),
    self_installed_addons_count: listOfSelfInstalledEnabledAddons.length,
    self_installed_popular_privacy_security_addons_count:
      listOfSelfInstalledEnabledPopularPrivacySecurityAddons.length,
    self_installed_themes_count: listOfSelfInstalledEnabledThemes.length,
    dark_mode_active:
      (await browser.privileged.clientContext.getCurrentTheme()) ===
      "firefox-compact-dark@mozilla.org",
    total_bookmarks_count: asRouterTargetingGetters.totalBookmarksCount,
    logins_saved_in_the_browser_count: await browser.privileged.clientContext.getLoginsSavedInBrowserCount(),
    firefox_account_prefs_configured: await browser.privileged.clientContext.getFxAConfigured(),
    profile_age_in_ms: Date.now() - asRouterTargetingGetters.profileAgeCreated,
    main_monitor_screen_width: await browser.privileged.clientContext.getMainMonitorScreenWidth(),
    update_channel: await browser.privileged.clientContext.getUpdateChannel(),
    locale: asRouterTargetingGetters.locale,
  };
};
