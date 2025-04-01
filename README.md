# Simple Solana Demo Project

This is a basic Solana development example that shows how to write Solana programs in Rust and interact with them using TypeScript. The program has been deployed on Solana's devnet.

## Project Structure

```
.
├── program/             # Rust program (smart contract)
│   ├── src/             # Source code
│   │   ├── lib.rs       # Main file
│   │   └── entrypoint.rs # Program entry point
│   └── Cargo.toml       # Rust dependency configuration
└── client/             # TypeScript client
    ├── src/             # Source code
    │   └── index.ts     # Client code
    ├── package.json     # Node.js dependency configuration
    └── tsconfig.json    # TypeScript configuration
```

## Deployed Program

Program ID: `4BVd3iznNQg2Spju9tU2QzQB1aVzDSBR1ZQ1yj2Cf2of`

This program has been deployed to Solana's devnet network. You can interact with it directly using the client.

## Environment Setup and Compilation

### Prerequisites

1. Install Solana CLI:
```bash
sh -c "$(curl -sSfL https://release.solana.com/v1.14.29/install)"
export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"
```

2. Install Rust and Cargo:
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
rustup component add rustfmt
rustup target add bpfel-unknown-unknown
```

3. Install Node.js and npm:
```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Compiling and Deploying the Rust Program

1. Configure Solana network:
```bash
solana config set --url https://api.devnet.solana.com
```

2. Create a wallet (if you haven't already):
```bash
solana-keygen new
```

3. Get test SOL:
```bash
solana airdrop 2
```

4. Compile the program:
```bash
cd program
cargo build-bpf
```

5. Deploy the program:
```bash
solana program deploy target/deploy/solana_hello_world.so
```
After successful deployment, you'll receive a program ID. Make sure to save it.

6. Update the program ID in the client (if you deployed a new program):
Edit the `client/src/index.ts` file and update the `PROGRAM_ID` variable:
```typescript
const PROGRAM_ID = new PublicKey('your-new-program-id');
```

## Program Features

This is a simple demo program that:

1. Prints "Hello, Solana! 你好，索拉納！"
2. Shows the program ID
3. Lists all incoming accounts
4. Reads and displays any instruction data sent to it

## Client Features

The TypeScript client shows how to:

1. Connect to Solana devnet
2. Load or create keypairs
3. Build transactions and attach instructions
4. Send transactions to our program
5. Retrieve transaction logs and results

## Running the Client

```bash
# Go to the client directory
cd client

# Install dependencies
npm install

# Run the client
npm start
```

## How Rust and TypeScript Interact

Here are the key concepts of how the Rust program and TypeScript client interact:

1. **Program Deployment**:
   The Rust program is compiled and deployed to the Solana network, receiving a unique program ID.

2. **Client Calls**:
   The TypeScript client builds a transaction that specifies the program ID to call, the accounts needed, and the instruction data.

3. **Data Transfer**:
   - Client → Program: Through the `data` field of `TransactionInstruction`
   - Program → Client: Through program logs (the `msg!` macro)

4. **Account List**:
   The program accesses the list of transmitted accounts via the `AccountInfo` parameter, allowing it to read or modify their data.

## Further Learning

- [Solana Official Documentation](https://docs.solana.com/)
- [Solana Cookbook](https://solanacookbook.com/) 