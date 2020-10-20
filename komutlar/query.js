const { DiscordAPIError } = require("discord.js");

module.exports = class ip { // test adlı bir sınıf oluşturun ve onu module.exports ile diğer dosyaların kullanımına açın.
    constructor(){
            this.isim = 'ip', // Komutun ismini girin. (Komutun kullanımıdır)
            this.alternatif = ['server'], // Komutu başka komut ismi kullanarak kullanmanıza sağlar. Eğer alternatif eklemek istemiyorsanız: this.alternatif = [],
            this.usage = '!ip' // Komutun kullanımını girin. (Sadece komutun kullanımını normal bir cümleymiş gibi tanımlar ve komutun kullanımını etkilemez. Genel olarak yardım komutu için kullanılır.)
    }
 
    async run(bot, message, args) {
        const Discord = require('discord.js');
        const FiveM = require("fivem") // Import the npm package.
        const srv = new FiveM.Server('185.254.29.188:30120') // Set the IP with port.
 
        srv.getServer().then((data) => {
            const mmm = new Discord.MessageEmbed()
            .setTitle('');
            console.log(data)
        }).catch((error) => {
            if (error) throw error
        });
    }
}