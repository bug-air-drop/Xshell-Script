#!/bin/bash

# check os version
os_version=$(cat /etc/issue | grep "Ubuntu 14.04");

if [ -z "$os_version" ] 
then
	echo -e "\033[47;31m Sorry, Waykichain only support Ubuntu 14.04 now! \033[0m"
	exit 1
fi

# prepare the build environment
sudo apt-get update
sudo apt-get install -y build-essential libtool autotools-dev automake pkg-config libssl-dev libevent-dev bsdmainutils python3
sudo apt-get install -y libboost-system-dev libboost-filesystem-dev libboost-chrono-dev libboost-program-options-dev libboost-test-dev libboost-thread-dev
sudo apt-get install -y software-properties-common
sudo add-apt-repository ppa:bitcoin/bitcoin -y
sudo apt-get update
sudo apt-get install -y libdb4.8-dev libdb4.8++-dev
sudo apt-get install -y git

#build waykicoind
cd
git clone https://github.com/WaykiChain/WaykiChain.git
chmod +x WaykiChain/linux_shell/linux.sh
chmod +x WaykiChain/autogen.sh
chmod +x WaykiChain/share/genbuild.sh
cd ./WaykiChain/linux_shell
sh linux.sh
cd ..
chmod +x autogen-coin-man.sh
sh autogen-coin-man.sh coin
chmod +x ./share/genbuild.sh
make

#copy the coind and WaykiChain.conf
cd
mkdir WICC
cp -r WaykiChain/src/coind WICC
cd WICC

#write config
echo -e "rpcuser=wikichain\nrpcpassword=admin\nblockminsize=1000\nzapwallettxes=0\ndebug=INFO\nprinttoconsole=0\nlogtimestamps=1\nlogprintfofile=1\nlogprintfileline=1\nserver=1\nlisten=1\nuiport=4555\nrpcport=6968\nrpcallowip=0.0.0.0/0\nisdbtraversal=1\ndisablesafemode=1\ngen=1\ngenproclimit=1000000" >> WaykiChain.conf

#job done
echo -e '\033[41;37m Welcome to WaykiChain! Just enjoy it \033[0m'
