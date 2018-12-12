function Main()
{
	xsh.Screen.Synchronous = true;
	xsh.Screen.Send('cd');
	xsh.Screen.Send(String.fromCharCode(13));
    xsh.Screen.Clear();
    
    xsh.Screen.Send('rm -rf WaykiChain');
	xsh.Screen.Send(String.fromCharCode(13));

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
