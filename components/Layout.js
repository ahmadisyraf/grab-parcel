// components/layout.js

import NavBar from "./NavBar"

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  )
}