const express = require("express")
const puppeteer = require("puppeteer")
const cors = require("cors")

const app = express()
const PORT = process.env.PORT || 3001

// Enable CORS for all origins
app.use(cors())
app.use(express.json())

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Puppeteer Scraper Server is running",
    endpoints: {
      scrape: "/scrape?url=YOUR_URL",
      health: "/",
    },
  })
})

// Main scraping endpoint
app.get("/scrape", async (req, res) => {
  const { url } = req.query

  if (!url) {
    return res.status(400).json({ error: "URL parameter is required" })
  }

  console.log(`[Puppeteer] Scraping: ${url}`)

  let browser
  try {
    // Launch browser with optimized settings for Railway
    browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--disable-gpu",
      ],
    })

    const page = await browser.newPage()

    // Set realistic user agent
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    )

    // Set viewport
    await page.setViewport({ width: 1920, height: 1080 })

    // Navigate to URL with timeout
    console.log("[Puppeteer] Loading page...")
    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 30000,
    })

    // Wait for content to load (adjust selector based on Airbnb structure)
    console.log("[Puppeteer] Waiting for content...")
    await page.waitForTimeout(3000) // Wait 3 seconds for JS to execute

    // Get fully rendered HTML
    const html = await page.content()

    console.log(`[Puppeteer] Success! HTML length: ${html.length}`)

    await browser.close()

    return res.json({
      success: true,
      html,
      url,
      length: html.length,
    })
  } catch (error) {
    console.error("[Puppeteer] Error:", error.message)

    if (browser) {
      await browser.close()
    }

    return res.status(500).json({
      success: false,
      error: error.message,
      url,
    })
  }
})

app.listen(PORT, () => {
  console.log(`🚀 Puppeteer server running on port ${PORT}`)
  console.log(`📝 Test: http://localhost:${PORT}/scrape?url=https://www.airbnb.com.br/rooms/12345678`)
})
