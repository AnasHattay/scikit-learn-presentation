#!/usr/bin/env python3
"""
Simple PDF generator using browser automation
This script opens the presentation in a browser and generates a PDF
"""

import subprocess
import webbrowser
import time
import os

def generate_pdf_with_browser():
    """Generate PDF by opening in browser and providing instructions"""
    
    print("🚀 Starting PDF generation process...")
    print()
    
    # Get the current directory
    current_dir = os.getcwd()
    combined_file = os.path.join(current_dir, "combined_presentation.html")
    
    if not os.path.exists(combined_file):
        print("❌ Error: combined_presentation.html not found!")
        return
    
    print("📄 Found combined_presentation.html")
    print("🌐 Opening in Safari...")
    
    # Open in Safari
    subprocess.run(["open", "-a", "Safari", combined_file])
    
    print()
    print("=" * 60)
    print("📋 MANUAL STEPS TO COMPLETE PDF GENERATION:")
    print("=" * 60)
    print()
    print("1. In Safari, press Cmd + P")
    print("2. In the print dialog:")
    print("   - Select 'Save as PDF' from the dropdown")
    print("   - Click 'Show Details' to expand options")
    print("   - Set Orientation to 'Landscape'")
    print("   - Check 'Print backgrounds'")
    print("   - Set Scale to 'Fit to Page' or '100%'")
    print("3. Click 'Save' and choose your location")
    print()
    print("💡 TIP: The PDF will contain all 15 slides, one per page")
    print("=" * 60)
    
    # Also try opening in Chrome as backup
    print()
    print("🔄 Also opening in Chrome as backup option...")
    subprocess.run(["open", "-a", "Google Chrome", combined_file])
    
    print()
    print("✅ Both Safari and Chrome should now be open with your presentation")
    print("   Choose whichever browser works better for PDF export")

if __name__ == "__main__":
    generate_pdf_with_browser()
