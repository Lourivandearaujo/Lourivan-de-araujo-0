// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const mobileMenu = document.getElementById("mobileMenu")
  const menuIcon = document.getElementById("menuIcon")
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")

  // Toggle mobile menu
  mobileMenuBtn.addEventListener("click", () => {
    const isOpen = mobileMenu.style.display === "block"

    if (isOpen) {
      mobileMenu.style.display = "none"
      menuIcon.className = "fas fa-bars"
    } else {
      mobileMenu.style.display = "block"
      menuIcon.className = "fas fa-times"
    }
  })

  // Close mobile menu when clicking on links
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.style.display = "none"
      menuIcon.className = "fas fa-bars"
    })
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    const isClickInsideMenu = mobileMenu.contains(event.target)
    const isClickOnButton = mobileMenuBtn.contains(event.target)

    if (!isClickInsideMenu && !isClickOnButton && mobileMenu.style.display === "block") {
      mobileMenu.style.display = "none"
      menuIcon.className = "fas fa-bars"
    }
  })

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]')

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetSection.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Header background change on scroll
  const header = document.querySelector(".header")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.style.background = "rgba(15, 23, 42, 0.98)"
    } else {
      header.style.background = "rgba(15, 23, 42, 0.95)"
    }
  })

  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animateElements = document.querySelectorAll(".area-card, .contato-card, .sobre-text, .sobre-image")

  animateElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

  // WhatsApp and Phone click tracking (optional analytics)
  const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]')
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]')

  whatsappLinks.forEach((link) => {
    link.addEventListener("click", () => {
      console.log("WhatsApp link clicked")
      // Add analytics tracking here if needed
    })
  })

  phoneLinks.forEach((link) => {
    link.addEventListener("click", () => {
      console.log("Phone link clicked")
      // Add analytics tracking here if needed
    })
  })

  // Add loading animation for images
  const images = document.querySelectorAll("img")

  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1"
    })

    // Set initial opacity
    img.style.opacity = "0"
    img.style.transition = "opacity 0.3s ease"

    // If image is already loaded
    if (img.complete) {
      img.style.opacity = "1"
    }
  })

  // Stats counter animation
  const statsNumbers = document.querySelectorAll(".stat-number")

  const animateStats = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target
        const finalNumber = target.textContent
        const number = Number.parseInt(finalNumber.replace(/\D/g, ""))
        const suffix = finalNumber.replace(/\d/g, "")

        let current = 0
        const increment = number / 50
        const timer = setInterval(() => {
          current += increment
          if (current >= number) {
            current = number
            clearInterval(timer)
          }
          target.textContent = Math.floor(current) + suffix
        }, 30)

        observer.unobserve(target)
      }
    })
  }

  const statsObserver = new IntersectionObserver(animateStats, {
    threshold: 0.5,
  })

  statsNumbers.forEach((stat) => {
    statsObserver.observe(stat)
  })
})

// Utility function to format phone numbers
function formatPhoneNumber(phoneNumber) {
  const cleaned = phoneNumber.replace(/\D/g, "")
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/)
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }
  return phoneNumber
}

// Add smooth reveal animation for cards
function revealCards() {
  const cards = document.querySelectorAll(".area-card")

  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = "1"
      card.style.transform = "translateY(0)"
    }, index * 200)
  })
}

// Initialize card animations when page loads
window.addEventListener("load", () => {
  // Small delay to ensure all elements are rendered
  setTimeout(revealCards, 500)
})
