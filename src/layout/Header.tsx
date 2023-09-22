import { Button, Dropdown, Navbar } from 'flowbite-react';
import { useLocation } from 'react-router-dom';
import DarkModeSwitcher from '../components/DarkModeSwitcher';
import Web3connect from '../components/Web3connect';
import { logo, pages, webTitle } from '../constants/menus';

const Header = () => {
  const { pathname } = useLocation();
  return (
    <Navbar fluid={true}>
      <Navbar.Brand href="/">
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          {webTitle}
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Web3connect />
        <DarkModeSwitcher />
        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        {pages.map(({ path, label, pages }, idx) => {
          if (Array.isArray(pages) && pages.length > 0) {
            return (
              <>
                <Dropdown label={label} inline={true} placement="bottom">
                  {pages.map(({ path: path2, label, pages }, idx) => {
                    if (Array.isArray(pages) && pages.length > 0) {
                      return (
                        <Dropdown.Item key={`main-dropdown-${idx}`}>
                          <Dropdown
                            placement="right"
                            label={label}
                            inline={true}
                          >
                            {pages.map(({ path: path3, label, pages }, idx) => {
                              const combinedPath = `${path}/${path2}/${path3}`;
                              return (
                                <Dropdown.Item
                                  key={`secondary-dropdown-${idx}`}
                                >
                                  <Navbar.Link
                                    href={combinedPath}
                                    active={combinedPath === pathname}
                                    key={idx}
                                  >
                                    {label}
                                  </Navbar.Link>
                                </Dropdown.Item>
                              );
                            })}
                          </Dropdown>
                        </Dropdown.Item>
                      );
                    }
                    const combinedPath = `${path}/${path2}`;
                    return (
                      <Dropdown.Item key={`main-dropdown-${idx}`}>
                        <Navbar.Link
                          href={combinedPath}
                          active={combinedPath === pathname}
                          key={idx}
                        >
                          {label}
                        </Navbar.Link>
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown>
              </>
            );
          }
          return (
            <Navbar.Link href={path} active={path === pathname} key={idx}>
              {label}
            </Navbar.Link>
          );
        })}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
