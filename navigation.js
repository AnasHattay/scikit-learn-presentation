// Navigation script for Python Data Structures presentation
document.addEventListener('DOMContentLoaded', function() {
  // Check if user prefers fullscreen mode
  if (sessionStorage.getItem('preferFullscreen') === 'true') {
    // Show a notification to re-enter fullscreen
    const notification = document.createElement('div');
    notification.innerHTML = `
      <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                  background: rgba(18, 55, 122, 0.95); color: white; padding: 20px; 
                  border-radius: 10px; text-align: center; z-index: 10000; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
        <p style="margin: 0 0 15px 0; font-size: 16px;">Click to re-enter fullscreen mode</p>
        <button onclick="this.parentElement.parentElement.remove(); document.documentElement.requestFullscreen();" 
                style="background: white; color: #12377A; border: none; padding: 10px 20px; 
                       border-radius: 5px; cursor: pointer; font-weight: bold;">Enter Fullscreen</button>
        <button onclick="this.parentElement.parentElement.remove(); sessionStorage.removeItem('preferFullscreen');" 
                style="background: transparent; color: white; border: 1px solid white; padding: 10px 20px; 
                       border-radius: 5px; cursor: pointer; margin-left: 10px;">Skip</button>
      </div>
    `;
    document.body.appendChild(notification);
    
    // Auto-remove notification after 10 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 10000);
  }
  // Define the slide order
  const slideOrder = [
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
  
  // Get current slide filename
  const currentPath = window.location.pathname;
  const currentSlide = currentPath.substring(currentPath.lastIndexOf('/') + 1);
  
  // Find current slide index
  const currentIndex = slideOrder.indexOf(currentSlide);
  
  // Create navigation container
  const navContainer = document.createElement('div');
  navContainer.className = 'fixed bottom-4 left-0 right-0 flex justify-center space-x-4';
  
  // Function to navigate while preserving fullscreen
  function navigateToSlide(url) {
    const wasFullscreen = !!document.fullscreenElement;
    
    if (wasFullscreen) {
      // If in fullscreen, show a notification and let user choose
      const shouldNavigate = confirm('Navigation will exit fullscreen mode. Do you want to continue?');
      if (shouldNavigate) {
        // Store fullscreen preference for manual restoration
        sessionStorage.setItem('preferFullscreen', 'true');
        window.location.href = url;
      }
    } else {
      // Normal navigation when not in fullscreen
      window.location.href = url;
    }
  }
  
  // Create home button
  const homeButton = document.createElement('button');
  homeButton.onclick = () => navigateToSlide('index.html');
  homeButton.className = 'bg-white text-[#12377A] px-4 py-2 rounded-lg shadow hover:bg-[#12377A] hover:text-white transition-all';
  homeButton.innerHTML = '<i class="fas fa-home"></i> Home';
  navContainer.appendChild(homeButton);
  
  // Create previous button if not first slide
  if (currentIndex > 0) {
    const prevButton = document.createElement('button');
    prevButton.onclick = () => navigateToSlide(slideOrder[currentIndex - 1]);
    prevButton.className = 'bg-white text-[#12377A] px-4 py-2 rounded-lg shadow hover:bg-[#12377A] hover:text-white transition-all';
    prevButton.innerHTML = '<i class="fas fa-arrow-left"></i> Previous';
    navContainer.appendChild(prevButton);
  }
  
  // Create next button if not last slide
  if (currentIndex < slideOrder.length - 1) {
    const nextButton = document.createElement('button');
    nextButton.onclick = () => navigateToSlide(slideOrder[currentIndex + 1]);
    nextButton.className = 'bg-white text-[#12377A] px-4 py-2 rounded-lg shadow hover:bg-[#12377A] hover:text-white transition-all';
    nextButton.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
    navContainer.appendChild(nextButton);
  }
  
  // Add slide counter
  const slideCounter = document.createElement('div');
  slideCounter.className = 'bg-white text-[#12377A] px-4 py-2 rounded-lg shadow';
  slideCounter.innerHTML = `Slide ${currentIndex + 1} of ${slideOrder.length}`;
  navContainer.appendChild(slideCounter);
  
  // Add navigation to body
  document.body.appendChild(navContainer);
  
  // Add keyboard navigation
  document.addEventListener('keydown', function(e) {
    // Left arrow key for previous slide
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
      navigateToSlide(slideOrder[currentIndex - 1]);
    }
    // Right arrow key for next slide
    else if (e.key === 'ArrowRight' && currentIndex < slideOrder.length - 1) {
      navigateToSlide(slideOrder[currentIndex + 1]);
    }
    // Home key for index page
    else if (e.key === 'Home') {
      navigateToSlide('index.html');
    }
  });
});
