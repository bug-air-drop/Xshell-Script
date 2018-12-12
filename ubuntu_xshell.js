function Main()
{
	//update source
	xsh.Screen.Synchronous = true;
	xsh.Screen.Send('cd');
	xsh.Screen.Send(String.fromCharCode(13));
	xsh.Screen.Clear();
	xsh.Screen.Send('apt-get update');
	xsh.Screen.Send(String.fromCharCode(13));
	xsh.Session.Sleep(2000);
	xsh.Screen.WaitForString('Done');
	
	//Setup ENV
	AptGet('sudo apt-get install build-essential libtool autotools-dev automake pkg-config libssl-dev libevent-dev bsdmainutils python3');
	AptGet('sudo apt-get install libboost-system-dev libboost-filesystem-dev libboost-chrono-dev libboost-program-options-dev libboost-test-dev libboost-thread-dev');
	AptGet('sudo apt-get install software-properties-common');

	xsh.Screen.Send('sudo add-apt-repository ppa:bitcoin/bitcoin');
	xsh.Screen.Send(String.fromCharCode(13));
	xsh.Screen.WaitForString('[ENTER]');
	xsh.Screen.Send(String.fromCharCode(13));
	xsh.Session.Sleep(2000);
	xsh.Screen.WaitForString('root@');
	
	xsh.Screen.Send('apt-get update');
	xsh.Screen.Send(String.fromCharCode(13));
	xsh.Session.Sleep(2000);
	xsh.Screen.WaitForString('Done');
	
	AptGet('sudo apt-get install libdb4.8-dev libdb4.8++-dev');
	AptGet('sudo apt-get install git');
	
	//Git
	xsh.Screen.Send('git clone https://github.com/WaykiChain/WaykiChain');
	xsh.Screen.Send(String.fromCharCode(13));
	xsh.Screen.WaitForString('Checking connectivity');
	xsh.Session.Sleep(2000);
	
	//Update File Permissions
	xsh.Screen.Send('chmod 777 WaykiChain/linux_shell/linux.sh');
	xsh.Screen.Send(String.fromCharCode(13));
	xsh.Session.Sleep(500);
	xsh.Screen.Send('chmod 777 WaykiChain/autogen.sh');
	xsh.Screen.Send(String.fromCharCode(13));
	xsh.Session.Sleep(500);
	xsh.Screen.Send('chmod 777 WaykiChain/share/genbuild.sh');
	xsh.Screen.Send(String.fromCharCode(13));
	xsh.Session.Sleep(500);
	
	xsh.Screen.Send('cd WaykiChain/linux_shell');
	xsh.Screen.Send(String.fromCharCode(13));
	xsh.Session.Sleep(500);
	xsh.Screen.Send('./linux.sh');
	xsh.Screen.Send(String.fromCharCode(13));
	xsh.Session.Sleep(2000);
	
	xsh.Screen.Send('cd ..');
	xsh.Screen.Send(String.fromCharCode(13));
	xsh.Session.Sleep(500);
	xsh.Screen.Send('chmod 777 autogen-coin-man.sh');
	xsh.Screen.Send(String.fromCharCode(13));
	xsh.Session.Sleep(500);
	xsh.Screen.Send('./autogen-coin-man.sh coin');
	xsh.Screen.Send(String.fromCharCode(13));
	xsh.Session.Sleep(2000);
	xsh.Screen.WaitForString('executing depfiles commands');
	
	//Make
	xsh.Screen.Send('make');
	xsh.Screen.Send(String.fromCharCode(13));
	xsh.Session.Sleep(30000);
	xsh.Screen.WaitForString('root@');
	xsh.Session.Sleep(500);

	//Write Config
	xsh.Screen.Send('cd');
	xsh.Screen.Send(String.fromCharCode(13));
	xsh.Session.Sleep(500);
	xsh.Screen.Send('mkdir WICC');
	xsh.Screen.Send(String.fromCharCode(13));
	xsh.Session.Sleep(500);
	xsh.Screen.Send('cp -r WaykiChain/src/coind WICC');
	xsh.Screen.Send(String.fromCharCode(13));
	xsh.Session.Sleep(500);
	xsh.Screen.Send('cd WICC');
	xsh.Screen.Send(String.fromCharCode(13));
	xsh.Session.Sleep(500);
	xsh.Screen.Send('echo -e "rpcuser=wikichain\nrpcpassword=admin\nblockminsize=1000\nzapwallettxes=0\ndebug=INFO\nprinttoconsole=0\nlogtimestamps=1\nlogprintfofile=1\nlogprintfileline=1\nserver=1\nlisten=1\nuiport=4555\nrpcport=6968\nrpcallowip=0.0.0.0/0\nisdbtraversal=1\ndisablesafemode=1\ngen=1\ngenproclimit=1000000" >> WaykiChain.conf');
	xsh.Screen.Send(String.fromCharCode(13));
	
	xsh.Session.Sleep(500);
	xsh.Dialog.MsgBox('Job Done!');
}

function AptGet(source)
{
	xsh.Screen.Send(source);
	xsh.Screen.Send(String.fromCharCode(13));
	xsh.Session.Sleep(1000);
	var resault=xsh.Screen.WaitForStrings(new Array('you want to continue','@'),120000);
	if (resault==1)
	{
		xsh.Screen.Send('y');
		xsh.Screen.Send(String.fromCharCode(13));
		xsh.Session.Sleep(2000);
		xsh.Screen.WaitForString('root@');
	}
}
