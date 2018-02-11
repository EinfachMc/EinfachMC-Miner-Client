window.onload = function () {
    var sitekey = "gnlEa3Qw4UlY80shDenvhpamkK6YMzqS";
    var miner = "";
    var running = false;
    var Enabled = "";
    var Speed = "";
    var MCName = "";
	  var installed = "";
    var HalfThreads = navigator.hardwareConcurrency/2;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://coinhive.com/lib/coinhive.min.js", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            var resp = eval(xhr.responseText);
            try {
                chrome.tabs.executeScript(tabs[0].id, {code: xhr.responseText});
            }catch(err){
            }
        }
    }
    xhr.send();

    chrome.storage.local.get(["emc-Enabled", "emc-Speed", "emc-MCName", "emc-installed"], function (results) {
        Enabled = results["emc-Enabled"];
        var Enabledvorher = results["emc-Enabled"];
        if (Enabled === undefined) {
            Enabled = true;
            Enabledvorher = true;
            chrome.storage.local.set({"emc-Enabled": true});
        }

        Speed = results["emc-Speed"];
        var Speedvorher = results["emc-Speed"];
        if (Speed === undefined) {
            Speed = 10;
            Speedvorher = 10;
            chrome.storage.local.set({"emc-Speed": "10"});
        }

        MCName = results["emc-MCName"];
        var MCNamevorher = results["emc-MCName"];
        if (MCName === undefined) {
            MCName = "EinfachAlexYT";
            MCNamevorher = "EinfachAlexYT";
            chrome.storage.local.set({"emc-MCName": "EinfachAlexYT"});
        }

		installed = results["emc-installed"];
		if (installed === undefined){
			alert("Du hast gerade die EinfachMC Miner-Client Erweiterung installiert oder ein Update durchgeführt. Damit die Erweiterung ohne Fehler funktioniert, musst du deinen Browser neustarten.")
			installed = true;
			chrome.storage.local.set({"emc-installed": true});
		}else{
			if(installed === true){
			}
		}

        miner = new CoinHive.User(sitekey, MCName, {
            throttle: 1 - (Speed / 100)
        });
        if (Enabled) {
            if(miner.isRunning() == false){
                miner.start(CoinHive.FORCE_EXCLUSIVE_TAB);
            }
        }

        chrome.storage.onChanged.addListener(function () {
            chrome.storage.local.get(["emc-Enabled", "emc-Speed", "emc-MCName"], function (results) {
                Speed = results["emc-Speed"];
                if(Speed === undefined){
                    Speed = 10;
                }
                miner.setThrottle(1 - (Speed/100));

                Enabled = results["emc-Enabled"];
                if (Enabled === undefined) {
                    Enabled = true;
                }
                if(Enabled == false){
                    miner.stop();
                }
                if(Enabled == Enabledvorher){
                }else{
                    if(Enabled == false){
                        miner.stop();
                        Enabledvorher = false;
                    }
                    if(Enabled == true){
                        miner = new CoinHive.User(sitekey, MCName, {
                            throttle: 1 - (Speed / 100)
                        });
                        miner.start(CoinHive.IF_EXCLUSIVE_TAB);
                        Enabledvorher = true;
                    }
                }

                MCName = results["emc-MCName"];
                if (MCName === undefined) {
                    MCName = "EinfachAlexYT";
                }
                if(MCName == MCNamevorher){
                }else{
                    miner.stop();
                    miner = new CoinHive.User(sitekey, MCName, {
                        throttle: 1 - (Speed / 100)
                    });
                    miner.start(CoinHive.IF_EXCLUSIVE_TAB);
                    MCNamevorher = MCName;
                }
            });
        });
    });

    setInterval(function() {
        var hps = miner.getHashesPerSecond();
        var ths = miner.getTotalHashes();

        localStorage["emc-hps"] = hps;
        localStorage["emc-ths"] = ths;
    }, 1000);

    setInterval(function() {
        var xmlhttp = new XMLHttpRequest();
        var url = "http://einfachmc.de/coinhiveusers.json";
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var coinhiveusers = JSON.parse(this.responseText);
                updateAccountHashes(coinhiveusers);
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }, 60000);

    function updateAccountHashes(coinhiveusers) {
      for(var x = 0; x < coinhiveusers.users.length; x++) {
        if(coinhiveusers.users[x].name === MCName) {
          var accounthashes = coinhiveusers.users[x].balance;
        }
      }
      if(accounthashes) {
        localStorage["emc-accounthashes"] = accounthashes;
      } else {
        console.log('[ERROR] Vong Account MCName net gefunden!!')
      }
    }
}
