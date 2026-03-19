"use client";

export interface SettingsCopy {
  badge: string;
  title: string;
  description: string;
  workspace: string;
  accountStatus: string;
  savedTasks: string;
  appearance: string;
  appearanceHint: string;
  language: string;
  languageHint: string;
  profileCard: string;
  profileTitle: string;
  profileDescription: string;
  fullName: string;
  email: string;
  saveProfile: string;
  securityCard: string;
  securityTitle: string;
  securityDescription: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  savePassword: string;
  preferencesCard: string;
  preferencesTitle: string;
  preferencesDescription: string;
  light: string;
  dark: string;
  system: string;
  english: string;
  arabic: string;
  dataCard: string;
  dataTitle: string;
  dataDescription: string;
  clearTasks: string;
  clearTasksHint: string;
  logout: string;
  logoutHint: string;
  deleteAccount: string;
  deleteAccountHint: string;
  activityCard: string;
  activityTitle: string;
  activityDescription: string;
  joinedAt: string;
  completionRate: string;
  activeTasks: string;
  streak: string;
  dangerZone: string;
  profileSaved: string;
  passwordSaved: string;
  tasksCleared: string;
  loggedOut: string;
  accountDeleted: string;
  emailExists: string;
  passwordMismatch: string;
  invalidPassword: string;
  shortPassword: string;
  confirmClearTasks: string;
  confirmDeleteAccount: string;
  noUser: string;
}

export function getSettingsCopy(locale: "en" | "ar"): SettingsCopy {
  if (locale === "ar") {
    return {
      badge: "مركز الإعدادات",
      title: "اضبط المساحة الدراسية بالطريقة التي تناسبك",
      description: "من هنا تقدر تعدل الحساب، تغيّر اللغة والمظهر، وتتحكم في بيانات المهام من مكان واحد.",
      workspace: "المساحة الحالية",
      accountStatus: "الحساب النشط",
      savedTasks: "المهام المحفوظة",
      appearance: "المظهر",
      appearanceHint: "اختر الثيم المناسب لك الآن.",
      language: "اللغة",
      languageHint: "بدّل لغة الواجهة فورًا.",
      profileCard: "البيانات الشخصية",
      profileTitle: "حدّث اسمك وبريدك",
      profileDescription: "هذه البيانات تخص الحساب الحالي على هذا الجهاز.",
      fullName: "الاسم الكامل",
      email: "البريد الإلكتروني",
      saveProfile: "حفظ التعديلات",
      securityCard: "الأمان",
      securityTitle: "تغيير كلمة المرور",
      securityDescription: "استخدم كلمة مرور جديدة إذا أردت تأمين الحساب بشكل أفضل.",
      currentPassword: "كلمة المرور الحالية",
      newPassword: "كلمة المرور الجديدة",
      confirmPassword: "تأكيد كلمة المرور الجديدة",
      savePassword: "تحديث كلمة المرور",
      preferencesCard: "التفضيلات",
      preferencesTitle: "الواجهة وتجربة الاستخدام",
      preferencesDescription: "تحكم سريع في شكل ومسار التطبيق.",
      light: "فاتح",
      dark: "داكن",
      system: "النظام",
      english: "English",
      arabic: "العربية",
      dataCard: "البيانات",
      dataTitle: "إدارة بيانات المساحة",
      dataDescription: "نفّذ إجراءات سريعة على المهام أو الجلسة الحالية.",
      clearTasks: "مسح كل المهام",
      clearTasksHint: "يحذف جميع مهام الحساب الحالي فقط.",
      logout: "تسجيل الخروج",
      logoutHint: "الخروج من الجلسة الحالية والعودة لشاشة الدخول.",
      deleteAccount: "حذف الحساب",
      deleteAccountHint: "يحذف الحساب الحالي مع مهامه المحفوظة على هذا الجهاز.",
      activityCard: "نظرة سريعة",
      activityTitle: "ملخص المساحة الحالية",
      activityDescription: "مؤشرات سريعة تساعدك تراجع وضعك قبل أي تعديل.",
      joinedAt: "تاريخ إنشاء الحساب",
      completionRate: "معدل الإنجاز",
      activeTasks: "المهام النشطة",
      streak: "السلسلة الحالية",
      dangerZone: "إجراءات حساسة",
      profileSaved: "تم تحديث البيانات الشخصية بنجاح.",
      passwordSaved: "تم تغيير كلمة المرور بنجاح.",
      tasksCleared: "تم مسح كل المهام من هذا الحساب.",
      loggedOut: "تم تسجيل الخروج.",
      accountDeleted: "تم حذف الحساب الحالي.",
      emailExists: "هذا البريد مستخدم بالفعل داخل التطبيق.",
      passwordMismatch: "كلمتا المرور غير متطابقتين.",
      invalidPassword: "كلمة المرور الحالية غير صحيحة.",
      shortPassword: "كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل.",
      confirmClearTasks: "هل تريد مسح كل المهام؟",
      confirmDeleteAccount: "هل أنت متأكد من حذف الحساب بالكامل؟",
      noUser: "لا توجد بيانات حساب حالية.",
    };
  }

  return {
    badge: "Settings Hub",
    title: "Tune the workspace around the way you study",
    description: "Update your account, switch language and theme, and manage your task data from one place.",
    workspace: "Current workspace",
    accountStatus: "Active account",
    savedTasks: "Saved tasks",
    appearance: "Appearance",
    appearanceHint: "Choose the theme that feels right right now.",
    language: "Language",
    languageHint: "Switch the interface language instantly.",
    profileCard: "Personal details",
    profileTitle: "Update your name and email",
    profileDescription: "These details are used for the current account on this device.",
    fullName: "Full name",
    email: "Email",
    saveProfile: "Save changes",
    securityCard: "Security",
    securityTitle: "Change password",
    securityDescription: "Use a new password whenever you want a stronger account setup.",
    currentPassword: "Current password",
    newPassword: "New password",
    confirmPassword: "Confirm new password",
    savePassword: "Update password",
    preferencesCard: "Preferences",
    preferencesTitle: "Interface and experience",
    preferencesDescription: "Quick controls for how the app looks and feels.",
    light: "Light",
    dark: "Dark",
    system: "System",
    english: "English",
    arabic: "Arabic",
    dataCard: "Data controls",
    dataTitle: "Manage workspace data",
    dataDescription: "Run quick actions for the current session and task board.",
    clearTasks: "Clear all tasks",
    clearTasksHint: "Removes every task saved for the current account only.",
    logout: "Log out",
    logoutHint: "Exit the current session and return to the login screen.",
    deleteAccount: "Delete account",
    deleteAccountHint: "Deletes the current account with its saved tasks on this device.",
    activityCard: "Quick view",
    activityTitle: "Current workspace summary",
    activityDescription: "Fast signals to review your setup before changing anything.",
    joinedAt: "Account created",
    completionRate: "Completion rate",
    activeTasks: "Active tasks",
    streak: "Current streak",
    dangerZone: "Sensitive actions",
    profileSaved: "Profile details updated successfully.",
    passwordSaved: "Password updated successfully.",
    tasksCleared: "All tasks were removed from this account.",
    loggedOut: "You have been logged out.",
    accountDeleted: "The current account has been deleted.",
    emailExists: "This email is already used in the app.",
    passwordMismatch: "The new passwords do not match.",
    invalidPassword: "The current password is incorrect.",
    shortPassword: "The new password must be at least 6 characters.",
    confirmClearTasks: "Clear all tasks now?",
    confirmDeleteAccount: "Delete this account permanently?",
    noUser: "No active account data is available.",
  };
}
