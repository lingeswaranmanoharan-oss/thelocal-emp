import './Header.scss';
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import useRouteInformation from '../../Hooks/useRouteInformation';
import { signOut } from '../../features/auth/services/authService';
import toaster from '../../services/toasterService';
import { getEmpById } from '../../features/profile/services/EmpService';
import { getEmpId, getNameProfileIcon } from '../../utils/function';

const Header = ({ onMobileMenuToggle, empData }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { logout } = useAuth();
  const { navigate } = useRouteInformation();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      logout();
      navigate('/login');
    }
  };

  return (
    <header
      className="sticky top-0 z-30 bg-white border-b"
      style={{ borderColor: 'var(--border-light)' }}
    >
      <div className="flex items-center justify-between px-4 lg:px-6 py-3">
        {/* Left Section */}
        <div className="flex items-center space-x-4 flex-1">
          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={onMobileMenuToggle}
          >
            <Icon icon="mdi:menu" className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <button
              className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <img
                src={
                  empData?.profileUrl || `https://placehold.co/600x400?text=${'fetching logo...'}`
                }
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
              <Icon
                icon="mdi:chevron-down"
                className="w-4 h-4 hidden sm:block"
                style={{ color: 'var(--text-secondary)' }}
              />
            </button>
            {/* <button
              className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <img
                src="https://ui-avatars.com/api/?name=Adrian&background=FF5733&color=fff&size=128"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
              <Icon
                icon="mdi:chevron-down"
                className="w-4 h-4 hidden sm:block"
                style={{ color: 'var(--text-secondary)' }}
              />
            </button> */}

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div
                className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border overflow-hidden"
                style={{ borderColor: 'var(--border-light)' }}
              >
                <div
                  onClick={() => setShowUserMenu(false)}
                  className="p-4 border-b"
                  style={{ borderColor: 'var(--border-light)' }}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={
                        empData?.profileUrl ||
                        `https://placehold.co/600x400?text=${'fetching logo...'}`
                      }
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {`${empData?.firstName ?? ''} ${empData?.lastName ?? ''}`}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        Employee
                      </p>
                    </div>
                  </div>
                </div>

                {/* <div className="py-2">
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2">
                    <Icon
                      icon="mdi:account-outline"
                      className="w-5 h-5"
                      style={{ color: 'var(--text-secondary)' }}
                    />
                    <Link to="/add-emp">
                      <span
                        onClick={() => setShowUserMenu(false)}
                        style={{ color: 'var(--text-primary)' }}
                      >
                        My Profile
                      </span>
                    </Link>

                  </button>

                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2">
                    <Icon
                      icon="mdi:cog-outline"
                      className="w-5 h-5"
                      style={{ color: 'var(--text-secondary)' }}
                    />
                    <span
                      onClick={() => setShowUserMenu(false)}
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Settings
                    </span>
                  </button>

                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2">
                    <Icon
                      icon="mdi:shield-lock-outline"
                      className="w-5 h-5"
                      style={{ color: 'var(--text-secondary)' }}
                    />
                    <span
                      onClick={() => setShowUserMenu(false)}
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Security
                    </span>
                  </button>
                </div> */}

                <div className="border-t" style={{ borderColor: 'var(--border-light)' }}>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <Icon
                      icon="mdi:logout"
                      className="w-5 h-5"
                      style={{ color: 'var(--status-red)' }}
                    />
                    <span style={{ color: 'var(--status-red)' }}>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
