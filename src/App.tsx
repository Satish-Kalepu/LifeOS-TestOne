import { useState } from "react";
import { 
  LayoutDashboard, 
  Brain, 
  Users, 
  Bell, 
  Settings, 
  MessageSquare,
  Activity,
  ShieldAlert,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: MessageSquare, label: "AI Chat", id: "chat" },
  { icon: Brain, label: "Long-Term Memory", id: "memory" },
  { icon: Activity, label: "Daily Logs", id: "logs" },
  { icon: Bell, label: "Reminders", id: "reminders" },
  { icon: Users, label: "Family Admin", id: "family" },
  { icon: ShieldAlert, label: "Emergency Center", id: "emergency" },
  { icon: Settings, label: "Settings", id: "settings" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState([
    { role: "ai", content: "Hello Satish. I am LifeOS. I've indexed your current household status. How can I assist your biological or cognitive performance today?" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg = { role: "user", content: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "ksatish21", // Fallback dev ID
          message: inputValue,
          history: messages
        })
      });

      const data = await response.json();
      if (data.response) {
        setMessages(prev => [...prev, { role: "ai", content: data.response }]);
      }
    } catch (error) {
      console.error("Failed to chat:", error);
      setMessages(prev => [...prev, { role: "ai", content: "I'm sorry, my neural pathways are slightly congested. Could you repeat that?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#F5F5F0] text-[#3D3D33] font-sans overflow-hidden">
      {/* Sidebar Navigation */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            className="w-72 bg-white/40 border-r border-[#E6E6DF] flex flex-col p-8"
          >
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 bg-[#5A5A40] rounded-2xl flex items-center justify-center text-white font-serif italic text-2xl">
                L
              </div>
              <h1 className="text-xl font-semibold tracking-tight">LifeOS</h1>
            </div>

            <nav className="flex-1 space-y-6">
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-widest text-[#9A9A8F] font-bold px-2">System</p>
                {sidebarItems.slice(0, 4).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 group ${
                      activeTab === item.id 
                        ? "bg-[#5A5A40] text-white" 
                        : "text-[#6B6A5D] hover:bg-white/60"
                    }`}
                  >
                    <item.icon size={18} className={activeTab === item.id ? "text-white" : "text-[#5A5A40]/50"} />
                    <span className="tracking-tight">{item.label}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-widest text-[#9A9A8F] font-bold px-2">Management</p>
                {sidebarItems.slice(4).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 group ${
                      activeTab === item.id 
                        ? "bg-[#5A5A40] text-white" 
                        : "text-[#6B6A5D] hover:bg-white/60"
                    }`}
                  >
                    <item.icon size={18} className={activeTab === item.id ? "text-white" : "text-[#5A5A40]/50"} />
                    <span className="tracking-tight">{item.label}</span>
                  </button>
                ))}
              </div>
            </nav>

            <div className="mt-auto">
              <div className="p-4 bg-[#EBEBE4] rounded-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C2C2B0] border-2 border-white flex items-center justify-center text-[#5A5A40] font-bold">
                  SK
                </div>
                <div>
                  <p className="text-xs font-bold">Satish Kumar</p>
                  <p className="text-[10px] text-[#8A897C] font-bold uppercase tracking-wider">ADMIN USER</p>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-20 border-b border-[#E6E6DF] flex items-center justify-between px-10 bg-white/20 z-10 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-white/60 rounded-full transition-colors border border-[#E6E6DF]"
            >
              {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <h1 className="text-2xl font-serif italic font-medium">LifeOS System Panel</h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="px-4 py-1.5 bg-[#82826A]/10 text-[#5A5A40] text-xs font-medium rounded-full border border-[#5A5A40]/20 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#5A5A40] rounded-full animate-pulse"></span>
              AI Context: Synced
            </div>
            <div className="w-10 h-10 rounded-full border border-[#E6E6DF] flex items-center justify-center hover:bg-white transition-colors cursor-pointer">
              <Bell size={18} />
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto p-10 bg-[#F5F5F0] custom-scrollbar">
          <div className="max-w-6xl mx-auto space-y-10">
            {/* Breadcrumb / Context */}
            <div className="flex items-center gap-2 text-[#9A9A8F] uppercase text-[10px] font-bold tracking-widest">
              <span>Main</span>
              <ChevronRight size={10} />
              <span className="text-[#5A5A40]">{activeTab}</span>
            </div>

            {/* Dashboard Content */}
            {activeTab === "dashboard" && (
              <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white rounded-[32px] p-8 shadow-sm border border-[#E6E6DF]">
                    <p className="text-[10px] uppercase tracking-widest text-[#9A9A8F] font-bold mb-2">Memory Nodes</p>
                    <h3 className="text-5xl font-mono tracking-tighter text-[#3D3D33]">1,248</h3>
                    <div className="mt-4 flex items-center gap-2 text-[#5A5A40] font-bold text-xs uppercase">
                      <ChevronRight size={12} className="-rotate-90" />
                      <span>+12% Expansion</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-[32px] p-8 shadow-sm border border-[#E6E6DF]">
                    <p className="text-[10px] uppercase tracking-widest text-[#9A9A8F] font-bold mb-2">Daily Score</p>
                    <h3 className="text-5xl font-mono tracking-tighter text-[#3D3D33]">84<span className="text-xl opacity-30">/100</span></h3>
                    <div className="mt-4 flex items-center gap-2 text-[#82826A] font-bold text-xs uppercase">
                      <span>Productivity Peak</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-[32px] p-8 shadow-sm border border-[#E6E6DF]">
                    <p className="text-[10px] uppercase tracking-widest text-[#9A9A8F] font-bold mb-2">Family Readiness</p>
                    <h3 className="text-5xl font-mono tracking-tighter text-[#3D3D33]">100%</h3>
                    <div className="mt-4 flex items-center gap-2 text-[#5A5A40] font-bold text-xs uppercase font-serif italic">
                      <span>4 Members Synced</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div className="bg-white rounded-[32px] p-8 shadow-sm border border-[#E6E6DF] space-y-6">
                      <h4 className="text-lg font-bold tracking-tight text-[#3D3D33]">Recent Activity Logs</h4>
                      <div className="space-y-4">
                        {[
                          { time: "09:12", type: "Health", msg: "Deep sleep cycle completed - 7.5hrs" },
                          { time: "08:30", type: "Expense", msg: "Coffee & Breakfast - $14.20" },
                          { time: "08:15", type: "Habit", msg: "Meditation session logged (15min)" },
                          { time: "07:45", type: "Task", msg: "Water plants (Recurring)" }
                        ].map((log, idx) => (
                          <div key={idx} className="flex border-b border-[#E6E6DF] pb-4 hover:bg-[#F5F5F0] p-2 rounded-xl transition-colors cursor-pointer group">
                            <span className="font-mono text-[10px] font-bold text-[#9DA085] w-12 group-hover:text-[#5A5A40] transition-colors">{log.time}</span>
                            <span className="font-bold text-[9px] uppercase tracking-wider bg-[#5A5A40] text-white px-2 py-0.5 rounded-full mr-4 h-fit">{log.type}</span>
                            <p className="text-sm font-medium text-[#3D3D33]">{log.msg}</p>
                          </div>
                        ))}
                      </div>
                      <button className="text-xs text-[#5A5A40] font-bold underline">View All Activity</button>
                   </div>

                   <div className="space-y-8">
                      <div className="bg-[#5A5A40] rounded-[32px] p-8 text-white space-y-4 relative overflow-hidden group shadow-lg shadow-[#5A5A40]/10">
                        <MessageSquare className="absolute -right-8 -top-8 text-white/5 w-48 h-48 group-hover:scale-110 transition-transform duration-500" />
                        <p className="text-[10px] uppercase tracking-widest opacity-60 font-bold">AI Insight & Suggestion</p>
                        <p className="text-xl leading-relaxed font-serif italic text-white/90">
                          "You usually have a headache around this time when you sleep less than 6 hours. I've scheduled a 'Hydration Reminder' on your mobile for 11 AM."
                        </p>
                        <div className="flex gap-4">
                          <button className="flex items-center gap-2 group/btn text-xs font-bold uppercase tracking-widest bg-white text-[#5A5A40] px-4 py-2 rounded-xl hover:bg-[#EBEBE4] transition-all">
                            Approve Sync <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                          <button className="text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-all underline">Dismiss</button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-8">
                        <div className="bg-[#D9D9CF] rounded-[32px] p-8 shadow-sm border border-[#E6E6DF] flex flex-col justify-between">
                          <p className="text-[10px] uppercase tracking-widest text-[#5A5A40] font-bold">Daily Mood</p>
                          <div className="text-5xl my-4">☀️</div>
                          <p className="text-sm font-bold text-[#5A5A40] font-serif italic">Productive & Clear</p>
                        </div>
                        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-[#E6E6DF] flex flex-col justify-between">
                          <p className="text-[10px] uppercase tracking-widest text-[#9A9A8F] font-bold">Finance</p>
                          <div className="my-4">
                            <span className="text-3xl font-mono text-[#3D3D33]">$142.10</span>
                            <p className="text-[10px] text-[#9A9A8F] mt-1 italic">Under budget today</p>
                          </div>
                          <p className="text-xs font-bold text-[#5A5A40]">Details</p>
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            )}

            {/* AI Chat Module */}
            {activeTab === "chat" && (
              <div className="h-[calc(100vh-200px)] flex flex-col bg-white rounded-[32px] border border-[#E6E6DF] overflow-hidden shadow-sm">
                <div className="p-6 border-b border-[#E6E6DF] flex items-center justify-between bg-white/50 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#5A5A40] flex items-center justify-center text-white">
                      <Brain size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#3D3D33]">LifeOS Meta-Brain</h3>
                      <p className="text-[10px] text-[#5A5A40] font-bold uppercase tracking-widest flex items-center gap-1">
                        <span className="w-1 h-1 bg-green-500 rounded-full"></span> Online & Thinking
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                  {messages.map((msg, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.role === "ai" ? "justify-start" : "justify-end"}`}
                    >
                      <div className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
                        msg.role === "ai" 
                          ? "bg-[#F5F5F0] text-[#3D3D33] rounded-tl-none border border-[#E6E6DF]" 
                          : "bg-[#5A5A40] text-white rounded-tr-none"
                      }`}>
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-[#F5F5F0] rounded-2xl p-4 rounded-tl-none border border-[#E6E6DF]">
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 bg-[#5A5A40] rounded-full animate-bounce"></span>
                          <span className="w-1.5 h-1.5 bg-[#5A5A40] rounded-full animate-bounce delay-100"></span>
                          <span className="w-1.5 h-1.5 bg-[#5A5A40] rounded-full animate-bounce delay-200"></span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6 bg-white border-t border-[#E6E6DF]">
                  <div className="flex gap-4">
                    <input 
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Ask LifeOS to remember something, calculate context, or sync with family..."
                      className="flex-1 bg-[#F5F5F0] border border-[#E6E6DF] rounded-xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 transition-all font-medium"
                    />
                    <button 
                      onClick={handleSendMessage}
                      disabled={isLoading}
                      className="bg-[#5A5A40] text-white px-6 py-3 rounded-xl hover:bg-[#82826A] transition-all flex items-center gap-2 group disabled:opacity-50"
                    >
                      <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                  <p className="mt-4 text-[10px] text-[#9A9A8F] text-center font-bold uppercase tracking-widest">
                    Your thoughts are end-to-end encrypted and stored in your private LifeOS instance.
                  </p>
                </div>
              </div>
            )}

            {/* Placeholder for other tabs */}
            {activeTab !== "dashboard" && activeTab !== "chat" && (
              <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6">
                <div className="w-24 h-24 bg-white rounded-[32px] border border-[#E6E6DF] flex items-center justify-center shadow-sm">
                  <Brain size={40} className="animate-pulse text-[#5A5A40]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold font-serif italic text-[#3D3D33]">Processing {activeTab} Module...</h3>
                  <p className="max-w-md text-sm text-[#8A897C] leading-relaxed">The AI orchestration and secure vector database connections are being optimized for long-term memory retrieval.</p>
                </div>
                <button 
                  onClick={() => setActiveTab("dashboard")}
                  className="bg-[#5A5A40] text-white px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#82826A] transition-all"
                >
                  Return to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@1,500;1,700&family=JetBrains+Mono:wght@500;700&display=swap');
        
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }

        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #F5F5F0;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E6E6DF;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #5A5A40;
        }
      `}} />
    </div>
  );
}

