require('../main.js') 
const fs = require("fs")
const path = require("path")
const chalk = require("chalk");
const { smsg, getGroupAdmins, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, delay, format, logic, generateProfilePicture, parseMention, getRandom } = require('../libs/fuctions')
const { TelegraPh, UploadFileUgu, webp2mp4File, floNime } = require('../libs/uploader.js')

async function efec(conn, command, mime, quoted, exec, prefix, m, from) {
try {  
if (global.db.data.users[m.sender].registered < true) return m.reply(info.registra)
await conn.sendPresenceUpdate('recording', m.chat)
let set  
if (/bass/.test(command)) set = '-af equalizer=f=54:width_type=o:width=2:g=20'  
if (/blown/.test(command)) set = '-af acrusher=.1:1:64:0:log'   
if (/deep/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3'  
if (/earrape/.test(command)) set = '-af volume=12'  
if (/fast/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"'  
if (/fat/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"'  
if (/nightcore/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25'  
if (/reverse/.test(command)) set = '-filter_complex "areverse"'  
if (/robot/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"'  
if (/slow/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"'  
if (/smooth/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"'  
if (/squirrel/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"'   
if (/audio/.test(mime)) {  
let media = await conn. downloadAndSaveMediaMessage(quoted)  
let ran = getRandom('.mp3')  
exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {  
fs.unlinkSync(media)  
if (err) return reply(err)  
let buff = fs.readFileSync(ran)  
conn.sendMessage(m.chat, { audio: buff, contextInfo: { "externalAdReply": { "title": botname, "body": ``, "previewType": "PHOTO", "thumbnailUrl": null,"thumbnail": imagen1, "sourceUrl": md, "showAdAttribution": true}}, ptt: false, mimetype: 'audio/mpeg', fileName: `error.mp3` }, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
fs.unlinkSync(ran)})  
} else m.reply(`*Responde al audio que deseas cambiar con el comando:* *${prefix + command}*`)  
} catch (e) {  
m.reply(`${info.error} ${e}`)
console.log(e)}}

async function url(conn, mime, quoted, util, m) {
if (global.db.data.users[m.sender].registered < true) return m.reply(info.registra)
if (!mime) return m.reply(`*Responde a una imagen/video para converti el url*`)  
m.reply(info.wait) 
let { UploadFileUgu, webp2mp4File, TelegraPh } = require('../libs/uploader') 
let media = await conn.downloadAndSaveMediaMessage(quoted)
if (/image/.test(mime)) {
let anu = await TelegraPh(media)
m.reply(`*🔸Link :*\n${util.format(anu)}`)
} else if (!/image/.test(mime)) { 
let anu = await UploadFileUgu(media)
m.reply(util.format(anu))  
}
await fs.unlinkSync(media)
}

async function tomp3(conn, mime, quoted, m) {
if (global.db.data.users[m.sender].registered < true) return m.reply(info.registra)
if (!/video/.test(mime) && !/audio/.test(mime)) return m.reply(`*[ ⚠️ ] Responda a un audio*`) 
if (!quoted) return m.reply(`*[ ⚠️ ] Responda a un audio*`) 
let { toAudio } = require('../libs/converter.js')
let media  = await conn.downloadMediaMessage(quoted)
let audio = await toAudio(media, 'mp4')
await conn.sendMessage(m.chat, {audio: audio, mimetype: 'audio/mpeg', contextInfo:{  externalAdReply: { showAdAttribution: true, mediaType:  1, mediaUrl: md, title: global.botname, sourceUrl: md, thumbnail: imagen1 }}}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})}

async function toimg(conn, mime, quoted, exec, m) {
if (global.db.data.users[m.sender].registered < true) return m.reply(info.registra)
if (!m.quoted) return m.reply('*Y el sticker?*\n*Responde a un stickers capo*') 
if (!/webp/.test(mime)) return m.reply('*Y el sticker? Responde a un stickers capo*') 
let media = await conn.downloadAndSaveMediaMessage(m.quoted)
let ran = await getRandom('sk.png')
exec(`ffmpeg -i ${media} ${ran}`, (err) => {
fs.unlinkSync(media)
if (err) throw err
let buffer = fs.readFileSync(ran)
conn.sendMessage(m.chat, { image: buffer }, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
fs.unlinkSync(ran)})}

async function toanime(conn, mime, quoted, lolkeysapi, m) { 
if (global.db.data.users[m.sender].registered < true) return m.reply(info.registra)
if (/image/.test(mime)) {
let media = await conn.downloadAndSaveMediaMessage(quoted)
let _upload = await TelegraPh(media)
try {
let anime = await `https://api.lolhuman.xyz/api/imagetoanime?apikey=${lolkeysapi}&img=${_upload}`
m.reply('*🕔 𝘈𝘎𝘜𝘈𝘙𝘋𝘌 𝘜𝘕 𝘔𝘖𝘔𝘌𝘕𝘛𝘖....*\n𝘌𝘴𝘵𝘰𝘺 𝘤𝘰𝘯𝘷𝘪𝘦𝘳𝘵𝘪𝘥𝘰 𝘪𝘮𝘢𝘨𝘦𝘯 𝘢 𝘥𝘪𝘴𝘦𝘯̃𝘰 𝘢𝘯𝘪𝘮𝘦, 𝘴𝘦𝘢 𝘱𝘢𝘤𝘪𝘦𝘯𝘵𝘦 𝘦𝘯 𝘭𝘰 𝘲𝘶𝘦 𝘦𝘯𝘷𝘪𝘰 𝘦𝘭 𝘳𝘦𝘴𝘶𝘭𝘵𝘢𝘥𝘰');
await conn.sendFile(m.chat, anime, 'error.jpg', null, m) 
} catch (e) {
throw m.reply(`*${info.error}*\n\n*ᴠᴇʀɪғɪǫᴜᴇ ǫᴜᴇ ᴇɴ ʟᴀ ɪᴍᴀɢᴇɴ sᴇᴀ ᴠɪsɪʙʟᴇ ᴇʟ ʀᴏsᴛʀᴏ ᴅᴇ ᴜɴᴀ ᴘᴇʀsᴏɴᴀ*`)}
} else { 
m.reply(`*𝘠 𝘭𝘢 𝘪𝘮𝘢𝘨𝘦𝘯? 𝘙𝘦𝘴𝘱𝘰𝘯𝘥𝘦 𝘰 𝘦𝘵𝘪𝘲𝘶𝘦𝘵𝘦 𝘢 𝘶𝘯𝘢 𝘪𝘮𝘢𝘨𝘦𝘯*`)}}

module.exports = {efec, url, tomp3, toimg, toanime}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})