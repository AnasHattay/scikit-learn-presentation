#!/bin/bash

# Install wkhtmltopdf if not already installed
# On macOS: brew install wkhtmltopdf
# On Ubuntu/Debian: sudo apt-get install wkhtmltopdf
# On Windows: Download from https://wkhtmltopdf.org/downloads.html

echo "Generating PDF from HTML presentation..."

# Create output directory
mkdir -p pdf_output

# List of slides in order
slides=(
  "intro.html"
  "what_are_data_structures.html"
  "operations.html"
  "comparison.html"
  "lists_containing_everything.html"
  "mutability_examples.html"
  "for_loops.html"
  "while_loops.html"
  "loop_control.html"
  "list_comprehensions.html"
  "loops_with_data_structures.html"
  "lets_code.html"
  "memory.html"
  "pass_by_reference.html"
  "conclusion.html"
)

# Generate individual PDFs for each slide
for i in "${!slides[@]}"; do
  slide="${slides[$i]}"
  echo "Processing slide $((i+1))/${#slides[@]}: $slide"
  
  wkhtmltopdf \
    --page-size A4 \
    --orientation Landscape \
    --margin-top 0.5in \
    --margin-right 0.5in \
    --margin-bottom 0.5in \
    --margin-left 0.5in \
    --enable-local-file-access \
    --print-media-type \
    --disable-smart-shrinking \
    "$slide" "pdf_output/slide_$((i+1))_$(basename "$slide" .html).pdf"
done

# Combine all PDFs using pdftk (if available) or ghostscript
if command -v pdftk &> /dev/null; then
  echo "Combining PDFs using pdftk..."
  pdftk pdf_output/*.pdf cat output python_data_structures_presentation.pdf
elif command -v gs &> /dev/null; then
  echo "Combining PDFs using ghostscript..."
  gs -dBATCH -dNOPAUSE -q -sDEVICE=pdfwrite -sOutputFile=python_data_structures_presentation.pdf pdf_output/*.pdf
else
  echo "Individual PDFs created in pdf_output/ directory"
  echo "To combine them, install pdftk or ghostscript, or use an online PDF merger"
fi

echo "PDF generation complete!"
