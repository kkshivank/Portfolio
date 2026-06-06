import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Loader2, Shield, Key, LogOut, AlertTriangle } from "lucide-react";
import api from "../../api/axiosinstance";

export default function SecurityManager() {
  const navigate = useNavigate();
  
  const [isChanging, setIsChanging] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwords.newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters long");
    }
    
    if (passwords.newPassword !== passwords.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setIsChanging(true);
    const loadingToast = toast.loading("Updating password...");

    try {
      const response = await api.put("/admin/change-password", { 
        newPassword: passwords.newPassword 
      });
      
      toast.success(response.data.message || "Password changed successfully!", { id: loadingToast });
      
      // Clear form
      setPasswords({ newPassword: "", confirmPassword: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error changing password", { id: loadingToast });
    } finally {
      setIsChanging(false);
    }
  };

  const handleLogout = async () => {
    if (!window.confirm("Are you sure you want to log out?")) return;
    
    setIsLoggingOut(true);
    const loadingToast = toast.loading("Logging out...");

    try {
      // Direct API call to your backend logout controller
      await api.post("/admin/logout");
      
      toast.success("Logged out successfully", { id: loadingToast });
      navigate("/admin/login");
    } catch (error) {
      toast.error("Error logging out", { id: loadingToast });
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="max-w-4xl animate-fade-in">
      <div className="mb-6 border-b border-slate-700 pb-4">
        <h2 className="text-2xl font-bold text-slate-100 flex items-center">
          <Shield className="mr-3 text-teal-400" />
          Account & Security
        </h2>
        <p className="text-slate-400 text-sm mt-1">Manage your admin credentials and active session.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* CHANGE PASSWORD SECTION */}
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center border-b border-slate-700/50 pb-3">
            <Key className="h-5 w-5 mr-2 text-teal-400" />
            Change Password
          </h3>
          
          <form onSubmit={handlePasswordChange} className="space-y-4 pt-2">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">New Password</label>
              <input 
                type="password" 
                name="newPassword" 
                value={passwords.newPassword} 
                onChange={handleChange} 
                required 
                placeholder="••••••••"
                className="block w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Confirm New Password</label>
              <input 
                type="password" 
                name="confirmPassword" 
                value={passwords.confirmPassword} 
                onChange={handleChange} 
                required 
                placeholder="••••••••"
                className="block w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none" 
              />
            </div>

            <button 
              type="submit" 
              disabled={isChanging} 
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-slate-900 bg-teal-400 hover:bg-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400 disabled:opacity-70 transition-colors glow-teal mt-2"
            >
              {isChanging ? <Loader2 className="h-5 w-5 animate-spin" /> : "Update Password"}
            </button>
          </form>
        </div>

        {/* LOGOUT / DANGER ZONE SECTION */}
        <div className="bg-slate-800/50 p-6 rounded-xl border border-red-900/30 self-start">
          <h3 className="text-lg font-semibold text-red-400 mb-4 flex items-center border-b border-slate-700/50 pb-3">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Session Management
          </h3>
          
          <div className="pt-2">
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Logging out will clear your secure HTTP-only cookie and end your current admin session. You will need to log in again to make further changes to your portfolio.
            </p>
            
            <button 
              onClick={handleLogout}
              disabled={isLoggingOut} 
              className="w-full flex justify-center items-center py-2.5 px-4 border border-red-500/50 rounded-lg text-sm font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:opacity-70 transition-colors"
            >
              {isLoggingOut ? (
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
              ) : (
                <LogOut className="h-5 w-5 mr-2" />
              )}
              {isLoggingOut ? "Logging out..." : "Log Out Securely"}
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}