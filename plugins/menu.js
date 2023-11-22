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
let menu = `╔══════ ≪ •❈• ≫ ══════╗
║◤━━━━━ ☆. ∆ .☆ ━━━━━◥
║✾ Hola @${sender.split("@")[0]} ${user.registered === true ? 'ͧͧͧͦꙶͣͤ✓' : ''} 👋🏻
║◤━━━━━ ☆. ∆ .☆ ━━━━━◥
║✾ ᴘʀᴇғɪᴊᴏ: [ ${prefix} ]
║✾ ғᴇᴄʜᴀ: ${date}
║✾ ʜᴏʀᴀ: ${time}
║✾ ᴜsᴜᴀʀɪᴏ : ${Object.keys(global.db.data.users).length}
║✾ ᴀᴄᴛɪᴠɪᴅᴀᴅ : ${runtime(process.uptime())}
║✾ ᴍᴏᴅᴏ : ${conn.public ? 'publico' : 'privado'}
║✾ ${conn.user.id == global.numBot2 ? 'ʙᴏᴛ ᴏғᴄ : ᴇsᴛᴇ ᴇs ᴇʟ ʙᴏᴛ ᴏғᴄ' : `sᴏʏ ᴜɴ sᴜʙʙᴏᴛ ᴅᴇ : @${global.numBot.split`@`[0]}`}
║ 
║✾ ʟɪᴍɪᴛᴇ : ${user.limit}
║✾ ɴɪᴠᴇʟ : ${user.level}
║✾ ʀᴀɴɢᴏ : ${user.role}
║✾ ᴇxᴘ : ${user.exp}
║✾ ᴄᴏɪɴs : ${user.money}
║ 
║✾ ʀᴇɢɪsᴛʀᴀᴅᴏ : ${rtotalreg} de ${totalreg}
║◤━━━━━ ☆. ∆ .☆ ━━━━━◥
╚══════ ≪ •❈• ≫ ══════╝

===============================
\`\`\`🎅 ＬＩＳＴＡ ＤＥ ＣＯＭＡＮＤＯ 🎅\`\`\`
\`\`\`ʙᴏᴛ sɪᴍᴘʟᴇ ᴄᴏɴ ᴘᴏᴄᴏs ᴄᴏᴍᴀɴᴅᴏs\`\`\`
===============================

*╭─╮─᤻─᳒─᤻᳒᯽⃟ᰳᰬᰶ┈*⃐ℹ️ ＩＮＦＯＢＯＴ*️⃟ᬽ፝֟━*
├❥ᰰຼ ❏ ${prefix}reg 
├❥ᰰຼ _(Registrarte para poder usar el bot)_
├❥ᰰຼ ❏ ${prefix}unreg
├❥ᰰຼ _(Para borrar su registro)_
├❥ᰰຼ ❏ ${prefix}myns
├❥ᰰຼ _(Para ver tu numero de serie)_
├❥ᰰຼ ❏ ${prefix}estado 
├❥ᰰຼ _(Comprueba el estado del bot)_
├❥ᰰຼ ❏ ${prefix}menu2
├❥ᰰຼ ❏ ${prefix}nuevo 
├❥ᰰຼ _(Para informarte sobre nuevo comando)_
├❥ᰰຼ ❏ ${prefix}reglas
├❥ᰰຼ _(Leer las reglas)_
├❥ᰰຼ ❏ ${prefix}audios
├❥ᰰຼ ❏ ${prefix}ping 
├❥ _(Velocidad del bot)_
├❥ᰰຼ ❏ ${prefix}grupos 
├❥ _(Unete al los grupos oficiales y diviértete con el bot 😸)_
├❥ᰰຼ ❏ ${prefix}join _(solicita un bot para tu grupo)_
├❥ᰰຼ ❏ ${prefix}owner
├❥ᰰຼ ❏ ${prefix}creador
├❥ᰰຼ _(Te envia los contactos de mi creador)_
├❥ᰰຼ ❏ ${prefix}instalarbot (Tutorial del instalacion)_
├❥ᰰຼ ❏ ${prefix}report 
├❥ᰰຼ _(reporta comando con falla/errores/ortografía, etc)_
*╰┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭۫*

*╭─╮─᤻─᳒─᤻᳒᯽⃟ᰳᰬᰶ┈*⃐🤖ＪＡＤＩＢＯＴ*️⃟ᬽ፝֟━*
├❥ᰰຼ  *(Este serbot esta modo beta)*
├ *✧･ﾟ: *✧･ﾟ:*✧･ﾟ: *✧･ﾟ:*✧･ﾟ: *✧･ﾟ:
├❥ᰰຼ ❏ ${prefix}serbot
├❥ᰰຼ ❏ ${prefix}qr
├❥ _(Genera un qr para convertirte en un sub bot)_
├❥ᰰຼ ❏ ${prefix}serbot --code
├❥ᰰຼ ❏ ${prefix}jadibot --code
├❥ _(Nueva forma de hacerte un subbot ¡beta!)_
├❥ᰰຼ ❏ ${prefix}bots
├❥ _(Comprueba si hay sub bot conectado)_
├❥ᰰຼ ❏ ${prefix}stop
├❥ᰰຼ ❏ ${prefix}deljadibot
├❥ᰰຼ _(Comando solo para los sub bot)_
*╰┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭۫*

*╭─╮─᤻─᳒─᤻᳒᯽⃟ᰳᰬᰶ┈*⃐🔄ＤＥＳＣＡＲＧＡ*️⃟ᬽ፝֟━*
├❥ᰰຼ ❏ ${prefix}play 
├❥ᰰຼ _(Titulo/nombre de la canción para descargar el audio)_
├❥ᰰຼ ❏ ${prefix}play2
├❥ᰰຼ _(Titulo/nombre de la canción para descargar el video)_
├❥ᰰຼ ❏ ${prefix}playdoc
├❥ᰰຼ ❏ ${prefix}play3
├❥ᰰຼ _(Descarga audio en documento)_
├❥ᰰຼ ❏ ${prefix}play4 
├❥ᰰຼ _(Descarga video en documento)_
├❥ᰰຼ ❏ ${prefix}yts 
├❥ᰰຼ  _(Busca los links para descarga el video)_
├❥ᰰຼ ❏ ${prefix}ytmp3
├❥ᰰຼ _(Ingresa el link para descargar el audio)_
├❥ᰰຼ ❏ ${prefix}ytmp4
├❥ᰰຼ _(Ingresa el link para descargar el video)_
├❥ᰰຼ ❏ ${prefix}spotify
├❥ᰰຼ ❏ ${prefix}music
├❥ᰰຼ _(Descarga musica de Spotify)_
├❥ᰰຼ ❏ ${prefix}gitclone
├❥ᰰຼ _(Ingresa el link del GitHub para descargar el repositorio)_
├❥ᰰຼ ❏ ${prefix}tiktok
├❥ᰰຼ _(Ingresa el link de tiktok para descargar el video)_
├❥ᰰຼ ❏ ${prefix}tiktokimg
├❥ᰰຼ ❏ ${prefix}ttimg
├❥ᰰຼ ❏ ${prefix}igstalk
├❥ᰰຼ _(Ingresa el nombre de un usuario de Instagram para ver su perfil)_
├❥ᰰຼ ❏ ${prefix}facebook
├❥ᰰຼ ❏ ${prefix}fb
├❥ᰰຼ _(Descarga videos de Facebook)_
├❥ᰰຼ ❏ ${prefix}instagram
├❥ᰰຼ ❏ ${prefix}ig
├❥ᰰຼ _(Descarga videos de Instagram)_
├❥ᰰຼ ❏ ${prefix}mediafire
├❥ᰰຼ (descarga archivos de mediafire)_
├❥ᰰຼ ❏ ${prefix}gdrive
├❥ᰰຼ _(Descarga archivos de gdrive)_
*╰┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭۫*

*╭─╮─᤻─᳒─᤻᳒᯽⃟ᰳᰬᰶ┈*🔰⃐ＧＲＵＰＯＳ*️⃟ᬽ፝֟━*
├❥ᰰຼ ❏ ${prefix}welcome _(on/off)_
├❥ᰰຼ ❏ ${prefix}antilink _(on/off)_
├❥ᰰຼ ❏ ${prefix}antienlace _(on/off)_
├❥ᰰຼ ❏ ${prefix}antifake _(on/off)_
├❥ᰰຼ ❏ ${prefix}antiarabe _(on/off)_
├❥ᰰຼ ❏ ${prefix}autosticker _(on/off)_
├❥ᰰຼ ❏ ${prefix}detect _(on/off)_
├❥ᰰຼ ❏ ${prefix}autodetect _(on/off)_
├❥ᰰຼ ❏ ${prefix}antinsfw _(on/off)_
├❥ᰰຼ ❏ ${prefix}modocaliente _(on/off)_
├❥ᰰຼ ❏ ${prefix}autosticker _(on/off)_
├❥ᰰຼ ❏ ${prefix}modoadmin _(on/off)_
├❥ᰰຼ ❏ ${prefix}audios _(on/off)_
├❥ᰰຼ ❏ ${prefix}chatbot _(on/off)_
├❥ᰰຼ ❏ ${prefix}autolevelup _(on/off)_
├❥ᰰຼ ❏ ${prefix}autonivel _(on/off)_
├❥ᰰຼ ❏ ${prefix}kick _(@tag)_
├❥ᰰຼ ❏ ${prefix}add _(@tag)_
├❥ᰰຼ ❏ ${prefix}invita _(@tag)_
├❥ᰰຼ ❏ ${prefix}promote _(@tag)_
├❥ᰰຼ ❏ ${prefix}demote _(@tag)_
├❥ᰰຼ ❏ ${prefix}infogrupo
├❥ᰰຼ ❏ ${prefix}groupinfo
├❥ᰰຼ ❏ ${prefix}admins _(llama a los admins)_
├❥ᰰຼ ❏ ${prefix}grupo close/open 
├❥ᰰຼ ❏ ${prefix}warn _(@tag)_
├❥ᰰຼ ❏ ${prefix}advertencia _(@tag)_
├❥ᰰຼ ❏ ${prefix}unwarn _(@tag)_
├❥ᰰຼ ❏ ${prefix}quitardvertencia _(@tag)_
├❥ᰰຼ ❏ ${prefix}setppname _(cambia el nombre del grupo)_
├❥ᰰຼ ❏ ${prefix}setdesc _(cambia la descripción del Grupo)_
├❥ᰰຼ ❏ ${prefix}setppgroup _(cambia la foto del Grupo)_
├❥ᰰຼ ❏ ${prefix}anularlink 
├❥ᰰຼ ❏ ${prefix}resetlink _(restablece el link del grupo)_
├❥ᰰຼ ❏ ${prefix}hidetag _(etiqueta a todos el un mensaje)_
├❥ᰰຼ ❏ ${prefix}tagall 
├❥ᰰຼ ❏ ${prefix}invocar _(etiqueta a todos el una listas)_
├❥ᰰຼ ❏ ${prefix}listonline _(etiquetas a los usuarios que esta activo|online)_
*╰┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭۫*

*╭─╮─᤻─᳒─᤻᳒᯽⃟ᰳᰬᰶ┈*🔎⃐ＢＵＳＣＡＤＯＲＥＳ*️⃟ᬽ፝֟━*
├❥ᰰຼ ❏ ${prefix}google 
├❥ᰰຼ _(Ingresa nombre de lo que quiere buscar)_
├❥ᰰຼ ❏ ${prefix}ia 
├❥ᰰຼ _(Ingresa el texto de lo que quiere buscar con la (IA)_
├❥ᰰຼ ❏ ${prefix}imagen
├❥ᰰຼ _Ingresa el texto de la imagen que quiere buscar_
├❥ᰰຼ ❏ ${prefix}traducir
├❥ᰰຼ _(Traducir algun texto)_
├❥ᰰຼ ❏ ${prefix}wallpaper
├❥ᰰຼ _(Buscar imagen del wallpaper)_
├❥ᰰຼ ❏ ${prefix}ss 
├❥ᰰຼ _(Ingresa un link para mandar captura)_
├❥ᰰຼ ❏ ${prefix}dall-e
├❥ᰰຼ ❏ ${prefix}ia2
├❥ᰰຼ _(Crea imagenes con la (IA)_
*╰┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭۫*

*╭─╮─᤻─᳒─᤻᳒᯽⃟ᰳᰬᰶ┈*⃐👾ＪＵＥＧＯＳ*️⃟ᬽ፝֟━*
├❥ᰰຼ ❏ ${prefix}simi 
├❥ᰰຼ _(Hablar con el bot)_
├❥ᰰຼ ❏ ${prefix}ppt
├❥ᰰຼ _(Juegas un piedra, papel, o tijera)_
├❥ᰰຼ ❏ ${prefix}gay @tag
├❥ᰰຼ ❏ ${prefix}pareja @tag
├❥ᰰຼ ❏ ${prefix}love @tag
├❥ᰰຼ ❏ ${prefix}follar @tag
├❥ᰰຼ ❏ ${prefix}topgays
├❥ᰰຼ ❏ ${prefix}topotakus
├❥ᰰຼ ❏ ${prefix}top
├❥ᰰຼ ❏ ${prefix}pregunta
├❥ᰰຼ ❏ ${prefix}verdad
├❥ᰰຼ ❏ ${prefix}reto
├❥ᰰຼ ❏ ${prefix}doxear
├❥ᰰຼ ❏ ${prefix}personalidad
├❥ᰰຼ ❏ ${prefix}racista
├❥ᰰຼ ❏ ${prefix}slot
├❥ᰰຼ ❏ ${prefix}dado
├❥ᰰຼ ❏ ${prefix}piropo
├❥ᰰຼ ❏ ${prefix}ship
├❥ᰰຼ ❏ ${prefix}formartrio
├❥ᰰຼ ❏ ${prefix}formapareja5
├❥ᰰຼ ❏ ${prefix}fake
├❥ᰰຼ _(Ingresa el texto + tag para joder a alguien con chat fake😹)_
*╰┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭۫*

*╭─╮─᤻─᳒─᤻᳒᯽⃟ᰳᰬᰶ┈*🎤 EFECTOS DE AUDIOS*️⃟ᬽ፝֟━*
├❥ᰰຼ *(𝚁𝙴𝚂𝙿𝙾𝙽𝙳𝙴 𝙰 𝙰𝚄𝙳𝙸𝙾 𝙾 𝙽𝙾𝚃𝙰 𝙳𝙴 𝚅𝙾𝚉)*
├ *✧･ﾟ: *✧･ﾟ:*✧･ﾟ: *✧･ﾟ:*✧･ﾟ: *✧･ﾟ:
├❥ᰰຼ ❏ ${prefix}bass
├❥ᰰຼ ❏ ${prefix}blown
├❥ᰰຼ ❏ ${prefix}deep
├❥ᰰຼ ❏ ${prefix}earrape
├❥ᰰຼ ❏ ${prefix}fast
├❥ᰰຼ ❏ ${prefix}fat
├❥ᰰຼ ❏ ${prefix}nightcore
├❥ᰰຼ ❏ ${prefix}reverse
├❥ᰰຼ ❏ ${prefix}robot
├❥ᰰຼ ❏ ${prefix}slow
├❥ᰰຼ ❏ ${prefix}smooth
├❥ᰰຼ ❏ ${prefix}squirrel
*╰┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭۫*

*╭─╮─᤻─᳒─᤻᳒᯽⃟ᰳᰬᰶ┈*⃐🧧CONVERTIDORES*️⃟ᬽ፝֟━*
├❥ᰰຼ ❏ ${prefix}tourl
├❥ᰰຼ ❏ ${prefix}tts
├❥ᰰຼ ❏ ${prefix}tomp3
├❥ᰰຼ ❏ ${prefix}toimg
├❥ᰰຼ ❏ ${prefix}toaudio
├❥ᰰຼ ❏ ${prefix}toanime
├❥ᰰຼ ❏ ${prefix}hd
*╰┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭۫* 	

*╭─╮─᤻─᳒─᤻᳒᯽⃟ᰳᰬᰶ┈*⃐🥵COMANDO +18*️⃟ᬽ፝֟━*
├❥ᰰຼ  *Activa con (antiNsfw on)*
├ *✧･ﾟ: *✧･ﾟ:*✧･ﾟ: *✧･ﾟ:*✧･ﾟ: *✧･ﾟ:
├❥ᰰຼ ❏ ${prefix}pussy
├❥ᰰຼ ❏ ${prefix}nsfwloli
├❥ᰰຼ ❏ ${prefix}hentai
├❥ᰰຼ ❏ ${prefix}hentai2
├❥ᰰຼ ❏ ${prefix}pack
├❥ᰰຼ ❏ ${prefix}pack2
├❥ᰰຼ ❏ ${prefix}pack3
├❥ᰰຼ ❏ ${prefix}videoxxx
├❥ᰰຼ ❏ ${prefix}videoxxxlesbi
├❥ᰰຼ ❏ ${prefix}pornolesbianavid
├❥ᰰຼ ❏ ${prefix}videolesbixxx
├❥ᰰຼ ❏ ${prefix}porno
├❥ᰰຼ ❏ ${prefix}lewd'
├❥ᰰຼ ❏ ${prefix}feed'
├❥ᰰຼ ❏ ${prefix}gasm
├❥ᰰຼ ❏ ${prefix}anal	    	
├❥ᰰຼ ❏ ${prefix}holo	    	
├❥ᰰຼ ❏ ${prefix}tits	    	
├❥ᰰຼ ❏ ${prefix}kuni
├❥ᰰຼ ❏ ${prefix}kiss
├❥ᰰຼ ❏ ${prefix}erok
├❥ᰰຼ ❏ ${prefix}smug
├❥ᰰຼ ❏ ${prefix}solog
├❥ᰰຼ ❏ ${prefix}feetg
├❥ᰰຼ ❏ ${prefix}lewdk    
├❥ᰰຼ ❏ ${prefix}femdom
├❥ᰰຼ ❏ ${prefix}cuddle
├❥ᰰຼ ❏ ${prefix}eroyuri
├❥ᰰຼ ❏ ${prefix}cum	    
├❥ᰰຼ ❏ ${prefix}blowjob
├❥ᰰຼ ❏ ${prefix}holoero
├❥ᰰຼ ❏ ${prefix}erokemo
├❥ᰰຼ ❏ ${prefix}fox_girl
├❥ᰰຼ ❏ ${prefix}futanari
├❥ᰰຼ ❏ ${prefix}wallpaper	   
├❥ᰰຼ *Nota: usarlo baja tu responsabilidad*
*╰┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭۫* 	
	
╭─╮─᤻─᳒─᤻᳒᯽⃟ᰳᰬᰶ┈*⛩️ ⃐RANDOW*️⃟ᬽ፝֟━*
├❥ᰰຼ ❏ ${prefix}memes
├❥ᰰຼ ❏ ${prefix}horny
├❥ᰰຼ ❏ ${prefix}simp
├❥ᰰຼ ❏ ${prefix}lolice
├❥ᰰຼ ❏ ${prefix}comentar
├❥ᰰຼ ❏ ${prefix}comment
├❥ᰰຼ ❏ ${prefix}loli
├❥ᰰຼ ❏ ${prefix}lolivid
├❥ᰰຼ ❏ ${prefix}neko
├❥ᰰຼ ❏ ${prefix}waifu	
├❥ᰰຼ ❏ ${prefix}blackpink
├❥ᰰຼ ❏ ${prefix}akira
├❥ᰰຼ ❏ ${prefix}akiyama
├❥ᰰຼ ❏ ${prefix}anna
├❥ᰰຼ ❏ ${prefix}asuna
├❥ᰰຼ ❏ ${prefix}ayuzawa
├❥ᰰຼ ❏ ${prefix}boruto
├❥ᰰຼ ❏ ${prefix}chiho
├❥ᰰຼ ❏ ${prefix}chitoge
├❥ᰰຼ ❏ ${prefix}deidara
├❥ᰰຼ ❏ ${prefix}erza
├❥ᰰຼ ❏ ${prefix}elaina
├❥ᰰຼ ❏ ${prefix}eba
├❥ᰰຼ ❏ ${prefix}emilia
├❥ᰰຼ ❏ ${prefix}hestia
├❥ᰰຼ ❏ ${prefix}hinata
├❥ᰰຼ ❏ ${prefix}inori
├❥ᰰຼ ❏ ${prefix}isuzu
├❥ᰰຼ ❏ ${prefix}itachi
├❥ᰰຼ ❏ ${prefix}itori
├❥ᰰຼ ❏ ${prefix}kaga
├❥ᰰຼ ❏ ${prefix}kagura
├❥ᰰຼ ❏ ${prefix}kaori':
├❥ᰰຼ ❏ ${prefix}keneki
├❥ᰰຼ ❏ ${prefix}kotori
├❥ᰰຼ ❏ ${prefix}kurumi
├❥ᰰຼ ❏ ${prefix}madara
├❥ᰰຼ ❏ ${prefix}mikasa
├❥ᰰຼ ❏ ${prefix}miku
├❥ᰰຼ ❏ ${prefix}minato
├❥ᰰຼ ❏ ${prefix}naruto
├❥ᰰຼ ❏ ${prefix}nezuko
├❥ᰰຼ ❏ ${prefix}sagiri
├❥ᰰຼ ❏ ${prefix}sasuke
├❥ᰰຼ ❏ ${prefix}sakura
├❥ᰰຼ ❏ ${prefix}'cosplay
*╰┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭۫*
             
*╭─╮─᤻─᳒─᤻᳒᯽⃟ᰳᰬᰶ┈*⃐🪙 ＥＣＯＮＯＭＩＡ*️⃟ᬽ፝֟━*
├❥ᰰຼ ❏ ${prefix}minar _(Para minar exp)_
├❥ᰰຼ ❏ ${prefix}robar
├❥ᰰຼ ❏ ${prefix}rob _(Roba exp algun usuarios)_
├❥ᰰຼ ❏ ${prefix}trabajar
├❥ᰰຼ ❏ ${prefix}work _(Trabaja y ganas exp)_
├❥ᰰຼ ❏ ${prefix}buy _(Comprar mas diamantes (limit)_
├❥ᰰຼ ❏ ${prefix}bal
├❥ᰰຼ ❏ ${prefix}balace _(Para saber cuanto diamante/exp tienes)_
├❥ᰰຼ ❏ ${prefix}claim
├❥ᰰຼ _(Recoger tu recompensa)_
├❥ᰰຼ ❏ ${prefix}lb
├❥ᰰຼ ❏ ${prefix}leaderboard
├❥ᰰຼ ❏ ${prefix}cofre
├❥ᰰຼ ❏ ${prefix}perfil
├❥ᰰຼ ❏ ${prefix}nivel
├❥ᰰຼ ❏ ${prefix}levelup
├❥ᰰຼ ❏ ${prefix}afk 
*╰┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭۫*

*╭─╮─᤻─᳒─᤻᳒᯽⃟ᰳᰬᰶ┈*⃐👽ＳＴＩＣＫＥＲ*️⃟ᬽ፝֟━*
├❥ᰰຼ ❏ ${prefix}s
├❥ᰰຼ ❏ ${prefix}sticker 
├❥ᰰຼ ❏ ${prefix}wm
├❥ᰰຼ ❏ ${prefix}attp
├❥ᰰຼ ❏ ${prefix}emojimix
*╰┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭۫*

*╭─╮─᤻─᳒─᤻᳒᯽⃟ᰳᰬᰶ┈*⃐👑ＯＷＮＥＲ*️⃟ᬽ፝֟━*
├❥ _(Comando exclusivo para propietario/owner del bot)_
├ *✧･ﾟ: *✧･ﾟ:*✧･ﾟ: *✧･ﾟ:*✧･ﾟ: *✧･ﾟ:
├❥ᰰຼ ❏ ${prefix}anticall _(on/off)_
├❥ᰰຼ ❏ ${prefix}antillamada _(on/off)_
├❥ᰰຼ ❏ ${prefix}antipv _(on/off)_
├❥ᰰຼ ❏ ${prefix}antiprivado _(on/off)_
├❥ᰰຼ ❏ ${prefix}autoread _(on/off)_
├❥ᰰຼ ❏ ${prefix}modojadibot _(on/off)_
├❥ᰰຼ ❏ ${prefix}añadirdiamantes
├❥ᰰຼ ❏ ${prefix}addlimit
├❥ᰰຼ ❏ ${prefix}dardiamantes _(@tag)_
├❥ᰰຼ ❏ ${prefix}añadirxp
├❥ᰰຼ ❏ ${prefix}addxp _(@tag)_
├❥ᰰຼ ❏ ${prefix}banuser _(Banea algun usuario por mal uso del bot)_
├❥ᰰຼ ❏ ${prefix}unbanuser _(Desbanea al usuario)_
├❥ᰰຼ ❏ ${prefix}autoadmin 
├❥ᰰຼ ❏ ${prefix}bc (Difusión a todos los chat)
├❥ᰰຼ ❏ ${prefix}bcgc (Difusión solo a grupos)
├❥ᰰຼ ❏ ${prefix}setpp (Cambia la foto del bot) 
├❥ᰰຼ ❏ ${prefix}public (Modo público) 
├❥ᰰຼ ❏ ${prefix}privado (Modo privado) 
├❥ᰰຼ ❏ ${prefix}getcase
├❥ᰰຼ ❏ ${prefix}addcase
├❥ᰰຼ ❏ ${prefix}update
├❥ᰰຼ ❏ ${prefix}restart
├❥ᰰຼ ❏ ${prefix}reiniciar
├❥ᰰຼ ❏ ${prefix}unbanned
├❥ᰰຼ ❏ ${prefix}sacasupport
├❥ᰰຼ ❏ $
├❥ᰰຼ ❏ >
├❥ᰰຼ ❏ => 
*╰┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭۫*`
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
