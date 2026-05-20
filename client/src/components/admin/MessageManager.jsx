import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Loader2, Inbox, Mail, User, Clock, Reply, MessageSquare } from "lucide-react";
import api from "../../api/axiosinstance";

export default function MessageManager() {
  const [messages, setMessages] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await api.get("/messages");
      
      // Sort messages to show newest first (if backend doesn't sort by default)
      const sortedMessages = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      
      setMessages(sortedMessages);
    } catch (error) {
      toast.error("Failed to load messages");
    } finally {
      setIsFetching(false);
    }
  };

  // Helper to format timestamps gracefully
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    const options = { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-teal-400" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl animate-fade-in">
      <div className="mb-8 border-b border-slate-700 pb-4 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center">
            <Inbox className="mr-3 text-teal-400" />
            Inbox
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Read messages sent from your public portfolio contact form.
          </p>
        </div>
        <div className="text-sm font-medium text-slate-400 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
          {messages.length} Total Messages
        </div>
      </div>

      <div className="space-y-6">
        {messages.length === 0 ? (
          <div className="bg-slate-800/30 p-12 rounded-xl border border-slate-700 text-center flex flex-col items-center">
            <MessageSquare className="h-12 w-12 text-slate-600 mb-4" />
            <h3 className="text-lg font-medium text-slate-300">Your inbox is empty</h3>
            <p className="text-slate-500 mt-1">When visitors contact you, their messages will appear here.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg._id} className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden hover:border-slate-500 transition-colors">
              
              {/* Message Header */}
              <div className="bg-slate-800/80 p-4 border-b border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 text-teal-400 font-bold border border-slate-600">
                    {msg.senderName ? msg.senderName.charAt(0).toUpperCase() : "?"}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-100 flex items-center">
                      <User className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
                      {msg.senderName}
                    </h4>
                    <a href={`mailto:${msg.senderEmail}`} className="text-sm text-teal-400 hover:text-teal-300 flex items-center mt-0.5 transition-colors">
                      <Mail className="h-3 w-3 mr-1.5" />
                      {msg.senderEmail}
                    </a>
                  </div>
                </div>
                
                <div className="text-xs text-slate-500 flex items-center sm:self-start pt-1">
                  <Clock className="h-3.5 w-3.5 mr-1.5" />
                  {formatDate(msg.createdAt)}
                </div>
              </div>

              {/* Message Body */}
              <div className="p-5">
                <h5 className="text-lg font-medium text-slate-200 mb-3 border-b border-slate-700/50 pb-2">
                  <span className="text-slate-500 text-sm font-normal mr-2">Subject:</span>
                  {msg.subject || "No Subject"}
                </h5>
                <div className="text-slate-300 leading-relaxed whitespace-pre-wrap bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
                  {msg.content}
                </div>
              </div>

              {/* Message Actions */}
              <div className="bg-slate-800/80 px-5 py-3 border-t border-slate-700/50 flex justify-end">
                <a 
                  href={`mailto:${msg.senderEmail}?subject=Re: ${msg.subject || "Your message"}`}
                  className="flex items-center px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-medium rounded-lg transition-colors border border-slate-600"
                >
                  <Reply className="h-4 w-4 mr-2" />
                  Reply via Email
                </a>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}