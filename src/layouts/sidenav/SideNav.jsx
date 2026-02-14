import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const menuConfig = [
  {
    key: 'employee',
    label: 'Profile',
    icon: 'streamline-ultimate:human-resources-search-employees-bold',
    children: [{ label: 'My Details', path: '/My-details' }],
  },
];

const SideNav = ({ isMobileMenuOpen, setIsMobileMenuOpen, empData }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [expandedMenu, setExpandedMenu] = useState({});

  const toggleMenu = (key) => {
    setExpandedMenu((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleNavigate = (path) => {
    navigate(path);
    if (window.innerWidth < 1024) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between px-6 py-3 border-b">
            <div className="flex items-center my-2">
              <img
                src={
                  empData?.companyLogoUrl ||
                  `https://placehold.co/600x400?text=${'fetching logo...'}`
                }
                alt="logo"
                className="h-14 w-full rounded-full object-contain"
              />
            </div>

            <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(false)}>
              <Icon icon="mdi:close" />
            </button>
          </div>

          {/* Menu */}
          <nav className="flex-1 overflow-y-auto px-4 py-6">
            {menuConfig.map((menu) => (
              <div key={menu.key} className="mb-1">
                <button
                  onClick={() => toggleMenu(menu.key)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <Icon icon={menu.icon} className="w-5 h-5" />
                    <span className="font-medium">{menu.label}</span>
                  </div>

                  <Icon
                    icon={expandedMenu[menu.key] ? 'mdi:chevron-down' : 'mdi:chevron-right'}
                    className="text-xs"
                  />
                </button>

                {expandedMenu[menu.key] && (
                  <div className="ml-8 mt-1 space-y-1">
                    {menu.children.map((child) => (
                      <button
                        key={child.path}
                        onClick={() => handleNavigate(child.path)}
                        className={`w-full text-left px-3 py-2 text-sm rounded-lg ${
                          pathname === child.path ? 'bg-orange-600 text-white' : 'text-gray-600'
                        }`}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default SideNav;
