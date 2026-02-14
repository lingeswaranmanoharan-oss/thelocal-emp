import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import SideNav from '../sidenav/SideNav';
import { useState, useEffect } from 'react';
import config from '../../config/config';
import axios from 'axios';
import { getEmpById } from '../../features/profile/services/EmpService';
import { getEmpId } from '../../utils/function';
import toaster from '../../services/toasterService';

export const Container = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [empData, setEmpData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // useEffect(() => {
  //   const get = async () => {
  //     try {
  //       const refreshResponse = await axios.post(
  //         `${config.apiBaseUrl}/api-hrm/auth/refresh`,
  //         null,
  //         {
  //           withCredentials: true,
  //         },
  //       );
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   get();
  // }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  useEffect(() => {
    const fetchCompanyData = async () => {
      setIsLoading(true);
      try {
        const response = await getEmpById(getEmpId());
        if (response && response.success && response.data) {
          setEmpData(response.data);
        }
      } catch (error) {
        if (error.response) {
          const { message } = error.response.data?.error || {};
          toaster.error(message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyData();
  }, []);
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <SideNav
          currentPage={currentPage}
          onPageChange={handlePageChange}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          empData={empData}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Navbar */}
          <Header empData={empData} onMobileMenuToggle={handleMobileMenuToggle} />

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-5">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
