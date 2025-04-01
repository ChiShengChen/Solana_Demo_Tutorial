import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  TransactionInstruction,
  sendAndConfirmTransaction,
  LAMPORTS_PER_SOL
} from '@solana/web3.js';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

// 程序的 ID（這是我們剛剛部署的程序 ID）
const PROGRAM_ID = new PublicKey('4BVd3iznNQg2Spju9tU2QzQB1aVzDSBR1ZQ1yj2Cf2of');

// 主函數
async function main() {
  console.log('===== Solana Hello World 客戶端 =====');
  
  // 連接到 Solana devnet
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
  console.log('已連接到 Solana devnet');
  
  // 從本地文件加載密鑰對
  const keypairPath = path.join(os.homedir(), '.config', 'solana', 'id.json');
  let payer: Keypair;
  
  try {
    if (fs.existsSync(keypairPath)) {
      const secretKeyString = fs.readFileSync(keypairPath, { encoding: 'utf8' });
      const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
      payer = Keypair.fromSecretKey(secretKey);
      console.log('使用已存在的 Solana 密鑰對');
    } else {
      payer = Keypair.generate();
      console.log('生成了新的測試密鑰對');
    }
  } catch (error) {
    payer = Keypair.generate();
    console.log('生成了新的測試密鑰對');
  }

  console.log('使用地址:', payer.publicKey.toBase58());

  // 檢查 payer 餘額
  const balance = await connection.getBalance(payer.publicKey);
  console.log('當前餘額:', balance / LAMPORTS_PER_SOL, 'SOL');

  // 創建一個內存賬戶用於演示
  const demoAccount = Keypair.generate();
  console.log('演示賬戶地址:', demoAccount.publicKey.toBase58());

  // ===== 向我們的程序發送指令 =====
  
  // 1. 創建一個簡單的文本消息作為指令數據
  const message = "你好，這是來自客戶端的消息！";
  const instructionData = Buffer.from(message);
  
  // 2. 創建指令
  const instruction = new TransactionInstruction({
    keys: [
      { pubkey: payer.publicKey, isSigner: true, isWritable: true },
      { pubkey: demoAccount.publicKey, isSigner: false, isWritable: true }
    ],
    programId: PROGRAM_ID,
    data: instructionData
  });
  
  // 3. 創建交易
  const transaction = new Transaction().add(instruction);
  
  // 4. 發送交易
  console.log('發送交易...');
  try {
    const signature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [payer]
    );
    console.log('交易成功!');
    console.log('交易簽名:', signature);
    
    // 5. 獲取交易詳情和日誌
    console.log('===== 交易日誌 =====');
    const txDetails = await connection.getTransaction(signature, {
      commitment: 'confirmed',
      maxSupportedTransactionVersion: 0
    });
    
    if (txDetails && txDetails.meta && txDetails.meta.logMessages) {
      txDetails.meta.logMessages.forEach(log => {
        console.log(log);
      });
    }

  } catch (error) {
    console.error('交易失敗:', error);
  }
}

main().then(
  () => console.log('程序執行完成'),
  (err) => console.error('程序執行出錯:', err)
); 