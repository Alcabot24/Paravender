// Código desde cero y comentarios hecho por: 
// @gata_dios
// @Skidy89
// @elrebelde21 

// Importaciones 
const baileys = require('@whiskeysockets/baileys'); // trabajar a través de descargas por Whatsapp 
const moment = require('moment-timezone') // Trabajar con fechas y horas en diferentes zonas horarias
const gradient = require('gradient-string') // Aplicar gradientes de color al texto
const { execSync } = require('child_process') // Función 'execSync' del módulo 'child_process' para ejecutar comandos en el sistema operativo
const chalk = require('chalk') // Estilizar el texto en la consola
const os = require('os') // Proporciona información del sistema operativo
const fs = require('fs') // Trabajar con el sistema de archivos
const fetch = require('node-fetch')
const axios = require('axios')
const cheerio = require('cheerio')
const gpt = require('api-dylux')
const mimetype = require("mime-types")
const webp = require("node-webpmux")
const Jimp = require('jimp')
const {jadibot, listJadibot } = require('./serbot.js')  
const speed = require("performance-now")
const ffmpeg = require("fluent-ffmpeg")

const color = (text, color) => { // Función 'color' que toma un texto y un color como parámetros
return !color ? chalk.cyanBright(text) : color.startsWith('#') ? chalk.hex(color)(text) : chalk.keyword(color)(text)} // Si no hay color, utilizar el color celeste brillante (por defecto)

// Importa varias funciones y objetos
const { smsg, getGroupAdmins, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, delay, format, logic, generateProfilePicture, parseMention, getRandom } = require('./libs/fuctions')
const { default: makeWASocket, proto } = require("@whiskeysockets/baileys") // Importa los objetos 'makeWASocket' y 'proto' desde el módulo '@whiskeysockets/baileys'
const { ytmp4, ytmp3, ytplay, ytplayvid } = require('./libs/youtube')
const { menu } = require('./plugins/menu.js')
const { state } = require('./plugins/info.js')

const msgs = (message) => { // Función 'msgs' que toma un parámetro 'message'
if (message.length >= 10) { // Longitud de 'message' es mayor o igual a 10 caracteres
return `${message.substr(0, 500)}` // Devuelve los primeros 500 caracteres de 'message'
} else { // Caso contrario
return `${message}`}} // Devuelve 'message' completo

const getCmd = (id) => { //Función llamada 'getCmd' que toma un parámetro 'id'
const stickerdb = JSON.parse(fs.readFileSync('./libs/database/stickerdb.json'))
let anu = null;
Object.keys(stickerdb).forEach(nganu => { // Itera sobre las claves del objeto 'stickerdb' utilizando 'forEach'
if (stickerdb[nganu].id === id) { // Si el valor de la propiedad 'id' en el objeto 'stickerdb[nganu]' es igual a 'id'
anu = nganu
}})
if (anu !== null) { // De lo contrario
return stickerdb[anu].cmd // Devolver el valor de la propiedad 'cmd' en el objeto 'stickerdb[anu]'
}}
const getFileBuffer = async (mediakey, MediaType) => {
const stream = await downloadContentFromMessage(mediakey, MediaType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk]) }
return buffer}

let blockList = []
/**
* @param {proto.IWebMessageInfo.message} mek
* @param {proto.IWebMessageInfo} chatUpdate
* @param {import("@whiskeysockets/baileys").WASocket} 
*/
module.exports = conn = async (conn, m, chatUpdate, mek) => { // Raíz "conn" para mensajes y argumentos
var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage' && m.message.imageMessage.caption) ? m.message.imageMessage.caption : (m.mtype == 'videoMessage' && m.message.videoMessage.caption ) ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? m.message.listResponseMessage.singleSelectReply.selectedRowId :  (m.mtype == 'stickerMessage') && (getCmd(m.message.stickerMessage.fileSha256.toString()) !== null && getCmd(m.message.stickerMessage.fileSha256.toString()) !== undefined) ? getCmd(m.message.stickerMessage.fileSha256.toString()) : ''
	
// ‿︵‿︵ʚɞ『 ATRIBUTOS 』ʚɞ‿︵‿︵
if (m.key.id.startsWith("BAE5")) return
var budy = (typeof m.text == 'string' ? m.text : '') // Asignar a la variable budy el valor m.text si es cadena	
//var prefix = prefa ? /^[°•π÷×¶∆£¢€¥®™+✓_=/|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=/|~!?@#$%^&.©^]/gi)[0] : "" : prefa ?? global.prefix
global.prefix = new RegExp('^[°•π÷×¶∆£¢€¥®™+✓_=/|~!?@#$%^&.©^' + '*/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-.@'.replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']', 'i')
var prefix = global.prefix.test(body) ? body.match(global.prefix)[0] : '' // Almacenar el prefijo predeterminado
const isCmd = body.startsWith(prefix) // Verificar si el contenido de body comienza con el valor almacenado en prefix.
const from = m.chat // Remitente del mensaje
const msg = JSON.parse(JSON.stringify(mek, undefined, 2)) // Mensaje convertido a formato JSON
const content = JSON.stringify(m.message) // Contenido del mensaje convertido a formato JSON
const type = m.mtype // Tipo de mensaje
const arg = body.substring(body.indexOf(' ') + 1) // Argumento extraído del cuerpo del mensaje
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() // Comando extraído del cuerpo del mensaje
const args = body.trim().split(/ +/).slice(1) // Obtiene los argumentos del comando
const q = args.join(" ") // Une los argumentos en una sola cadena separada por espacios
let t = m.messageTimestamp // Marca de tiempo de mensaje
const pushname = m.pushName || "Sin nombre" // Obtiene el nombre de visualización del usuario de lo contrario será "Sin nombre"
const botnm = conn.user.id.split(":")[0] + "@s.whatsapp.net"
const userSender = m.key.fromMe ? botnm : m.isGroup && m.key.participant.includes(":") ? m.key.participant.split(":")[0] + "@s.whatsapp.net" : m.key.remoteJid.includes(":") ? m.key.remoteJid.split(":")[0] + "@s.whatsapp.net" : m.key.fromMe ? botnm : m.isGroup ? m.key.participant : m.key.remoteJid
const isCreator = global.owner.map(([numero]) => numero.replace(/[^\d\s().+:]/g, '').replace(/\s/g, '') + '@s.whatsapp.net').includes(userSender) // Eliminar todo a excepción de números 
const itsMe = m.sender == conn.user.id ? true : false // Verifica si el remitente del mensaje es el propio bot
const text = args.join(" ") // Unir rgumentos en una sola cadena separada por espacios
const quoted = m.quoted ? m.quoted : m // Obtiene el mensaje citado si existe, de lo contrario, se establece como el propio mensaje
const sender = m.key.fromMe ? botnm : m.isGroup ? m.key.participant : m.key.remoteJid // Obtiene el remitente del mensaje según el tipo de chat (individual o grupo)
const mime = (quoted.msg || quoted).mimetype || '' // Tipo de archivo adjunto del mensaje citado o del propio mensaje
const isMedia = /image|video|sticker|audio/.test(mime) // Verifica si el mensaje contiene un archivo multimedia (imagen, video, sticker o audio)
const numBot = conn.user.id.split(":")[0] + "@s.whatsapp.net" // JID del Bot
const numBot2 = conn.user.id // Número de teléfono del bot
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const mentions = []
if (m.message[type].contextInfo) { 
if (m.message[type].contextInfo.mentionedJid) {
const msd = m.message[type].contextInfo.mentionedJid
for (let i = 0; i < msd.length; i++) {
mentions.push(msd[i])}}}
	
// ‿︵‿︵ʚɞ『 GRUPO 』ʚɞ‿︵‿︵
const groupMetadata = m.isGroup ? await conn.groupMetadata(from) : '' // Obtiene información del grupo
const groupName = m.isGroup ? groupMetadata.subject : '' // Nombre del grupo
const participants = m.isGroup ? await groupMetadata.participants : '' // Lista de participantes del grupo
const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : '' // // Lista de administradores del grupo

const isBotAdmins = m.isGroup ? groupAdmins.includes(numBot) : false // Verifica si el bot es un administrador del grupo
const isGroupAdmins = m.isGroup ? groupAdmins.includes(userSender) : false // Verifica si el remitente del mensaje es un administrador del grupo
const isBaneed = m.isGroup ? blockList.includes(userSender) : false // Verifica si el remitente del mensaje está en la lista de bloqueados

// ‿︵‿︵ʚɞ『 TIPOS DE MENSAJES Y CITADOS 』ʚɞ‿︵‿︵
const reply = (text) => {
 m.reply(text)} // Enviar una respuesta 
 const sendAdMessage = (text, edit, title, body, image, url) => { conn.sendMessage(from, {text: text, edit: key, contextInfo: { externalAdReply: { title: title, body: body, mediaUrl: url, sourceUrl: url, previewType: 'PHOTO', showAdAttribution: true, thumbnail: image, sourceUrl: url }}}, {})} 
 const sendImage = ( image, caption ) => { conn.sendMessage(from, { image: image, caption: caption }, { quoted: m })} 
 const sendImageAsUrl = ( url, caption ) => { conn.sendMessage(from, { image:  {url: url }, caption: caption }, { quoted: m })}
const sendSticker = ( image, fkontak) => { conn.sendMessage(m.chat, { sticker: image }, { quoted: fkontak})}

const isAudio = type == 'audioMessage' // Mensaje de Audio
const isSticker = type == 'stickerMessage' // Mensaje de Sticker
const isContact = type == 'contactMessage' // Mensaje de Contacto
const isLocation = type == 'locationMessage' // Mensaje de Localización 
const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')
const isQuotedMsg = type === 'extendedTextMessage' && content.includes('Message') // Mensaje citado de cualquier tipo
const isViewOnce = (type === 'viewOnceMessage') // Verifica si el tipo de mensaje es (mensaje de vista única)

//base de datos 
let isNumber = x => typeof x === 'number' && !isNaN(x)
let user = global.db.data.users[m.sender]
if (typeof user !== 'object') global.db.data.users[m.sender] = {}
if (user) {
if (!isNumber(user.afkTime)) user.afkTime = -1
if (!('afkReason' in user)) user.afkReason = ''
if (!isNumber(user.limit)) user.limit = 20
if(!isNumber(user.money)) user.money = 100
if(!isNumber(user.exp)) user.exp = 0
if(!isNumber(user.health)) user.health = 100
if (!isNumber(user.level)) user.level = 0
if(!isNumber(user.premium)) user.premium = false
 } else global.db.data.users[m.sender] = {
afkTime: -1,
afkReason: '',
limit: 20,
money: 100,
exp: 0,
level: 0,
health: 100
}
    
let chats = global.db.data.chats[m.chat]
if (typeof chats !== 'object') global.db.data.chats[m.chat] = {}
if (chats) {
if (!('antilink' in chats)) chats.antilink = false
if (!('antiarabe' in chats)) chats.antiarabe = false
if (!('antifake' in chats)) chats.antifake = false
if (!('welcome' in chats)) chats.welcome = true
if (!('modeadmin' in chats)) chats.modeadmin = false
if (!('modojadibot' in chats)) chats.modojadibot = true
if (!('ban' in chats)) chats.ban = false
} else global.db.data.chats[m.chat] = {
antilink: false,
antiarabe: false, 
antifake: false, 
welcome: true,  
modeadmin: false, 
modojadibot: true, 
ban: false, 
}
let setting = global.db.data.settings[numBot]
if (typeof setting !== 'object') global.db.data.settings[numBot] = {}
if (setting) {
if (!isNumber(setting.status)) setting.status = 0
if (!('autobio' in setting)) setting.autobio = true
} else global.db.data.settings[numBot] = {
status: 0,
autobio: true, 
}
//

//autobio
if (db.data.settings[numBot].autobio) {
let setting = global.db.data.settings[numBot]
if (new Date() * 1 - setting.status > 1000) {
//let uptime = await runtime(process.uptime())
const bio = `ɴᴏᴠᴀʙᴏᴛ-ᴍᴅ | ᴀᴄᴛɪᴠᴏ ✅️: ${runtime(process.uptime())}\n\nᴘᴀʀᴀ ᴠᴇᴢ ᴍɪ ʟɪsᴛᴀ ᴅᴇ ᴄᴏᴍᴀɴᴅᴏ ᴜsᴀʀ #menu`
await conn.updateProfileStatus(bio)
setting.status = new Date() * 1
}} 
	
if (db.data.chats[m.chat].antifake && !isGroupAdmins) {	
if (m.chat && m.sender.startsWith('1')) return conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}
if (db.data.chats[m.chat].antiarabe && !isGroupAdmins) {
reply(`Este numero`)
if (m.chat && m.sender.startsWith('212')) return conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}
	
//antilink
if (db.data.chats[m.chat].antilink) {
if (budy.match(`chat.whatsapp.com`)) {
let delet = m.key.participant
let bang = m.key.id
reply(`*「 ANTI LINK 」*\n\n*Detectado sera expulsado del grupo sucia rata 🙄*`)
if (!isBotAdmins) return reply(`El bot necesita admin para eliminar al incluso 🙄`)
let gclink = (`https://chat.whatsapp.com/`+await conn.groupInviteCode(m.chat))
let isLinkThisGc = new RegExp(gclink, 'i')
let isgclink = isLinkThisGc.test(m.text)
if (isgclink) return reply(`Te salvarte el link enviado es de este grupo`)
if (isGroupAdmins) return reply(`Te salvarte perra eres admin jjj`)
conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')}}

//modo public & privado
if (!conn.public && !isCreator) {
if (!m.key.fromMe) return
}        	
//Banea chat
if (db.data.chats[m.chat].ban && !isCreator) {
return
}
if (db.data.chats[m.chat].modeadmin && !isGroupAdmins) {
return
}
      
// Tiempo de Actividad del bot
const used = process.memoryUsage()
const cpus = os.cpus().map(cpu => {
cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
return cpu
})
//conn.sendReadReceipt(from,sender,[m.key.id])
        
const cpu = cpus.reduce((last, cpu, _, { length }) => {
last.total += cpu.total
last.speed += cpu.speed / length
last.times.user += cpu.times.user
last.times.nice += cpu.times.nice
last.times.sys += cpu.times.sys
last.times.idle += cpu.times.idle
last.times.irq += cpu.times.irq
return last
}, {
speed: 0,
total: 0,
times: {
user: 0,
nice: 0,
sys: 0,
idle: 0,
irq: 0
}})

const thumb = fs.readFileSync("./media/test.jpg")
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${userSender.split('@')[0]}:${userSender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
const ftroli ={key: {fromMe: false,"participant":"0@s.whatsapp.net", "remoteJid": "status@broadcast"}, "message": {orderMessage: {itemCount: 2022,status: 200, thumbnail: thumb, surface: 200, message: "ɴᴏᴠᴀʙᴏᴛ-ᴍᴅ", orderTitle: "sᴜᴘᴇʀ ʙᴏᴛ ᴅᴇ ᴡʜᴀᴛsᴀᴘᴘ", sellerJid: '0@s.whatsapp.net'}}, contextInfo: {"forwardingScore":999,"isForwarded":true},sendEphemeral: true}
const fdoc = {key : {participant : '0@s.whatsapp.net', ...(from ? { remoteJid: `status@broadcast` } : {}) },message: {documentMessage: {title: "A", jpegThumbnail: null}}}//const fgif = {key: {participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "status@broadcast" } : {})},message: {"videoMessage": { "title":botname, "h": wm,'seconds': '359996400', 'gifPlayback': 'true', 'caption': ownername, 'jpegThumbnail': thumb}}}
//const fgclink = {key: {participant: "0@s.whatsapp.net","remoteJid": "0@s.whatsapp.net"},"message": {"groupInviteMessage": {"groupJid": "6288213840883-1616169743@g.us","inviteCode": "m","groupName": wm, "caption": `${pushname}`, 'jpegThumbnail': thumb}}}
//const fvideo = {key: { fromMe: false,participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "status@broadcast" } : {}) },message: { "videoMessage": { "title":botname, "h": wm,'seconds': '359996400', 'caption': `${pushname}`, 'jpegThumbnail': thumb}}}
//const fakeimg = { key: {participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "6289643739077-1613049930@g.us" } : {})},message: {"imageMessage": { "title":`*yo soy aiden*`, "h": `Hmm`,'seconds': '99999', 'imagePlayback': 'true', 'caption': `texto`, 'jpegThumbnail': thumb }}}
//const floc = {key : {participant : '0@s.whatsapp.net', ...(m.chat ? { remoteJid: `status@broadcast` } : {}) },message: {locationMessage: {name: wm,jpegThumbnail: thumb}}}
//const fakestatus = {key: {fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})},message: { "imageMessage": {"url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc","mimetype": "image/jpeg","caption": 'aiden pendejo',"fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=","fileLength": "28777","height": 1080,"width": 1079,"mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=","fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=","directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69","mediaKeyTimestamp": "1610993486","jpegThumbnail": fs.readFileSync('./media/cheemspic.jpg'),"scansSidecar": "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw=="}}}
const kick = function (from, orangnya) {
for (let i of orangnya) {
conn.groupParticipantsUpdate(from, [i], "remove");
}}
const time = moment(Number(msg.messageTimestamp + "000")).locale("es-mx").tz("America/Asuncion").format('MMMM Do YYYY, h:mm:ss a')

// ‿︵‿︵ʚɞ『 INFO CONSOLE 』ʚɞ‿︵‿︵	
if (m.message) {
console.log(chalk.bold.cyanBright(`▣────────────···\n│${botname}`), 
chalk.bold.magenta('\n│⏰HORARIO: ') + chalk.magentaBright(moment(t * 1000).tz(place).format('DD/MM/YY HH:mm:ss'),
chalk.bold.yellow('\n│📑TIPO (SMS): ') + chalk.yellowBright(`${type}`), 
chalk.bold.cyan('\n│📊USUARIO: ') + chalk.cyanBright(pushname) + ' ➜', gradient.rainbow(userSender), 
m.isGroup ? chalk.bold.greenBright('\n│📤GRUPO: ') + chalk.greenBright(groupName) + ' ➜ ' + gradient.rainbow(from) : chalk.bold.greenBright('\n│📥PRIVADO'), 
//chalk.bold.red('\nETIQUETA: ') + chalk.redBright(`[${isBaneed ? 'Banned' : ''}]`),
chalk.bold.white('\n│💬MENSAJE: ') + chalk.whiteBright(`\n▣────────────···\n${msgs(m.text)}\n`))
)}

//ARRANCA LA DIVERSIÓN
switch (command) {
case 'imagen': //envia una imagen
imagen = fs.readFileSync('./media/menu2.jpg') // puede ser cualquier imagen como en plugins
conn.sendMessage(m.chat, {image: imagen, caption: '*ejemplo*' }, { quoted: m }) 
break

case 'yts':
if (!text) return reply(`*Ejemplo:*\n${prefix + command} historia wa anime`)
const yts = require("youtube-yts");
const search = await yts(text);
//reply(info.wait) 
const {key} = await conn.sendMessage(from, {text: info.wait}, { quoted: fkontak })
await conn.sendMessage(from, {text: info.waitt, edit: key}, { quoted: fkontak })
await conn.sendMessage(from, {text: info.waittt, edit: key}, { quoted: fkontak })
await conn.sendMessage(from, {text: info.waitttt, edit: key}, { quoted: fkontak })	
let teks = '💫 Resultados de ' + text + '\n\n';
let no = 1;
let themeemoji = "🔶"
for (let i of search.all) {
  teks += `${themeemoji} OPCIÓN : ${no++}\n${themeemoji} TIPO: ${i.type}\n${themeemoji} ID DEL VIDEO : ${i.videoId}\n${themeemoji} TITULO: ${i.title}\n${themeemoji} VISTAS : ${i.views}\n${themeemoji} DURACIÓN : ${i.timestamp}\n${themeemoji} SUBIDOS: ${i.ago}\n${themeemoji} URL: ${i.url}\n\n━━━━━━━━━━━━\n\n`;
}
await conn.sendMessage(from, { image: { url: search.all[0].thumbnail }, caption: teks }, { quoted: fkontak });
await conn.sendMessage(from, {text: info.result, edit: key}, { quoted: fkontak })
break
case 'query': // envia un mensaje en forma de ad
conn.sendMessage(from, {text: global.wm, contextInfo: {
externalAdReply: {
title: global.wm, 
body: "sᴜᴘᴇʀ ʙᴏᴛ ᴅᴇ ᴡʜᴀᴛsᴀᴘᴘ",
mediaUrl: null, 
sourceUrl: null, 
previewType: 'PHOTO',
showAdAttribution: true, //puedes cambiarlo a false si gustas
thumbnail: null, // imagen puedes hacer a traves de fs o dejarlo null
sourceUrl: md //'link'
    }
  }}, {});
break

case 'serbot': case 'jadibot':
if (m.isGroup) return m.reply(info.private) 
await jadibot(conn, m, from, command, prefix)  
break  
  
case 'bots': case 'listbots':
try { 
let user = [... new Set([...global.listJadibot.filter(conn => conn.user).map(conn => conn.user)])] 
te = "*Lista de subbots*\n\n" 
for (let i of user){ 
y = await conn.decodeJid(i.id) 
te += " ❑ Usuario : @" + y.split("@")[0] + "\n" 
te += " ❑ Nombre : " + i.name + "\n\n" 
} 
conn.sendMessage(from ,{text: te, mentions: [y], },{quoted: m}) 
} catch (err) { 
reply(`*No hay subbots activo el este momento intente mas tardes*`) 
} 
break 
 
case 'getcase': 
if (!isCreator) return conn.sendMessage(from, { text: `*ESTE COMANDO ES PARA MI JEFE*` }, { quoted: msg }); 
if (!text) return m.reply(`Que comando a buscar o que?`) 
try { 
bbreak = 'break' 
reply('case ' + `'${args[0]}'` + fs.readFileSync('./main.js').toString().split(`case '${args[0]}'`)[1].split(bbreak)[0] + bbreak) 
} catch (err) { 
console.error(err) 
reply(" Error, tal vez no existe el comando") 
} 
break

case 'google': {      
if (!text) return reply(`*Ejemplo:*\n${prefix + command} gatito`)
let google = require('google-it')
google({'query': text}).then(res => {
let teks = `Google : ${text}\n\n`
for (let g of res) {
teks += `🔶 *Titulo* : ${g.title}\n`
teks += `🔶 *Descripcion* : ${g.snippet}\n`
teks += `🔶 *Link* : ${g.link}\n\n━━━━━━━━━━━━━━━━━━━━\n\n`
} 
reply(teks)
})
}
break 
		
case 'attp':
if (!text) return reply('ingresa algo para convertirlo a sticker :v')
link = `https://api.lolhuman.xyz/api/attp?apikey=${lolkeysapi}&text=${text}`
conn.sendMessage(m.chat, { sticker: { url: link } }, { quoted: fkontak})
break

case 'edit': {
     const {
         key
     } = await conn.sendMessage(m.chat, {
         text: '*Testing...*'
     }, {
         quoted: m
     });
     await delay(1000 * 4);
     await conn.sendMessage(m.chat, {
         text: '*Mensaje editado*',
         edit: key
     });
 }
 break

//info
case 'estado':
await state(conn, m, speed, sender, fkontak) 
break

case 'menu': 
 conn.sendMessage(from, {   
  text: menu(conn, prefix, pushname, m),  
  contextInfo:{  
  forwardingScore: 9999999,  
  isForwarded: true,   
  mentionedJid:[m.sender],  
  "externalAdReply": {  
  "showAdAttribution": true,  
  "renderLargerThumbnail": true,  
  "title": botname,   
  "containsAutoReply": true,  
  "mediaType": 1,   
  "thumbnail": imagen1,  
  "mediaUrl": md, 
  "sourceUrl": md, 
  }  
  }  
  }, { quoted: fkontak }) 
   break 

case 'owner': case 'creador':
 conn.sendMessage(from, {   
  text: `*Hola este bot esta desarrollo si quiere contacta con mi creador aqui te dejo sus número:*\nwa.me/595975740803`,  
  contextInfo:{  
  forwardingScore: 9999999,  
  isForwarded: true,   
  mentionedJid:[m.sender],  
  "externalAdReply": {  
  "showAdAttribution": true,  
  "renderLargerThumbnail": true,  
  "title": botname,   
  "containsAutoReply": true,  
  "mediaType": 1,   
  "thumbnail": imagen1,  
  "mediaUrl": md, 
  "sourceUrl": md, 
  }  
  }  
  }, { quoted: fkontak }) 
   break 

case 'grupo':
if (!m.isGroup) return reply(info.group);  
if (!isBotAdmins) return reply(info.botAdmin)
if (!isGroupAdmins) return reply(info.admin)
if (!text) return reply(`*Accion mal usaba*\n\n*Use de esta forma:*\n*${prefix + command} abrir*\n*${prefix + command} cerrar*`)
if (args[0] === 'abrir') {
if (args[0] === 'open') {
m.reply(`*GRUPO ABIERTO CON EXITO✅*`)
await conn.groupSettingUpdate(from, 'not_announcement')
}} else if (args[0] === 'cerrar') {
if (args[0] === 'close') {
m.reply(`*GRUPO CERRADO CON EXITO✅*`)
await conn.groupSettingUpdate(from, 'announcement')
}}
break

case 'delete': case 'del': {
if (!m.quoted) throw false
if (!isBotAdmins) return reply(info.botAdmin)
if (!isGroupAdmins) return reply(info.admin)
let { chat, fromMe, id} = m.quoted
let delet = m.message.extendedTextMessage.contextInfo.participant
let bang = m.message.extendedTextMessage.contextInfo.stanzaId
return conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})}
break  

case 'public': case 'publico': {
if (!isCreator) return reply(info.owner)
conn.public = true
reply('✅Cambio con exitoso a uso público')}
break
case 'self': case 'privado': {
if (!isCreator) return reply(info.owner)
conn.public = false
reply('✅Cambio con exitoso a uso privado')}
break	

case 'autoadmin': case 'tenerpoder': {
if (!m.isGroup) return reply(info.group)
if (!isCreator) return reply(info.owner)
m.reply('Ya eres admin mi jefe 😎') 
await conn.groupParticipantsUpdate(m.chat, [m.sender], "promote")
}
break 
		
case 'welcome':
case 'modeadmin':
case 'antifake': case 'antinternacional':
case 'antiarabe':
case 'modojadibot':
case 'antilink': {
if (!m.isGroup) return reply(info.group)
if (!isBotAdmins) return reply(info.botAdmin)
if (!isGroupAdmins) return reply(info.admin)
if (!text) return reply(`*Use de esta forma ejemplo:*\n*${prefix + command} on*\n*${prefix + command} off*`)
if (args[0] === "on") {
if (db.data.chats[m.chat].antilink) 
if (db.data.chats[m.chat].welcome)
if (db.data.chats[m.chat].modeadmin)
if (db.data.chats[m.chat].antifake)
if (db.data.chats[m.chat].antiarabe)
if (db.data.chats[m.chat].modojadibot)
db.data.chats[m.chat].antilink = true
db.data.chats[m.chat].welcome = true
db.data.chats[m.chat].modeadmin = true
db.data.chats[m.chat].antifake = true
db.data.chats[m.chat].antiarabe = true
db.data.chats[m.chat].modojadibot = true
reply(`*✅El ${command} se activo con exito*`)
} else if (args[0] === "off") {
if (!db.data.chats[m.chat].antilink)
if (!db.data.chats[m.chat].welcome) 
if (!db.data.chats[m.chat].modeadmin)
if (db.data.chats[m.chat].antifake)
if (db.data.chats[m.chat].antiarabe)
if (db.data.chats[m.chat].modojadibot)
db.data.chats[m.chat].antilink = false
db.data.chats[m.chat].welcome = false
db.data.chats[m.chat].modeadmin = false
db.data.chats[m.chat].antifake = false
db.data.chats[m.chat].antiarabe = false
db.data.chats[m.chat].modojadibot = false
reply(`*${command} desactivado!*`)
}}
break

case 'join': {
if (!isCreator) return reply(info.owner)
if (!text) return reply(`*Y EL LINK DEL GRUPO?*`)
 if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return reply(`*Link incorrecto!*`)
reply(`*YA ME UNIR 😼*`)
let result = args[0].split('https://chat.whatsapp.com/')[1]
await conn.groupAcceptInvite(result).then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))}
break
            
case 'hidetag': {
if (!m.isGroup) return reply(info.group) 
if (!isBotAdmins) return reply(info.botAdmin)
if (!isGroupAdmins) return reply(info.admin)
if (!text) return reply(`*Y el texto?*`)
conn.sendMessage(m.chat, { text : q ? q : '' , mentions: participants.map(a => a.id)}, { quoted: m })}
break 

case 'leave': {
if (!isCreator) return reply(info.owner)
reply(m.chat, `*Adios fue un gusto esta aqui hasta pronto 👋*`)
await conn.groupLeave(m.chat)}
break
            
case 'kick': {
if (!m.isGroup) return reply(info.group) 
if (!isBotAdmins) return reply(info.botAdmin)
if (!isGroupAdmins) return reply(info.admin)
if (!text) return reply(`[ ⚠️ ] A QUIEN CARAJO ELIMINO? ETIQUETA ALGUN USUARIO NO SOY ADIVINO 😯`)
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
conn.groupParticipantsUpdate(m.chat, [users], 'remove')}
break
	
case 'promote': {
if (!m.isGroup) return reply(info.group) 
if (!isBotAdmins) return reply(info.botAdmin)
if (!isGroupAdmins) return reply(info.admin)
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await conn.groupParticipantsUpdate(m.chat, [users], 'promote').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
}
break
	
case 'demote': {
if (!m.isGroup) return reply(info.group) 
if (!isBotAdmins) return reply(info.botAdmin)
if (!isGroupAdmins) return reply(info.admin)
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await conn.groupParticipantsUpdate(m.chat, [users], 'demote').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
}
break
	
case 'block': {
if (!isCreator) return reply(info.owner)
reply(`*El usuario fue bloqueado del bot*`)
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await conn.updateBlockStatus(users, 'block')}
break
	
case 'unblock': {
if (!isCreator) return reply(info.owner)
reply(`*El usuario fue desbloqueado*`)
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await conn.updateBlockStatus(users, 'unblock')}
break
	
case 'banchat': {
if (!m.isGroup) return reply(info.group) 
if (!isBotAdmins) return reply(info.botAdmin)
if (!isGroupAdmins) return reply(info.admin)
if (!text) return reply(`*Accion mal usaba*\n\n*Use de esta forma:*\n*${prefix + command} on*\n*${prefix + command} off*`)
if (args[0] === "on") {
if (db.data.chats[m.chat].ban) return reply(`*Ya esta baneado este chat*`)
db.data.chats[m.chat].ban = true
reply(`*BOT OFF*`)
} else if (args[0] === "off") {
if (!db.data.chats[m.chat].ban) return reply(`*Este chat ya esta desbaneado*`)
db.data.chats[m.chat].ban = false
reply(`*BOT ONLINE YA ESTOY DISPONIBLE ✅*`)}}
break

case 'tagall': {
if (!m.isGroup) return reply(info.group) 
if (!isBotAdmins) return reply(info.botAdmin)
if (!isGroupAdmins) return reply(info.admin)
let teks = `❑ ━〔 *📢 𝐈𝐍𝐕𝐎𝐂𝐀𝐂𝐈𝐎𝐍 📢* 〕━ ❑\n\n`
teks += `❑ Mensaje:  ${q ? q : 'Active perra'}\n\n`
for (let mem of participants) {
teks += `➥ @${mem.id.split('@')[0]}\n`
}
conn.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, { quoted: m })
}
break

case 'ping':  
var timestamp = speed();  
var latensi = speed() - timestamp  
conn.sendMessage(from, { text: `*Pong 🏓  ${latensi.toFixed(4)}*` }, { quoted: msg });  
break  		

case 'bug': case 'report': {
if (!text) return reply(`*INGRESE EL COMANDO CON FALLOS*\n\n*EJEMPLO':*\n${prefix + command} sticker no funciona`)
conn.sendMessage(`595975740803@s.whatsapp.net`, {text: `╭━━〔 *REPORTE | REPORT* 〕━━⬣\n┃\n┃✿ *Número | Number*\n┃⇢ wa.me/${m.sender.split("@")[0]}\n┃\n┃✿ *Mensaje | Text*\n┃: ${text}┃\n╰━━━〔 *${vs}* 〕━━━⬣` })
reply(`*El reporte fue enviado a mi creador*`)}
break 

case "tts":
if (!args[0]) return reply("*Y EL TEXTO?*")
await conn.sendPresenceUpdate('recording', m.chat)
let texttosay = text
? text
: m.quoted && m.quoted.text
? m.quoted.text
: m.text;
const SpeakEngine = require("google-tts-api"); 
const texttospeechurl = SpeakEngine.getAudioUrl(texttosay, {lang: "es", slow: false, host: "https://translate.google.com",});
conn.sendMessage(m.chat, { audio: { url: texttospeechurl }, contextInfo: { "externalAdReply": { "title": botname, "body": ``, "previewType": "PHOTO", "thumbnailUrl": null,"thumbnail": imagen1, "sourceUrl": yt, "showAdAttribution": true}}, seconds: '4556', ptt: true, mimetype: 'audio/mpeg', fileName: `error.mp3` }, { quoted: m })
break		
		
case 'simi': {
if (!text) return conn.sendMessage(from, { text: `*INGRESE UN TEXTO PARA HABLAR CONMIGO*` }, { quoted: msg })
await conn.sendPresenceUpdate('composing', m.chat)
let anu = await fetchJson(`https://api.simsimi.net/v2/?text=${text}&lc=es&cf=false`)
let res = anu.success;
m.reply(res)
}
break 
		
case 'ia': case 'chatgpt':
if (!text) return conn.sendMessage(from, { text: `*INGRESE EL TEXTO DE LOS QUE QUIERE BUSCAR?*` }, { quoted: msg })
await conn.sendPresenceUpdate('composing', m.chat)
let tioress = await fetch(`https://api.lolhuman.xyz/api/openai-turbo?apikey=${lolkeysapi}&text=${text}`)
let hasill = await tioress.json()
m.reply(`${hasill.result}`.trim())   
break

case 'play':
 if (!text) return conn.sendMessage(from, { text: `*ingrese nombre de alguna cancion*` }, { quoted: msg })
const {key1} = await conn.sendMessage(from, {text: '*⏳ Aguarde un momento....*\n\nᴱˡ ᵃᵘᵈᶦᵒ ᵖᵘᵉᵈᵉ ᵗᵃʳᵈᵃ ᵉⁿᵗʳᵉ ⁵ ᵒ ¹⁰ ᵐᶦⁿᵘᵗᵒˢ ᵉˡ ᵉⁿᵛᶦᵃˢᵉ ᵗᵉⁿᵈʳᵃ́ ᵖᵃᶜᶦᵉⁿᶜᶦᵃ'}, { quoted: fdoc })
let lolhuman = await fetch(`https://api.lolhuman.xyz/api/ytplay?apikey=${lolkeysapi}&query=${text}`)   
let lolh = await lolhuman.json()
let n = lolh.result.text || 'error'
await conn.sendMessage(from, { audio: { url: lolh.result.audio.link }, fileName: `error.mp3`, mimetype: 'audio/mp4' }, { quoted: msg }); 
await conn.sendMessage(from, {text: info.result, edit: key1}, { quoted: fdoc })
break

case 'play2':    
if (!text) return conn.sendMessage(from, { text: `*ingrese nombre de alguna cancion*` }, { quoted: msg })
conn.sendMessage(from, { text: `*Aguarde un momento*\n\nᴱˡ ᵛᶦᵈᵉᵒ ᵖᵘᵉᵈᵉ ᵗᵃʳᵈᵃ ᵉⁿᵗʳᵉ ⁵ ᵒ ¹⁰ ᵐᶦⁿᵘᵗᵒˢ ᵉˡ ᵉⁿᵛᶦᵃˢᵉ ᵗᵉⁿᵈʳᵃ́ ᵖᵃᶜᶦᵉⁿᶜᶦᵃ` }, { quoted: fdoc });    
let mediaa = await ytplayvid(text)
await conn.sendMessage(from, { video: { url: mediaa.result }, fileName: `error.mp4`, thumbnail: mediaa.thumb, mimetype: 'video/mp4' }, { quoted: msg });
break                              

case 's': case 'sticker': {  
if (/image/.test(mime)) {  
reply(`*AGUARDE UN MOMENTO*`)  
media = await quoted.download()  
let encmedia = await conn.sendImageAsSticker(from, media, m, { packname: global.packname, author: global.author })  
await fs.unlinkSync(encmedia)  
} else if (/video/.test(mime)) {  
if ((quoted.msg || quoted).seconds > 20) return reply('¡Máximo 20 segundos!')  
media = await quoted.download()  
let encmedia = await conn.sendVideoAsSticker(from, media, m, { packname: global.author, author: global.packname })  
await new Promise((resolve) => setTimeout(resolve, 2000));   
await fs.unlinkSync(encmedia)  
} else {  
reply(`*Y LA IMAGEN?*`)  
}}  
break; 
	      		
case 'update':
if (!isCreator) return conn.sendMessage(from, { text: info.owner }, { quoted: msg });    
try {    
let stdout = execSync('git pull' + (m.fromMe && q ? ' ' + q : ''))
await conn.sendMessage(from, { text: stdout.toString() }, { quoted: msg });
} catch { 
let updatee = execSync('git remote set-url origin https://github.com/elrebelde21/NovaBot-MD.git && git pull')
await conn.sendMessage(from, { text: updatee.toString() }, { quoted: msg })}  
break
        
        default:
            if (budy.startsWith('>')) {
                if (!isCreator) return
                try {
                    return reply(JSON.stringify(eval(budy.slice(2)), null, '\t'))
                } catch (e) {
                    e = String(e)
                    reply(e)
                }
            }
            if (budy.startsWith('=>')) {
                if (!isCreator) return
                try {
                    return  reply(JSON.stringify(eval(`(async () => { ${budy.slice(3)} })()`), null, '\t'))  //gata.sendMessage(from, JSON.stringify(eval(`(async () => { ${budy.slice(3)} })()`), null, '\t'), text, { quoted: msg })
                } catch (e) {
                    e = String(e)
                    reply(e)
                }
            }
            if (budy.startsWith('$')) {
                if (!isCreator) return
                try {
                    return reply(String(execSync(budy.slice(2), { encoding: 'utf-8' })))
                } catch (e) {
                    e = String(e)
                    reply(e)
                }
            }
        }

}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})