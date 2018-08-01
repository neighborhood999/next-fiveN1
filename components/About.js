import Link from 'next/link';
import { compose, withState, withHandlers, lifecycle } from 'recompose';
import { Container } from '../utils/styledComponent';

const enhance = compose(
  withState('collapseStatus', 'setCollapse', false),
  withHandlers({
    onClick: ({ setCollapse }) => event => {
      const githubCardDOM = document.getElementById('ghcard-neighborhood999-1');
      githubCardDOM.height = 155;

      setCollapse(status => !status);
    }
  }),
  lifecycle({
    componentDidMount() {
      const script = document.createElement('script');

      script.src = '//cdn.jsdelivr.net/github-cards/latest/widget.js';
      script.async = true;

      document.body.appendChild(script);
    }
  })
);

const About = ({ collapseStatus, onClick, transition }) => (
  <Container>
    <div className="row">
      <div className="col">
        <div className="jumbotron">
          <div className="container">
            <h1 className="display-4 mb-3">關於本站</h1>
            <p className="lead">
              提供更簡單友善的操作介面，快速查詢
              <Link href="https://www.591.com.tw/">
                <a> 591 </a>
              </Link>
              租屋網租屋資料。
            </p>
            <p className="text-muted">
              本站所有資訊來源與版權均為{' '}
              <Link href="https://www.591.com.tw/">
                <a> 591 </a>
              </Link>{' '}
              租屋網所有，如果對於網站有任何問題，歡迎來信到{' '}
              <img src="/static/mail.svg" width="25" height="25" />{' '}
              <a href="mailto:bivinity.pengzjie@gmail.com">
                bivinity.pengzjie@gmail.com
              </a>
              ，謝謝！
            </p>
            <hr />
            <p>
              <button
                className="btn btn-primary"
                type="button"
                data-toggle="collapse"
                data-target="#collapseDiv"
                aria-expanded="false"
                aria-controls="collapseDiv"
                onClick={onClick}
              >
                了解更多關於網站的來由
              </button>
            </p>
            <div
              id="collapseDiv"
              className={
                collapseStatus ? 'collapse mb-3 show' : 'collapse mb-3'
              }
            >
              <div className="card card-body">
                <p className="text-muted">
                  在 2017 年來到台北工作後，當初因為 on board
                  時間非常匆忙所以隨意就找了一個租屋處，但並不是很滿意，因為環境非常的潮濕，造成我時常過敏非常的不舒服，所以都利用下班的空閒時間，刷一下租屋網的資料，希望可以找到價格不錯而且又不太潮濕的地方。
                </p>
                <p className="text-muted">
                  因為每天都要到 591
                  租屋網去查詢，開始覺得有點麻煩，於是就開始研究如何可以更快的取得我想要的租屋資料。在這個動力驅使之下，我開發了一個軟體，讓我可以方便在{' '}
                  <img
                    width="25"
                    height="25"
                    src="https://png.icons8.com/windows/96/000000/console.png"
                  />{' '}
                  Terminal
                  執行後，得到一些簡易的文字資料，再選擇我感興趣的資料前往查詢，
                  <mark>本站就是基於這個軟體開發而成的</mark>。
                </p>
                <p className="text-muted">
                  底下的 GitHub Card 連結到該 Repository，你可以根據{' '}
                  <b>README</b>{' '}
                  的說明，來操作使用。如果你覺得不錯的話，歡迎給我一個 ⭐️
                  作為鼓勵，謝謝！
                </p>
                <div
                  className="github-card"
                  data-github="neighborhood999/fiveN1-rent-scraper"
                  data-width="100%"
                  data-height="155"
                  data-theme="default"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Container>
);

export default enhance(About);
