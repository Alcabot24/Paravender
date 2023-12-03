const fs = require("fs")
const { smsg, getGroupAdmins, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, delay, format, logic, generateProfilePicture, parseMention, getRandom} = require('../libs/fuctions.js'); 
const path = require("path") 
const chalk = require("chalk");
const moment = require('moment-timezone') 
const gradient = require('gradient-string') 
const fetch = require('node-fetch') 
const axios = require('axios')
const cheerio = require('cheerio')
const Jimp = require('jimp')
const os = require('os')

const menu = (m, command, conn, prefix, pushname, sender, pickRandom, fkontak) => {
if (global.db.data.users[m.sender].registered < true) return m.reply(info.registra)
if (command == 'menu' || command == 'menucompleto') {
let user = global.db.data.users[m.sender]
let totalreg = Object.keys(global.db.data.users).length
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
const date = moment.tz('America/Bogota').format('DD/MM/YYYY')
const time = moment.tz('America/Argentina/Buenos_Aires').format('LT')
let wa = m.key.id.length > 21 ? 'Android' : m.key.id.substring(0, 2) == '3A' ? 'IOS' : 'whatsapp web'
m.react('🙌') 
let menu = 𝗔𝗟𝗖𝗔𝗕𝗢𝗧.𝗩𝟮

 ┏━━━━━━━━━━━━━━━━━━┓
┃ *𝗔𝗟𝗖𝗔𝗕𝗢𝗧.𝗩𝟮*
┃≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣⟣☯︎ *𝗢𝗪𝗡𝗘𝗥:* ALCAVENTAS
┣⟣☯︎ *𝗡𝗨𝗠𝗘𝗥𝗢:* +52 824 105 0228
┗━━━━━━━━━━━━━━━━━━┛

*┃𝗕 𝗢 𝗧 𝗠 𝗘 𝗡 𝗨 𝗔𝗗𝗠𝗜𝗡𝗜𝗦𝗧𝗥𝗔𝗗𝗢𝗥𝗘𝗦*┃
┏━━━━━━━━━━━━━━━━┓
*┃ ✨𝗔𝗖𝗧𝗜𝗩𝗔𝗥 𝗢 𝗗𝗘𝗦𝗔𝗖𝗧𝗜𝗩𝗔𝗥✨*
┃Enable(activar) Disable(desactivar)┃
┣⚙️ _.enable *welcome*_
┣⚙️ _.disable *welcome*_
┣⚙️ _.enable *antiviewonce*_
┣⚙️ _.disable *antiviewonce*_
┣⚙️ _.enable *modoadmin*_
┣⚙️ _.disable *modoadmin*_
┗━━━━━━━━━━━━━━━━┛
┏━━━━━━━━━━━━━━━━┓
*┃ ✨𝗔𝗝𝗨𝗦𝗧𝗘𝗦 𝗗𝗘 𝗚𝗥𝗨𝗣𝗢𝗦 ✨* 
┃≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡┃
┣⚙️ _.add *<numero>*_
┣⚙️ _.kick *<@tag>*_
┣⚙️ _.kick2 *<@tag>*_
┣⚙️ _.listanum *<texto>*_
┣⚙️ _.kicknum *<texto>*_
┣⚙️ _.grupo *<abrir / cerrar>*_
┣⚙️ _.grouptime *<opcion> <tiempo>*_
┣⚙️ _.promote *<@tag>*_
┣⚙️ _.demote *<@tag>*_
┣⚙️ _admins *<texto>*_ (𝑢𝑠𝑜 𝑠𝑖𝑛 𝑝𝑟𝑒𝑓𝑖𝑗𝑜)
┣⚙️ _.demote *<@tag>*_
┣⚙️ _.infogroup_
┣⚙️ _.resetlink_
┣⚙️ _.link_
┣⚙️ _.setname *<texto>*_
┣⚙️ _.setdesc *<texto>*_
┣⚙️ _.invocar *<texto>*_
┣⚙️ _.setwelcome *<texto>*_
┣⚙️ _.setbye *<texto>*_
┣⚙️ _.hidetag *<texto>*_
┣⚙️ _.hidetag *<audio>*_
┣⚙️ _.hidetag *<video>*_
┣⚙️ _.hidetag *<imagen>*_
┣⚙️ _.warn *<@tag>*_
┣⚙️ _.unwarn *<@tag>*_
┣⚙️ _.listwarn_
┣⚙️ _.fantasmas_
┣⚙️ _.destraba_
┣⚙️ _.setpp *<imagen>*_
┗━━━━━━━━━━━━━━━━┛
┏━━━━━━━━━━━━━━━━┓
*┃✨ 𝗕𝗨𝗦𝗖𝗔𝗥 ✨*
┃ 𝗔𝗟𝗖𝗔𝗕𝗢𝗧.𝗩𝟮 ≡┃
┣✨ _.githubsearch *<texto>*_
┣✨ _.pelisplus *<texto>*_
┣✨ _.modapk *<texto>*_
┣✨ _.stickersearch *<texto>*_
┣✨ _.stickersearch2 *<texto>*_
┣✨ _.animeinfo *<texto>*_
┣✨ _.google *<texto>*_
┗━━━━━━━━━━━━━━━━┛
┏━━━━━━━━━━━━━━━━┓
*┃✨ 𝗙𝗥𝗔𝗦𝗘𝗦 𝗢 𝗣𝗜𝗥𝗢𝗣𝗢𝗦✨*
┃≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡┃
┣⚫️ _.piropo_
┣⚫️ _.consejo_
┣⚫️ _.fraseromantica_
┣⚫️ _.historiaromantica_
┗━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━┓
*┃✨ 𝗛𝗘𝗥𝗥𝗔𝗠𝗜𝗘𝗡𝗧𝗔𝗦✨*
┃≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡┃
┣🟠 _.clima *<país> <ciudad>*_
┣🟠 _.encuesta *<texto1|texto2...>*_
┣🟠 _.ocr *<responde a imagen>*_
┣🟠 _.hd *<responde a imagen>*_
┣🟠 _.acortar *<enlace / link / url>*_
┣🟠 _.calc *<operacion math>*_
┣🟠 _.horario_
┗━━━━━━━━━━━━━━━━┛
┏━━━━━━━━━━━━━━━━┓
*┃ ✨𝗦𝗧𝗜𝗖𝗞𝗘𝗥𝗦✨*
┃≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡┃
┣🟣 _.sticker *<responder a imagen o video>*_
┣🟣 _.kiss *<@tag>*_
┣🟣 _.dado_
┗━━━━━━━━━━━━━━━━┛
┏━━━━━━━━━━━━━━━━┓
*┃ ✨ 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦 ✨*
┃≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡┃
┣🟣 _.play *<texto de la canción >*_
┗━━━━━━━━━━━━━━━━┛
𝘾𝙍𝙀𝘼𝘿𝙊𝙍 @𝘼𝙇𝘾𝘼𝙎𝙃𝙊𝙋 𝘾𝙐𝘼𝙇𝙌𝙐𝙄𝙀𝙍 𝘿𝙐𝘿𝘼 𝙈𝘼𝙉𝘿𝘼𝙍𝙈𝙀 𝙈𝙀𝙉𝙎𝘼𝙅𝙀 𝘼𝙇 𝙒𝙋𝙋 +5282410502208`.trim();
conn.sendMessage(m.chat, { text: menu,  
contextInfo:{  
forwardingScore: 9999999,  
isForwarded: true,   
mentionedJid:[sender, numBot],  
"externalAdReply": {  
"showAdAttribution": true,  
"renderLargerThumbnail": true,  
"title": wm,   
"containsAutoReply": true,  
"mediaType": 1,   
"thumbnail": imagen2, 
sourceUrl: `${pickRandom([nna, nn, md, yt])}`
}}}, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}) 
}

if (command == 'menu2' || command == 'audio') {

let menu2 = `*Palabras especificas para que el bot interactue con ustedes*

a
Feliz cumpleaños
Pasa pack
Uwu
Siuuu
Vete a la verga
Pasen porno
Hora del sexito
Pongan cuties
Fiesta del admin
Admin party
Viernes
GOOOOD
Alto temazo
Todo bien
Buenos dias
Bot gay
Gracias
Hola
Fua
Corte
Gaspi buenos dias 
Gaspi me saludas
Gaspi y las minitas
Gaspi todo bien
Me quiero suicidar
Gaspi ya no aguanto
Contate algo bot
Sexo
Momento epico
El bot del orto no funciona
Epicardo
Insta de la minita
Una mierda de bot
Ultimo momento
Nefasto
Paraguayo
Bot de mierda
Venezolano
Gaspi corte
Ya me voy a dormir
Calefon
Apurate bot
Un chino
No funciona
Boliviano
Enano
Quien es tu sempai botsito
Me gimes 7u7
Te amo botsito uwu
Onichan
La toca 7w7
autodestruction

_*ᴼʲᶦᵗᵒ ᵉˢᶜʳᶦᵇᵉ ᵗᵃˡ ʸ ᶜᵒᵐᵒ ᵉˢᵗᵃ ᵉⁿ ᵉˡ ᵐᵉⁿˢᵃʲᵉ*_
*ᵠᵘᶦᵉʳᵉ ᵃᵍʳᵉᵍᵃ ᵃˡᵍᵘⁿ ᵃᵘᵈᶦᵒ ⁿᵘᵉᵛᵒ ᵉˢᶜʳᶦᵇᶦʳˡᵉ ᵃ ᵐᶦ ᶜʳᵉᵃᵈᵒʳ ᵘʷᵘ*`
conn.sendMessage(m.chat, { text: menu2}, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})}

if (command == 'nuevo' || command == 'extreno') {
conn.sendMessage(m.chat, { text: `🤔 *Que hay de nuevo?* 🤗

*🌐 Nueva Version:* [ ${vs} ] 

*Nuevo comando:*

🟢 Mejorar la imagen a HD. 
• ${prefix}hd

🚀 Descarga archivo de gdrive
• ${prefix}gdrive (links) 

🚀 Descarga imagenes del tiktok
• ${prefix}tiktokimg
• ${prefix}ttimg

🌐 (Crea imagenes con la (IA) 
• ${prefix}dall-e
• ${prefix}ia2

👾 Mas juegos para divertir tu grupo 

• ${prefix}formartrio
• ${prefix}formapareja5
• ${prefix}ship

🥵 Mas contenido +18 para vos pajin jj

• ${prefix}tetas
• ${prefix}pechos
• ${prefix}pack2
• ${prefix}videoxxx
• ${prefix}pornolesbianavid

ᴹᵃˢ ᶜᵒᵐᵃⁿᵈᵒ ᵉˡ ᶠᵘᵗᵘʳᵃ ᵛᵉʳˢᶦᵒⁿᵉˢ ᵠᵘᶦᵉʳᵉ ᵠᵘᵉ ᵃᵍʳᵉᵍᵘᵉ ᵃˡᵍᵘⁿ ᶜᵒᵐᵃⁿᵈᵒ ᵉˡ ᵉˢᵖᵉᶜᶦᵃˡ ᵉˢᶜʳᶦᵇᶦʳˡᵉ ᵃ ᵐᶦ ᶜʳᵉᵃᵈᵒʳ`, contextInfo:{mentions: [sender], forwardingScore: 9999999, isForwarded: true, "externalAdReply": {"showAdAttribution": true, "containsAutoReply": true, "title": ` ${wm}`, "body": ` ${vs}`, "previewType": "PHOTO", thumbnail: imagen1, sourceUrl: `${pickRandom([nna, nn, md, yt])}`}}}, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})}

if (command == 'reglas') {
conn.sendMessage(m.chat, { text: `*🌐 REGLAS DEL BOT 🌐*

*• No hacer spam de comandos*

Usar los comando cada 5 segundos, de lo contrario el bot se puede satura, o numero del bot puede irse a support por spam.

*• No estar enviando link del grupos al bot para que se una*

Hablar con mi creador y el lo une a tu grupo

*• No llamar al bot, ni al creador*

Si lo haces, seras baneado del bot y bloqueado`, contextInfo:{mentions: [sender], forwardingScore: 9999999, isForwarded: true, "externalAdReply": {"showAdAttribution": true, "containsAutoReply": true, "title": ` ${wm}`, "body": ` ${vs}`, "previewType": "PHOTO", thumbnail: imagen1, sourceUrl: `${pickRandom([nna, nn, md, yt])}`}}}, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})}}

module.exports = { menu }

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})
