import { FcVoicePresentation } from "react-icons/fc";

function HomeCommunity() {
  return (
    <div className="home-community">
      <h3>
        커뮤니티<span>전체보기 {">"}</span>
      </h3>
      <ul>
        <li>
          <p className="home-community-title">2023년 최저시급 및 월 급여</p>
          <div className="home-community-info">
            <span className="home-community-info-category">자유게시판</span>
            <span>·</span>
            <span className="home-community-info-nickname">포미아파</span>
            <span>·</span>

            <span className="home-community-info-count">
              <FcVoicePresentation />2
            </span>
          </div>
        </li>
        <li>
          <p className="home-community-title">2023년 최저시급 및 월 급여</p>
          <div className="home-community-info">
            <span className="home-community-info-category">자유게시판</span>
            <span>·</span>

            <span className="home-community-info-nickname">포미아파</span>
            <span>·</span>

            <span className="home-community-info-count">
              <FcVoicePresentation />2
            </span>
          </div>
        </li>
        <li>
          <p className="home-community-title">2023년 최저시급 및 월 급여</p>
          <div className="home-community-info">
            <span className="home-community-info-category">자유게시판</span>
            <span>·</span>

            <span className="home-community-info-nickname">포미아파</span>
            <span>·</span>

            <span className="home-community-info-count">
              <FcVoicePresentation />2
            </span>
          </div>
        </li>
      </ul>
      <div className="home-community-more-btn">
        <span>더보기</span>
      </div>
    </div>
  );
}

export default HomeCommunity;
