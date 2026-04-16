---
id: ledger
title: Ledger
---

# Ledger vault

Connect the ledger device to the system in which mavseal is running.
Install mavryk-wallet and mavryk-baker apps from [ledger live](https://www.ledger.com/ledger-live/download).

Note: Developer mode might be needed to install baker app.
[Ledger Developer mode](https://developers.ledger.com/docs/live-app/developer-mode/#:~:text=To%20activate%20the%20Developer%20mode,Live%20version%202.32%20and%20above.)

## Configuration

| Name        | Type         | Required | Description                                                   |
|-------------|--------------|----------|---------------------------------------------------------------|
| id          | string       |     ✅    | Ledger Device ID. Use first available device if not specified |
| keys        | string array |     ✅    | Managed key IDs                                               |
| close_after | duration     |    OPTIONAL      | Close device after a certain period of inactivity             |

### Keys & ID format and meaning

Syntax: `derivation/bip32`

Where `bip32` is [BIP 0032](https://en.bitcoin.it/wiki/BIP_0032) path and
`derivation` is one of derivation schemes: `ed25519`, `secp256k1`, `p-256`,
`secp256r1` (alias for `p-256`), `bip25519`, `bip32-ed25519` (alias for
`bip25519`). `bip25519` is a [BIP 0032](https://en.bitcoin.it/wiki/BIP_0032)
compliant scheme, others use some sort of a custom hash chain.

Ledger specific root `m/44'/1969'` may be omitted.

Examples (equivalent): `bip32-ed25519/m/44'/1969'/0'/0'`,
`bip32-ed25519/44'/1969'/0'/0'`, `bip25519/0'/0'`

### Example

```yaml
vaults:
  ledger:
    driver: ledger
    config:
      id: 3944f7a0
      keys:
        - "bip32-ed25519/0'/0'"
        - "secp256k1/0'/1'"
      close_after: 3600s
```

### **close_after field in config**

Configure this value as per your requirement. As you don't know the time between the blocks assigned to your baker, it is better to configure it for at least a few hours to prevent the ledger from closing, often due to inactivity.

Example:

```sh
close_after: 3600s
```

### Transports

By default Ledger vault uses `usb` transport. Another available transport is `tcp` used primarily for interaction with [Speculos](https://github.com/LedgerHQ/speculos)
emulator. It can be enabled using `transport` option:

```yaml
vaults:
  ledger:
    driver: ledger
    config:
      id: 3944f7a0
      transport: tcp://127.0.0.1:9999
      keys:
        - "bip32-ed25519/0'/0'"
        - "secp256k1/0'/1'"
      close_after: 3600s
```

In addition `mavseal-cli ledger` command also accepts `-t` / `--transport` key with the same URL-like syntax:

```sh
mavseal-cli ledger --transport 'tcp://127.0.0.1:9999' list
```

## Getting data from ledger for mavseal configuration using CLI

Keep mavryk-wallet app open for the below commands and for signing any wallet transactions.
During every wallet transaction `Accept/Reject` input should be provided in the ledger when prompted.

```sh
% ./mavseal-cli list -c ./sig-ledger.yaml 
INFO[0000] Initializing watermark backend                backend=file
INFO[0000] Initializing vault                            vault=ledger vault_name=ledger
Public Key Hash:    mv1AxtBcyobua1A8sZdf7DJ9xUxQ73q8mhPe
Reference:          bip32-ed25519/44'/1969'/0'/0'
Vault:              Ledger/e1c98d9f
Active:             false

Public Key Hash:    mv2ds3CDsARNXP9Xp6THqf28zw8HkrnAQtjt
Reference:          secp256k1/44'/1969'/0'/1'
Vault:              Ledger/e1c98d9f
Active:             false
```

### List all connected Ledgers

```sh
% mavseal-cli ledger list
Path:  		DevSrvsID:4296821191
ID:     	villainous-cichlid-relieved-dodo / e1c98d9f
Version:	MavBake 1.0.0 e1bfc2a0
```

### Ledger device lock

MavSeal acquires a read lock on the ledger device when in operation. Be aware that when the MavSeal service is running, and it has a valid configuration for a ledger device, the mavseal-cli binary will encounter error "ledger: hidapi: failed to open device" trying to list ledgers. Only 1 process can acquire a read lock on the ledger device.

## Setup baking with mavseal and ledger

Keep mavryk-baker app open for the below configurations and when the baker is running.
No prompt will be seen in ledger during signing operations.

```sh
mavseal-cli ledger setup-baking [--chain-id <chain_id>] [--main-hwm <hwm>] [--test-hwm <hwm>] [-d <device>] <path>
```

Example:

```sh
mavseal-cli ledger setup-baking -d 3944f7a0 "bip32-ed25519/44'/1969'/0'/0'"
```

### Reset high water marks

```sh
mavseal-cli ledger set-high-watermark [-d <device>] <hwm>
```

Example:

```sh
mavseal-cli ledger set-high-watermark -d 3944f7a0 0
```