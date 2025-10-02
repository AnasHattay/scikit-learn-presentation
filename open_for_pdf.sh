#!/bin/bash

# Open the combined presentation in Safari for PDF export
echo "Opening combined_presentation.html in Safari..."
echo "Once opened:"
echo "1. Press Cmd+P"
echo "2. Select 'Save as PDF'"
echo "3. Set orientation to 'Landscape'"
echo "4. Enable 'Print backgrounds'"
echo "5. Click 'Save'"

open -a Safari combined_presentation.html
