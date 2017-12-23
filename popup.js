window.onload = function () {
    var sitekey = "gnlEa3Qw4UlY80shDenvhpamkK6YMzqS";
    var allText = "";
    
        function searchUpdates(Version){
        var readVersion = new XMLHttpRequest();
        readVersion.open("GET", Version, true);
        readVersion.onreadystatechange = function (){
            if(readVersion.readyState === 4){
                if(readVersion.status === 200 || readVersion.status == 0){
                    var Version = readVersion.responseText;
                    document.getElementById("YourVersion").innerHTML = "Deine Version: " + Version;
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", "http://einfachmc.de/newversion.php", true);
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState == 4) {
                            newVersion = xhr.responseText;
                            document.getElementById("NewVersion").innerHTML = "Aktuellste Version: " + newVersion;
                            if(newVersion === Version){
                               document.getElementById("newest").innerHTML = "Aktuellste Version! ;)";
                            }else{
                                alert("Neue Version vom EinfachMC Miner-Client verfügbar.\nDeine Version: " + Version + "\nAktuellste Version: " + newVersion);
                            }
                        }
                    }
                    xhr.send(null);
                }
            }
        }
        readVersion.send(null);
    }
    searchUpdates("version.txt");
    

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
        
        var hps = localStorage["emc-hps"];
        if (hps === undefined) {
            hps = "Error";
        }
        
        var ths = localStorage["emc-ths"];
        if (ths === undefined) {
            ths = "Error";
        }
        
        var hps2 = Math.round(hps * 100) / 100;
        var ths2 = Math.round(ths * 100) / 100000;
        var onem = false;
        
        
        document.getElementById("einaus").checked = Enabled;
        document.getElementById("CPUBar").value = Speed;
        document.getElementById("MCNameInput").value = MCName;
        
        document.getElementById("CPUPercent").innerHTML = Speed;
        
        document.getElementById("hps").innerHTML = "Hashes/s: " + hps2;
        document.getElementById("ths").innerHTML = "Total Hashes: " + ths2 + "k";

        setInterval(function(){
            var hps = localStorage["emc-hps"];
                var ths = localStorage["emc-ths"];
                var hps2 = Math.round(hps * 100) / 100;
                var ths2 = Math.round(ths * 100) / 100000;
                document.getElementById("hps").innerHTML = "Hashes/s: " + hps2;
                document.getElementById("ths").innerHTML = "Total Hashes: " + ths2 + "k";
        }, 1000);

        
        document.getElementById("einaus").addEventListener("change", function () {
            chrome.storage.local.set({"emc-Enabled": einaus.checked});
        });
        document.getElementById("CPUBar").addEventListener("input", function () {
            CPUBar.innerHTML = CPUBar.value;
        });
        document.getElementById("CPUBar").addEventListener("change", function () {
            chrome.storage.local.set({'emc-Speed': CPUBar.value});
            CPUPercent.innerHTML = CPUBar.value;
        });
        document.getElementById("MCNameInput").addEventListener("change", function () {
            chrome.storage.local.set({"emc-MCName": MCNameInput.value});
        });        
    });
}
