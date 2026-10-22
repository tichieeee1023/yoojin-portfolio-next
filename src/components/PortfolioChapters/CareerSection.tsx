const careerEntries = [
  {
    id: 'social-enterprise', company: '사회적기업',
    start: '2019-03', end: '2020-01', period: '11개월',
    role: '사원 · 기획 / 마케팅 / 운영',
    tasks: [
      '홈페이지·블로그·네이버 스마트스토어 관리',
      'SNS 마케팅과 온라인 홍보 콘텐츠 운영',
      '교육 프로그램 구상·진행, 사회적기업 오프라인 행사 참여·판매',
      '시장조사와 신상품 구상, 기획서·보고서 작성',
    ],
  },
  {
    id: 'moonha', company: '드림팩토리 월하',
    brand: '핸드메이드 브랜드 월하공방(月下工房)',
    start: '2015-05', end: '2019-02', period: '3년 10개월',
    role: '개인 사업 · 브랜드 운영 / 온라인 판매',
    tasks: [
      '핸드메이드 상품 기획·제작, 상품 관리와 판매',
      '아이디어스 입점 작가 활동, 고객 관리',
      '상품 홍보·상세페이지·카탈로그 구상·제작',
      '블로그·홍보용 SNS 운영, 신상품·이벤트 기획과 수공예 행사 참가',
    ],
  },
] as const;

export default function CareerSection() {
  return <section id="about-career" className="aboutScreen aboutScreen--career" aria-labelledby="career-title">
    <div className="careerSheet">
      <div className="aboutDetailHead"><span>03 / EXPERIENCE</span><span>BEFORE FRONTEND</span></div>
      <header className="careerIntro">
        <div><h2 id="career-title">EXPERIENCE.</h2><p>개발 이전, 상품과 콘텐츠를 기획하고 제작·운영하며 쌓은 실무 경험입니다.</p></div>
        <p className="careerSummary"><span>2015–2020</span><strong>총 4년 9개월</strong><span>기획 / 마케팅 / 온라인 운영</span></p>
      </header>
      <div className="careerBody">
        <div className="careerTimeline">
          {careerEntries.map((entry, index) => <article className="careerEntry" key={entry.id} aria-labelledby={'career-' + entry.id}>
            <div className="careerDates"><span className="careerIndex">0{index + 1}</span><p><time dateTime={entry.start}>{entry.start.replace('-', '.')}</time><span aria-hidden="true"> – </span><time dateTime={entry.end}>{entry.end.replace('-', '.')}</time></p><span>{entry.period}</span></div>
            <div className="careerDetails">
              <h3 id={'career-' + entry.id}>{entry.company}</h3>
              {'brand' in entry && <p className="careerBrand">{entry.brand}</p>}
              <p className="careerRole">{entry.role}</p>
              <ul>{entry.tasks.map(task => <li key={task}>{task}</li>)}</ul>
              {entry.id === 'moonha' && <div className="careerActivities"><span>2016년경 / 주요 활동</span><p>반디앤루니스 사당역점·센트럴시티점 문구매장 상품 입점 · 티몬 상품 입점</p></div>}
            </div>
          </article>)}
        </div>
        <figure className="careerPhoto">
          <span>MOONHA / STORE RECORD</span>
          <img src="/assets/career/moonha_offline_display.webp" alt="반디앤루니스 매장에 진열된 월하공방 상품과 브랜드 간판" width="1316" height="730" loading="lazy" decoding="async" />
          <figcaption>월하공방 · 반디앤루니스 오프라인 매장 상품 진열 기록</figcaption>
        </figure>
      </div>
      <a className="careerNext" href="#about-background">NEXT / BACKGROUND <span aria-hidden="true">↘</span></a>
    </div>
  </section>;
}
