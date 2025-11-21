// main.js - Juyeon's Portfolio JavaScript

// ========================================
// 1. 현재 시간에 따른 인사말 변경
// ========================================
function updateGreeting() {
  const hour = new Date().getHours();
  const greetingElement = document.querySelector(".home__description");

  if (!greetingElement) return;

  if (hour >= 5 && hour < 12) {
    greetingElement.textContent =
      "좋은 아침입니다! 우주에서 가장 뛰어난 AI 개발자";
  } else if (hour >= 12 && hour < 18) {
    greetingElement.textContent =
      "좋은 오후입니다! 우주에서 가장 뛰어난 AI 개발자";
  } else {
    greetingElement.textContent =
      "좋은 저녁입니다! 우주에서 가장 뛰어난 AI 개발자";
  }
}

// ========================================
// 2. 부드러운 스크롤 기능
// ========================================
function initSmoothScroll() {
  // 모든 메뉴 아이템에 스크롤 이벤트 추가
  const menuItems = document.querySelectorAll(".header__menu__item");

  menuItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = item.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // TOP 버튼 클릭 이벤트
  const arrowUp = document.querySelector("aside a");
  if (arrowUp) {
    arrowUp.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // 홈 연락처 버튼도 부드럽게
  const homeContact = document.querySelector(".home__contact");
  if (homeContact) {
    homeContact.addEventListener("click", (e) => {
      e.preventDefault();
      const contactSection = document.querySelector("#contact");
      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }
}

// ========================================
// 3. 스크롤에 따른 메뉴 하이라이트
// ========================================
function updateActiveMenu() {
  const sections = document.querySelectorAll("section[id]");
  const menuItems = document.querySelectorAll(".header__menu__item");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      // 현재 스크롤 위치가 섹션 안에 있는지 확인
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    // 모든 메뉴 아이템의 active 클래스 제거 후 현재 섹션에 추가
    menuItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active");
      }
    });
  });
}

// ========================================
// 4. 스크롤 애니메이션 (Intersection Observer)
// ========================================
function initScrollAnimation() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // 애니메이션을 적용할 요소들 선택
  const animateElements = document.querySelectorAll(
    ".major, .job, .bar, .project, .license"
  );

  // 각 요소에 초기 스타일 설정 및 관찰 시작
  animateElements.forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
    observer.observe(el);
  });
}

// ========================================
// 5. 프로젝트 모달 기능
// ========================================
function initProjectModal() {
  // 모달 HTML 생성
  const modalHTML = `
    <div id="projectModal" style="
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.85);
      z-index: 1000;
      justify-content: center;
      align-items: center;
      padding: 20px;
    ">
      <div style="
        background: white;
        padding: 2rem;
        border-radius: 15px;
        max-width: 600px;
        width: 90%;
        position: relative;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        animation: modalSlideIn 0.3s ease-out;
      ">
        <button id="closeModal" style="
          position: absolute;
          top: 15px;
          right: 20px;
          font-size: 2rem;
          cursor: pointer;
          background: none;
          border: none;
          color: #333;
          transition: transform 0.2s;
        ">&times;</button>
        <img id="modalImg" style="
          width: 100%;
          border-radius: 10px;
          margin-bottom: 1.5rem;
        " />
        <h3 id="modalTitle" style="
          color: #333;
          margin-bottom: 1rem;
          font-size: 1.8rem;
        "></h3>
        <p id="modalDesc" style="
          color: #666;
          line-height: 1.8;
          font-size: 1rem;
        ">
          이 프로젝트는 클론코딩을 통해 제작되었습니다. 
          HTML, CSS, JavaScript를 활용하여 반응형 웹사이트를 구현하였으며, 
          사용자 경험을 최적화하는 데 중점을 두었습니다. 
          최신 웹 기술과 디자인 트렌드를 반영하여 완성도 높은 결과물을 만들었습니다.
        </p>
        <div style="
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid #eee;
        ">
          <strong style="color: #dee0bd;">사용 기술:</strong>
          <span style="color: #666;"> HTML5, CSS3, JavaScript ES6+</span>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // 모달 요소 가져오기
  const modal = document.getElementById("projectModal");
  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");
  const closeBtn = document.getElementById("closeModal");

  // 모든 프로젝트 카드에 클릭 이벤트 추가
  const projects = document.querySelectorAll(".project");

  projects.forEach((project) => {
    const link = project.querySelector("a");
    if (link) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const img = project.querySelector(".project__img");
        const title = project.querySelector(".project__title");

        if (img && title) {
          modalImg.src = img.src;
          modalTitle.textContent = title.textContent;
          modal.style.display = "flex";
          document.body.style.overflow = "hidden"; // 스크롤 방지
        }
      });
    }
  });

  // 닫기 버튼 클릭
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  // 모달 외부 클릭 시 닫기
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // ESC 키로 모달 닫기
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // 호버 효과 추가
  closeBtn.addEventListener("mouseenter", () => {
    closeBtn.style.transform = "rotate(90deg)";
  });
  closeBtn.addEventListener("mouseleave", () => {
    closeBtn.style.transform = "rotate(0deg)";
  });
}

// ========================================
// 6. 프로젝트 카테고리 필터링
// ========================================
function initCategoryFilter() {
  const categories = document.querySelectorAll(".category");
  const projects = document.querySelectorAll(".project");

  categories.forEach((category) => {
    category.addEventListener("click", () => {
      // 모든 카테고리의 selected 클래스 제거
      categories.forEach((cat) => cat.classList.remove("category--selected"));

      // 클릭한 카테고리에 selected 클래스 추가
      category.classList.add("category--selected");

      // 프로젝트들에 애니메이션 효과
      projects.forEach((project, index) => {
        project.style.animation = "none";
        setTimeout(() => {
          project.style.animation = `fadeIn 0.5s ease-out ${
            index * 0.05
          }s forwards`;
        }, 10);
      });
    });
  });
}

// ========================================
// 7. TOP 버튼 표시/숨김
// ========================================
function initArrowUpButton() {
  const arrowUp = document.querySelector("aside");

  if (arrowUp) {
    // 초기 상태: 숨김
    arrowUp.style.opacity = "0";
    arrowUp.style.pointerEvents = "none";
    arrowUp.style.transition = "opacity 0.3s ease, transform 0.3s ease";

    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        arrowUp.style.opacity = "1";
        arrowUp.style.pointerEvents = "auto";
        arrowUp.style.transform = "translateY(0)";
      } else {
        arrowUp.style.opacity = "0";
        arrowUp.style.pointerEvents = "none";
        arrowUp.style.transform = "translateY(20px)";
      }
    });
  }
}

// ========================================
// 8. 헤더 스크롤 효과
// ========================================
function initHeaderEffect() {
  const header = document.querySelector(".header");

  if (header) {
    header.style.transition = "all 0.3s ease";

    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.style.background = "rgba(0, 0, 0, 0.95)";
        header.style.boxShadow = "0 2px 15px rgba(0,0,0,0.3)";
        header.style.padding = "0.7rem 1rem";
      } else {
        header.style.background = "var(--color-primary)";
        header.style.boxShadow = "none";
        header.style.padding = "1rem";
      }
    });
  }
}

// ========================================
// 9. 스킬 바 애니메이션
// ========================================
function initSkillBarAnimation() {
  const skillBars = document.querySelectorAll(".bar__value");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.style.width;
          bar.style.width = "0%";

          setTimeout(() => {
            bar.style.transition = "width 1.5s ease-out";
            bar.style.width = width;
          }, 200);

          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillBars.forEach((bar) => observer.observe(bar));
}

// ========================================
// 10. CSS 애니메이션 추가
// ========================================
function addAnimationStyles() {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes modalSlideIn {
      from {
        opacity: 0;
        transform: translateY(-50px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .major:hover {
      transform: translateY(-10px);
      transition: transform 0.3s ease;
    }
    
    .project a {
      display: block;
      transition: transform 0.3s ease;
    }
    
    .project a:hover {
      transform: scale(1.05);
    }
  `;
  document.head.appendChild(style);
}

// ========================================
// 11. 로딩 애니메이션
// ========================================
function initLoadingAnimation() {
  const sections = document.querySelectorAll("section");
  sections.forEach((section, index) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = `all 0.6s ease-out ${index * 0.1}s`;

    setTimeout(() => {
      section.style.opacity = "1";
      section.style.transform = "translateY(0)";
    }, 100);
  });
}

// ========================================
// 메인 초기화 함수
// ========================================
function init() {
  console.log("🚀 Portfolio JavaScript Loaded!");

  // 모든 기능 초기화
  updateGreeting();
  initSmoothScroll();
  updateActiveMenu();
  initScrollAnimation();
  initProjectModal();
  initCategoryFilter();
  initArrowUpButton();
  initHeaderEffect();
  initSkillBarAnimation();
  addAnimationStyles();
  initLoadingAnimation();

  // 1분마다 인사말 업데이트
  setInterval(updateGreeting, 60000);

  console.log("✅ All features initialized successfully!");
}

// ========================================
// DOM 로드 완료 후 실행
// ========================================
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

// ========================================
// 유틸리티: 디바운스 함수 (성능 최적화)
// ========================================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
