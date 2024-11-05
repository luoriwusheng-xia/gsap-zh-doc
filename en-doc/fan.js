import htmlToMD from 'html-to-md'
import { readFileSync, writeFileSync } from 'node:fs'

let fileName = './02.html'

const contentHtml = readFileSync(fileName, 'utf8')

const markdown = htmlToMD(contentHtml)
// console.log(markdown)

// writeFileSync('./02.md', markdown)

// console.log(htmlToMd)
