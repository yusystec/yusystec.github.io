// 共通メニュー設定
const menuItems = [
  { text: '私たちについて', href: 'index.html#about' },
  { text: 'サービス概要', href: 'index.html#plans' },
  { text: '会社情報', href: 'index.html#company' },
  { text: '問い合わせ', href: 'index.html#contact' },
];

// 共通電話番号設定
const phoneNumber = 'TEL : 03-4500-5749';

// 共通ヘッダー設定
const headerConfig = {
  companyName: '合同会社優豊電算',
  logoPath: 'logo.png',
  logoAlt: '会社ロゴ'
};

// ヘッダーを生成する関数
function generateHeader() {
  const header = document.querySelector('header');
  if (!header) return;

  // 現在のページに基づいて問い合わせリンクを調整
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const contactHref = currentPage === 'index.html' ? '#contact' : 'index.html#contact';

  // メニューHTMLを生成
  const menuHTML = generateMenuHTML();

  header.innerHTML = `
    <div class="header-logo-title">
      <img src="${headerConfig.logoPath}" alt="${headerConfig.logoAlt}" class="company-logo">
      <h1>${headerConfig.companyName}</h1>
    </div>
    <nav class="header-nav">
      ${menuHTML}
    </nav>
    <div class="header-right">
      <div class="header-phone">
        <span class="phone-number">${phoneNumber}</span>
      </div>
      <div class="header-contact">
        <a href="${contactHref}" class="contact-button">お問い合わせ</a>
      </div>
    </div>
  `;
}

// メニューHTMLを生成する関数
function generateMenuHTML() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  const menuItemsHTML = menuItems.map(item => {
    let href = item.href;
    
    // 現在のページに応じてリンクを調整
    if (currentPage === 'index.html' && item.href.startsWith('index.html#')) {
      href = item.href.replace('index.html', '');
    } else if (currentPage !== 'index.html' && item.href.startsWith('index.html#')) {
      href = item.href;
    } else {
      href = item.href;
    }
    
    return `<li><a href="${href}">${item.text}</a></li>`;
  }).join('');
  
  return `<ul>${menuItemsHTML}</ul>`;
}

// 電話番号を生成する関数（個別更新用）
function generatePhoneNumber() {
  const phoneContainer = document.querySelector('.header-phone .phone-number');
  if (phoneContainer) {
    phoneContainer.textContent = phoneNumber;
  }
}


// スムーススクロール機能を追加
function addSmoothScroll() {
  // ヘッダーナビゲーションのリンク
  document.querySelectorAll('.header-nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = 80; // 固定ヘッダーの高さ
        const targetPosition = target.offsetTop - headerHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // ヘッダーの問い合わせボタン
  document.querySelectorAll('.contact-button').forEach(button => {
    button.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      // 同じページ内のアンカーリンクの場合
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerHeight = 80; // 固定ヘッダーの高さ
          const targetPosition = target.offsetTop - headerHeight - 20;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
      }
      // 外部ページへのリンクの場合（index.html#contact）
      else if (href.includes('index.html#contact')) {
        e.preventDefault();
        window.location.href = href;
      }
    });
  });
}

// アクティブリンクの更新機能
function updateActiveLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.header-nav a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  let current = '';
  
  // index.htmlの場合：スクロール位置に基づいてアクティブセクションを決定
  if (currentPage === 'index.html') {
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });
  }
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    
    // index.htmlの場合：セクションリンクのハイライト
    if (currentPage === 'index.html' && href === '#' + current) {
      link.classList.add('active');
    }
    // 外部ページの場合：現在のページに対応するリンクをハイライト
    else if (currentPage !== 'index.html' && href === currentPage) {
      link.classList.add('active');
    }
  });
}

// ページ読み込み時にヘッダー、メニュー、電話番号を生成し、スクロール機能を追加
document.addEventListener('DOMContentLoaded', function() {
  generateHeader();
  // ヘッダー生成後にスクロール機能を追加
  setTimeout(addSmoothScroll, 10);
  
  // 初期状態でアクティブリンクを更新
  updateActiveLinks();
  
  // スクロールイベントリスナーを追加
  window.addEventListener('scroll', updateActiveLinks);
});
