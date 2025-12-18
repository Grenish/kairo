export const settings = {
  en: {
    title: "Settings",
    subtitle: "Manage your account preferences and settings.",
    tabs: {
      account: "Account",
      security: "Security",
      appearance: "Appearance",
      notifications: "Notifications",
    },
    account: {
      title: "Account Settings",
      description: "Update your personal information and account preferences.",
      name: {
        label: "Full Name",
        placeholder: "Enter your full name",
      },
      username: {
        label: "Username",
        placeholder: "Enter your username",
      },
      email: {
        label: "Email Address",
        placeholder: "Enter your email",
      },
      phone: {
        label: "Phone Number",
        placeholder: "+81 XXX XXXX XXXX",
      },
      visibility: {
        label: "Account Visibility",
        description: "Control who can see your profile and activity.",
        public: "Public",
        private: "Private",
      },
      dangerZone: {
        title: "Danger Zone",
        description: "Irreversible and destructive actions.",
        disable: {
          label: "Disable Account",
          description:
            "Temporarily disable your account. You can reactivate it anytime.",
        },
        delete: {
          label: "Delete Account",
          description:
            "Permanently delete your account and all associated data.",
          button: "Delete Account",
        },
      },
      save: "Save Changes",
    },
    security: {
      title: "Security Settings",
      description: "Keep your account secure by updating your password.",
      currentPassword: {
        label: "Current Password",
        placeholder: "Enter current password",
      },
      newPassword: {
        label: "New Password",
        placeholder: "Enter new password",
      },
      confirmPassword: {
        label: "Confirm Password",
        placeholder: "Confirm new password",
      },
      update: "Update Password",
    },
    appearance: {
      title: "Appearance",
      description: "Customize how Kairo looks on your device.",
      theme: {
        label: "Theme",
        description: "Select your preferred color scheme.",
        light: "Light",
        dark: "Dark",
        system: "System",
      },
    },
    notifications: {
      title: "Notification Preferences",
      description: "Choose what updates you want to receive.",
      types: {
        marketing: {
          label: "Marketing",
          description: "Receive updates about new collections and campaigns.",
        },
        orders: {
          label: "Orders",
          description: "Get notified about your order status and shipping.",
        },
        promos: {
          label: "Promotions",
          description: "Be the first to know about exclusive offers.",
        },
        password: {
          label: "Security Alerts",
          description:
            "Get notified about password changes and login activity.",
        },
      },
      delivery: {
        label: "Delivery Method",
        description: "Choose how you want to receive notifications.",
        email: "Email",
        phone: "SMS",
        both: "Both",
      },
      save: "Save Preferences",
    },
  },
  ja: {
    title: "設定",
    subtitle: "アカウントの設定を管理します。",
    tabs: {
      account: "アカウント",
      security: "セキュリティ",
      appearance: "外観",
      notifications: "通知",
    },
    account: {
      title: "アカウント設定",
      description: "個人情報とアカウント設定を更新します。",
      name: {
        label: "氏名",
        placeholder: "氏名を入力",
      },
      username: {
        label: "ユーザー名",
        placeholder: "ユーザー名を入力",
      },
      email: {
        label: "メールアドレス",
        placeholder: "メールアドレスを入力",
      },
      phone: {
        label: "電話番号",
        placeholder: "+81 XXX XXXX XXXX",
      },
      visibility: {
        label: "アカウントの公開設定",
        description: "プロフィールとアクティビティの公開範囲を制御します。",
        public: "公開",
        private: "非公開",
      },
      dangerZone: {
        title: "危険ゾーン",
        description: "取り消しができない操作です。",
        disable: {
          label: "アカウントを無効化",
          description:
            "一時的にアカウントを無効にします。いつでも再有効化できます。",
        },
        delete: {
          label: "アカウントを削除",
          description: "アカウントと関連データを完全に削除します。",
          button: "アカウントを削除",
        },
      },
      save: "変更を保存",
    },
    security: {
      title: "セキュリティ設定",
      description: "パスワードを更新してアカウントを安全に保ちます。",
      currentPassword: {
        label: "現在のパスワード",
        placeholder: "現在のパスワードを入力",
      },
      newPassword: {
        label: "新しいパスワード",
        placeholder: "新しいパスワードを入力",
      },
      confirmPassword: {
        label: "パスワードの確認",
        placeholder: "新しいパスワードを確認",
      },
      update: "パスワードを更新",
    },
    appearance: {
      title: "外観",
      description: "Kairoの見た目をカスタマイズします。",
      theme: {
        label: "テーマ",
        description: "お好みの配色を選択してください。",
        light: "ライト",
        dark: "ダーク",
        system: "システム",
      },
    },
    notifications: {
      title: "通知設定",
      description: "受け取りたい通知を選択します。",
      types: {
        marketing: {
          label: "マーケティング",
          description:
            "新しいコレクションやキャンペーンの最新情報を受け取ります。",
        },
        orders: {
          label: "注文",
          description: "注文状況と配送に関する通知を受け取ります。",
        },
        promos: {
          label: "プロモーション",
          description: "限定オファーをいち早く知ることができます。",
        },
        password: {
          label: "セキュリティアラート",
          description:
            "パスワード変更やログインアクティビティの通知を受け取ります。",
        },
      },
      delivery: {
        label: "配信方法",
        description: "通知の受け取り方法を選択します。",
        email: "メール",
        phone: "SMS",
        both: "両方",
      },
      save: "設定を保存",
    },
  },
} as const;
