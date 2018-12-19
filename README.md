# WaykiChain build&update script for shell

Step 1. get this script

Run `wget https://raw.githubusercontent.com/GitHubbard/Xshell-Script/master/build.sh`

Step 2. build a new node or update it

Run `./build.sh` to build new node connect to MainNet

Or run `./build.sh testnet` to build new node connect to TestNet

Or run `./build.sh update` to update node, you must stop the node process before udpate it

Step 3. start node

Enter the path 'wicc' , and run `./coind -datadir=cur`
