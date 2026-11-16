import '@/styles/HomePage.css'
import sonaIcon from '@/../assets/Champie_Sona_profileicon.png'

export function HomePage() {

  return (
    <div className="sona-home">
      {/* SONA 标题 */}
      <h1 className="sona-home-brand">
        <span className="sona-home-brand-text">SONA</span>
      </h1>

      {/* 头像 */}
      <div className="sona-home-avatar-wrap">
        <img
          className="sona-home-avatar"
          src={sonaIcon}
          alt="Sona"
          draggable={false}
        />
      </div>

      {/* 欢迎语 */}
      <div className="sona-home-welcome">
        <h2 className="sona-home-heading">{'欢迎使用 Sona'}</h2>
        <p className="sona-home-subtitle">
          {'你的英雄联盟客户端增强工具'}
        </p>
      </div>

      {/* 琴女语录 */}
      <p className="sona-home-quote">
        {'"本项目完全开源免费，如果你通过收费渠道使用，那你被骗啦!"'}
        <br />
        &nbsp;{'—— 神奇的WJZ_P'}
      </p>
    </div>
  )
}
