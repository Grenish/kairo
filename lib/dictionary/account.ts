export const account = {
  en: {
    title: "Account",
    intro: "Orders placed in this browser, the pieces you saved, and where they go.",
    settings: "Settings",
    signIn: "Sign in",
    tabs: {
      orders: "Orders",
      saved: "Saved",
      address: "Addresses",
    },
    order: {
      placed: "Placed {date}",
      items: "{n} items",
      total: "Total",
      slot: "Delivery time",
      payment: "Payment",
    },
    addresses: [
      {
        label: "Home",
        lines: ["〒160-0023", "1-13-2 Nishi-Shinjuku, Shinjuku-ku", "Tokyo, Shinjuku Building 3F"],
        phone: "03-1234-5678",
        isDefault: true,
      },
      {
        label: "Office",
        lines: ["〒530-0001", "2-5-1 Umeda, Kita-ku", "Osaka, Osaka Tower 1205"],
        phone: "06-8765-4321",
        isDefault: false,
      },
    ],
    defaultAddress: "Default",
    empty: {
      orders: "No orders yet.",
      ordersDesc: "Orders you place at checkout appear here.",
      saved: "Nothing saved yet.",
      savedDesc: "Use Save on a product page to keep a piece here.",
      action: "Browse the shop",
    },
  },
  ja: {
    title: "アカウント",
    intro: "このブラウザでのご注文、保存したアイテム、お届け先。",
    settings: "設定",
    signIn: "ログイン",
    tabs: {
      orders: "注文履歴",
      saved: "保存済み",
      address: "お届け先",
    },
    order: {
      placed: "{date} ご注文",
      items: "{n}点",
      total: "合計",
      slot: "お届け時間帯",
      payment: "お支払い",
    },
    addresses: [
      {
        label: "自宅",
        lines: ["〒160-0023", "東京都新宿区西新宿1-13-2", "新宿ビル3F"],
        phone: "03-1234-5678",
        isDefault: true,
      },
      {
        label: "勤務先",
        lines: ["〒530-0001", "大阪府大阪市北区梅田2-5-1", "大阪タワー1205"],
        phone: "06-8765-4321",
        isDefault: false,
      },
    ],
    defaultAddress: "既定",
    empty: {
      orders: "まだご注文はありません。",
      ordersDesc: "ご購入手続きで確定したご注文がここに表示されます。",
      saved: "保存したアイテムはありません。",
      savedDesc: "商品ページの「保存」で、ここにアイテムを残せます。",
      action: "ショップを見る",
    },
  },
};
