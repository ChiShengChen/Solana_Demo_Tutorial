# Solana 簡單範例專案

這是一個基本的 Solana 開發範例，展示了使用 Rust 編寫 Solana 程序，並用 TypeScript 與之互動的方法。程序已部署在 Solana 的 devnet 上。

## 專案結構

```
.
├── program/             # Rust 程序（智能合約）
│   ├── src/             # 源代碼
│   │   ├── lib.rs       # 主文件
│   │   └── entrypoint.rs # 程序入口點
│   └── Cargo.toml       # Rust 相依性配置
└── client/             # TypeScript 客戶端
    ├── src/             # 源代碼
    │   └── index.ts     # 客戶端代碼
    ├── package.json     # Node.js 相依性配置
    └── tsconfig.json    # TypeScript 配置
```

## 已部署的程序

程序 ID: `4BVd3iznNQg2Spju9tU2QzQB1aVzDSBR1ZQ1yj2Cf2of`

這個程序已經部署到 Solana 的 devnet 網絡，您可以直接使用客戶端與它互動。

## 程序功能

這是一個簡單的演示程序，它會：

1. 打印出 "Hello, Solana! 你好，索拉納！"
2. 顯示程序 ID
3. 列出所有傳入的賬戶
4. 讀取並顯示任何傳入的指令數據

## 客戶端功能

TypeScript 客戶端展示了如何：

1. 連接到 Solana devnet
2. 加載或創建密鑰對
3. 構建交易並附加指令
4. 發送交易到我們的程序
5. 檢索交易日誌和結果

## 運行客戶端

```bash
# 進入客戶端目錄
cd client

# 安裝依賴
npm install

# 運行客戶端
npm start
```

## Rust 和 TypeScript 互動原理

以下是 Rust 程序和 TypeScript 客戶端交互的關鍵概念：

1. **程序部署**：
   Rust 程序經過編譯後，被部署到 Solana 網絡，獲得一個唯一的程序 ID。

2. **客戶端調用**：
   TypeScript 客戶端構建交易，指定要調用的程序 ID、需要的賬戶和指令數據。

3. **數據傳遞**：
   - 客戶端 → 程序：通過 `TransactionInstruction` 的 `data` 字段
   - 程序 → 客戶端：通過程序日誌 (`msg!` 宏)

4. **賬戶列表**：
   程序透過 `AccountInfo` 參數訪問傳入的賬戶列表，可以讀取或修改其數據。

## 進一步學習

- [Solana 官方文檔](https://docs.solana.com/)
- [Solana Cookbook](https://solanacookbook.com/) 