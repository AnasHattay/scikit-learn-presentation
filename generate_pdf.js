const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// List of all slides in order
const slides = [
  'intro.html',
  'what_are_data_structures.html',
  'operations.html',
  'comparison.html',
  'lists_containing_everything.html',
  'mutability_examples.html',
  'for_loops.html',
  'while_loops.html',
  'loop_control.html',
  'list_comprehensions.html',
  'loops_with_data_structures.html',
  'lets_code.html',
  'memory.html',
  'pass_by_reference.html',
  'conclusion.html'
];

async function generatePDF() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport for consistent rendering
  await page.setViewport({ width: 1920, height: 1080 });
  
  const pdfPages = [];
  
  for (let i = 0; i < slides.length; i++) {
    const slidePath = path.resolve(__dirname, slides[i]);
    const fileUrl = `file://${slidePath}`;
    
    console.log(`Processing slide ${i + 1}/${slides.length}: ${slides[i]}`);
    
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });
    
    // Wait for any dynamic content to load
    await page.waitForTimeout(2000);
    
    // Generate PDF for this slide
    const pdfBuffer = await page.pdf({
      format: 'A4',
      landscape: true,
      printBackground: true,
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      }
    });
    
    pdfPages.push(pdfBuffer);
  }
  
  await browser.close();
  
  // Combine all PDFs into one
  const PDFDocument = require('pdf-lib').PDFDocument;
  const mergedPdf = await PDFDocument.create();
  
  for (const pdfBuffer of pdfPages) {
    const pdf = await PDFDocument.load(pdfBuffer);
    const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    pages.forEach((page) => mergedPdf.addPage(page));
  }
  
  const pdfBytes = await mergedPdf.save();
  fs.writeFileSync('python_data_structures_presentation.pdf', pdfBytes);
  
  console.log('PDF generated successfully: python_data_structures_presentation.pdf');
}

generatePDF().catch(console.error);
