const Discord = require('discord.js');

require('dotenv').config();

const client = new Discord.Client();

const valorJS = require('valor.js'); // Valor.JS'yi 'valorJS' olarak tanımlar.
 
const komutYukleyici = new valorJS.KomutYukleyici({ // Yeni bir 'KomutYukleyici' oluşturur.
    klasor: __dirname + '/komutlar/', // Komutların bulunduğu klasörü ayarlar.
    prefix: ['t!'] // Komutların prefix(ler)'ini ayarlar.
});

/////// CLIENT READY

client.on('ready', () => {
    console.log(`Bot, ${client.user.tag} ismiyle giriş yaptı!`);
    client.user.setPresence({ activity: { name: '🔥 discord.gg/alsancakrp 🔥 TATAROĞULLARI AİLESİ 🔥 Alsancak RolePlay V2' }, status: 'online' });
});


////// CLIENT READY </>

////// VALOR.JS COMMAND HANDLER

client.on("message", (mesaj) => {
 
    if (mesaj.channel.type === 'dm') return; // Bu komutların DM'den kullanılmasını engeller. Böyle olmasını istemiyorsanız bu satırı silebilirsiniz.
    if (mesaj.channel.type === 'bot') return; // Bu komutların botlar tarafından kullanılmasını engeller. Bu kod botun güvenliği ve düzeni için çok önemlidir! 
    let args = mesaj.content.split(" "); // Bu argümanları tanımlar. Örnek: !yazdır <1. argüman>
    let komut = args[0]; // Komutun ilk argüman olduğunu tanımlar. Örnek: !yazdır <yazdırılacak-şey> - !yazdır komutu 0. argümandır, <yazdırılacak-şey> ise 1. argümandır.
    let cmd = komutYukleyici.getCommand(komut); // komut değişkenini komut yükleyiciye bir komut olarak tanımlar.
    if (!cmd) return; // Eğer mesaj bir komut değilse botun hiçbir şey yapmamasını sağlar. Fakat sizin ayarladığınız oto mesajlar vb. çalışacaktır.
 
    try {
        cmd.run(client, mesaj, args)
    } catch(hata) {
        console.log(hata) // Eğer komut yükleyicide bir hata var ise konsole log olarak yazdırır.
    }
});

/////// VALOR.JS COMMAND HANDLER </>

////// CLIENT LOGIN

client.login(process.env.botToken);

///// CLIENT LOGIN </>

const bodyParser = require("body-parser");
const express = require("express");
const session  = require('express-session');
const path = require('path');

const db = require('quick.db');

const ejs = require('ejs');

const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("views", path.join(__dirname, "web"));
app.set("view engine", "ejs");
app.use(express.static('web'));

app.get('/', (req, res) => {
    res.render('index', {
        req: req
    });
});

app.get('/iletisim', (req, res) => {
    res.render('contact', {
        req: req
    });
});

app.post('/basvuruyuGonder', function (req, res) {
    res.send('<p>Başvurun gönderildi! <a href="/">Ana Sayfaya Dön</a></p>');
    let myCH = client.channels.cache.get('766621706546577418');
    const mmEmbed = new Discord.MessageEmbed()
    .setColor('#e74c3c')
    .setDescription(`Discord Adı: ${req.body.discordname}\n\nFiveM Saati: ${req.body.fivemhours}\n\nIC Adı: ${req.body.icname}\n\nIC Soyadı: ${req.body.icsurname}\n\nIC Yaşı: ${req.body.icage}\n\nIC Karakter Hikayesi: ${req.body.icstory}\n\nOOC Adı: ${req.body.oocname}\n\nOOC Soyadı: ${req.body.oocsurname}\n\nOOC Yaşı: ${req.body.oocage}\n\nOyunda Günlük Aktiflik Süresi (Ortalama): ${req.body.averageplaytime}\n\nNeden TATAROĞULLARI?: ${req.body.whyus}\n\nBizden ayrılırsan CK yemeyi kabul ediyor musun?: ${req.body.acceptingck}\n\n`);
    myCH.send(mmEmbed);
});

app.use(function (req, res){
    res.status(404).render("404");
});

app.use(function (err, req, res){
    console.log(err)
    res.status(500).render("somethingbroke");
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log('Uygulama, şu portta dinleniyor: ' + port)
});