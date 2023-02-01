

const Layout = ( {children} ) => {
  return (
    <>
      <header>
        <h1>Title</h1>
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
