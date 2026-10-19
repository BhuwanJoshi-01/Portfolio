import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Smooth-scrolls to a section on the landing page, or routes back to it
 * (the Index page reads `state.scrollTo` once mounted).
 */
const useSectionNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return useCallback(
    (id) => {
      if (location.pathname === '/') {
        const el = document.getElementById(id);
        if (id === 'home' || !el) window.scrollTo({ top: 0, behavior: 'smooth' });
        else el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      navigate('/', { state: { scrollTo: id } });
    },
    [location.pathname, navigate]
  );
};

export default useSectionNav;
