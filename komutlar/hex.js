module.exports = class hex { // test adlı bir sınıf oluşturun ve onu module.exports ile diğer dosyaların kullanımına açın.
    constructor(){
            this.isim = 'hex', // Komutun ismini girin. (Komutun kullanımıdır)
            this.alternatif = [], // Komutu başka komut ismi kullanarak kullanmanıza sağlar. Eğer alternatif eklemek istemiyorsanız: this.alternatif = [],
            this.usage = '!hex' // Komutun kullanımını girin. (Sadece komutun kullanımını normal bir cümleymiş gibi tanımlar ve komutun kullanımını etkilemez. Genel olarak yardım komutu için kullanılır.)
    }
 
    async run(bot, message, args) {
        const Discord = require('discord.js');
        const FiveM = require("fivem") // Import the npm package.
        const srv = new FiveM.Server('185.254.29.188:30120') // Set the IP with port.
 
        srv.getCurrentPlayers().then((data) => {
            const playerList = new Discord.MessageEmbed()
            .setTitle('**Oyuncu Listesi**')
            .setDescription(data.map((function(elem){return '**ID:** ' + elem.id + ' **|** **HEX:** ' + elem.identifiers.find(ddd => ddd.startsWith("steam:")).slice(6)})));
            console.log(data)
            message.channel.send(playerList).then(function() {
                console.log("Playerlist kullanıldı!");
            })
        }).catch((error) => {
            if (error) throw error
        });
    }
}