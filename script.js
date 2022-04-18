// https://breslev.co.il/categories-video/קליפים/בדיחות

const folder = 'בדיחות הרב ארוש'

await import('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.9.1/jszip.min.js')
const zip = new JSZip()
const videos = document.querySelectorAll('a.img_position[href^="https://breslev.co.il/video/"]')
console.clear()
for (const [i, e] of videos.entries()) {
    try {
        const link = (await fetch(e.href).then(r => r.text())).match(/https:\/\/.+\.mp4/)[0]
        const arrayBuffer = await fetch(link).then(r => r.arrayBuffer())
        const name = `${decodeURIComponent(e.href).match(/[א-ת-]+/)[0].replaceAll('-', ' ')}.mp4`
        zip.file(`${folder}/${name}`, arrayBuffer)
        console.clear()
        console.log(`מכין להורדה... ${i + 1} מתוך ${videos.length} סרטונים`)
    } catch {
        continue
    }
}
console.clear()
console.log('מוריד...')
const a = document.createElement('a')
a.href = URL.createObjectURL(await zip.generateAsync({ type: 'blob' }))
a.download = `${folder}.zip`
a.click()
