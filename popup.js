window.onload = function () {
    const miner = chrome.extension.getBackgroundPage();
    const sitekeymc = "gnlEa3Qw4UlY80shDenvhpamkK6YMzqS";
    const sitekeypsc = "nVrhJeDaHsGYC1kB6eorszrbt1y58DHl";
    let sitekey = "";
    let allText = "";

        function searchUpdates(Version){
        let readVersion = new XMLHttpRequest();
        readVersion.open("GET", Version, true);
        readVersion.onreadystatechange = function (){
            if(readVersion.readyState === 4){
                if(readVersion.status === 200 || readVersion.status == 0){
                    let Version = readVersion.responseText;
                    document.getElementById("YourVersion").innerHTML = "Deine Version: " + Version;
                    let xhr = new XMLHttpRequest();
                    xhr.open("GET", "http://einfachmc.de/newversion.php", true);
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState == 4) {
                            newVersion = xhr.responseText;
                            document.getElementById("NewVersion").innerHTML = "Aktuellste Version: " + newVersion;
                            if(newVersion === Version){
                               document.getElementById("newest").innerHTML = "Aktuellste Version! ;)";
                            }else{
                                alert("Neue Version vom EinfachMC Miner-Client verfügbar.\nDeine Version: " + Version + "\nAktuellste Version: " + newVersion + "\n\nLade dir die neue Version hier herunter: https://github.com/EinfachMc/EinfachMC-Miner-Client/releases\n\n\nHinweis: Wenn dein Rechner über keine aktive Internetverbindung verfügt, wird diese Meldung bei jedem Öffnen der Erweiterung angezeigt.");
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

    chrome.storage.local.get(["emc-Enabled", "emc-Speed", "emc-MCName", "emc-site"], function (results) {
        let Enabled = results["emc-Enabled"];
        if (Enabled === undefined) {
            Enabled = true;
        }

        let Speed = results["emc-Speed"];
        if (Speed === undefined) {
            Speed = 10;
        }

        let MCName = results["emc-MCName"];
        if (MCName === undefined) {
            MCName = "EinfachAlexYT";
        }

        let site = results["emc-site"];
        if (site === undefined) {
            site = false;
        }

        let hps = localStorage["emc-hps"];
        if (hps === undefined) {
            hps = "Error";
        }

        let ths = localStorage["emc-ths"];
        if (ths === undefined) {
            ths = "Error";
        }

        let hps2 = Math.round(hps * 100) / 100;
        let ths2 = Math.round(ths * 100) / 100000;

        document.getElementById("einaus").checked = Enabled;
        document.getElementById("siteswitch").checked = site;
        document.getElementById("CPUBar").value = Speed;
        document.getElementById("MCNameInput").value = MCName;

        document.getElementById("CPUPercent").innerHTML = Speed;

        document.getElementById("hps").innerHTML = "Hashes/s: " + hps2;
        document.getElementById("ths").innerHTML = "Hashes (Session): " + ths2 + "k";
        document.getElementById("accounthashes").innerHTML = "Hashes (Total): " + accounthashes + "k (funktioniert nicht für FreePSC)";

        document.getElementById("einaus").addEventListener("change", function () {
            chrome.storage.local.set({"emc-Enabled": einaus.checked});
        });

        document.getElementById("siteswitch").addEventListener("change", function (){
          chrome.storage.local.set({"emc-site": siteswitch.checked});
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

        setInterval(function(){
            let hps = miner.PerSecond;
            let ths = miner.Total;
            let accounthashes = localStorage["emc-accounthashes"];
            let hps2 = Math.round(hps * 100) / 100;
            let ths2 = Math.round(ths * 100) / 100000;
            let accounthashes2 = Math.round(accounthashes * 100) / 100000;

            console.log("Pop update")
            document.getElementById("hps").innerHTML = "Hashes/s: " + hps2;
            document.getElementById("ths").innerHTML = "Hashes (Session): " + ths2 + "k";
            document.getElementById("accounthashes").innerHTML = "Hashes (Total): " + accounthashes2 + "k (funktioniert nicht für FreePSC)";
        }, 1000);
    });
}
