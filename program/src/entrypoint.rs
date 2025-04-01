use solana_program::{
    account_info::AccountInfo, entrypoint, entrypoint::ProgramResult, msg, pubkey::Pubkey,
};

entrypoint!(process_instruction);

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    msg!("Hello, Solana! 你好，索拉納！");
    
    // 打印出程序ID
    msg!("程序 ID: {}", program_id);
    
    // 打印賬戶信息
    msg!("賬戶數量: {}", accounts.len());
    for (i, account) in accounts.iter().enumerate() {
        msg!("賬戶[{}]: {}", i, account.key);
    }
    
    // 打印指令數據
    if !instruction_data.is_empty() {
        if let Ok(message) = std::str::from_utf8(instruction_data) {
            msg!("收到消息: {}", message);
        } else {
            msg!("收到非文本數據");
            msg!("數據長度: {} bytes", instruction_data.len());
        }
    } else {
        msg!("沒有收到指令數據");
    }
    
    Ok(())
} 