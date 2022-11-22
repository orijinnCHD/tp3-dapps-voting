
# TP3 Alyra - création d'une Dapp de vote

ce projet propose la création d'une Dapps d'un systéme de vote créer par smart contract 

## lien de l'application

l'application a été déployé sous Goerli

```bash
https://tp3-dapps-voting-de8z-cyetak22j-orijinnchd.vercel.app/
```

## Installation

Clone the project

```bash
  git clone https://github.com/orijinnCHD/tp3-dapps-voting.git
```

Installer les dépendances

```bash
  npm install
```
## deployement sur localhost

Premiérement, Lancer votre ganache blockchain à la racine du dossier

```bash
  ganache
```

Placez vous dans le dossier "truffle" (cd truffle), puis  lancer cette commande :

```bash
  truffle migrate --reset
```

Pour visualiez l'application, placez-vous dans le dossier client, (cd client à la racine), puis executer la commande :

```bash
  npm run start 
```

## deployement sur testnet goerli

renseignez votre fichier .env les variables : 
```bash
INFURA_PROJECT_ID  et MNEMONIC
```

## Video d'utilisation de la Dapp Voting

voici une video de demonstration de l'application qui retranscrit une session de vote :

https://www.loom.com/share/66438859297a4ded9a738bde65731189





## environnement de travail

- Environnement : truffle unbox react, linux(wsl)
- Langage : solidity ,JS
- front: ReactJS, redux, reduxTools/kit
- CSS : SASS
- editeur : VS code
- Network: Ganache, Goerli
- Wallet : Metamask

Merci à l'ecole Alyra !!
