import './globals.css';
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className="layout-body">
        <aside className="sidebar">
          <h2 className="sidebar-title">记账管理</h2>
          <nav className="sidebar-nav">
            <Link href="/" className="sidebar-link">查看收支</Link>
            <Link href="/add" className="sidebar-link">添加收支</Link>
            <Link href="/chart" className="sidebar-link">收支图表</Link>
            <Link href="/download" className="sidebar-link">下载</Link>
          </nav>
        </aside>
        
        <main className="main-content">{children}</main>
      </body>
    </html>
  );
}
