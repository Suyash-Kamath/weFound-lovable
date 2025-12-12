import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import { QrCode, User, LogOut, LayoutDashboard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="site-navbar">
      <div className="site-container">
        <Link to="/" className="site-logo">
          <div className="logo-badge">
            <QrCode />
          </div>
          <span className="site-title">Lost<span className="site-title-accent">Found</span>QR</span>
        </Link>

        <div className="nav-actions">
          {isAuthenticated ? (
            <>
              <a href="/dashboard" className="nav-link">Dashboard</a>

              <div className="avatar-button">
                <div className="avatar-fallback">{user?.name?.charAt(0).toUpperCase() || 'U'}</div>
              </div>
              <div className="dropdown-menu">
                <div className="dropdown-content">
                  <div className="dropdown-user">
                    <p className="user-name">{user?.name}</p>
                    <p className="user-email">{user?.email}</p>
                  </div>
                  <a href="/profile" className="dropdown-item">Profile</a>
                  <a href="/dashboard" className="dropdown-item">Dashboard</a>
                  <button onClick={handleLogout} className="dropdown-item destructive">Log out</button>
                </div>
              </div>
            </>
          ) : (
            <>
              <a href="/auth" className="nav-link">Sign In</a>
              <a href="/auth?mode=register" className="btn-primary">Get Started</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
