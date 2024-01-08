"use client";
import { useRouter } from "next/navigation";

function Footer() {
  let router = useRouter();

  return (
    <div className="footer">
      <div className="footer-inner">
        <div className="footer-info">
          <p>고객센터 070-1234-1234</p>
          <span>평일 오전 10시 ~ 오후 6시</span>
        </div>
        <div className="footer-info-list">
          <ul>
            <li>
              <span
                onClick={() => {
                  router.push("/notice");
                }}
              >
                공지사항
              </span>
            </li>
            <li>
              <span
                onClick={() => {
                  router.push("/inqury");
                }}
              >
                문의하기
              </span>
            </li>
          </ul>
        </div>
        <div className="footer-terms">
          <span>이용약관</span>
          <span>|</span>
          <span>개인정보보호정책</span>
        </div>
      </div>
      <div className="footer-copyright">
        <span>&copy;2023 reserved by Sam</span>
      </div>
    </div>
  );
}

export default Footer;
