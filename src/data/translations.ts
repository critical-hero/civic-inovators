import { Language } from '../types';

export interface FullTranslationSchema {
  // Common / Global
  common: {
    appTitle: string;
    brandName: string;
    tagline: string;
    byThePeople: string;
    technologyTogetherness: string;
    justNow: string;
    recordsSingle: string;
    recordsPlural: string;
    wardPrefix: string;
    allWards: string;
    allCategories: string;
    filterAll: string;
    cancel: string;
    close: string;
    save: string;
    submit: string;
    submitting: string;
    remove: string;
    search: string;
    officer: string;
    citizen: string;
    status: string;
    actions: string;
    score: string;
    rank: string;
    urgency: string;
    low: string;
    medium: string;
    high: string;
    critical: string;
  };
  categories: Record<string, string>;
  statuses: {
    pending: string;
    reviewing: string;
    in_progress: string;
    resolved: string;
  };
  header: {
    brand: string;
    login: string;
    signUp: string;
    portalTitle: string;
    officerTooltip: string;
    citizenTooltip: string;
    toggleThemeDark: string;
    toggleThemeLight: string;
    selectLanguage: string;
  };
  jannitiPortal: {
    title: string;
    subtitle: string;
    audio: string;
    photo: string;
    textInput: string;
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
    noUpdatesTitle: string;
    noUpdatesDesc: string;
    byAuthor: string;
    upvoted: string;
    upvote: string;
    writeDescription: string;
  };
  officerSuite: {
    suiteBadge: string;
    decisionEngine: string;
    subtitle: string;
    exportPlan: string;
    signInOfficer: string;
    exportSuccess: string;
    readyForCouncil: string;
    tabs: {
      hotspots: string;
      fusion: string;
      ranking: string;
      impact: string;
      portfolio: string;
    };
    filterWard: string;
    filterCategory: string;
    searchPlaceholder: string;
    views: {
      hotspots: {
        title: string;
        desc: string;
        heatmapTitle: string;
        heatmapSubtitle: string;
        interactiveGisWaiting: string;
        interactiveGisDesc: string;
        demandIndex: string;
        topNeed: string;
        recurringTitle: string;
        recurringDesc: string;
        noData: string;
        anomalyTitle: string;
        anomalyDesc: string;
        anomalyBadge: string;
        priorityBadge: string;
      };
      fusion: {
        title: string;
        desc: string;
        engineTitle: string;
        engineDesc: string;
        colNeed: string;
        colDemographic: string;
        colInfra: string;
        colOutput: string;
        substantiatedHigh: string;
        substantiatedMed: string;
        substantiatedLow: string;
        reconcilerTitle: string;
        reconcilerDesc: string;
        caseEval: string;
        activeReconcile: string;
        citizenPerception: string;
        objectiveTelemetry: string;
        reconcileSynthesis: string;
      };
      ranking: {
        title: string;
        desc: string;
        methodologyTitle: string;
        methodologyDesc: string;
        methodologyFormula: string;
        outputTitle: string;
        outputDesc: string;
        colRank: string;
        colWard: string;
        colCategory: string;
        colScore: string;
        colUrgency: string;
        colAction: string;
        btnReview: string;
        btnStartWork: string;
        btnResolved: string;
      };
      impact: {
        title: string;
        desc: string;
        projectedTitle: string;
        projectedDesc: string;
        beneficiaries: string;
        qolScore: string;
        roiEstimate: string;
        costEff: string;
        chartTitle: string;
        chartDesc: string;
        metricSocial: string;
        metricHealth: string;
        metricEconomic: string;
      };
      portfolio: {
        title: string;
        desc: string;
        budgetTitle: string;
        budgetDesc: string;
        totalBudget: string;
        allocated: string;
        remaining: string;
        optimizedListTitle: string;
        optimizedListDesc: string;
        colProject: string;
        colWard: string;
        colCost: string;
        colPriority: string;
        colStatus: string;
        approved: string;
      };
    };
  };
  team: {
    badge: string;
    title: string;
    subtitle: string;
    tagline: string;
    roles: {
      teamLeaderBackend: string;
      memberFrontend: string;
      memberDatabase: string;
      memberPptDesigner: string;
      webDev: string;
      ideaPresenter: string;
    };
    quotes: {
      ankit: string;
      ayushman: string;
      spandan: string;
      subhalaxmi: string;
      sneha: string;
    };
    copySuccess: string;
    call: string;
    email: string;
  };
  auth: {
    signInTitle: string;
    signUpTitle: string;
    signInDesc: string;
    signUpDesc: string;
    roleCitizen: string;
    roleOfficer: string;
    roleOfficerDesc: string;
    emailLabel: string;
    emailPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    confirmPasswordLabel: string;
    confirmPasswordPlaceholder: string;
    submitSignIn: string;
    submitSignUp: string;
    processing: string;
    noAccount: string;
    haveAccount: string;
    createOne: string;
    logInHere: string;
    validationEmailPass: string;
    validationPassMin: string;
    validationPassMatch: string;
  };
  profile: {
    greeting: string;
    officerBadge: string;
    citizenBadge: string;
    updateDetails: string;
    myGrievances: string;
    resolvedGrievances: string;
    notifications: string;
    switchToOfficer: string;
    switchToCitizen: string;
    signOut: string;
  };
  profileSetup: {
    title: string;
    subtitle: string;
    fullName: string;
    fullNamePlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    ward: string;
    city: string;
    cityPlaceholder: string;
    address: string;
    addressPlaceholder: string;
    pincode: string;
    pincodePlaceholder: string;
    department: string;
    departmentPlaceholder: string;
    saveAndContinue: string;
    saving: string;
    validationName: string;
    validationPhone: string;
    validationAddress: string;
    validationPincode: string;
    validationDepartment: string;
  };
  drawer: {
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
  };
  notifications: {
    title: string;
    subtitle: string;
    markAllRead: string;
    empty: string;
  };
  footer: {
    brand: string;
    byThePeople: string;
    portalLink: string;
    officerLink: string;
    aboutDevs: string;
    civicLedger: string;
    craftedWith: string;
    forBetter: string;
  };
}

export const TRANSLATIONS: Record<Language, FullTranslationSchema> = {
  en: {
    common: {
      appTitle: 'JANNITI',
      brandName: 'Civic Innovators',
      tagline: 'Technology + Togetherness',
      byThePeople: 'By the People For the People',
      technologyTogetherness: 'TECHNOLOGY + TOGETHERNESS',
      justNow: 'Just now',
      recordsSingle: 'record',
      recordsPlural: 'records',
      wardPrefix: 'Ward',
      allWards: 'All Wards',
      allCategories: 'All Categories',
      filterAll: 'All',
      cancel: 'Cancel',
      close: 'Close',
      save: 'Save Changes',
      submit: 'Submit',
      submitting: 'Submitting...',
      remove: 'Remove',
      search: 'Search...',
      officer: 'Officer',
      citizen: 'Citizen',
      status: 'Status',
      actions: 'Actions',
      score: 'Score',
      rank: 'Rank',
      urgency: 'Urgency',
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      critical: 'Critical',
    },
    categories: {
      'Infrastructure': 'Infrastructure',
      'Education': 'Education',
      'Public Health': 'Public Health',
      'Transit': 'Transit',
      'Safety': 'Safety',
      'Waste Management': 'Waste Management',
      'Water & Sanitation': 'Water & Sanitation',
      'Parks & Greenery': 'Parks & Greenery',
    },
    statuses: {
      pending: 'Pending',
      reviewing: 'Reviewing',
      in_progress: 'In Progress',
      resolved: 'Resolved',
    },
    header: {
      brand: 'Civic Innovators',
      login: 'Login',
      signUp: 'Sign Up',
      portalTitle: 'JANNITI',
      officerTooltip: 'Civic Intelligence Platform (Officer View)',
      citizenTooltip: 'Go to JANNITI Citizen Portal',
      toggleThemeDark: 'Switch to Light Mode',
      toggleThemeLight: 'Switch to Dark Mode',
      selectLanguage: 'Select Language',
    },
    jannitiPortal: {
      title: 'Share your development need',
      subtitle: 'How would you like to submit your request?',
      audio: 'Record Voice',
      photo: 'Take Photo',
      textInput: 'Type Details',
      placeholder: 'Type your suggestion or describe the issue here...',
      submit: 'Submit to Council',
      msgText: 'Or submit using your favorite app:',
      whatsapp: '💬 Submit via WhatsApp',
      categoryLabel: 'Category',
      wardLabel: 'Ward Number',
      recordingVoice: 'Recording voice message...',
      stopRecord: 'Stop Recording',
      photoAttached: 'Photo attached',
      audioAttached: 'Audio recording ready',
      remove: 'Remove',
      submitting: 'Submitting to Council...',
      successTitle: 'Submission Successful!',
      successDesc: 'Your request has been routed to the Municipal Council and added to the civic ledger.',
      tapToSpeak: 'Tap to speak',
      clickToFinish: 'Click to finish',
      uploadOrSnap: 'Upload or Snap',
      clickToChange: 'Click to change',
      voiceNote: 'Voice Note',
      attached: 'Attached',
      supabaseSynced: 'Supabase Synced',
      ref: 'Ref #',
      pleaseDescribe: 'Please describe your request, attach a photo, or record a voice note.',
      authorityCannotSubmit: 'Authority Officer accounts cannot submit citizen grievances. Please use the Civic Intelligence & Resolution Suite to review and process ward petitions.',
      tickerLabel: 'CIVIC TICKER',
      tickerStatus: 'Civic Ledger Status:',
      tickerTotalPetitions: 'total petition(s) recorded',
      tickerAwaiting: 'awaiting council review',
      tickerInProgress: 'in progress',
      tickerResolved: 'resolved',
      tickerCallToAction: 'Your voice shapes our community! Submit requests directly to municipal officers.',
      tickerDefault: 'JANNITI Civic Grievance & Development Portal: Submit community needs, voice recordings, and photos directly to your Municipal Council • Verified citizen ledger tracking with real-time status updates',
      liveUpdatesTitle: 'Live Civic Updates',
      noUpdatesTitle: 'No Civic Petitions Yet',
      noUpdatesDesc: 'Be the first citizen in your ward to report an issue or suggest a development project using the form on the right.',
      byAuthor: 'By',
      upvoted: 'Upvoted',
      upvote: 'Upvote',
      writeDescription: 'Description of your need...',
    },
    officerSuite: {
      suiteBadge: 'Authority Officer Suite',
      decisionEngine: 'Municipal Decision Engine',
      subtitle: 'Multilingual NLP synthesis, contextual data fusion, and constraint-aware priority optimization derived from live citizen petitions.',
      exportPlan: 'Export Master Plan',
      signInOfficer: 'Sign In as Officer',
      exportSuccess: 'Master Municipal Capital Allocation Plan exported successfully as JSON file!',
      readyForCouncil: 'Ready for Council Review',
      tabs: {
        hotspots: 'Demand Hotspots',
        fusion: 'Context & Fusion',
        ranking: 'Priority Ranking',
        impact: 'Predictive Impact',
        portfolio: 'Portfolio Plan',
      },
      filterWard: 'All Wards',
      filterCategory: 'All Categories',
      searchPlaceholder: 'Search civic petitions, keywords, or wards...',
      views: {
        hotspots: {
          title: 'Demand Hotspot Mapping',
          desc: 'Multilingual NLP synthesis of raw citizen inputs. Distinguishing verified recurring themes from isolated anomalies to map actionable civic priorities.',
          heatmapTitle: 'Geospatial Ward Demand Heatmap',
          heatmapSubtitle: 'Based on verified citizen records',
          interactiveGisWaiting: 'Interactive GIS Map Waiting for Citizen Requests',
          interactiveGisDesc: 'As citizens submit requests via the JANNITI portal, geospatial hotspots will cluster here in real time.',
          demandIndex: 'Demand Index',
          topNeed: 'Top Need',
          recurringTitle: 'Recurring Thematic Needs',
          recurringDesc: 'NLP extraction from multilingual citizen submissions.',
          noData: 'No categorical data recorded yet. Submit petitions in the portal to generate NLP clusters.',
          anomalyTitle: 'Priority & Anomaly Detection',
          anomalyDesc: 'Automated distinction between substantiated civic trends and solitary outliers.',
          anomalyBadge: 'Anomaly',
          priorityBadge: 'Verified Priority',
        },
        fusion: {
          title: 'Contextual Grounding & Fusion',
          desc: 'Integrating heterogeneous citizen input with demographic datasets and infrastructure telemetry to yield a rigorously justified prioritization framework.',
          engineTitle: 'Multi-Source Data Fusion Engine',
          engineDesc: 'Cross-referencing citizen-articulated needs against demographic census indicators and existing infrastructure GIS records.',
          colNeed: 'Identified Civic Need',
          colDemographic: 'Demographic Context',
          colInfra: 'Infrastructure Gap (Telemetry)',
          colOutput: 'Synthesis Output',
          substantiatedHigh: 'Highly Substantiated',
          substantiatedMed: 'Substantiated',
          substantiatedLow: 'Low Justification',
          reconcilerTitle: 'Perception vs. Objective Data Reconciler',
          reconcilerDesc: 'Automatically identifies and reconciles discrepancies between subjective citizen complaints and telemetry/documented conditions.',
          caseEval: 'Case Evaluation',
          activeReconcile: 'Reconciliation Synthesis Active',
          citizenPerception: 'Citizen Perception (NLP Output)',
          objectiveTelemetry: 'Objective Telemetry (IoT/Utility Municipal API)',
          reconcileSynthesis: 'Reconciliation Synthesis',
        },
        ranking: {
          title: 'Comparative Evaluation & Priority Ranking',
          desc: 'Adjudicating competing development proposals against actual demand indicators to produce a defensible, auditable prioritization list for council decision-making.',
          methodologyTitle: 'Transparent & Auditable Methodology',
          methodologyDesc: 'Rankings are generated by a defensible mathematical formula weighting synthesized civic demand volume against objective empirical indicators.',
          methodologyFormula: 'Priority Score (1-100) = [ (Civic_Demand_NLP_Weight × 0.40) + (Infrastructure_Gap_Deficit × 0.40) + (Population_Density_Factor × 0.20) ]',
          outputTitle: 'Resource-Constrained Prioritization Output',
          outputDesc: 'Real-time ranking of recorded civic petitions with live action controls',
          colRank: 'Rank',
          colWard: 'Ward & Category',
          colCategory: 'Identified Project Need',
          colScore: 'Calculated Score',
          colUrgency: 'Urgency',
          colAction: 'Council Actions',
          btnReview: 'Review',
          btnStartWork: 'Start Work',
          btnResolved: 'Resolve',
        },
        impact: {
          title: 'Predictive Impact Modeling',
          desc: 'Simulating long-term socio-economic return, environmental benefits, and civic quality-of-life indices for prioritized infrastructure proposals.',
          projectedTitle: 'Projected Civic Return on Investment',
          projectedDesc: 'Predictive analytics model calculating outcome score per municipal rupee allocated.',
          beneficiaries: 'Projected Beneficiaries',
          qolScore: 'Quality of Life Boost',
          roiEstimate: 'Estimated Civic ROI',
          costEff: 'Cost Efficiency Index',
          chartTitle: 'Multi-Dimensional Impact Analysis',
          chartDesc: 'Simulated community outcomes across social equity, health, and economic indicators.',
          metricSocial: 'Social Equity Impact',
          metricHealth: 'Public Health & Safety',
          metricEconomic: 'Economic Vitality',
        },
        portfolio: {
          title: 'Municipal Capital Allocation & Portfolio Plan',
          desc: 'Constraint-aware capital budget allocation maximizing social impact while respecting ward-level equity and municipal funding caps.',
          budgetTitle: 'Capital Budget Optimization',
          budgetDesc: 'Automated portfolio balancing under current fiscal year municipal limits.',
          totalBudget: 'Municipal Capital Budget',
          allocated: 'Allocated Capital',
          remaining: 'Remaining Reserve',
          optimizedListTitle: 'Recommended Municipal Project Portfolio',
          optimizedListDesc: 'Optimized project schedule for upcoming Council General Body approval.',
          colProject: 'Proposed Project',
          colWard: 'Target Ward',
          colCost: 'Estimated Capital (₹ Lakhs)',
          colPriority: 'Score',
          colStatus: 'Council Status',
          approved: 'Approved for Allocation',
        },
      },
    },
    team: {
      badge: 'About The Developers • Civic Innovators',
      title: 'MEET OUR TEAM',
      subtitle: '"By the People For the People" • TECHNOLOGY + TOGETHERNESS',
      tagline: 'Engineering intelligent public systems for transparent civic governance',
      roles: {
        teamLeaderBackend: 'TEAM LEADER - BACKEND',
        memberFrontend: 'MEMBER - FRONTEND',
        memberDatabase: 'MEMBER - DATABASE',
        memberPptDesigner: 'MEMBER - PPT DESIGNER',
        webDev: 'Web Developer',
        ideaPresenter: 'Idea Presenter',
      },
      quotes: {
        ankit: '"Web Developer — Architecting robust server-side logic and secure systems."',
        ayushman: '"Web Developer — Crafting fluid, interactive, and responsive user interfaces."',
        spandan: '"Web Developer — Managing data structures and optimizing query performance."',
        subhalaxmi: '"Idea Presenter — Designing impactful presentations to pitch our vision clearly."',
        sneha: '"Idea Presenter — Structuring creative slides to showcase our project layout."',
      },
      copySuccess: 'Copied to clipboard!',
      call: 'Call',
      email: 'Email',
    },
    auth: {
      signInTitle: 'Welcome Back',
      signUpTitle: 'Create Citizen Account',
      signInDesc: 'Log in to manage your petitions and civic engagement',
      signUpDesc: 'Register with your verified email to submit civic petitions',
      roleCitizen: 'Citizen / Resident',
      roleOfficer: 'Municipal Authority Officer',
      roleOfficerDesc: 'Municipal Officer account grants access to the Civic Intelligence & Decision Engine.',
      emailLabel: 'Email Address',
      emailPlaceholder: 'you@example.com',
      passwordLabel: 'Password',
      passwordPlaceholder: '••••••••',
      confirmPasswordLabel: 'Confirm Password',
      confirmPasswordPlaceholder: '••••••••',
      submitSignIn: 'Sign In to Portal',
      submitSignUp: 'Create Verified Account',
      processing: 'Authenticating...',
      noAccount: "Don't have an account?",
      haveAccount: 'Already have an account?',
      createOne: 'Sign Up here',
      logInHere: 'Log in here',
      validationEmailPass: 'Please enter both email and password.',
      validationPassMin: 'Password must be at least 6 characters long.',
      validationPassMatch: 'Passwords do not match. Please check and try again.',
    },
    profile: {
      greeting: 'Hi',
      officerBadge: 'Authority Officer',
      citizenBadge: 'Citizen',
      updateDetails: 'Update Required Details',
      myGrievances: 'My Grievances & Requests',
      resolvedGrievances: 'Resolved Grievances',
      notifications: 'Civic Notifications',
      switchToOfficer: 'Open Officer Intelligence Suite',
      switchToCitizen: 'Open JANNITI Citizen Portal',
      signOut: 'Sign Out',
    },
    profileSetup: {
      title: 'Complete Required Profile Details',
      subtitle: 'Please verify your locality details to submit verified civic petitions.',
      fullName: 'Full Legal Name',
      fullNamePlaceholder: 'e.g. Ankit Sharma',
      phone: 'Phone Number (10 digits)',
      phonePlaceholder: 'e.g. 9876543210',
      ward: 'Ward Number',
      city: 'City / Municipality',
      cityPlaceholder: 'e.g. Bhubaneswar',
      address: 'Residence / Locality Address',
      addressPlaceholder: 'e.g. Plot 102, Master Canteen Square',
      pincode: 'Postal Pincode (6 digits)',
      pincodePlaceholder: 'e.g. 751001',
      department: 'Department Designation (For Officers)',
      departmentPlaceholder: 'e.g. Executive Engineer - Urban Works',
      saveAndContinue: 'Save & Continue',
      saving: 'Saving Profile...',
      validationName: 'Please enter your full legal name.',
      validationPhone: 'Please enter a valid 10-digit phone number.',
      validationAddress: 'Please enter your residence / locality address.',
      validationPincode: 'Please enter a valid 6-digit postal pincode.',
      validationDepartment: 'Please specify your municipal department/office designation.',
    },
    drawer: {
      title: 'Community Submissions Ledger',
      userTitleSuffix: "'s Civic Submissions",
      subtitle: 'Track status and timeline of municipal requests',
      filterAll: 'All Petitions',
      filterPending: 'Pending',
      filterInProgress: 'In Progress',
      filterResolved: 'Resolved',
      searchPlaceholder: 'Search by description, ward, category...',
      noPetitions: 'No petitions found in this filter category.',
      noPetitionsDesc: 'Submit a new grievance or suggestion through the JANNITI portal to view it on the ledger.',
      officerNote: 'Officer Note',
    },
    notifications: {
      title: 'Civic Notifications',
      subtitle: 'Real-time alerts on your requests and civic events',
      markAllRead: 'Mark all as read',
      empty: 'No new notifications.',
    },
    footer: {
      brand: 'CIVIC INNOVATORS',
      byThePeople: '“By the People For the People” • About the Developers',
      portalLink: 'JANNITI Portal',
      officerLink: 'Intelligence Suite (Officer View)',
      aboutDevs: 'About Developers',
      civicLedger: 'Civic Ledger',
      craftedWith: 'Crafted with',
      forBetter: 'for Better Communities',
    },
  },
  hi: {
    common: {
      appTitle: 'जान्नीति (JANNITI)',
      brandName: 'सिविक इनोवेटर्स',
      tagline: 'प्रौद्योगिकी + एकजुटता',
      byThePeople: 'जनता द्वारा जनता के लिए',
      technologyTogetherness: 'प्रौद्योगिकी + एकजुटता',
      justNow: 'अभी-अभी',
      recordsSingle: 'रिकॉर्ड',
      recordsPlural: 'रिकॉर्ड्स',
      wardPrefix: 'वार्ड',
      allWards: 'सभी वार्ड',
      allCategories: 'सभी श्रेणियां',
      filterAll: 'सभी',
      cancel: 'रद्द करें',
      close: 'बंद करें',
      save: 'परिवर्तन सहेजें',
      submit: 'जमा करें',
      submitting: 'जमा किया जा रहा है...',
      remove: 'हटाएं',
      search: 'खोजें...',
      officer: 'अधिकारी',
      citizen: 'नागरिक',
      status: 'स्थिति',
      actions: 'कार्रवाई',
      score: 'अंक',
      rank: 'रैंक',
      urgency: 'अत्यावश्यकता',
      low: 'कम',
      medium: 'मध्यम',
      high: 'उच्च',
      critical: 'अति-गंभीर',
    },
    categories: {
      'Infrastructure': 'बुनियादी ढाँचा',
      'Education': 'शिक्षा',
      'Public Health': 'सार्वजनिक स्वास्थ्य',
      'Transit': 'यातायात व परिवहन',
      'Safety': 'सुरक्षा',
      'Waste Management': 'कचरा प्रबंधन',
      'Water & Sanitation': 'जल एवं स्वच्छता',
      'Parks & Greenery': 'पार्क और हरियाली',
    },
    statuses: {
      pending: 'लंबित',
      reviewing: 'समीक्षाधीन',
      in_progress: 'प्रगति पर',
      resolved: 'समाधानित',
    },
    header: {
      brand: 'सिविक इनोवेटर्स',
      login: 'लॉग इन',
      signUp: 'साइन अप',
      portalTitle: 'जान्नीति (JANNITI)',
      officerTooltip: 'सिविक इंटेलिजेंस प्लेटफॉर्म (अधिकारी दृश्य)',
      citizenTooltip: 'जान्नीति नागरिक पोर्टल पर जाएं',
      toggleThemeDark: 'लाइट मोड में बदलें',
      toggleThemeLight: 'डार्क मोड में बदलें',
      selectLanguage: 'भाषा चुनें',
    },
    jannitiPortal: {
      title: 'अपनी विकास आवश्यकता साझा करें',
      subtitle: 'आप अपना अनुरोध कैसे प्रस्तुत करना चाहेंगे?',
      audio: 'आवाज़ रिकॉर्ड करें',
      photo: 'फ़ोटो लें',
      textInput: 'विवरण टाइप करें',
      placeholder: 'अपना सुझाव टाइप करें या समस्या का वर्णन यहां करें...',
      submit: 'परिषद को जमा करें',
      msgText: 'या अपने पसंदीदा ऐप का उपयोग करके जमा करें:',
      whatsapp: '💬 व्हाट्सएप के माध्यम से जमा करें',
      categoryLabel: 'श्रेणी',
      wardLabel: 'वार्ड संख्या',
      recordingVoice: 'आवाज़ रिकॉर्ड हो रही है...',
      stopRecord: 'रिकॉर्डिंग रोकें',
      photoAttached: 'फ़ोटो संलग्न',
      audioAttached: 'ऑडियो रिकॉर्डिंग तैयार',
      remove: 'हटाएं',
      submitting: 'परिषद को भेजा जा रहा है...',
      successTitle: 'सफलतापूर्वक जमा हो गया!',
      successDesc: 'आपका अनुरोध नगर परिषद को भेज दिया गया है और नागरिक लेज़र में जोड़ दिया गया है।',
      tapToSpeak: 'बोलने के लिए दबाएं',
      clickToFinish: 'समाप्त करने के लिए क्लिक करें',
      uploadOrSnap: 'अपलोड या फ़ोटो लें',
      clickToChange: 'बदलने के लिए क्लिक करें',
      voiceNote: 'ध्वनि संदेश',
      attached: 'संलग्न',
      supabaseSynced: 'सुपाबेस सिंक किया गया',
      ref: 'संदर्भ संख्या #',
      pleaseDescribe: 'कृपया अपने अनुरोध का वर्णन करें, एक फ़ोटो संलग्न करें, या एक ध्वनि संदेश रिकॉर्ड करें।',
      authorityCannotSubmit: 'प्राधिकरण अधिकारी खाते नागरिक शिकायतें जमा नहीं कर सकते। कृपया वार्ड याचिकाओं की समीक्षा और कार्रवाई के लिए सिविक इंटेलिजेंस सूट का उपयोग करें।',
      tickerLabel: 'नागरिक टिकर',
      tickerStatus: 'नागरिक लेज़र स्थिति:',
      tickerTotalPetitions: 'कुल याचिकाएं दर्ज',
      tickerAwaiting: 'परिषद समीक्षा की प्रतीक्षा',
      tickerInProgress: 'प्रगति पर',
      tickerResolved: 'समाधानित',
      tickerCallToAction: 'आपकी आवाज़ हमारे समुदाय को आकार देती है! सीधे नगर निगम अधिकारियों को अनुरोध भेजें।',
      tickerDefault: 'जान्नीति नागरिक शिकायत और विकास पोर्टल: समुदाय की आवश्यकताओं, वॉयस रिकॉर्डिंग और फ़ोटो को सीधे नगर परिषद को भेजें • वास्तविक समय स्थिति के साथ सत्यापित नागरिक लेज़र',
      liveUpdatesTitle: 'सजीव नागरिक अपडेट',
      noUpdatesTitle: 'अभी तक कोई नागरिक याचिका नहीं',
      noUpdatesDesc: 'अपने वार्ड में किसी समस्या की रिपोर्ट करने या विकास परियोजना का सुझाव देने वाले पहले नागरिक बनें।',
      byAuthor: 'द्वारा',
      upvoted: 'अपवोट किया गया',
      upvote: 'अपवोट करें',
      writeDescription: 'अपनी आवश्यकता का विवरण लिखें...',
    },
    officerSuite: {
      suiteBadge: 'प्राधिकरण अधिकारी सूट',
      decisionEngine: 'नगर निगम निर्णय प्रणाली',
      subtitle: 'सजीव नागरिक याचिकाओं से प्राप्त बहुभाषी एनएलपी संश्लेषण, प्रासंगिक डेटा संलयन और प्राथमिकता अनुकूलन।',
      exportPlan: 'मास्टर प्लान निर्यात करें',
      signInOfficer: 'अधिकारी के रूप में साइन इन करें',
      exportSuccess: 'मास्टर म्यूनिसिपल कैपिटल एलोकेशन प्लान JSON फ़ाइल के रूप में सफलतापूर्वक निर्यात किया गया!',
      readyForCouncil: 'परिषद समीक्षा के लिए तैयार',
      tabs: {
        hotspots: 'मांग हॉटस्पॉट्स',
        fusion: 'संदर्भ एवं संलयन',
        ranking: 'प्राथमिकता रैंकिंग',
        impact: 'अनुमानित प्रभाव',
        portfolio: 'पोर्टफोलियो योजना',
      },
      filterWard: 'सभी वार्ड',
      filterCategory: 'सभी श्रेणियां',
      searchPlaceholder: 'नागरिक याचिकाएं, कीवर्ड या वार्ड खोजें...',
      views: {
        hotspots: {
          title: 'मांग हॉटस्पॉट मैपिंग',
          desc: 'नागरिक इनपुट का बहुभाषी एनएलपी संश्लेषण। अलगाव विसंगतियों से वास्तविक प्राथमिकताओं की पहचान।',
          heatmapTitle: 'भू-स्थानिक वार्ड मांग हीटमैप',
          heatmapSubtitle: 'सत्यापित नागरिक रिकॉर्ड के आधार पर',
          interactiveGisWaiting: 'नागरिक अनुरोधों की प्रतीक्षा कर रहा इंटरैक्टिव जीआईएस मानचित्र',
          interactiveGisDesc: 'जैसे ही नागरिक जान्नीति पोर्टल से अनुरोध भेजते हैं, भू-स्थानिक हॉटस्पॉट यहाँ वास्तविक समय में दिखाई देंगे।',
          demandIndex: 'मांग सूचकांक',
          topNeed: 'शीर्ष आवश्यकता',
          recurringTitle: 'आवर्ती थीम आवश्यकताएं',
          recurringDesc: 'बहुभाषी नागरिक सबमिशन से एनएलपी निष्कर्षण।',
          noData: 'अभी तक कोई श्रेणी डेटा दर्ज नहीं हुआ। एनएलपी क्लस्टर बनाने के लिए पोर्टल में याचिकाएं जमा करें।',
          anomalyTitle: 'प्राथमिकता और विसंगति का पता लगाना',
          anomalyDesc: 'प्रमाणित नागरिक प्रवृत्तियों और एकाकी विसंगतियों के बीच स्वचालित अंतर।',
          anomalyBadge: 'विसंगति',
          priorityBadge: 'सत्यापित प्राथमिकता',
        },
        fusion: {
          title: 'प्रासंगिक ग्राउंडिंग और संलयन',
          desc: 'नागरिक इनपुट को जनसांख्यिकीय डेटा और बुनियादी ढांचा टेलीमेट्री के साथ जोड़ना।',
          engineTitle: 'मल्टी-सोर्स डेटा फ्यूजन इंजन',
          engineDesc: 'जनसांख्यिकीय जनगणना संकेतकों और जीआईएस रिकॉर्ड के साथ नागरिक आवश्यकताओं का मिलान।',
          colNeed: 'पहचानी गई नागरिक आवश्यकता',
          colDemographic: 'जनसांख्यिकीय संदर्भ',
          colInfra: 'बुनियादी ढांचा अंतर (टेलीमेट्री)',
          colOutput: 'संश्लेषण आउटपुट',
          substantiatedHigh: 'अत्यधिक प्रमाणित',
          substantiatedMed: 'प्रमाणित',
          substantiatedLow: 'कम औचित्य',
          reconcilerTitle: 'धारणा बनाम वस्तुनिष्ठ डेटा सामंजस्यकर्ता',
          reconcilerDesc: 'नागरिक शिकायतों और टेलीमेट्री स्थितियों के बीच विसंगतियों का स्वचालित सामंजस्य।',
          caseEval: 'केस मूल्यांकन',
          activeReconcile: 'सक्रिय सामंजस्य संश्लेषण',
          citizenPerception: 'नागरिक धारणा (एनएलपी आउटपुट)',
          objectiveTelemetry: 'वस्तुनिष्ठ टेलीमेट्री (आईओटी/नगर निगम डेटा)',
          reconcileSynthesis: 'सामंजस्य संश्लेषण',
        },
        ranking: {
          title: 'तुलनात्मक मूल्यांकन और प्राथमिकता रैंकिंग',
          desc: 'परिषद निर्णय लेने के लिए पारदर्शी, लेखापरीक्षण योग्य प्राथमिकता सूची।',
          methodologyTitle: 'पारदर्शी और लेखापरीक्षण योग्य कार्यप्रणाली',
          methodologyDesc: 'संश्लेषित मांग और अनुभवजन्य संकेतकों को मापने वाले गणितीय सूत्र द्वारा रैंकिंग।',
          methodologyFormula: 'प्राथमिकता अंक (1-100) = [ (नागरिक_मांग_भार × 0.40) + (इन्फ्रा_घाटा × 0.40) + (जनसंख्या_घनत्व × 0.20) ]',
          outputTitle: 'संसाधन-बाधित प्राथमिकता परिणाम',
          outputDesc: 'सजीव कार्रवाई नियंत्रण के साथ नागरिक याचिकाओं की वास्तविक समय रैंकिंग',
          colRank: 'रैंक',
          colWard: 'वार्ड एवं श्रेणी',
          colCategory: 'प्रस्तावित परियोजना आवश्यकता',
          colScore: 'गणना किया गया अंक',
          colUrgency: 'अत्यावश्यकता',
          colAction: 'परिषद कार्रवाई',
          btnReview: 'समीक्षा करें',
          btnStartWork: 'काम शुरू करें',
          btnResolved: 'समाधान करें',
        },
        impact: {
          title: 'पूर्वानुमानित प्रभाव मॉडलिंग',
          desc: 'दीर्घकालिक सामाजिक-आर्थिक लाभ और नागरिक जीवन गुणवत्ता सूचकांक का सिमुलेशन।',
          projectedTitle: 'अनुमानित नागरिक निवेश पर प्रतिफल (ROI)',
          projectedDesc: 'आवंटित प्रति नगरपालिका रुपये पर प्रभाव स्कोर की गणना करने वाला मॉडल।',
          beneficiaries: 'अनुमानित लाभार्थी',
          qolScore: 'जीवन गुणवत्ता में वृद्धि',
          roiEstimate: 'अनुमानित नागरिक आरओआई',
          costEff: 'लागत दक्षता सूचकांक',
          chartTitle: 'बहुआयामी प्रभाव विश्लेषण',
          chartDesc: 'समानता, स्वास्थ्य और आर्थिक संकेतकों पर अनुमानित परिणाम।',
          metricSocial: 'सामाजिक समानता प्रभाव',
          metricHealth: 'सार्वजनिक स्वास्थ्य व सुरक्षा',
          metricEconomic: 'आर्थिक जीवन शक्ति',
        },
        portfolio: {
          title: 'नगर निगम पूंजी आवंटन एवं पोर्टफोलियो योजना',
          desc: 'वार्ड समानता और वित्तपोषण सीमा का सम्मान करते हुए सामाजिक प्रभाव को अधिकतम करना।',
          budgetTitle: 'पूंजीगत बजट अनुकूलन',
          budgetDesc: 'वर्तमान वित्तीय वर्ष की सीमाओं के तहत स्वचालित पोर्टफोलियो संतुलन।',
          totalBudget: 'नगर निगम पूंजीगत बजट',
          allocated: 'आवंटित पूंजी',
          remaining: 'शेष आरक्षित',
          optimizedListTitle: 'अनुशंसित नगर निगम परियोजना पोर्टफोलियो',
          optimizedListDesc: 'परिषद सामान्य निकाय अनुमोदन के लिए अनुकूलित परियोजना अनुसूची।',
          colProject: 'प्रस्तावित परियोजना',
          colWard: 'लक्षित वार्ड',
          colCost: 'अनुमानित लागत (₹ लाख)',
          colPriority: 'अंक',
          colStatus: 'परिषद स्थिति',
          approved: 'आवंटन के लिए स्वीकृत',
        },
      },
    },
    team: {
      badge: 'डेवलपर्स के बारे में • सिविक इनोवेटर्स',
      title: 'हमारी टीम से मिलें',
      subtitle: '"जनता द्वारा जनता के लिए" • प्रौद्योगिकी + एकजुटता',
      tagline: 'पारदर्शी नागरिक शासन के लिए बुद्धिमान सार्वजनिक प्रणालियों का निर्माण',
      roles: {
        teamLeaderBackend: 'टीम लीडर - बैकएंड',
        memberFrontend: 'सदस्य - फ्रंटएंड',
        memberDatabase: 'सदस्य - डेटाबेस',
        memberPptDesigner: 'सदस्य - पीपीटी डिजाइनर',
        webDev: 'वेब डेवलपर',
        ideaPresenter: 'आइडिया प्रस्तुतकर्ता',
      },
      quotes: {
        ankit: '"वेब डेवलपर — मजबूत सर्वर-साइड लॉजिक और सुरक्षित सिस्टम का निर्माण."',
        ayushman: '"वेब डेवलपर — सहज, संवादात्मक और उत्तरदायी यूजर इंटरफेस बनाना."',
        spandan: '"वेब डेवलपर — डेटा संरचनाओं का प्रबंधन और क्वेरी प्रदर्शन का अनुकूलन."',
        subhalaxmi: '"आइडिया प्रस्तुतकर्ता — हमारे दृष्टिकोण को स्पष्ट रूप से प्रस्तुत करने वाले प्रभावी प्रेजेंटेशन बनाना."',
        sneha: '"आइडिया प्रस्तुतकर्ता — हमारी परियोजना लेआउट प्रदर्शित करने के लिए रचनात्मक स्लाइड डिजाइन करना."',
      },
      copySuccess: 'क्लिपबोर्ड पर कॉपी हो गया!',
      call: 'कॉल करें',
      email: 'ईमेल करें',
    },
    auth: {
      signInTitle: 'पुनः स्वागत है',
      signUpTitle: 'नागरिक खाता बनाएं',
      signInDesc: 'अपनी याचिकाओं और नागरिक जुड़ाव का प्रबंधन करने के लिए लॉग इन करें',
      signUpDesc: 'नागरिक याचिकाएं जमा करने के लिए अपने सत्यापित ईमेल से पंजीकरण करें',
      roleCitizen: 'नागरिक / निवासी',
      roleOfficer: 'नगर निगम प्राधिकरण अधिकारी',
      roleOfficerDesc: 'नगर निगम अधिकारी खाता सिविक इंटेलिजेंस एवं डिसीजन इंजन तक पहुंच प्रदान करता है।',
      emailLabel: 'ईमेल पता',
      emailPlaceholder: 'you@example.com',
      passwordLabel: 'पासवर्ड',
      passwordPlaceholder: '••••••••',
      confirmPasswordLabel: 'पासवर्ड की पुष्टि करें',
      confirmPasswordPlaceholder: '••••••••',
      submitSignIn: 'पोर्टल में साइन इन करें',
      submitSignUp: 'सत्यापित खाता बनाएं',
      processing: 'प्रमाणीकरण हो रहा है...',
      noAccount: 'क्या आपके पास खाता नहीं है?',
      haveAccount: 'क्या आपके पास पहले से खाता है?',
      createOne: 'यहाँ साइन अप करें',
      logInHere: 'यहाँ लॉग इन करें',
      validationEmailPass: 'कृपया ईमेल और पासवर्ड दोनों दर्ज करें।',
      validationPassMin: 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।',
      validationPassMatch: 'पासवर्ड मेल नहीं खाते। कृपया जांचें और पुनः प्रयास करें।',
    },
    profile: {
      greeting: 'नमस्ते',
      officerBadge: 'प्राधिकरण अधिकारी',
      citizenBadge: 'नागरिक',
      updateDetails: 'आवश्यक विवरण अपडेट करें',
      myGrievances: 'मेरी शिकायतें और अनुरोध',
      resolvedGrievances: 'समाधानित शिकायतें',
      notifications: 'नागरिक सूचनाएं',
      switchToOfficer: 'अधिकारी इंटेलिजेंस सूट खोलें',
      switchToCitizen: 'जान्नीति नागरिक पोर्टल खोलें',
      signOut: 'साइन आउट',
    },
    profileSetup: {
      title: 'आवश्यक प्रोफ़ाइल विवरण पूर्ण करें',
      subtitle: 'सत्यापित नागरिक याचिकाएं प्रस्तुत करने के लिए कृपया अपने इलाके के विवरण सत्यापित करें।',
      fullName: 'पूरा कानूनी नाम',
      fullNamePlaceholder: 'उदा. अंकित शर्मा',
      phone: 'फ़ोन नंबर (10 अंक)',
      phonePlaceholder: 'उदा. 9876543210',
      ward: 'वार्ड संख्या',
      city: 'शहर / नगर पालिका',
      cityPlaceholder: 'उदा. भुवनेश्वर',
      address: 'निवास / इलाके का पता',
      addressPlaceholder: 'उदा. प्लॉट 102, मास्टर कैंटीन स्क्वायर',
      pincode: 'पोस्टल पिनकोड (6 अंक)',
      pincodePlaceholder: 'उदा. 751001',
      department: 'विभाग पदनाम (अधिकारियों के लिए)',
      departmentPlaceholder: 'उदा. कार्यपालक अभियंता - शहरी कार्य',
      saveAndContinue: 'सहेजें और आगे बढ़ें',
      saving: 'प्रोफ़ाइल सहेजी जा रही है...',
      validationName: 'कृपया अपना पूरा कानूनी नाम दर्ज करें।',
      validationPhone: 'कृपया एक मान्य 10-अंकीय फ़ोन नंबर दर्ज करें।',
      validationAddress: 'कृपया अपने निवास / इलाके का पता दर्ज करें।',
      validationPincode: 'कृपया एक मान्य 6-अंकीय पोस्टल पिनकोड दर्ज करें।',
      validationDepartment: 'कृपया अपना नगर निगम विभाग / पदनाम निर्दिष्ट करें।',
    },
    drawer: {
      title: 'सामुदायिक सबमिशन लेज़र',
      userTitleSuffix: ' के नागरिक सबमिशन',
      subtitle: 'नगर निगम अनुरोधों की स्थिति और समयरेखा ट्रैक करें',
      filterAll: 'सभी याचिकाएं',
      filterPending: 'लंबित',
      filterInProgress: 'प्रगति पर',
      filterResolved: 'समाधानित',
      searchPlaceholder: 'विवरण, वार्ड, श्रेणी द्वारा खोजें...',
      noPetitions: 'इस श्रेणी में कोई याचिका नहीं मिली।',
      noPetitionsDesc: 'लेज़र पर देखने के लिए जान्नीति पोर्टल के माध्यम से एक नई शिकायत या सुझाव प्रस्तुत करें।',
      officerNote: 'अधिकारी टिप्पणी',
    },
    notifications: {
      title: 'नागरिक सूचनाएं',
      subtitle: 'आपके अनुरोधों और नागरिक आयोजनों पर वास्तविक समय अलर्ट',
      markAllRead: 'सभी को पढ़ा हुआ चिह्नित करें',
      empty: 'कोई नई सूचना नहीं है।',
    },
    footer: {
      brand: 'सिविक इनोवेटर्स',
      byThePeople: '“जनता द्वारा जनता के लिए” • डेवलपर्स के बारे में',
      portalLink: 'जान्नीति पोर्टल',
      officerLink: 'इंटेलिजेंस सूट (अधिकारी दृश्य)',
      aboutDevs: 'डेवलपर्स के बारे में',
      civicLedger: 'नागरिक लेज़र',
      craftedWith: 'के साथ निर्मित',
      forBetter: 'बेहतर समुदायों के लिए',
    },
  },
  or: {
    common: {
      appTitle: 'ଜାନ୍ନୀତି (JANNITI)',
      brandName: 'ସିଭିକ୍ ଇନୋଭେଟର୍ସ',
      tagline: 'ପ୍ରଯୁକ୍ତିବିଦ୍ୟା + ଏକତା',
      byThePeople: 'ଜନସାଧାରଣଙ୍କ ଦ୍ୱାରା ଜନସାଧାରଣଙ୍କ ପାଇଁ',
      technologyTogetherness: 'ପ୍ରଯୁକ୍ତିବିଦ୍ୟା + ଏକତା',
      justNow: 'ଏବେ ଏବେ',
      recordsSingle: 'ରେକର୍ଡ',
      recordsPlural: 'ରେକର୍ଡଗୁଡିକ',
      wardPrefix: 'ୱାର୍ଡ଼',
      allWards: 'ସମସ୍ତ ୱାର୍ଡ଼',
      allCategories: 'ସମସ୍ତ ବର୍ଗ',
      filterAll: 'ସମସ୍ତ',
      cancel: 'ବାତିଲ୍ କରନ୍ତୁ',
      close: 'ବନ୍ଦ କରନ୍ତୁ',
      save: 'ପରିବର୍ତ୍ତନ ସାଇତନ୍ତୁ',
      submit: 'ଦାଖଲ କରନ୍ତୁ',
      submitting: 'ଦାଖଲ ହେଉଛି...',
      remove: 'ହଟାନ୍ତୁ',
      search: 'ଖୋଜନ୍ତୁ...',
      officer: 'ଅଧିକାରୀ',
      citizen: 'ନାଗରିକ',
      status: 'ସ୍ଥିତି',
      actions: 'କାର୍ଯ୍ୟାନୁଷ୍ଠାନ',
      score: 'ସ୍କୋର',
      rank: 'ମାନ୍ୟତା',
      urgency: 'ଜରୁରୀତା',
      low: 'କମ୍',
      medium: 'ମଧ୍ୟମ',
      high: 'ଉଚ୍ଚ',
      critical: 'ଅତି-ଜରୁରୀ',
    },
    categories: {
      'Infrastructure': 'ଭିତ୍ତିଭୂମି',
      'Education': 'ଶିକ୍ଷା',
      'Public Health': 'ଜନସ୍ୱାସ୍ଥ୍ୟ',
      'Transit': 'ପରିବହନ ଓ ଯାତାୟାତ',
      'Safety': 'ସୁରକ୍ଷା',
      'Waste Management': 'ବର୍ଜ୍ୟବସ୍ତୁ ପରିଚାଳନା',
      'Water & Sanitation': 'ଜଳ ଓ ପରିମଳ',
      'Parks & Greenery': 'ପାର୍କ ଏବଂ ସବୁଜିମା',
    },
    statuses: {
      pending: 'ବିଚାରାଧୀନ',
      reviewing: 'ସମୀକ୍ଷାଧୀନ',
      in_progress: 'କାର୍ଯ୍ୟ ଚାଲିଛି',
      resolved: 'ସମାଧାନ ହୋଇଛି',
    },
    header: {
      brand: 'ସିଭିକ୍ ଇନୋଭେଟର୍ସ',
      login: 'ଲଗ୍ ଇନ୍',
      signUp: 'ସାଇନ୍ ଅପ୍',
      portalTitle: 'ଜାନ୍ନୀତି (JANNITI)',
      officerTooltip: 'ସିଭିକ୍ ଇଣ୍ଟେଲିଜେନ୍ସ ପ୍ଲାଟଫର୍ମ (ଅଧିକାରୀ ଦୃଶ୍ୟ)',
      citizenTooltip: 'ଜାନ୍ନୀତି ନାଗରିକ ପୋର୍ଟାଲକୁ ଯାଆନ୍ତୁ',
      toggleThemeDark: 'ଲାଇଟ୍ ମୋଡ୍ ବ୍ୟବହାର କରନ୍ତୁ',
      toggleThemeLight: 'ଡାର୍କ ମୋଡ୍ ବ୍ୟବହାର କରନ୍ତୁ',
      selectLanguage: 'ଭାଷା ବାଛନ୍ତୁ',
    },
    jannitiPortal: {
      title: 'ଆପଣଙ୍କର ବିକାଶ ଆବଶ୍ୟକତା ସେୟାର କରନ୍ତୁ',
      subtitle: 'ଆପଣ କିପରି ଆପଣଙ୍କର ଅନୁରୋଧ ଦାଖଲ କରିବାକୁ ଚାହାଁନ୍ତି?',
      audio: 'ଭଏସ୍ ରେକର୍ଡ କରନ୍ତୁ',
      photo: 'ଫଟୋ ଉଠାନ୍ତୁ',
      textInput: 'ବିବରଣୀ ଲେଖନ୍ତୁ',
      placeholder: 'ଆପଣଙ୍କ ପ୍ରସ୍ତାବ ଟାଇପ୍ କରନ୍ତୁ କିମ୍ବା ସମସ୍ୟା ବର୍ଣ୍ଣନା କରନ୍ତୁ...',
      submit: 'ପରିଷଦକୁ ଦାଖଲ କରନ୍ତୁ',
      msgText: 'କିମ୍ବା ଆପଣଙ୍କ ପ୍ରିୟ ଆପ୍ ବ୍ୟବହାର କରି ଦାଖଲ କରନ୍ତୁ:',
      whatsapp: '💬 ହ୍ୱାଟସ୍ଆପ୍ ମାଧ୍ୟମରେ ଦାଖଲ କରନ୍ତୁ',
      categoryLabel: 'ବର୍ଗ',
      wardLabel: 'ୱାର୍ଡ଼ ସଂଖ୍ୟା',
      recordingVoice: 'ଭଏସ୍ ମେସେଜ୍ ରେକର୍ଡ ହେଉଛି...',
      stopRecord: 'ରେକର୍ଡିଂ ବନ୍ଦ କରନ୍ତୁ',
      photoAttached: 'ଫଟୋ ସଂଲଗ୍ନ ହୋଇଛି',
      audioAttached: 'ଅଡିଓ ରେକର୍ଡିଂ ପ୍ରସ୍ତୁତ',
      remove: 'ହଟାନ୍ତୁ',
      submitting: 'ପରିଷଦକୁ ପ୍ରେରଣ ହେଉଛି...',
      successTitle: 'ସଫଳତାର ସହିତ ଦାଖଲ ହେଲା!',
      successDesc: 'ଆପଣଙ୍କ ଅନୁରୋଧ ପୌର ପରିଷଦକୁ ପ୍ରେରଣ କରାଯାଇଛି ଏବଂ ନାଗରିକ ଲେଜରରେ ଯୋଡା ଯାଇଛି।',
      tapToSpeak: 'କହିବା ପାଇଁ ଟ୍ୟାପ୍ କରନ୍ତୁ',
      clickToFinish: 'ଶେଷ କରିବା ପାଇଁ କ୍ଲିକ୍ କରନ୍ତୁ',
      uploadOrSnap: 'ଅପଲୋଡ୍ କରନ୍ତୁ କିମ୍ବା ଫଟୋ ଉଠାନ୍ତୁ',
      clickToChange: 'ବଦଳାଇବା ପାଇଁ କ୍ଲିକ୍ କରନ୍ତୁ',
      voiceNote: 'ଭଏସ୍ ନୋଟ୍',
      attached: 'ସଂଲଗ୍ନ',
      supabaseSynced: 'ସୁପାବେସ୍ ସିଙ୍କ୍ ହୋଇଛି',
      ref: 'ରେଫରେନ୍ସ #',
      pleaseDescribe: 'ଦୟାକରି ଆପଣଙ୍କର ଅନୁରୋଧ ବର୍ଣ୍ଣନା କରନ୍ତୁ, ଏକ ଫଟୋ ଯୋଡନ୍ତୁ, କିମ୍ବା ଏକ ଭଏସ୍ ନୋଟ୍ ରେକର୍ଡ କରନ୍ତୁ।',
      authorityCannotSubmit: 'ପ୍ରାଧିକରଣ ଅଧିକାରୀ ଆକାଉଣ୍ଟଗୁଡିକ ନାଗରିକ ଅଭିଯୋଗ ଦାଖଲ କରିପାରିବେ ନାହିଁ। ଦୟାକରି ୱାର୍ଡ଼ ଆବେଦନଗୁଡିକ ସମୀକ୍ଷା ଏବଂ ପ୍ରକ୍ରିୟାକରଣ ପାଇଁ ସିଭିକ୍ ଇଣ୍ଟେଲିଜେନ୍ସ ସୁଇଟ୍ ବ୍ୟବହାର କରନ୍ତୁ।',
      tickerLabel: 'ନାଗରିକ ଟିକର',
      tickerStatus: 'ନାଗରିକ ଲେଜର ସ୍ଥିତି:',
      tickerTotalPetitions: 'ମୋଟ ଆବେଦନ ରେକର୍ଡ',
      tickerAwaiting: 'ପରିଷଦ ସମୀକ୍ଷା ଅପେକ୍ଷାରେ',
      tickerInProgress: 'କାର୍ଯ୍ୟ ଚାଲିଛି',
      tickerResolved: 'ସମାଧାନ ହୋଇଛି',
      tickerCallToAction: 'ଆପଣଙ୍କ ସ୍ୱର ଆମ ସମୁଦାୟକୁ ଗଠନ କରେ! ସିଧାସଳଖ ପୌର ଅଧିକାରୀଙ୍କୁ ଅନୁରୋଧ ଦାଖଲ କରନ୍ତୁ।',
      tickerDefault: 'ଜାନ୍ନୀତି ନାଗରିକ ଅଭିଯୋଗ ଓ ବିକାଶ ପୋର୍ଟାଲ୍: ଗୋଷ୍ଠୀର ଆବଶ୍ୟକତା, ଭଏସ୍ ରେକର୍ଡିଂ ଏବଂ ଫଟୋ ସିଧାସଳଖ ପୌର ପରିଷଦକୁ ଦାଖଲ କରନ୍ତୁ • ରିଅଲ୍-ଟାଇମ୍ ଅପଡେଟ୍ ସହିତ ଯାଞ୍ଚ ହୋଇଥିବା ନାଗରିକ ଲେଜର',
      liveUpdatesTitle: 'ଲାଇଭ୍ ନାଗରିକ ଅପଡେଟ୍',
      noUpdatesTitle: 'ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ଆବେଦନ ନାହିଁ',
      noUpdatesDesc: 'ଆପଣଙ୍କ ୱାର୍ଡ଼ରେ କୌଣସି ସମସ୍ୟା ରିପୋର୍ଟ କରିବା କିମ୍ବା ବିକାଶ ପ୍ରକଳ୍ପର ପ୍ରସ୍ତାବ ଦେବା ପାଇଁ ପ୍ରଥମ ନାଗରିକ ହୁଅନ୍ତୁ।',
      byAuthor: 'ଦ୍ୱାରା',
      upvoted: 'ଅପଭୋଟ୍ ହୋଇଛି',
      upvote: 'ଅପଭୋଟ୍ କରନ୍ତୁ',
      writeDescription: 'ଆପଣଙ୍କ ଆବଶ୍ୟକତାର ବିବରଣୀ ଲେଖନ୍ତୁ...',
    },
    officerSuite: {
      suiteBadge: 'ପ୍ରାଧିକରଣ ଅଧିକାରୀ ସୁଇଟ୍',
      decisionEngine: 'ପୌର ପରିଷଦ ନିଷ୍ପତ୍ତି ପ୍ରଣାଳୀ',
      subtitle: 'ଲାଇଭ୍ ନାଗରିକ ଆବେଦନଗୁଡିକରୁ ପ୍ରାପ୍ତ ବହୁଭାଷୀ ଏନଏଲପି ସଂଶ୍ଳେଷଣ, ପ୍ରସଙ୍ଗିକ ତଥ୍ୟ ସଂଯୋଜନ ଏବଂ ପ୍ରାଥମିକତା ଅପ୍ଟିମାଇଜେସନ୍।',
      exportPlan: 'ମାଷ୍ଟର ପ୍ଲାନ ରପ୍ତାନି କରନ୍ତୁ',
      signInOfficer: 'ଅଧିକାରୀ ଭାବରେ ସାଇନ୍ ଇନ୍ କରନ୍ତୁ',
      exportSuccess: 'ମାଷ୍ଟର ପୌରପାଳିକା ପୁଞ୍ଜି ଆବଣ୍ଟନ ଯୋଜନା JSON ଫାଇଲ୍ ଭାବରେ ସଫଳତାର ସହିତ ରପ୍ତାନି ହେଲା!',
      readyForCouncil: 'ପରିଷଦ ସମୀକ୍ଷା ପାଇଁ ପ୍ରସ୍ତୁତ',
      tabs: {
        hotspots: 'ଚାହିଦା ହଟସ୍ପଟ୍',
        fusion: 'ପ୍ରସଙ୍ଗ ଓ ସଂଶ୍ଳେଷଣ',
        ranking: 'ଅଗ୍ରାଧିକାର ମାନ୍ୟତା',
        impact: 'ପୂର୍ବାନୁମାନିତ ପ୍ରଭାବ',
        portfolio: 'ପୋର୍ଟଫୋଲିଓ ଯୋଜନା',
      },
      filterWard: 'ସମସ୍ତ ୱାର୍ଡ଼',
      filterCategory: 'ସମସ୍ତ ବର୍ଗ',
      searchPlaceholder: 'ନାଗରିକ ଆବେଦନ, କୀ-ଶବ୍ଦ କିମ୍ବା ୱାର୍ଡ଼ ଖୋଜନ୍ତୁ...',
      views: {
        hotspots: {
          title: 'ଚାହିଦା ହଟସ୍ପଟ୍ ମ୍ୟାପିଂ',
          desc: 'ନାଗରିକ ଇନପୁଟ୍‌ର ବହୁଭାଷୀ ଏନଏଲପି ସଂଶ୍ଳେଷଣ। ବିଚ୍ଛିନ୍ନ ଅସ୍ୱାଭାବିକତାରୁ ଯଥାର୍ଥ ପ୍ରାଥମିକତା ଚିହ୍ନଟ।',
          heatmapTitle: 'ଭୌଗୋଳିକ ୱାର୍ଡ଼ ଚାହିଦା ହିଟମ୍ୟାପ୍',
          heatmapSubtitle: 'ଯାଞ୍ଚ ହୋଇଥିବା ନାଗରିକ ରେକର୍ଡ ଉପରେ ଆଧାରିତ',
          interactiveGisWaiting: 'ନାଗରିକ ଅନୁରୋଧ ପାଇଁ ଅପେକ୍ଷା କରୁଥିବା ଇଣ୍ଟରାକ୍ଟିଭ୍ GIS ମ୍ୟାପ୍',
          interactiveGisDesc: 'ନାଗରିକମାନେ ଜାନ୍ନୀତି ପୋର୍ଟାଲ ମାଧ୍ୟମରେ ଅନୁରୋଧ ଦାଖଲ କରିବା ସହିତ ଭୌଗୋଳିକ ହଟସ୍ପଟ୍ ଏଠାରେ ପ୍ରଦର୍ଶିତ ହେବ।',
          demandIndex: 'ଚାହିଦା ସୂଚକାଙ୍କ',
          topNeed: 'ମୁଖ୍ୟ ଆବଶ୍ୟକତା',
          recurringTitle: 'ବାରମ୍ବାର ଆବଶ୍ୟକତା ସମୂହ',
          recurringDesc: 'ବହୁଭାଷୀ ନାଗରିକ ଆବେଦନଗୁଡିକରୁ NLP ନିଷ୍କାସନ।',
          noData: 'ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ବର୍ଗ ଡାଟା ରେକର୍ଡ ହୋଇନାହିଁ। NLP କ୍ଲଷ୍ଟର ସୃଷ୍ଟି କରିବା ପାଇଁ ପୋର୍ଟାଲରେ ଆବେଦନ ଦାଖଲ କରନ୍ତୁ।',
          anomalyTitle: 'ଅଗ୍ରାଧିକାର ଏବଂ ଅସ୍ୱାଭାବିକତା ଚିହ୍ନଟ',
          anomalyDesc: 'ପ୍ରମାଣିତ ନାଗରିକ ଧାରା ଏବଂ ଏକକ ଅସ୍ୱାଭାବିକତା ମଧ୍ୟରେ ସ୍ୱୟଂକ୍ରିୟ ପାର୍ଥକ୍ୟ।',
          anomalyBadge: 'ଅସ୍ୱାଭାବିକତା',
          priorityBadge: 'ଯାଞ୍ଚ ହୋଇଥିବା ଅଗ୍ରାଧିକାର',
        },
        fusion: {
          title: 'ପ୍ରସଙ୍ଗିକ ଭିତ୍ତିଭୂମି ଓ ସଂଶ୍ଳେଷଣ',
          desc: 'ନାଗରିକ ଇନପୁଟ୍‌କୁ ଜନସଂଖ୍ୟା ତଥ୍ୟ ଏବଂ ଭିତ୍ତିଭୂମି ଟେଲିମେଟ୍ରି ସହିତ ସଂଯୋଗ କରିବା।',
          engineTitle: 'ମଲ୍ଟି-ସୋର୍ସ ଡାଟା ଫ୍ୟୁଜନ୍ ଇଞ୍ଜିନ୍',
          engineDesc: 'ଜନଗଣନା ସୂଚକ ଏବଂ GIS ରେକର୍ଡ ସହିତ ନାଗରିକ ଆବଶ୍ୟକତାଗୁଡିକର ମେଳଣ।',
          colNeed: 'ଚିହ୍ନଟ ହୋଇଥିବା ନାଗରିକ ଆବଶ୍ୟକତା',
          colDemographic: 'ଜନସଂଖ୍ୟାଗତ ପ୍ରସଙ୍ଗ',
          colInfra: 'ଭିତ୍ତିଭୂମି ଅଭାବ (ଟେଲିମେଟ୍ରି)',
          colOutput: 'ସଂଶ୍ଳେଷଣ ଆଉଟପୁଟ୍',
          substantiatedHigh: 'ଅତ୍ୟଧିକ ପ୍ରମାଣିତ',
          substantiatedMed: 'ପ୍ରମାଣିତ',
          substantiatedLow: 'କମ୍ ଯଥାର୍ଥତା',
          reconcilerTitle: 'ଧାରଣା ବନାମ ବସ୍ତୁନିଷ୍ଠ ତଥ୍ୟ ସମନ୍ୱୟକାରୀ',
          reconcilerDesc: 'ନାଗରିକ ଅଭିଯୋଗ ଏବଂ ଟେଲିମେଟ୍ରି ସ୍ଥିତି ମଧ୍ୟରେ ଥିବା ପାର୍ଥକ୍ୟର ସ୍ୱୟଂକ୍ରିୟ ସମାଧାନ।',
          caseEval: 'କେସ୍ ମୂଲ୍ୟାଙ୍କନ',
          activeReconcile: 'ସକ୍ରିୟ ସମନ୍ୱୟ ସଂଶ୍ଳେଷଣ',
          citizenPerception: 'ନାଗରିକ ଧାରଣା (NLP ଆଉଟପୁଟ୍)',
          objectiveTelemetry: 'ବସ୍ତୁନିଷ୍ଠ ଟେଲିମେଟ୍ରି (IoT / ପୌରପାଳିକା ତଥ୍ୟ)',
          reconcileSynthesis: 'ସମନ୍ୱୟ ସଂଶ୍ଳେଷଣ',
        },
        ranking: {
          title: 'ତୁଳନାତ୍ମକ ମୂଲ୍ୟାଙ୍କନ ଏବଂ ପ୍ରାଥମିକତା ମାନ୍ୟତା',
          desc: 'ପରିଷଦ ନିଷ୍ପତ୍ତି ପାଇଁ ଏକ ସ୍ୱଚ୍ଛ, ଯାଞ୍ଚଯୋଗ୍ୟ ଅଗ୍ରାଧିକାର ତାଲିକା।',
          methodologyTitle: 'ସ୍ୱଚ୍ଛ ଏବଂ ଯାଞ୍ଚଯୋଗ୍ୟ ପ୍ରଣାଳୀ',
          methodologyDesc: 'ସଂଶ୍ଳେଷିତ ଚାହିଦା ଏବଂ ପ୍ରତ୍ୟକ୍ଷ ସୂଚକକୁ ତୁଳନା କରୁଥିବା ଗାଣିତିକ ସୂତ୍ର ଦ୍ୱାରା ମାନ୍ୟତା ନିର୍ଦ୍ଧାରଣ।',
          methodologyFormula: 'ପ୍ରାଥମିକତା ସ୍କୋର (1-100) = [ (ନାଗରିକ_ଚାହିଦା_ଭାର × 0.40) + (ଭିତ୍ତିଭୂମି_ଅଭାବ × 0.40) + (ଜନସଂଖ୍ୟା_ଘନତ୍ୱ × 0.20) ]',
          outputTitle: 'ସୀମିତ ସମ୍ବଳ ପ୍ରାଥମିକତା ଫଳାଫଳ',
          outputDesc: 'ଲାଇଭ୍ କାର୍ଯ୍ୟାନୁଷ୍ଠାନ ନିୟନ୍ତ୍ରଣ ସହିତ ନାଗରିକ ଆବେଦନଗୁଡିକର ରିଅଲ୍-ଟାଇମ୍ ମାନ୍ୟତା',
          colRank: 'ମାନ୍ୟତା',
          colWard: 'ୱାର୍ଡ଼ ଏବଂ ବର୍ଗ',
          colCategory: 'ପ୍ରସ୍ତାବିତ ପ୍ରକଳ୍ପ ଆବଶ୍ୟକତା',
          colScore: 'ଗଣନା ହୋଇଥିବା ସ୍କୋର',
          colUrgency: 'ଜରୁରୀତା',
          colAction: 'ପରିଷଦ କାର୍ଯ୍ୟାନୁଷ୍ଠାନ',
          btnReview: 'ସମୀକ୍ଷା କରନ୍ତୁ',
          btnStartWork: 'କାର୍ଯ୍ୟ ଆରମ୍ଭ କରନ୍ତୁ',
          btnResolved: 'ସମାଧାନ କରନ୍ତୁ',
        },
        impact: {
          title: 'ପୂର୍ବାନୁମାନିତ ପ୍ରଭାବ ମଡେଲିଂ',
          desc: 'ଦୀର୍ଘକାଳୀନ ସାମାଜିକ-ଅର୍ଥନୈତିକ ଲାଭ ଏବଂ ଜୀବନ ଧାରଣ ମାନ ସୂଚକାଙ୍କର ସିମୁଲେସନ୍।',
          projectedTitle: 'ଆକଳିତ ନାଗରିକ ନିବେଶ ପ୍ରତିଫଳ (ROI)',
          projectedDesc: 'ଆବଣ୍ଟିତ ପ୍ରତ୍ୟେକ ପୌର ଟଙ୍କା ପାଇଁ ପ୍ରଭାବ ସ୍କୋର ଗଣନା କରୁଥିବା ମଡେଲ୍।',
          beneficiaries: 'ଆକଳିତ ହିତାଧିକାରୀ',
          qolScore: 'ଜୀବନ ଧାରଣ ମାନ ବୃଦ୍ଧି',
          roiEstimate: 'ଆକଳିତ ନାଗରିକ ROI',
          costEff: 'ମୂଲ୍ୟ ଦକ୍ଷତା ସୂଚକାଙ୍କ',
          chartTitle: 'ବହୁମୁଖୀ ପ୍ରଭାବ ବିଶ୍ଳେଷଣ',
          chartDesc: 'ସମାନତା, ସ୍ୱାସ୍ଥ୍ୟ ଏବଂ ଅର୍ଥନୈତିକ ସୂଚକ ଉପରେ ଅନୁମାନିତ ଫଳାଫଳ।',
          metricSocial: 'ସାମାଜିକ ସମାନତା ପ୍ରଭାବ',
          metricHealth: 'ଜନସ୍ୱାସ୍ଥ୍ୟ ଓ ସୁରକ୍ଷା',
          metricEconomic: 'ଅର୍ଥନୈତିକ ସକ୍ରିୟତା',
        },
        portfolio: {
          title: 'ପୌରପାଳିକା ପୁଞ୍ଜି ଆବଣ୍ଟନ ଓ ପୋର୍ଟଫୋଲିଓ ଯୋଜନା',
          desc: 'ୱାର୍ଡ଼ ସମାନତା ଏବଂ ବଜେଟ୍ ସୀମାକୁ ସମ୍ମାନ ଦେଇ ସାମାଜିକ ପ୍ରଭାବକୁ ସର୍ବାଧିକ କରିବା।',
          budgetTitle: 'ପୁଞ୍ଜି ବଜେଟ୍ ଅପ୍ଟିମାଇଜେସନ୍',
          budgetDesc: 'ଚଳିତ ଆର୍ଥିକ ବର୍ଷ ସୀମା ମଧ୍ୟରେ ସ୍ୱୟଂକ୍ରିୟ ପୋର୍ଟଫୋଲିଓ ସନ୍ତୁଳନ।',
          totalBudget: 'ପୌରପାଳିକା ପୁଞ୍ଜି ବଜେଟ୍',
          allocated: 'ଆବଣ୍ଟିତ ପୁଞ୍ଜି',
          remaining: 'ଅବଶିଷ୍ଟ ସଂରକ୍ଷଣ',
          optimizedListTitle: 'ପ୍ରସ୍ତାବିତ ପୌର ପ୍ରକଳ୍ପ ପୋର୍ଟଫୋଲିଓ',
          optimizedListDesc: 'ପରିଷଦ ସାଧାରଣ ବୈଠକ ଅନୁମୋଦନ ପାଇଁ ଅନୁକୂଳିତ ପ୍ରକଳ୍ପ କାର୍ଯ୍ୟସୂଚୀ।',
          colProject: 'ପ୍ରସ୍ତାବିତ ପ୍ରକଳ୍ପ',
          colWard: 'ଲକ୍ଷ୍ୟ ୱାର୍ଡ଼',
          colCost: 'ଆକଳିତ ମୂଲ୍ୟ (₹ ଲକ୍ଷ)',
          colPriority: 'ସ୍କୋର',
          colStatus: 'ପରିଷଦ ସ୍ଥିତି',
          approved: 'ଆବଣ୍ଟନ ପାଇଁ ଅନୁମୋଦିତ',
        },
      },
    },
    team: {
      badge: 'ଡେଭଲପର୍‌ମାନଙ୍କ ବିଷୟରେ • ସିଭିକ୍ ଇନୋଭେଟର୍ସ',
      title: 'ଆମ ଟିମ୍ ସହିତ ପରିଚିତ ହୁଅନ୍ତୁ',
      subtitle: '"ଜନସାଧାରଣଙ୍କ ଦ୍ୱାରା ଜନସାଧାରଣଙ୍କ ପାଇଁ" • ପ୍ରଯୁକ୍ତିବିଦ୍ୟା + ଏକତା',
      tagline: 'ସ୍ୱଚ୍ଛ ନାଗରିକ ଶାସନ ପାଇଁ ବୁଦ୍ଧିମାନ ସାର୍ବଜନୀନ ପ୍ରଣାଳୀ ନିର୍ମାଣ',
      roles: {
        teamLeaderBackend: 'ଟିମ୍ ଲିଡର୍ - ବ୍ୟାକଏଣ୍ଡ',
        memberFrontend: 'ସଦସ୍ୟ - ଫ୍ରଣ୍ଟଏଣ୍ଡ',
        memberDatabase: 'ସଦସ୍ୟ - ଡାଟାବେସ୍',
        memberPptDesigner: 'ସଦସ୍ୟ - ପିପିଟି ଡିଜାଇନର୍',
        webDev: 'ୱେବ୍ ଡେଭଲପର୍',
        ideaPresenter: 'ଆଇଡିଆ ଉପସ୍ଥାପକ',
      },
      quotes: {
        ankit: '"ୱେବ୍ ଡେଭଲପର୍ — ଦୃଢ଼ ସର୍ଭର-ସାଇଡ୍ ଲଜିକ୍ ଏବଂ ସୁରକ୍ଷିତ ସିଷ୍ଟମ୍ ନିର୍ମାଣ।"',
        ayushman: '"ୱେବ୍ ଡେଭଲପର୍ — ସହଜ, ଇଣ୍ଟରାକ୍ଟିଭ୍ ଏବଂ ଉତ୍ତରଦାୟୀ ୟୁଜର୍ ଇଣ୍ଟରଫେସ୍ ପ୍ରସ୍ତୁତ କରିବା।"',
        spandan: '"ୱେବ୍ ଡେଭଲପର୍ — ତଥ୍ୟ ସଂରଚନା ପରିଚାଳନା ଏବଂ କ୍ୱେରୀ କାର୍ଯ୍ୟଦକ୍ଷତା ବୃଦ୍ଧି।"',
        subhalaxmi: '"ଆଇଡିଆ ଉପସ୍ଥାପକ — ଆମର ଦୃଷ୍ଟିକୋଣକୁ ସ୍ପଷ୍ଟ ଭାବରେ ପ୍ରକାଶ କରୁଥିବା ପ୍ରଭାବଶାଳୀ ଉପସ୍ଥାପନା ଡିଜାଇନ୍ କରିବା।"',
        sneha: '"ଆଇଡିଆ ଉପସ୍ଥାପକ — ଆମ ପ୍ରକଳ୍ପ ଲେଆଉଟ୍ ପ୍ରଦର୍ଶନ ପାଇଁ ସୃଜନଶୀଳ ସ୍ଲାଇଡ୍ ପ୍ରସ୍ତୁତ କରିବା।"',
      },
      copySuccess: 'କ୍ଲିପବୋର୍ଡକୁ କପି ହେଲା!',
      call: 'କଲ୍ କରନ୍ତୁ',
      email: 'ଇମେଲ୍ କରନ୍ତୁ',
    },
    auth: {
      signInTitle: 'ପୁନର୍ବାର ସ୍ୱାଗତ',
      signUpTitle: 'ନାଗରିକ ଆକାଉଣ୍ଟ ଖୋଲନ୍ତୁ',
      signInDesc: 'ଆପଣଙ୍କର ଆବେଦନ ଏବଂ ନାଗରିକ ସହଭାଗିତା ପରିଚାଳନା ପାଇଁ ଲଗ୍ ଇନ୍ କରନ୍ତୁ',
      signUpDesc: 'ନାଗରିକ ଆବେଦନ ଦାଖଲ କରିବା ପାଇଁ ଯାଞ୍ଚ ହୋଇଥିବା ଇମେଲ୍ ସହିତ ପଞ୍ଜିକରଣ କରନ୍ତୁ',
      roleCitizen: 'ନାଗରିକ / ବାସିନ୍ଦା',
      roleOfficer: 'ପୌରପାଳିକା ପ୍ରାଧିକରଣ ଅଧିକାରୀ',
      roleOfficerDesc: 'ପୌର ଅଧିକାରୀ ଆକାଉଣ୍ଟ ସିଭିକ୍ ଇଣ୍ଟେଲିଜେନ୍ସ ଏବଂ ନିଷ୍ପତ୍ତି ଇଞ୍ଜିନ୍ ପାଇଁ ପ୍ରବେଶ ପ୍ରଦାନ କରେ।',
      emailLabel: 'ଇମେଲ୍ ଠିକଣା',
      emailPlaceholder: 'you@example.com',
      passwordLabel: 'ପାସୱାର୍ଡ଼',
      passwordPlaceholder: '••••••••',
      confirmPasswordLabel: 'ପାସୱାର୍ଡ଼ ନିଶ୍ଚିତ କରନ୍ତୁ',
      confirmPasswordPlaceholder: '••••••••',
      submitSignIn: 'ପୋର୍ଟାଲରେ ସାଇନ୍ ଇନ୍ କରନ୍ତୁ',
      submitSignUp: 'ଯାଞ୍ଚ ହୋଇଥିବା ଆକାଉଣ୍ଟ ସୃଷ୍ଟି କରନ୍ତୁ',
      processing: 'ପ୍ରମାଣୀକରଣ ଚାଲିଛି...',
      noAccount: 'ଆକାଉଣ୍ଟ ନାହିଁ କି?',
      haveAccount: 'ପୂର୍ବରୁ ଆକାଉଣ୍ଟ ଅଛି କି?',
      createOne: 'ଏଠାରେ ସାଇନ୍ ଅପ୍ କରନ୍ତୁ',
      logInHere: 'ଏଠାରେ ଲଗ୍ ଇନ୍ କରନ୍ତୁ',
      validationEmailPass: 'ଦୟାକରି ଉଭୟ ଇମେଲ୍ ଏବଂ ପାସୱାର୍ଡ଼ ପ୍ରବେଶ କରନ୍ତୁ।',
      validationPassMin: 'ପାସୱାର୍ଡ଼ ଅତି କମରେ ୬ଟି ଅକ୍ଷର ବିଶିଷ୍ଟ ହେବା ଆବଶ୍ୟକ।',
      validationPassMatch: 'ପାସୱାର୍ଡ଼ ମେଳ ଖାଉନାହିଁ। ଦୟାକରି ଯାଞ୍ଚ କରି ପୁନର୍ବାର ଚେଷ୍ଟା କରନ୍ତୁ।',
    },
    profile: {
      greeting: 'ନମସ୍କାର',
      officerBadge: 'ପ୍ରାଧିକରଣ ଅଧିକାରୀ',
      citizenBadge: 'ନାଗରିକ',
      updateDetails: 'ଆବଶ୍ୟକ ବିବରଣୀ ଅପଡେଟ୍ କରନ୍ତୁ',
      myGrievances: 'ମୋର ଅଭିଯୋଗ ଏବଂ ଅନୁରୋଧ',
      resolvedGrievances: 'ସମାଧାନ ହୋଇଥିବା ଅଭିଯୋଗ',
      notifications: 'ନାଗରିକ ବିଜ୍ଞପ୍ତି',
      switchToOfficer: 'ଅଧିକାରୀ ଇଣ୍ଟେଲିଜେନ୍ସ ସୁଇଟ୍ ଖୋଲନ୍ତୁ',
      switchToCitizen: 'ଜାନ୍ନୀତି ନାଗରିକ ପୋର୍ଟାଲ୍ ଖୋଲନ୍ତୁ',
      signOut: 'ସାଇନ୍ ଆଉଟ୍',
    },
    profileSetup: {
      title: 'ଆବଶ୍ୟକ ପ୍ରୋଫାଇଲ୍ ବିବରଣୀ ସମ୍ପୂର୍ଣ୍ଣ କରନ୍ତୁ',
      subtitle: 'ଯାଞ୍ଚ ହୋଇଥିବା ନାଗରିକ ଆବେଦନ ଦାଖଲ କରିବା ପାଇଁ ଦୟାକରି ଆପଣଙ୍କ ଅଞ୍ଚଳ ବିବରଣୀ ଯାଞ୍ଚ କରନ୍ତୁ।',
      fullName: 'ସମ୍ପୂର୍ଣ୍ଣ ଆଇନଗତ ନାମ',
      fullNamePlaceholder: 'ଯଥା: ଅଙ୍କିତ ଶର୍ମା',
      phone: 'ଫୋନ୍ ନମ୍ବର (୧୦ ଅଙ୍କ)',
      phonePlaceholder: 'ଯଥା: 9876543210',
      ward: 'ୱାର୍ଡ଼ ସଂଖ୍ୟା',
      city: 'ସହର / ପୌରପାଳିକା',
      cityPlaceholder: 'ଯଥା: ଭୁବନେଶ୍ୱର',
      address: 'ବାସସ୍ଥାନ / ଅଞ୍ଚଳ ଠିକଣା',
      addressPlaceholder: 'ଯଥା: ପ୍ଲଟ୍ ୧୦୨, ମାଷ୍ଟର କ୍ୟାଣ୍ଟିନ୍ ଛକ',
      pincode: 'ଡାକ ପିନକୋଡ୍ (୬ ଅଙ୍କ)',
      pincodePlaceholder: 'ଯଥା: 751001',
      department: 'ବିଭାଗୀୟ ପଦବୀ (ଅଧିକାରୀମାନଙ୍କ ପାଇଁ)',
      departmentPlaceholder: 'ଯଥା: ନିର୍ବାହୀ ଯନ୍ତ୍ରୀ - ନଗର ଉନ୍ନୟନ',
      saveAndContinue: 'ସାଇତନ୍ତୁ ଏବଂ ଆଗକୁ ବଢ଼ନ୍ତୁ',
      saving: 'ପ୍ରୋଫାଇଲ୍ ସାଇତା ହେଉଛି...',
      validationName: 'ଦୟାକରି ଆପଣଙ୍କର ସମ୍ପୂର୍ଣ୍ଣ ଆଇନଗତ ନାମ ପ୍ରବେଶ କରନ୍ତୁ।',
      validationPhone: 'ଦୟାକରି ଏକ ବୈଧ ୧୦-ଅଙ୍କ ବିଶିଷ୍ଟ ଫୋନ୍ ନମ୍ବର ପ୍ରବେଶ କରନ୍ତୁ।',
      validationAddress: 'ଦୟାକରି ଆପଣଙ୍କର ବାସସ୍ଥାନ / ଅଞ୍ଚଳ ଠିକଣା ପ୍ରବେଶ କରନ୍ତୁ।',
      validationPincode: 'ଦୟାକରି ଏକ ବୈଧ ୬-ଅଙ୍କ ବିଶିଷ୍ଟ ଡାକ ପିନକୋଡ୍ ପ୍ରବେଶ କରନ୍ତୁ।',
      validationDepartment: 'ଦୟାକରି ଆପଣଙ୍କର ପୌର ବିଭାଗ / ପଦବୀ ନିର୍ଦ୍ଦିଷ୍ଟ କରନ୍ତୁ।',
    },
    drawer: {
      title: 'ସମୁଦାୟ ସବମିଶନ ଲେଜର',
      userTitleSuffix: ' ଙ୍କ ନାଗରିକ ସବମିଶନ୍',
      subtitle: 'ପୌର ଅନୁରୋଧର ସ୍ଥିତି ଏବଂ ସମୟରେଖା ଟ୍ରାକ୍ କରନ୍ତୁ',
      filterAll: 'ସମସ୍ତ ଆବେଦନ',
      filterPending: 'ବିଚାରାଧୀନ',
      filterInProgress: 'କାର୍ଯ୍ୟ ଚାଲିଛି',
      filterResolved: 'ସମାଧାନ ହୋଇଛି',
      searchPlaceholder: 'ବିବରଣୀ, ୱାର୍ଡ଼, ବର୍ଗ ଦ୍ୱାରା ଖୋଜନ୍ତୁ...',
      noPetitions: 'ଏହି ବର୍ଗରେ କୌଣସି ଆବେଦନ ମିଳିଲା ନାହିଁ।',
      noPetitionsDesc: 'ଲେଜରରେ ଦେଖିବା ପାଇଁ ଜାନ୍ନୀତି ପୋର୍ଟାଲ ମାଧ୍ୟମରେ ଏକ ନୂତନ ଅଭିଯୋଗ କିମ୍ବା ପ୍ରସ୍ତାବ ଦାଖଲ କରନ୍ତୁ।',
      officerNote: 'ଅଧିକାରୀ ଟିପ୍ପଣୀ',
    },
    notifications: {
      title: 'ନାଗରିକ ବିଜ୍ଞପ୍ତି',
      subtitle: 'ଆପଣଙ୍କ ଅନୁରୋଧ ଏବଂ ନାଗରିକ ଘଟଣା ଉପରେ ରିଅଲ୍-ଟାଇମ୍ ସତର୍କତା',
      markAllRead: 'ସମସ୍ତ ପଢା ହୋଇଛି ବୋଲି ଚିହ୍ନଟ କରନ୍ତୁ',
      empty: 'କୌଣସି ନୂତନ ବିଜ୍ଞପ୍ତି ନାହିଁ।',
    },
    footer: {
      brand: 'ସିଭିକ୍ ଇନୋଭେଟର୍ସ',
      byThePeople: '“ଜନସାଧାରଣଙ୍କ ଦ୍ୱାରା ଜନସାଧାରଣଙ୍କ ପାଇଁ” • ଡେଭଲପର୍‌ମାନଙ୍କ ବିଷୟରେ',
      portalLink: 'ଜାନ୍ନୀତି ପୋର୍ଟାଲ୍',
      officerLink: 'ଇଣ୍ଟେଲିଜେନ୍ସ ସୁଇଟ୍ (ଅଧିକାରୀ ଦୃଶ୍ୟ)',
      aboutDevs: 'ଡେଭଲପର୍‌ମାନଙ୍କ ବିଷୟରେ',
      civicLedger: 'ନାଗରିକ ଲେଜର',
      craftedWith: 'ସହିତ ପ୍ରସ୍ତୁତ',
      forBetter: 'ଉନ୍ନତ ସମୁଦାୟ ପାଇଁ',
    },
  },
};
