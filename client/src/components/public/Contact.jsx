import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Mail, Send, Loader2, Copy, Check } from "lucide-react";
import api from "../../api/axiosinstance";

export default function Contact() {
  const [formData, setFormData] = useState({
    senderName: "",
    senderEmail: "",
    subject: "",
    content: "",
  });
  const [profileEmail, setProfileEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Fetch the email dynamically from the profile dataset
  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const response = await api.get("/profile");
        if (response.data?.email) {
          setProfileEmail(response.data.email);
        }
      } catch (error) {
        console.error("Failed to fetch contact email from database configuration");
      }
    };
    fetchEmail();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const copyToClipboard = async () => {
    if (!profileEmail) return;
    try {
      await navigator.clipboard.writeText(profileEmail);
      setIsCopied(true);
      toast.success("Email copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy email.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const loadingToast = toast.loading("Sending secure transmission...");

    try {
      await api.post("/messages", formData);
      toast.success("Message transmitted successfully!", { id: loadingToast });
      setFormData({ senderName: "", senderEmail: "", subject: "", content: "" });
    } catch (error) {
      toast.error("Transmission failed. Please check parameters and retry.", { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-slate-900 border-t border-slate-800 overflow-hidden">
      {/* Decorative Grid Mesh Background Layer */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Direct Outreach Info */}
          <div className="flex flex-col items-start">
            <p className="text-teal-400 font-mono text-sm mb-3 tracking-wider">07. What's Next?</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-100 tracking-tight mb-6">
              Get In Touch
            </h2>
            <p className="text-slate-400 text-base md:text-lg mb-8 leading-relaxed max-w-md">
              Whether you want to discuss full-stack engineering collaborations, research initiatives, or just talk tech—my inbox is always open. 
            </p>
            
            {profileEmail && (
              <div className="group/email flex items-center bg-slate-950/40 border border-slate-800 p-4 rounded-xl gap-4 hover:border-slate-700/60 transition-colors w-full sm:w-auto">
                <div className="p-2.5 bg-teal-400/10 text-teal-400 rounded-lg">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="flex flex-col pr-4">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Direct Email</span>
                  <a href={`mailto:${profileEmail}`} className="text-slate-200 font-medium hover:text-teal-400 transition-colors text-sm md:text-base break-all">
                    {profileEmail}
                  </a>
                </div>
                <button 
                  onClick={copyToClipboard}
                  className="ml-auto p-2 bg-slate-900 rounded-md border border-slate-800 text-slate-400 hover:text-teal-400 hover:border-teal-400/30 transition-all shadow"
                  title="Copy email to clipboard"
                >
                  {isCopied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Premium Interactive Messaging Form */}
          <div className="relative">
            {/* Soft decorative glow behind the form card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 rounded-2xl blur-xl opacity-70"></div>
            
            <form 
              onSubmit={handleSubmit} 
              className="relative bg-slate-950/40 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4 shadow-xl"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <input 
                    type="text" name="senderName" placeholder="Your Name" required
                    value={formData.senderName} onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900/60 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:ring-1 focus:ring-teal-400/50 focus:border-teal-400/50 focus:outline-none text-sm transition-all shadow-inner"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <input 
                    type="email" name="senderEmail" placeholder="Your Email" required
                    value={formData.senderEmail} onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900/60 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:ring-1 focus:ring-teal-400/50 focus:border-teal-400/50 focus:outline-none text-sm transition-all shadow-inner"
                  />
                </div>
              </div>
              
              <input 
                type="text" name="subject" placeholder="Subject Target" required
                value={formData.subject} onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-900/60 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:ring-1 focus:ring-teal-400/50 focus:border-teal-400/50 focus:outline-none text-sm transition-all shadow-inner"
              />
              
              <textarea 
                name="content" placeholder="Type your message details here..." required rows="4"
                value={formData.content} onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-900/60 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:ring-1 focus:ring-teal-400/50 focus:border-teal-400/50 focus:outline-none text-sm transition-all resize-none shadow-inner"
              ></textarea>

              <button 
                type="submit" disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-teal-400 text-slate-950 font-bold rounded-lg hover:bg-teal-300 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none text-sm tracking-wide shadow-lg shadow-teal-500/10 active:scale-[0.99]"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin h-4 w-4" />
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" /> 
                    Transmit Message
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}