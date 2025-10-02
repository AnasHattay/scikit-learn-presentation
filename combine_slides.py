#!/usr/bin/env python3
"""
Script to combine all HTML slides into a single file for easy PDF export
"""

import os
import re
from pathlib import Path

def extract_slide_content(html_file):
    """Extract the main content from an HTML slide file"""
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract content between <body> and </body>
    body_match = re.search(r'<body[^>]*>(.*?)</body>', content, re.DOTALL)
    if body_match:
        return body_match.group(1)
    return content

def create_combined_html():
    """Create a single HTML file with all slides"""
    
    # List of slides in order
    slides = [
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
    ]
    
    # Read the first slide to get the head section
    with open('intro.html', 'r', encoding='utf-8') as f:
        first_slide = f.read()
    
    # Extract head section
    head_match = re.search(r'<head[^>]*>(.*?)</head>', first_slide, re.DOTALL)
    head_content = head_match.group(1) if head_match else ""
    
    # Start building the combined HTML
    combined_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
{head_content}
  <style>
    /* Add page break styles for PDF */
    .slide-page {{
      page-break-after: always;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 2rem;
      box-sizing: border-box;
    }}
    
    .slide-page:last-child {{
      page-break-after: avoid;
    }}
    
    /* Ensure proper styling for print */
    @media print {{
      body {{
        margin: 0;
        padding: 0;
      }}
      
      .slide-page {{
        margin: 0;
        padding: 1rem;
        min-height: 100vh;
      }}
    }}
  </style>
</head>
<body>
"""
    
    # Add each slide as a separate page
    for i, slide_file in enumerate(slides, 1):
        if os.path.exists(slide_file):
            print(f"Processing slide {i}/{len(slides)}: {slide_file}")
            slide_content = extract_slide_content(slide_file)
            
            # Wrap slide content in a page div
            combined_html += f'<div class="slide-page" id="slide-{i}">\n'
            combined_html += slide_content
            combined_html += '\n</div>\n\n'
        else:
            print(f"Warning: {slide_file} not found")
    
    combined_html += """
</body>
</html>"""
    
    # Write the combined file
    with open('combined_presentation.html', 'w', encoding='utf-8') as f:
        f.write(combined_html)
    
    print("Combined presentation created: combined_presentation.html")
    print("You can now open this file in a browser and print to PDF")

if __name__ == "__main__":
    create_combined_html()
