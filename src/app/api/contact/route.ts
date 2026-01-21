import { NextRequest, NextResponse } from "next/server"
import tls from "tls"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type SmtpOpts = {
  host: string
  port: number
  user: string
  pass: string
  from: string
  to: string
  subject: string
  text: string
}

async function sendSMTP(opts: SmtpOpts): Promise<void> {
  return new Promise((resolve, reject) => {
    const socket = tls.connect({ host: opts.host, port: opts.port, servername: opts.host })
    let buffer = ""
    let closed = false
    const cleanup = () => {
      if (closed) return
      closed = true
      try { socket.end() } catch {}
      try { socket.destroy() } catch {}
    }
    const write = (line: string) => {
      socket.write(line + "\r\n")
    }
    const waitFor = (code: string): Promise<string> => {
      return new Promise((res, rej) => {
        const onData = (chunk: Buffer) => {
          buffer += chunk.toString("utf8")
          const lines = buffer.split(/\r?\n/)
          // Keep the last partial line in buffer
          buffer = lines.pop() || ""
          for (const l of lines) {
            if (l.startsWith(code + " ") || l === code) {
              socket.off("data", onData)
              res(l)
            }
            // Handle SMTP error codes 4xx/5xx
            if (/^(4|5)\d\d /.test(l)) {
              socket.off("data", onData)
              rej(new Error(l))
            }
          }
        }
        socket.on("data", onData)
        socket.once("error", (err) => {
          socket.off("data", onData)
          rej(err)
        })
      })
    }

    const run = async () => {
      try {
        socket.setTimeout(15000, () => reject(new Error("SMTP timeout")))
        await waitFor("220")
        write("EHLO localhost")
        await waitFor("250")
        const auth = Buffer.from(`\0${opts.user}\0${opts.pass}`, "utf8").toString("base64")
        write(`AUTH PLAIN ${auth}`)
        await waitFor("235")
        write(`MAIL FROM:<${opts.from}>`)
        await waitFor("250")
        write(`RCPT TO:<${opts.to}>`)
        await waitFor("250")
        write("DATA")
        await waitFor("354")

        const headers = [
          `Date: ${new Date().toUTCString()}`,
          `From: ${opts.from}`,
          `To: ${opts.to}`,
          `Subject: ${opts.subject}`,
          "MIME-Version: 1.0",
          "Content-Type: text/plain; charset=UTF-8",
          "Content-Transfer-Encoding: 7bit",
          "",
        ].join("\r\n")
        const data = headers + opts.text.replace(/\n/g, "\r\n") + "\r\n.\r\n"
        socket.write(data)
        await waitFor("250")
        write("QUIT")
        resolve()
      } catch (e) {
        reject(e)
      } finally {
        cleanup()
      }
    }

    socket.once("secureConnect", run)
    socket.once("error", (err) => { cleanup(); reject(err) })
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    const name = String(body?.name || "").trim()
    const phone = String(body?.phone || "").trim()
    const message = String(body?.message || "").trim()

    if (!name || !phone || !message) {
      return NextResponse.json({ success: false, message: "ველები სავალდებულოა" }, { status: 400 })
    }

    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS
    const to = process.env.CONTACT_TO || process.env.SMTP_TO || process.env.SMTP_USER

    if (!user || !pass || !to) {
      return NextResponse.json({ success: false, message: "სერვერის კონფიგურაცია არასრულമാണ്" }, { status: 500 })
    }

    const subject = `New contact message from ${name}${phone ? ` (${phone})` : ''}`
    const text = `Name: ${name}\nPhone: ${phone}\n\nMessage:\n${message}\n`

    await sendSMTP({
      host: "smtp.gmail.com",
      port: 465,
      user,
      pass,
      from: user,
      to,
      subject,
      text,
    })

    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e?.message || "Failed to send" }, { status: 500 })
  }
}
