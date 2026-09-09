import { TeamMember, CivicUpdate, NotificationItem, Language } from '../types';
import { TRANSLATIONS as FULL_TRANSLATIONS, FullTranslationSchema } from './translations';

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'ankit-sharma',
    name: 'ANKIT SHARMA',
    designation: 'Web Developer',
    role: 'TEAM LEADER - BACKEND',
    quote: '"Web Developer — Architecting robust server-side logic and secure systems."',
    email: 'odishankit@gmail.com',
    phone: '8847845435',
    initials: 'AS',
    gradient: 'from-sky-400 to-blue-600',
  },
  {
    id: 'ayushman-pati',
    name: 'AYUSHMAN PATI',
    designation: 'Web Developer',
    role: 'MEMBER - FRONTEND',
    quote: '"Web Developer — Crafting fluid, interactive, and responsive user interfaces."',
    email: 'ayushmanpati5@gmail.com',
    phone: '8018109850',
    initials: 'AP',
    gradient: 'from-cyan-400 to-teal-500',
  },
  {
    id: 'spandan-mohanty',
    name: 'SPANDAN MOHANTY',
    designation: 'Web Developer',
    role: 'MEMBER - DATABASE',
    quote: '"Web Developer — Managing data structures and optimizing query performance."',
    email: 'mrspandanmohantyatwork@gmail.com',
    phone: '7809473790',
    initials: 'SM',
    gradient: 'from-purple-400 to-indigo-600',
  },
  {
    id: 'subhalaxmi-swain',
    name: 'SUBHALAXMI SWAIN',
    designation: 'Idea Presenter',
    role: 'MEMBER - PPT DESIGNER',
    quote: '"Idea Presenter — Designing impactful presentations to pitch our vision clearly."',
    email: 'slswain2006@gmail.com',
    phone: '9692816446',
    initials: 'SS',
    gradient: 'from-pink-400 to-rose-500',
  },
  {
    id: 'sneha-sinha',
    name: 'SNEHA SINHA',
    designation: 'Idea Presenter',
    role: 'MEMBER - PPT DESIGNER',
    quote: '"Idea Presenter — Structuring creative slides to showcase our project layout."',
    email: 'sinhasneha567@gmail.com',
    phone: '6370010557',
    initials: 'SS',
    gradient: 'from-amber-400 to-orange-500',
  },
];

export const INITIAL_UPDATES: CivicUpdate[] = [
  {
    id: 'upd_bbsr_01',
    ward: 'Ward 3',
    category: 'Infrastructure',
    description: 'Severe cratering and damaged stormwater culvert along KIIT Square to Infocity connector road. Heavy waterlogging causes two-wheeler skids and hazardous traffic bottlenecks during morning rush hours.',
    timestamp: '2 hours ago',
    status: 'in_progress',
    likes: 54,
    authorName: 'Rajesh Mohanty',
    authorId: 'usr_cit_01',
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-traffic-on-a-highway-at-night-42442-large.mp4',
    statusNote: 'BMC Works Division deployed contractor for sub-base excavation; asphalt patching scheduled.',
  },
  {
    id: 'upd_bbsr_02',
    ward: 'Ward 1',
    category: 'Waste Management',
    description: 'Unattended solid waste spillover near IRC Village community park entrance. Secondary bins have been overflowing for 4 days, attracting stray cattle and creating severe sanitary risk for morning walkers.',
    timestamp: '5 hours ago',
    status: 'pending',
    likes: 42,
    authorName: 'Priyanka Mishra',
    authorId: 'usr_cit_02',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop&q=80',
    statusNote: 'Awaiting ward sanitation supervisor dispatch review.',
  },
  {
    id: 'upd_bbsr_03',
    ward: 'Ward 2',
    category: 'Safety',
    description: 'Seven consecutive high-mast streetlights dark along Saheed Nagar Block-B inner lane. Complete dark zone after 7:30 PM creating heightened safety risks for women commuters and returning students.',
    timestamp: '12 hours ago',
    status: 'reviewing',
    likes: 68,
    authorName: 'Subash Chandra Das',
    authorId: 'usr_cit_03',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-night-traffic-in-a-busy-city-43183-large.mp4',
    statusNote: 'TPCODL electrical inspection squad notified for circuit breaker replacement.',
  },
  {
    id: 'upd_bbsr_04',
    ward: 'Ward 7',
    category: 'Public Health',
    description: 'Stagnant stormwater drain near Jagamara junction blocked with silt and debris, creating active mosquito breeding pool. Multiple vector-borne fever cases reported in adjacent apartment blocks.',
    timestamp: '1 day ago',
    status: 'in_progress',
    likes: 57,
    authorName: 'Dr. Ananya Ray',
    authorId: 'usr_cit_04',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=800&auto=format&fit=crop&q=80',
    statusNote: 'BMC Health & Sanitation team initiated larvicidal fogging and mechanical desilting.',
  },
  {
    id: 'upd_bbsr_05',
    ward: 'Ward 4',
    category: 'Transit',
    description: 'Severe bottleneck and unauthorized parking encroachment along Bindusagar circular heritage corridor. Mo Bus Route 11 experiences 25-minute delays during peak pilgrim hours.',
    timestamp: '1 day ago',
    status: 'pending',
    likes: 38,
    authorName: 'Biswajit Mohapatra',
    authorId: 'usr_cit_05',
    imageUrl: 'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?w=800&auto=format&fit=crop&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-dusk-42702-large.mp4',
    statusNote: 'Traffic management proposal submitted to Commissionerate Police.',
  },
  {
    id: 'upd_bbsr_06',
    ward: 'Ward 6',
    category: 'Water & Sanitation',
    description: 'Underground ductile iron pipe burst near Damana Square main distribution junction. Significant clean drinking water runoff flooding the carriage lane, causing low water pressure for 1,400 households.',
    timestamp: '2 days ago',
    status: 'resolved',
    likes: 83,
    authorName: 'Kalyan Rout',
    authorId: 'usr_cit_06',
    imageUrl: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?w=800&auto=format&fit=crop&q=80',
    statusNote: 'WATCO emergency engineering team clamped the 300mm pipe. System pressure restored to 2.1 bar.',
  },
  {
    id: 'upd_bbsr_07',
    ward: 'Ward 5',
    category: 'Education',
    description: 'Overcrowded pedestrian footpath and non-functional zebra crossing signal directly outside Government High School, Unit 9. Urgent requirement for automated pedestrian light and speed rumble strips.',
    timestamp: '3 days ago',
    status: 'reviewing',
    likes: 49,
    authorName: 'Smita Pattnaik',
    authorId: 'usr_cit_07',
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop&q=80',
    statusNote: 'School safety zone audit logged by Municipal Traffic Cell.',
  },
  {
    id: 'upd_bbsr_08',
    ward: 'Ward 3',
    category: 'Parks & Greenery',
    description: 'Overgrown thorny shrubs and collapsed perimeter fencing at Sector-7 children park. Several play items broken with exposed rusty metal surfaces.',
    timestamp: '3 days ago',
    status: 'pending',
    likes: 31,
    authorName: 'Tanmay Tripathy',
    authorId: 'usr_cit_08',
    imageUrl: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&auto=format&fit=crop&q=80',
    statusNote: 'Horticulture division maintenance roster updated for upcoming week.',
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [];

export type TranslationSchema = FullTranslationSchema & {
  // Legacy flat fields for backward compatibility
  title: string;
  subtitle: string;
  audio: string;
  photo: string;
  placeholder: string;
  submit: string;
  msgText: string;
  whatsapp: string;
  categoryLabel: string;
  wardLabel: string;
  recordingVoice: string;
  stopRecord: string;
  photoAttached: string;
  audioAttached: string;
  remove: string;
  submitting: string;
  successTitle: string;
  successDesc: string;
  tapToSpeak: string;
  clickToFinish: string;
  uploadOrSnap: string;
  clickToChange: string;
  voiceNote: string;
  attached: string;
  supabaseSynced: string;
  ref: string;
  pleaseDescribe: string;
  authorityCannotSubmit: string;
  tickerLabel: string;
  tickerStatus: string;
  tickerTotalPetitions: string;
  tickerAwaiting: string;
  tickerInProgress: string;
  tickerResolved: string;
  tickerCallToAction: string;
  tickerDefault: string;
  liveUpdatesTitle: string;
  filterAll: string;
  recordsSingle: string;
  recordsPlural: string;
  noUpdatesTitle: string;
  noUpdatesDesc: string;
  byAuthor: string;
  justNow: string;
  wardPrefix: string;

  // Component namespace aliases
  authModal: {
    citizenRole: string;
    officerRole: string;
    signInTitle: string;
    signUpTitle: string;
    signInSubtitleCitizen: string;
    signInSubtitleAuthority: string;
    signUpSubtitleCitizen: string;
    signUpSubtitleAuthority: string;
    emailLabel: string;
    emailPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    confirmPasswordLabel: string;
    confirmPasswordPlaceholder: string;
    submitSignIn: string;
    submitSignUp: string;
    signInBtn: string;
    signingInBtn: string;
    registerAccountBtn: string;
    creatingAccountBtn: string;
    dontHaveAccount: string;
    signUpLink: string;
    alreadyHaveAccount: string;
    signInLink: string;
    processing: string;
    noAccount: string;
    haveAccount: string;
    createOne: string;
    logInHere: string;
    goToSignup: string;
    accountCreatedSuccess: string;
    errors: {
      enterEmailPassword: string;
      passwordLength: string;
      passwordMismatch: string;
      notRegisteredCitizen: string;
      notRegisteredAuthority: string;
      invalidPassword: string;
      accountExists: string;
    };
  };
  profileMenu: {
    hi: string;
    updateRequiredDetails: string;
    officerIntelligenceSuite: string;
    active: string;
    resolvedPetitions: string;
    officialAlerts: string;
    mySubmissions: string;
    resolvedRequests: string;
    notifications: string;
    signOut: string;
    civicInnovators: string;
    officialPortal: string;
  };
  profileDropdown: {
    jannitiCitizenPortal: string;
    authoritySuite: string;
    myPetitions: string;
    aboutDevs: string;
    notifications: string;
    signOut: string;
  };
  submissionsDrawer: {
    title: string;
    userTitleSuffix: string;
    subtitle: string;
    filterAll: string;
    filterPending: string;
    filterInProgress: string;
    filterResolved: string;
    searchPlaceholder: string;
    noPetitions: string;
    noPetitionsDesc: string;
    officerNote: string;
    verifiedCitizen: string;
  };
  notificationsModal: {
    title: string;
    subtitle: string;
    markAllRead: string;
    noNotifications: string;
    empty: string;
  };
  profileSetup: FullTranslationSchema['profileSetup'] & {
    errors: {
      legalName: string;
      phone: string;
      address: string;
      pincode: string;
      department: string;
    };
  };
};

function buildMergedTranslations(lang: Language): TranslationSchema {
  const full = FULL_TRANSLATIONS[lang] || FULL_TRANSLATIONS.en;

  const authModalObj = {
    citizenRole: full.auth.roleCitizen,
    officerRole: full.auth.roleOfficer,
    signInTitle: full.auth.signInTitle,
    signUpTitle: full.auth.signUpTitle,
    signInSubtitleCitizen: full.auth.signInDesc,
    signInSubtitleAuthority: full.auth.roleOfficerDesc,
    signUpSubtitleCitizen: full.auth.signUpDesc,
    signUpSubtitleAuthority: full.auth.roleOfficerDesc,
    emailLabel: full.auth.emailLabel,
    emailPlaceholder: full.auth.emailPlaceholder,
    passwordLabel: full.auth.passwordLabel,
    passwordPlaceholder: full.auth.passwordPlaceholder,
    confirmPasswordLabel: full.auth.confirmPasswordLabel,
    confirmPasswordPlaceholder: full.auth.confirmPasswordPlaceholder,
    submitSignIn: full.auth.submitSignIn,
    submitSignUp: full.auth.submitSignUp,
    signInBtn: full.auth.submitSignIn,
    signingInBtn: full.auth.processing,
    registerAccountBtn: full.auth.submitSignUp,
    creatingAccountBtn: full.auth.processing,
    dontHaveAccount: full.auth.noAccount,
    signUpLink: full.auth.createOne,
    alreadyHaveAccount: full.auth.haveAccount,
    signInLink: full.auth.logInHere,
    processing: full.auth.processing,
    noAccount: full.auth.noAccount,
    haveAccount: full.auth.haveAccount,
    createOne: full.auth.createOne,
    logInHere: full.auth.logInHere,
    goToSignup: full.auth.createOne,
    accountCreatedSuccess: lang === 'hi' ? 'खाता सफलतापूर्वक बनाया गया! कृपया साइन इन करें।' : lang === 'or' ? 'ଖାତା ସଫଳତାର ସହିତ ସୃଷ୍ଟି ହୋଇଛି! ଦୟାକରି ସାଇନ୍ ଇନ୍ କରନ୍ତୁ।' : 'Account created successfully! Please sign in.',
    errors: {
      enterEmailPassword: full.auth.validationEmailPass,
      passwordLength: full.auth.validationPassMin,
      passwordMismatch: full.auth.validationPassMatch,
      notRegisteredCitizen: lang === 'hi' ? 'नागरिक खाता पंजीकृत नहीं है। कृपया पहले साइन अप करें।' : lang === 'or' ? 'ନାଗରିକ ଖାତା ପଞ୍ଜୀକୃତ ହୋଇନାହିଁ। ଦୟାକରି ପ୍ରଥମେ ସାଇନ୍ ଅପ୍ କରନ୍ତୁ।' : 'Citizen account not registered. Please sign up first.',
      notRegisteredAuthority: lang === 'hi' ? 'अधिकारी खाता पंजीकृत नहीं है। कृपया पहले साइन अप करें।' : lang === 'or' ? 'ଅଧିକାରୀ ଖାତା ପଞ୍ଜୀକୃତ ହୋଇନାହିଁ। ଦୟାକରି ପ୍ରଥମେ ସାଇନ୍ ଅପ୍ କରନ୍ତୁ।' : 'Authority Officer account not registered. Please sign up first.',
      invalidPassword: lang === 'hi' ? 'अमान्य पासवर्ड। कृपया पुन: प्रयास करें।' : lang === 'or' ? 'ଅବୈଧ ପାସୱାର୍ଡ। ଦୟାକରି ପୁନଃ ଚେଷ୍ଟା କରନ୍ତୁ।' : 'Invalid password. Please try again.',
      accountExists: lang === 'hi' ? 'इस ईमेल के साथ खाता पहले से मौजूद है।' : lang === 'or' ? 'ଏହି ଇମେଲ୍ ସହିତ ଖାତା ପୂର୍ବରୁ ବିଦ୍ୟମାନ ଅଛି।' : 'An account with this email already exists.',
    },
  };

  const profileMenuObj = {
    hi: full.profile.greeting,
    updateRequiredDetails: full.profile.updateDetails,
    officerIntelligenceSuite: full.profile.switchToOfficer,
    active: lang === 'hi' ? 'सक्रिय' : lang === 'or' ? 'ସକ୍ରିୟ' : 'Active',
    resolvedPetitions: full.profile.resolvedGrievances,
    officialAlerts: full.profile.notifications,
    mySubmissions: full.profile.myGrievances,
    resolvedRequests: full.profile.resolvedGrievances,
    notifications: full.profile.notifications,
    signOut: full.profile.signOut,
    civicInnovators: full.common.brandName,
    officialPortal: full.common.technologyTogetherness,
  };

  const profileDropdownObj = {
    jannitiCitizenPortal: full.footer.portalLink,
    authoritySuite: full.footer.officerLink,
    myPetitions: full.footer.civicLedger,
    aboutDevs: full.footer.aboutDevs,
    notifications: full.profile.notifications,
    signOut: full.profile.signOut,
  };

  const submissionsDrawerObj = {
    title: full.drawer.title,
    userTitleSuffix: full.drawer.userTitleSuffix,
    subtitle: full.drawer.subtitle,
    filterAll: full.drawer.filterAll,
    filterPending: full.drawer.filterPending,
    filterInProgress: full.drawer.filterInProgress,
    filterResolved: full.drawer.filterResolved,
    searchPlaceholder: full.drawer.searchPlaceholder,
    noPetitions: full.drawer.noPetitions,
    noPetitionsDesc: full.drawer.noPetitionsDesc,
    officerNote: full.drawer.officerNote,
    verifiedCitizen: full.common.citizen,
  };

  const notificationsModalObj = {
    title: full.notifications.title,
    subtitle: full.notifications.subtitle,
    markAllRead: full.notifications.markAllRead,
    noNotifications: full.notifications.empty,
    empty: full.notifications.empty,
  };

  const profileSetupObj = {
    ...full.profileSetup,
    errors: {
      legalName: full.profileSetup.validationName,
      phone: full.profileSetup.validationPhone,
      address: full.profileSetup.validationAddress,
      pincode: full.profileSetup.validationPincode,
      department: full.profileSetup.validationDepartment,
    },
  };

  return {
    ...full,
    title: full.jannitiPortal.title,
    subtitle: full.jannitiPortal.subtitle,
    audio: full.jannitiPortal.audio,
    photo: full.jannitiPortal.photo,
    placeholder: full.jannitiPortal.placeholder,
    submit: full.jannitiPortal.submit,
    msgText: full.jannitiPortal.msgText,
    whatsapp: full.jannitiPortal.whatsapp,
    categoryLabel: full.jannitiPortal.categoryLabel,
    wardLabel: full.jannitiPortal.wardLabel,
    recordingVoice: full.jannitiPortal.recordingVoice,
    stopRecord: full.jannitiPortal.stopRecord,
    photoAttached: full.jannitiPortal.photoAttached,
    audioAttached: full.jannitiPortal.audioAttached,
    remove: full.jannitiPortal.remove,
    submitting: full.jannitiPortal.submitting,
    successTitle: full.jannitiPortal.successTitle,
    successDesc: full.jannitiPortal.successDesc,
    tapToSpeak: full.jannitiPortal.tapToSpeak,
    clickToFinish: full.jannitiPortal.clickToFinish,
    uploadOrSnap: full.jannitiPortal.uploadOrSnap,
    clickToChange: full.jannitiPortal.clickToChange,
    voiceNote: full.jannitiPortal.voiceNote,
    attached: full.jannitiPortal.attached,
    supabaseSynced: full.jannitiPortal.supabaseSynced,
    ref: full.jannitiPortal.ref,
    pleaseDescribe: full.jannitiPortal.pleaseDescribe,
    authorityCannotSubmit: full.jannitiPortal.authorityCannotSubmit,
    tickerLabel: full.jannitiPortal.tickerLabel,
    tickerStatus: full.jannitiPortal.tickerStatus,
    tickerTotalPetitions: full.jannitiPortal.tickerTotalPetitions,
    tickerAwaiting: full.jannitiPortal.tickerAwaiting,
    tickerInProgress: full.jannitiPortal.tickerInProgress,
    tickerResolved: full.jannitiPortal.tickerResolved,
    tickerCallToAction: full.jannitiPortal.tickerCallToAction,
    tickerDefault: full.jannitiPortal.tickerDefault,
    liveUpdatesTitle: full.jannitiPortal.liveUpdatesTitle,
    filterAll: full.common.filterAll,
    recordsSingle: full.common.recordsSingle,
    recordsPlural: full.common.recordsPlural,
    noUpdatesTitle: full.jannitiPortal.noUpdatesTitle,
    noUpdatesDesc: full.jannitiPortal.noUpdatesDesc,
    byAuthor: full.jannitiPortal.byAuthor,
    justNow: full.common.justNow,
    wardPrefix: full.common.wardPrefix,

    authModal: authModalObj,
    profileMenu: profileMenuObj,
    profileDropdown: profileDropdownObj,
    submissionsDrawer: submissionsDrawerObj,
    notificationsModal: notificationsModalObj,
    profileSetup: profileSetupObj,
  };
}

export const TRANSLATIONS: Record<Language, TranslationSchema> = {
  en: buildMergedTranslations('en'),
  hi: buildMergedTranslations('hi'),
  or: buildMergedTranslations('or'),
};
